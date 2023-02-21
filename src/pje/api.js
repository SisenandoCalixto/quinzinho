function pjeApiRequisicaoConfiguracoes(){
	return {
		"method": "GET",
		"mode": "cors",
		"credentials": "include",
		"headers": {
			"Content-Type": "application/json",
			"X-Grau-Instancia": "1"
		}
	}
}


async function pjeApiObterPerfis(){
	let url = LINK.pje.api.seguranca + 'token/perfis'
	relatar('Consultando API:',url)
	let resposta = await fetch(url,pjeApiRequisicaoConfiguracoes)
	let erro = pjeApiVerificarErro(resposta)
	if(erro) throw new Error(erro)
	let dados = await resposta.json()
	relatar('Dados:',dados)
	return dados || ''
}


async function pjeApiObterProcessoDadosPrimarios(id){
	let url = LINK.pje.api.comum + 'processos/id/' + id
	relatar('Consultando API:',url)
	let resposta = await fetch(url,pjeApiRequisicaoConfiguracoes)
	let erro = pjeApiVerificarErro(resposta)
	if(erro) throw new Error(erro)
	let dados = await resposta.json()
	relatar('Dados:',dados)
	return dados
}


function pjeApiVerificarErro(resposta = {}){
	let erro = ''
	if(!resposta?.ok) erro = resposta?.statusText || 'Erro: não foi possível obter uma resposta à requisição.'
	if(minusculas(erro).includes('not found')) erro = 'Erro: URL não encontrada.'
	if(erro) console.error(erro)
	return erro
}