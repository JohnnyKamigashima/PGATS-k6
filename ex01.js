// @ts-nocheck
import http from 'k6/http'
import { sleep } from 'k6'
import { numeroAleatorio } from './utils/numeroAleatorio.js'

export const options = {
  // vus: 10,
  // duration: '30s',
  thresholds: {
    http_req_waiting: ["p(90)>=0", 'p(90)<=250'],
  },
  cloud: {
    name: 'ex01',
    projectId: 3715744,
  },
  stages: [
    { target: 100, duration: '1s' },
    { target: 0, duration: '1s' },
    
  ]
}

export default function () {
  http.get('https://test.k6.io')
  sleep(numeroAleatorio(3))
}

