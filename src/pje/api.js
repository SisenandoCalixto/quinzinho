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


async function pjeApiConsultaPublicaObterProcessoId(numero){

	let url = LINK.pje.api.consulta + 'processos/dadosbasicos/' + numero
	relatar('Consultando API:',url)
	try{
		let resposta = await fetch(url,pjeApiRequisicaoConfiguracoes())
		let erro = pjeApiVerificarErro(resposta)
		if(erro) throw new Error(erro)
		let dados = await resposta.json() || ''
		let id = dados[0].id || ''

		relatar('Dados:',dados)
		return id
	}
	catch(erro){
		console.error('-> erro:' + erro)
		return erro
	}

}



async function pjeApiObterProcessoExpedientesInstancia(
	id,
	instancia = 1
){

	let url = LINK.pje.api.comum + 'processos/id/' + id + '/expedientes?pagina=1&tamanhoPagina=1000&instancia=' + instancia
	relatar('Consultando API:',url)

	let resposta = await fetch(url)
	let dados = await resposta.json()

	relatar('Dados:',dados)
	return dados?.resultado || ''

}




async function pjeApiObterPerfil(){

	let url = LINK.pje.api.seguranca + 'token/perfis'
	relatar('Consultando API:',url)

	let resposta = await fetch(url)
	let dados = await resposta.json()
	let informacoes = dados[0] || ''

	relatar('Dados:',informacoes)
	return informacoes || ''

}

async function pjeApiObterProcessoTarefa(idProcesso){

	let url = LINK.pje.api.comum + 'processos/id/' + idProcesso + '/tarefas?maisRecente=true'
	relatar('Consultando API:',url)

	let resposta = 	await fetch(url,pjeApiRequisicaoConfiguracoes())
	let dados = await resposta.json()
	let tarefa = dados[0]
	let nome = tarefa?.nomeTarefa || ''

	relatar('Dados:',nome)
	return nome

}


async function pjeApiObterProcessoPartes(idProcesso){

	let url = LINK.pje.api.comum + 'processos/id/' + idProcesso + '/partes'
	relatar('Consultando API:',url)

	let resposta = 	await fetch(url,pjeApiRequisicaoConfiguracoes())
	let dados = await resposta.json()

	relatar('Dados:',dados)
	return dados

}

async function pjeApiVerificarSessaoAtiva(tentativas = 5){
	let url = LINK.pje.primeirograu + 'seam/resource/rest/api/sincronia/sessao'
	relatar('Consultando API:',url)
	try{
		let resposta = await fetch(url)
		let erro = pjeApiVerificarErro(resposta)
		if(erro) throw new Error(erro)
		let dados = await resposta.json() || ''
		relatar('Dados:',dados)

		return dados.mensagem.includes('Sincronização de sessão realizada.') ? true : false
	}
	catch(erro){
		console.error('-> erro:' + erro)
		console.error('-> tentativas:' + tentativas)
		if(tentativas < 1) {
			if (erro.message.includes('Unauthorized')) {
				alert(TEXTO.autentique)
				criarJanela(LINK.pje.raiz,'pjePainel')
				return false
			}
			return 'Erro: não foi possível verificar.'
		}
		tentativas--
		pjeApiVerificarSessaoAtiva(tentativas)
	}
}

function pjeApiVerificarErro(resposta = {}){
	let erro = ''
	if(!resposta?.ok) erro = resposta?.statusText || 'Erro: não foi possível obter uma resposta à requisição.'
	if(minusculas(erro).includes('not found')) erro = 'Erro: URL não encontrada.'
	if(erro) console.error(erro)
	return erro
}
