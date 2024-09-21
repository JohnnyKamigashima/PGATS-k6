// @ts-ignore
// @ts-ignore
import { sleep } from 'k6'
import { visitLojinhaPage } from './utils/visitLojinhaPage'

// const url = 'https://swapi.dev/api/people/1/'
export const url = 'http://165.227.93.41/lojinha-web/v2/'

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
  visitLojinhaPage()

  sleep(1)
}

