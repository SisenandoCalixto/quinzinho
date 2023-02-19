window.addEventListener('load',configuracoes)

async function configuracoes(){

	let armazenamento = await browser.storage.local.get()

	CONFIGURACAO = armazenamento

	let instalacao = obterUrlParametro('instalacao')

	definicoesGlobais()
	criarCabecalhoDePaginaDaExtensao()
	criarRodapeDePaginaDaExtensao()
	obterConfiguracoesDaExtensao()

	selecionar('#salvar').addEventListener(
		'click',
		evento => {
			evento.preventDefault()
			salvarConfiguracoesDaExtensao()
			if(instalacao)
				setTimeout(
					() => {
						abrirPaginaTermosDeUso()
						fechar()
					},
					500
				)
		}
	)

}