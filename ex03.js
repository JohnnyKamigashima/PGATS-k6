// @ts-ignore
import { sleep } from 'k6'
import { loginLojinha } from './utils/loginLojinha.js'
import { acessaProdutos } from './utils/acessaProdutos.js'
import { acessaNovoProduto } from './acessaNovoProduto.js'
import { Urls } from './utils/urls.js'

export const options = {
  vus: 5,
  // iteration: 1
  duration: '5s',
  thresholds: {
    http_req_waiting: ['p(90)<=300'],
    http_req_failed: ['rate<0.05'],
  }
}
export default function () {
  const urls = new Urls()

  urls.baseUrl = 'http://165.227.93.41/lojinha-web/v2'
  urls.loginUrl = "/login/entrar"
  urls.produtosUrl = "/produto"
  urls.novoProdutoUrl = "/produto/novo"

  const user = 'admin'
  const pass = 'admin'

  const cookies = loginLojinha(urls, user, pass)

  acessaProdutos(urls, cookies, user)
  acessaNovoProduto(urls, cookies)
  // handleSummary()
  sleep(1)
}

