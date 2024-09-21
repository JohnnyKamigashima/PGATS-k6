import http from 'k6/http'

export const post = (url, body, options) => {
    return http.post(url, JSON.stringify(body), options)
}
