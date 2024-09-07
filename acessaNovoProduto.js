// @ts-ignore
import http from 'k6/http'
// @ts-ignore
import { check } from 'k6'

export const acessaNovoProduto = (urls, cookies) => {
    const response = http.get(urls.baseUrl + urls.novoProdutoUrl, {
        cookies: cookies
    })

    const titulo = 'Adicionar produto'.toUpperCase()

    check(response, {
        'status é 200': (r) => r.status === 200,
        'esta na pagina de adicionar produto': (r) => r.html().find('h4').text().toUpperCase().includes(titulo)
    })

    return response
}
