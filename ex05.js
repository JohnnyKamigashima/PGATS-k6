// @ts-nocheck
import { sleep, group } from 'k6'
import { getToken } from './utils/getToken.js'
import { Produto } from './DTO/Produto.js'
import { Componentes } from './DTO/Componentes.js'
import { deleteProducts } from './utils/deleteProducts.js'
import { addProducts } from './utils/addProducts.js'
import { Faker, pt_BR } from 'https://esm.sh/@faker-js/faker'
import { readDotEnv } from './utils/dotEnv.js'

export const options = {
  // vus: 1,
  // iterations: '1',
  thresholds: {
    http_req_failed: ['rate < 0.01']
  }, cloud: {
    name: 'ex05',
    projectId: 3715744,
  },
  stages: [
    { target: 2, duration: '5s' },
  ]
}
const _env = readDotEnv('.env')

export default function () {
  const baseUrl = 'http://165.227.93.41/lojinha/v2'
  const produto = new Produto()
  const componentes = new Componentes()
  const fakerBr = new Faker({ locale: pt_BR });

  produto.produtoCores = ['Branco', 'Preto', 'Azul', 'Prata', 'Dourado', 'Vermelho', 'Cinza', 'Verde', 'Amarelo', 'Marrom']
  produto.produtoNome = fakerBr.commerce.product()
  produto.produtoValor = Math.floor(Math.random() * 10 + 5 + 0, 90)
  produto.produtoUrlMock = 'https://www.paodeacucar.com/produto/444500/biscoito-recheado-trakinas-morango-126g'

  componentes.componenteNome = 'Caixa'
  componentes.componenteQuantidade = 1

  produto.componentes.push(componentes)

  let token
  let produtoId

  group('Obter Login', () => {
    const bodyLogin = {
      usuarioLogin: _env.USER,
      usuarioSenha: _env.PASSWORD
    }

    token = getToken(baseUrl, bodyLogin.usuarioLogin, bodyLogin.usuarioSenha)

  })

  group('cadastra produto', () => {
    produtoId = addProducts(token, baseUrl, produto)
  })

  group('deleta produto', () => {
    deleteProducts(token, baseUrl, produtoId)
  })
}

