// @ts-nocheck
import http from 'k6/http'
import { check } from 'k6'

export function deleteProduto(token, baseUrl, produtoId) {
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }
    const deleteProduto = http.del(`${baseUrl}/produtos/${produtoId}`, null, header)

    check(deleteProduto, {
        'status code is 204': (r) => r.status === 204
    })
}
