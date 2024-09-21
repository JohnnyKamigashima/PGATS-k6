// @ts-nocheck
import http from 'k6/http'
import { sleep } from 'k6'
import { readDotEnv } from './utils/dotEnv.js'

export const options = {
  vus: 10,
  duration: '30s',
  cloud: {
    name: 'ex01',
    projectId: 3715744,
  }
}
console.log(`Usuario: ${readDotEnv('teste.env').USER}`)

export default function () {
  http.get('https://test.k6.io')
  sleep(1)
}
