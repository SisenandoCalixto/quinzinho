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
	console.info('INFORMACOES:',INFORMACOES)


}

async function obterInformacoes(){
	let informacoes = {}
	informacoes.perfis = await pjeApiObterPerfis()
	return informacoes
}

function listarPerfis(){
	let secao = selecionar('section')
	INFORMACOES.perfis.forEach(
		perfil => {
			console.debug('perfil',perfil)
			let id = perfil.idOrgaoJulgador
			let nome = perfil.orgaoJulgador.trim()
			criarBotao('perfil-'+id,'',secao,nome,'',()=>abrirPaginaConfiguracaoJuizo(id,nome))
		}
	)
}