// @ts-nocheck
// Lê o conteúdo do arquivo .env
export function readDotEnv(filename){
const envContent = open(filename)

// Processa as variáveis do arquivo .env
const envVars = {}
envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=')
        envVars[key.trim()] = value.trim()
    }
})

    return envVars

}