// @ts-nocheck
import { check } from 'k6'
import http from 'k6/http'
import { sameArrays } from "./sameArrays.js"
import { createProducts } from "./createProducts.js"

export function addProducts(token, baseUrl, produto) {
    const produtoId = createProducts(token, baseUrl, produto)

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

        'Os componentes cores são iguais': (r) => sameArrays(r.json('data.produtoCores'), produto.produtoCores)
    })
    return produtoId
}
