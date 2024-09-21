// @ts-nocheck
import { check } from 'k6'
import http from 'k6/http'
import { arraysContemOsMesmosElementos } from "./cadastraProduto.js"
import { createProduto } from "./createProduto.js"

export function cadastraProduto(token, baseUrl, produto) {
    const produtoId = createProduto(token, baseUrl, produto)

    const url = `${baseUrl}/produtos/${produtoId}`

    const header = {
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }

    const produtoResponse = http.get(url, header)

    check(produtoResponse, {
        'status code is 200': (r) => r.status === 200,

        'O corpo contém o nome do produto': (r) => r.json('data.produtoNome').includes(produto.produtoNome),

        'O corpo contém o valor do produto': (r) => r.json('data.produtoValor') == produto.produtoValor,

        'O segundo componente cor é igual': (r) => r.json('data.produtoCores').sort()[1] == r.json('data.produtoCores').sort()[1],

        'Os componentes cores são iguais': (r) => arraysContemOsMesmosElementos(r.json('data.produtoCores'), produto.produtoCores)
    })
    return produtoId
}
