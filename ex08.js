// @ts-nocheck
import { sleep } from 'k6'
import { browser } from 'k6/browser'
import { readDotEnv } from './utils/dotEnv.js'

const _env = readDotEnv('.env')

export const options = {
    scenarios: {
        navegador: {
            executor: 'per-vu-iterations',
            vus: 10,
            iterations: 50,
            options: {
                browser: {
                    type: 'chromium'
                }
            }
        }
    }
}

export default async function () {
    const navegador = await browser.newPage()
    await navegador.goto(`${_env.WEB_BASE_URL}`)
    await navegador.fill('#usuario', _env.USER)
    await navegador.fill('#senha', _env.PASSWORD)
    await navegador.click('#btn-entrar')
    sleep(3)
}

