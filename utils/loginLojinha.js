// @ts-ignore
import { check } from 'k6'
// @ts-ignore
import http from 'k6/http'

export const loginLojinha = (baseUrl, user, pass) => {
    const loginUrl = "/login/entrar"

    const headers = {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        }
    }

    const body = {
        usuario: user,
        senha: pass
    }

    const response = http.post(baseUrl + loginUrl, body, headers)
    check(response, {
        'status é 200': (r) => r.status === 200,
    })

    const cookiejar = http.cookieJar()

    return cookiejar.cookiesForURL(baseUrl.baseUrl)
}
