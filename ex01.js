import http from 'k6/http'
import { sleep } from 'k6'
import { numeroAleatorio } from './utils/numeroAleatorio.js'

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_waiting: ["p(90)>=100", 'p(90)<=50'],
  }
}

export default function () {
  http.get('https://test.k6.io')
  sleep(numeroAleatorio(3))
}

