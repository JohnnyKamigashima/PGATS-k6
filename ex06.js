// @ts-nocheck
import http from 'k6/http'
import { sleep } from 'k6'
import { readDotEnv } from './utils/dotEnv.js'
import { visitLojinhaPage } from './utils/visitLojinhaPage.js'
import { loginLojinha } from './utils/loginLojinha.js'

const _env = readDotEnv('.env')

export const options = {
  cloud: {
    name: 'ex06',
    projectId: _env.K6_CLOUD_ID,
  },
  scenarios: {
    curioso: {
      executor: 'ramping-vus',
      stages: [
        { target: 3, duration: '5s' },
        { target: 3, duration: '15s' },
        { target: 0, duration: '5s' },
      ],
      exec:'accessLojinhaPage'
    },
    usuario: {
      executor: 'ramping-vus',
      stages: [
        { target: 10, duration: '1s' },
        { target: 0, duration: '1s' },
      ],
      exec: 'accesLojinhaAndLogin',
      startTime: '10s',
    },
  }
}

export function accessLojinhaPage() {
  visitLojinhaPage(_env.WEB_BASE_URL)
}

export function accesLojinhaAndLogin() {
  visitLojinhaPage(_env.WEB_BASE_URL)
  loginLojinha (_env.WEB_BASE_URL, _env.USER, _env.PASSWORD)
}
