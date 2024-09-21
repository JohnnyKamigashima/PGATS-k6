// @ts-nocheck
// @ts-ignore
import http from 'k6/http'
// @ts-ignore
import { sleep, check } from 'k6'

export const options = {
    vus: 1,
    iterations: 10,
    thresholds: {
        http_req_failed: ['rate < 0.01']
    },
    cloud: {
        name: 'ex04',
        projectId: 3715744,
    }
}

export default function () {
    const respostaHomePageLojinha = http.get('http://165.227.93.41/lojinha-web/v2/')

    check(respostaHomePageLojinha, {
        'Checar se o Status Code é igual a 200': r => r.status === 200,
        'Checar que o título da página é Lojinha': r => r.html().find('title').text() === 'Lojinha'

    })

    // console.log(respostaHomePageLojinha.status)
    // console.log(respostaHomePageLojinha.status_text)
    // console.log(respostaHomePageLojinha.remote_ip)
    // console.log(respostaHomePageLojinha.html().find('h4').text())
    // console.log(respostaHomePageLojinha.html().find('title').text())
    // console.log(respostaHomePageLojinha.html().find('#btn-entrar').attr('name'))
    // console.log(respostaHomePageLojinha.html().find('#btn-entrar').text())
    // console.log(respostaHomePageLojinha.body)

    const corpoDaRequestLogin = {
        usuario: 'cgts',
        senha: '123456'
    }

    const headerUrlEncoded = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    // @ts-ignore
    const respostaLogin = http.post('http://165.227.93.41/lojinha-web/v2/login/entrar', corpoDaRequestLogin, headerUrlEncoded)

    // Cookies que mostram que eu fiz login
    // const cookieJar = http.cookieJar();
    // const cookiesQuePegueiNoLogin = cookieJar.cookiesForURL(respostaLogin.url)

    http.get('http://165.227.93.41/lojinha-web/v2/produto', {
        // cookies: cookiesQuePegueiNoLogin // Prova que eu sou o Admin e já fiz login
    })

    const produtoNovoPage = http.get('http://165.227.93.41/lojinha-web/v2/produto/novo', {
        // cookies: cookiesQuePegueiNoLogin // Prova que eu sou o Admin e já fiz login
    })

    //Adiciona novos produtos

    const cores = ['Branco', 'Preto', 'Azul', 'Prata', 'Dourado', 'Vermelho', 'Cinza', 'Verde', 'Amarelo', 'Marrom'
    ]

    const novoProdutoBody = {
        'produtonome': `JHK Produto ${Math.floor(Math.random() * 1000)}`,
        'produtovalor': `${Math.floor(Math.random() * 1000)}`,
        'produtocores': `${cores[Math.floor(Math.random() * cores.length)]}`,
        'action': ''
    }

    const urlNovoProduto = 'http://165.227.93.41/lojinha-web/produto/salvarproduto'

    console.log(`Produto a ser adicionado: ${JSON.stringify(novoProdutoBody)}`)

    const novoProdutoGravado = http.post(urlNovoProduto, novoProdutoBody, headerUrlEncoded)

    const refreshHeader = novoProdutoGravado.headers.Refresh

    console.log(refreshHeader)
    // console.log(novoProdutoGravado.status)

    check(novoProdutoGravado, {
        'Checar se o Status Code é igual a 200': r => r.status === 200,
        'Checar que o Refresh contem Produto adicionado com sucesso': r => r.headers.Refresh.includes('Produto adicionado com sucesso')

    })

    // Extrair a ID do produto
    const regex = /editar\/(.*)\?message/
    const productId = regex.exec(refreshHeader)[1]

    console.log(`ID do produto criado -> ${productId}`)

    // Visita a pagina do produto

    const editarProduto = http.get(`http://165.227.93.41/lojinha-web/produto/editar/${productId}`)

    check(editarProduto, {
        'Checar se o Status Code é igual a 200': r => r.status === 200,
        'Checar que o Produto contem o nome correto': r => r.body.includes(novoProdutoBody.produtonome),
        'Checar que o Produto contem o valor correto': r => r.body.includes(novoProdutoBody.produtovalor),
        'Checar que o Produto contem a cor correto': r => r.body.includes(novoProdutoBody.produtocores)
    })

    // Deleta o produto

    const deletarProduto = http.get(`http://165.227.93.41/lojinha-web/produto/remover/${productId}`)

    check(deletarProduto, {
        'Checar se o Status Code é igual a 200': r => r.status === 200,
        'Checar que o Refresh contem Produto removido com sucesso': r => r.headers.Refresh.includes('Produto removido com sucesso')

    })
    // sleep(1)
}

