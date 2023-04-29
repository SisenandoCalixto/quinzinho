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
	console.info('VARAS:',VARAS)


}

async function obterInformacoes(){
	let informacoes = {}
	informacoes.perfis = await pjeApiObterPerfis() || []
	informacoes.perfis.forEach(
		perfil => {
			let nome = limparEspacamentos(perfil.orgaoJulgador)
			let codigo = VARAS.filter(vara => vara.descricao.includes(nome)) || ''
			let vara = codigo[0]?.unidade || ''
			perfil.nome = nome
			perfil.vara = vara
		}
	)
	return informacoes
}

async function listarPerfis(){
	let secao = selecionar('section')

	console.debug('INFORMACOES.perfis',INFORMACOES.perfis)
	
	INFORMACOES.perfis.forEach(
		perfil => {
			let nome = perfil?.nome || ''
			let vara = perfil?.vara || ''
			console.debug('vara',vara)
			
			if(!vara) return
			console.debug('vara',vara)
			criarBotao('perfil-'+vara,'',secao,nome+' ('+vara+')','',()=>abrirPaginaConfiguracaoJuizo(vara,nome))
		}
	)
}

async function criarOrgaos(){
	let perfis = INFORMACOES.perfis || {}
	let juizosPorOrgao = CONFIGURACAO?.juizosPorOrgao || {}

	for(let [indice,perfil] of perfis.entries()){
		if(!perfil?.vara) continue
		let orgao = 'orgao' + perfil.vara
		let chave = CONFIGURACAO?.juizosPorOrgao[orgao] || ''
		if(!chave) juizosPorOrgao[orgao] = []
	}

	await browser.storage.local.set({juizosPorOrgao})

	console.debug('juizosPorOrgao',juizosPorOrgao)

}