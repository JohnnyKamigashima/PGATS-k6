// @ts-nocheck
import { sleep } from 'k6'
import { getToken } from './utils/getToken.js'
import { Produto } from './DTO/Produto.js'
import { Componentes } from './DTO/Componentes.js'
import { deleteProduto } from './utils/deleteProduto.js'
import { cadastraProduto } from './utils/cadastraProduto.1.js'

export const options = {
  vus: 1,
  iterations: '1',
  thresholds: {
    http_req_failed: ['rate < 0.01']
  }
}

export default function () {
  const baseUrl = 'http://165.227.93.41/lojinha/v2'
  const bodyLogin = {
    usuarioLogin: "cgts",
    usuarioSenha: "123456"
  }

  const token = getToken(baseUrl, bodyLogin.usuarioLogin, bodyLogin.usuarioSenha)
  const produto = new Produto()
  const componentes = new Componentes()

  produto.produtoCores = ['Branco', 'Preto', 'Azul', 'Prata', 'Dourado', 'Vermelho', 'Cinza', 'Verde', 'Amarelo', 'Marrom']
  produto.produtoNome = 'JHK Produto ' + Math.floor(Math.random() * 1000)
  produto.produtoValor = Math.floor(Math.random() * 10 + 5 + 0, 90)
  produto.produtoUrlMock = 'https://www.paodeacucar.com/produto/444500/biscoito-recheado-trakinas-morango-126g'

  componentes.componenteNome = 'Caixa'
  componentes.componenteQuantidade = 1

  produto.componentes.push(componentes)

  const produtoId = cadastraProduto(token, baseUrl, produto)

  deleteProduto(token, baseUrl, produtoId)
}

