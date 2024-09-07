// @ts-ignore
import { check } from 'k6'
// @ts-ignore
import http from 'k6/http'

export const loginLojinha = (urls, user, pass) => {

    const headers = {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        }
    }

    const body = {
        usuario: user,
        senha: pass
    }

    const response = http.post(urls.baseUrl + urls.loginUrl, body, headers)
    check(response, {
        'status é 200': (r) => r.status === 200,
    })

    const cookiejar = http.cookieJar()

    return cookiejar.cookiesForURL(urls.baseUrl)
}
