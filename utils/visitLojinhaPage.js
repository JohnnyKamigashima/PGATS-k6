// @ts-ignore
import { check } from 'k6'
// @ts-ignore
import http from 'k6/http'

export function visitLojinhaPage(url) {
    const response = http.get(url)
    // console.log(Object.keys((response)))
    // console.log(response.body)
    // console.log(response.html().find('h4').text())
    // console.log((response))
    const capturado = response.html().find('h4').text()
    // console.log(`Texto do H4: ${capturado}`)

    const button = response.html().find('button').text()
    // console.log(`Botão: ${button}`)

    check(response, {
        'status é 200': (r) => r.status === 200,
        'Título está presente': (r) => r.html().find('h4').text().trim() === 'Acessar a Lojinha',
        'O botão possui o texto Entrar': (r) => r.html().find('button').text().includes('Entrar')
    })
}
