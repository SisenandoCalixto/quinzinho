window.addEventListener('load',criarMenuDaBarraDeFerramentasDoNavegador)

async function criarMenuDaBarraDeFerramentasDoNavegador(){

	let armazenamento = await browser.storage.local.get()
	let secao = '' 

	CONFIGURACAO = armazenamento
	EXTENSAO.ativada = CONFIGURACAO.ativada

	if(!CONFIGURACAO?.usuario?.email) abrirPaginaConfiguracaoDoTribunal()

	definicoesGlobais()

	console.debug('CONFIGURACAO: ',CONFIGURACAO)

	criarCabecalhoDePaginaDaExtensao()
	definirEstadoDaExtensao()
	criarRodapeDePaginaDaExtensao()
	criarLinksUteis()

	obterConfiguracoesDaExtensao()

	async function criarLinksUteis(){

		secao = selecionar('#links-uteis')

		criarBotaoDoMenu(
			'trt',
			TRIBUNAL.nome,
			() => criarJanela(LINK.tribunal.portal)
		)
		criarBotaoDoMenu(
			'wikivt',
			'WikiVT',
			() => criarJanela(LINK.wikivt)
		)
		criarBotaoDoMenu(
			'cnc',
			'Consolidação das Normas da Corregedoria',
			() => criarJanela(LINK.tribunal.cnc)
		)
		criarBotaoDoMenu(
			'egestao',
			'E-Gestão',
			() => criarJanela(LINK.egestao)
		)
		criarBotaoDoMenu(
			'mail',
			'E-Mail Institucional',
			() => criarJanela(LINK.google.mail)
		)
		criarBotaoDoMenu(
			'exe15',
			'Exe15',
			() => criarJanela(LINK.tribunal.exe15)
		)
		criarBotaoDoMenu(
			'correios',
			'E-Carta',
			() => criarJanela(LINK.eCarta.raiz)
		)
		criarBotaoDoMenu(
			'designacoes',
			'Designações de Magistrados',
			() => criarJanela(LINK.tribunal.designacoes)
		)
		criarBotaoDoMenu(
			'proad',
			'Processo Administrativo Eletrônico',
			() => criarJanela(LINK.tribunal.proad),
			'PROAD'
		)
		criarBotaoDoMenu(
			'pje-calc',
			'PJeCalc',
			() => criarJanela(LINK.pje.calc)
		)
		criarBotaoDoMenu(
			'intranet',
			'Intranet',
			() => criarJanela(LINK.pje.intranet)
		)

		secao = selecionar('#pje')

		criarBotaoDoMenu(
			'pje-instancia-1',
			'PJe - Painel -  1º Grau',
			() => criarJanela(LINK.pje.raiz)
		)
		criarBotaoDoMenu(
			'pje-instancia-2',
			'PJe - Painel - 2º Grau',
			() => criarJanela(LINK.pje.segundograu)
		)
		criarBotaoDoMenu(
			'pje1',
			'PJe - Versão 1.x - Painel',
			() => criarJanela(LINK.pje.legado.painel)
		)
		criarBotaoDoMenu(
			'pje-painel-global',
			'PJe - Painel Global',
			() => criarJanela(LINK.pje.painel.global)
		)
		criarBotaoDoMenu(
			'gigs',
			'PJe - Painel - Relatórios GIGS',
			() => criarJanela(LINK.pje.painel.gigs)
		)
		criarBotaoDoMenu(
			'audiencias',
			'PJe - Painel - Audiências',
			() => criarJanela(LINK.pje.painel.audiencias)
		)
		criarBotaoDoMenu(
			'pericias',
			'PJe - Painel - Perícias',
			() => criarJanela(LINK.pje.painel.pericias)
		)
		criarBotaoDoMenu(
			'pje-modelos-de-documentos',
			'PJe - Painel - Modelos de Documentos',
			() => criarJanela(LINK.pje.modelos)
		)
		criarBotaoDoMenu(
			'pje-consulta-processos',
			'PJe - Painel - Consultar Processos',
			() => criarJanela(LINK.pje.consulta.processos)
		)
		criarBotaoDoMenu(
			'pje-consulta-pessoa',
			'PJe - Painel - Consutar Pessoa',
			() => criarJanela(LINK.pje.consulta.pessoa)
		)
		criarBotaoDoMenu(
			'pje-consulta-advogado',
			'PJe - Painel - Consutar Advogado(a)',
			() => criarJanela(LINK.pje.consulta.advogado)
		)

		secao = selecionar('#definicoes')
		
		criarBotaoDoMenu(
			'configuracao-magistrado',
			'Configurações de Juízo',
			abrirPaginaConfiguracoesJuizo
		)



		function criarBotaoDoMenu(
			id = '',
			titulo = '',
			acao = '',
			texto = ''
		){
			let botao = criar('botao',id,'link legenda',secao)
			if(id){
				botao.id = id
				botao.classList.add(id)
			}
			botao.addEventListener('contextmenu',elemento => elemento.preventDefault())
			if(acao) botao.addEventListener('click',acao)
			if(titulo) botao.setAttribute('aria-label',titulo)
			if(texto) botao.innerText = texto
		}

	}


}