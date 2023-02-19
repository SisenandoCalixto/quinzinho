/**
 * pje/pje.js
 * pje/api.js
 * pje/painel-global.js
 */

async function pje(){

	if(!JANELA.includes(LINK.pje.raiz)) return

	INFORMACOES = await obterInformacoes()

	console.info('INFORMACOES:',INFORMACOES)

	async function obterInformacoes(){
		let informacoes = {}
		informacoes.perfil = await pjeApiObterPerfil()
		informacoes.idOrgaoJulgador = informacoes?.perfil?.idOrgaoJulgador || ''
		return informacoes
	}

}


function obterDadosDoNumeroDoProcesso(numero){

	if(!numero) return ''

	let processo = {}
	processo.numeros = numeros(numero)

	if(numero.length === 25){
		let campos = numero.replace(/\D/g,'.').split('.')
		processo.ordenador = campos[0]
		processo.digito = campos[1]
		processo.ano = campos[2]
		processo.jurisdicao = campos[3]
		processo.tribunal = campos[4]
		processo.origem = campos[5]
	}

	if(processo.ordenador){
		if(Number(processo.ano) <= 2009) processo.ordenador = processo.ordenador.substring(4,5)
		processo.final = processo.ordenador.substr(-1)
		let	paridade = Number(processo.ordenador) % 2
		if(paridade === 1) processo.paridade = 'ímpar'
		if(paridade === 0)processo.paridade = 'par'
	}

	return processo

}


