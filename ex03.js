// @ts-nocheck
// @ts-ignore
import { sleep } from 'k6'
import { Urls } from './utils/urls.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { accessProducts } from './utils/acessProducts.js'
import { accessNewProducts } from './utils/accessNewProduct.js'
import { loginLojinha } from './utils/loginLojinha.js'

export const options = {
  vus: 5,
  // iteration: 1
  duration: '5s',
  thresholds: {
    http_req_waiting: ['p(90)<=31000'],
    http_req_failed: ['rate<0.05'],
  },
  cloud: {
    name: 'ex03',
    projectId: 3715744,
  }
}
export default function () {
  const urls = new Urls()

  urls.baseUrl = 'http://165.227.93.41/lojinha-web/v2'
  urls.loginUrl = "/login/entrar"
  urls.produtosUrl = "/produto"
  urls.novoProdutoUrl = "/produto/novo"

  console.log(__ENV.USUARIOSENHA)

  const user = 'admin'
  const pass = 'admin'

  const cookies = loginLojinha(urls, user, pass)

  accessProducts(urls, cookies, user)
  accessNewProducts(urls, cookies)
  sleep(1)

}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  }
}

