window.addEventListener('load',programa)

async function programa(){

	let armazenamento = await browser.storage.local.get()

	CONFIGURACAO = armazenamento
	EXTENSAO.ativada = CONFIGURACAO.ativada

	definicoesGlobais()
	criarCabecalhoDePaginaDaExtensao()
	definirEstadoDaExtensao()
	criarRodapeDePaginaDaExtensao()

	INFORMACOES = await obterInformacoes()


	listarPerfis()
	await criarOrgaos()
	console.info('INFORMACOES:',INFORMACOES)


}

async function obterInformacoes(){
	let informacoes = {}
	informacoes.perfis = await pjeApiObterPerfis()
	return informacoes
}

async function listarPerfis(){
	let secao = selecionar('section')
	INFORMACOES.perfis.forEach(
		perfil => {
			let id = perfil.idOrgaoJulgador
			let nome = perfil.orgaoJulgador.trim()
			criarBotao('perfil-'+id,'',secao,nome,'',()=>abrirPaginaConfiguracaoJuizo(id,nome))
		}
	)
}

async function criarOrgaos(){
//	console.debug('CONFIGURACAO:',CONFIGURACAO)
	let perfis = INFORMACOES.perfis || {}
	let juizosPorOrgao = CONFIGURACAO?.juizosPorOrgao || {}

	//console.debug('juizosPorOrgao',juizosPorOrgao)
	
	for(let [indice,perfil] of perfis.entries()){
		let orgao = 'orgao' + perfil.idOrgaoJulgador
		console.debug('orgao',orgao)
		
		let chave = CONFIGURACAO?.juizosPorOrgao[orgao] || ''
		console.debug('chave',chave)

		if(!chave) juizosPorOrgao[orgao] = []
		
	}

	await browser.storage.local.set({juizosPorOrgao})

	console.debug('juizosPorOrgao',juizosPorOrgao)

}