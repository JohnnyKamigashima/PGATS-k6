// @ts-nocheck
import { check } from 'k6'
import { post } from "./post.js"

export function getToken(baseUrl, user, pass) {
    const header = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const bodyLogin = {
        usuarioLogin: user,
        usuarioSenha: pass
    }

    const endpoints = 'login'

    const loginResponse = post(`${baseUrl}/${endpoints}`, bodyLogin, header)

    check(loginResponse, {
        'status code is 200': (r) => r.status === 200,
        'O corpo contém um token.': (r) => r.json('data.token')
    })

    const token = JSON.parse(loginResponse.body).data.token

    console.log(`Token: ${token}`)

    return token
}
