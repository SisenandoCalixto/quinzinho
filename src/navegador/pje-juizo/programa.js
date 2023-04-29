window.addEventListener('load',magistrados)

async function magistrados(){

	let armazenamento = await browser.storage.local.get()

	CONFIGURACAO = armazenamento

	let configuracoes = document.querySelectorAll('.configuracao')
	let vara = obterUrlParametro('vara')
	let nome = obterUrlParametro('nome') + ' (' + vara + ')'
	let orgao = 'orgao' + vara

	definicoesGlobais()
	criarCabecalhoDePaginaDaExtensao()
	criarRodapeDePaginaDaExtensao()
	

	obterConfiguracoes()
	identificar()

	selecionar('#salvar').addEventListener(
		'click',
		evento => {
			evento.preventDefault()
			salvarConfiguracoes()
		}
	)

	function identificar(){
		let subtitulo = selecionar('h3')
		subtitulo.innerText = nome
	}

	function obterConfiguracoes(){

		let orgaos = CONFIGURACAO?.juizosPorOrgao || []
		let juizosPorOrgao = orgaos[orgao] || []
		console.debug('juizosPorOrgao',juizosPorOrgao)

		configuracoes.forEach(
			(
				configuracao,
				indice
			) => {
				let chave = juizosPorOrgao[indice]
				configuracao.value = chave || ''
				configuracao.addEventListener('click',selecionarConteudo)
			}
		)

	}

	async function salvarConfiguracoes(){

		let juizos = []
		let juizosPorOrgao = CONFIGURACAO?.juizosPorOrgao || {}

		configuracoes.forEach(

			configuracao => {

				let juizo = configuracao.value || ''
				let nome = juizo.trim()

				juizos.push(nome)

			}

		)

		juizosPorOrgao[orgao] = juizos

		console.debug('juizosPorOrgao',juizosPorOrgao)

		await browser.storage.local.set({juizosPorOrgao})

		setTimeout(fechar,500)

	}

}