// @ts-ignore
import http from 'k6/http'
// @ts-ignore
import { check } from 'k6'

export const accessProducts = (urls, cookies, userName) => {
    const response = http.get(urls.baseUrl + urls.produtosUrl, {
        cookies: cookies
    })

    const mensagemLogado = `Boas vindas, ${userName}!`.toUpperCase()

    check(response, {
        'status é 200': (r) => r.status === 200,
        'esta logado': (r) => r.html().find('a').text().toUpperCase().includes(mensagemLogado)
    })

    return response
}
