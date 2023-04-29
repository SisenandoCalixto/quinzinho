function pjeApiRequisicaoConfiguracoes(){
	let instancia = CONFIGURACAO?.usuario?.instancia || '1'
	return {
		"method": "GET",
		"mode": "cors",
		"credentials": "include",
		"headers": {
			"Content-Type": "application/json",
			"X-Grau-Instancia": instancia
		}
	}
}


async function pjeApiObterPerfis(){
	let url = LINK.pje.api.seguranca + 'token/perfis'
	relatar('Consultando API:',url)
	try{
		let resposta = await fetch(url,pjeApiRequisicaoConfiguracoes)
		let erro = pjeApiVerificarErro(resposta)
		if(erro) throw new Error(erro)
		let dados = await resposta.json()
		relatar('Dados:',dados)
		return dados || ''
	}
	catch(erro){
		console.error('-> Erro: ', erro)
		if(erro.message.includes('Unauthorized')){
			document.addEventListener(
				'click',
				() => {
					window.location.href = JANELA
				}
			)
			alert(TEXTO.autentique)
			criarJanela(LINK.pje.raiz,'pjePainel')
		}
		if(erro.message.includes('NetworkError when attempting to fetch resource')){
			document.addEventListener(
				'click',
				() => {
					window.location.href = JANELA
				}
			)
			alert(TEXTO.permissoes)
			browser.runtime.openOptionsPage()
		}
		return false
	}
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

async function pjeApiObterOrgaoJulgador(id){
	let url = LINK.pje.api.comum + 'orgaosjulgadores/' + id
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