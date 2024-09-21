// @ts-nocheck
import http from 'k6/http'
import { sleep } from 'k6'
import { SharedArray } from 'k6/data'
import { readDotEnv } from './utils/dotEnv.js'
import { visitLojinhaPage } from './utils/visitLojinhaPage.js'
import { loginLojinha } from './utils/loginLojinha.js'

const _env = readDotEnv('.env')

const dados = new SharedArray('dados', function () {
    return JSON.parse(open('dados/ex07.json'))
})

const iterations = 1

export const options = {
    thresholds: {
        http_req_failed: ['rate < 0.01']
    },
    cloud: {
        name: 'ex07',
        projectId: _env.K6_CLOUD_ID,
    },
    scenarios: {
        testeDirigidoADados: {
            executor: 'shared-iterations',
            vus: dados.length,
            iterations: dados.length * iterations,
        }
    }
}

export default function () {

        visitLojinhaPage(_env.WEB_BASE_URL)
        loginLojinha(_env.WEB_BASE_URL, dados[__VU-1].usuarioLogin, dados[__VU-1].usuarioSenha)

}