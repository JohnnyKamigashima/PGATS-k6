import { post } from "./post.js"

export function createProducts(token, baseUrl, produtos) {
    const url = `${baseUrl}/produtos`
    const header = {
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    }
    const resultPostProdutos = post(url, produtos, header)
    const produtoId = resultPostProdutos.json('data.produtoId')
    return produtoId
}
