// @ts-ignore
import http from 'k6/http'
// @ts-ignore
import { sleep, check } from 'k6'

// const url = 'https://swapi.dev/api/people/1/'
const url = 'http://165.227.93.41/lojinha-web/v2/'

export const options = {
  vus: 1,
  // duration: '30s',
  iterations: 1,
  thresholds: {
    http_req_blocked: ["p(90)>=5", 'p(90)<=30'],
    http_req_connecting: ['p(90)<=30'],
  },
  cloud: {
    name: 'ex02',
    projectId: 3715744,
  }
}
export default function () {
  const response = http.get(url)
  // console.log(Object.keys((response)))
  // console.log(response.body)
  // console.log(response.html().find('h4').text())
  // console.log((response))
  const capturado = response.html().find('h4').text()
  console.log(`Texto do H4: ${capturado}`)

  const button = response.html().find('button').text()
  console.log(`Botão: ${button}`)

  check(response, {
    'status é 200': (r) => r.status === 200,
    'Título está presente': (r) => r.html().find('h4').text().trim() === 'Acessar a Lojinha',
    'O botão possui o texto Entrar': (r) => r.html().find('button').text().includes('Entrar')
  })

  sleep(1)
}
