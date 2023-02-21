/**
 * pje/pje.js
 * pje/api.js
 * pje/painel-global.js
 */

async function pje(){

	console.info('JANELA:',JANELA)
	console.info('CONFIGURACAO:',CONFIGURACAO)

	if(!JANELA.includes(LINK.pje.raiz)) return

	let id = pjeObterProcessoId()
	PROCESSO = await new Processo(id)

	console.info('PROCESSO',PROCESSO)
	console.info('INFORMACOES:',INFORMACOES)

	pjeOtimizarConclusaoAMagistrado()

}


function pjeObterProcessoId(){
	let id = ''
	EXPRESSAO.processoId = new RegExp(/(processo.*?[/](audiencias|detalhe|documento|pericias|tarefa)|pjekz.gigs.abrir.gigs.*)/,'gi')
	let caminho = JANELA.match(EXPRESSAO.processoId) || ''
	if(!caminho) return id
	id = numeros(caminho.join()) || ''
	return id
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




async function pjeOtimizarConclusaoAMagistrado(){

	let selecao = await esperar('[placeholder="Magistrado"]',true)

	selecionarMagistradoPorFinadlDoProcesso()

	async function selecionarMagistradoPorFinadlDoProcesso(){

		await esperar('pje-concluso-tarefa-botao',true,true)

		let magistrado = CONFIGURACAO?.pjeMagistrados[PROCESSO.digitoFinal] || ''
		if(!magistrado)
			return

		if(selecao.textContent.includes(magistrado)){
			concluir()
			return
		}

		clicar('[placeholder="Magistrado"]')
		pjeSelecionarOpcaoPorTexto(magistrado).then(concluir)

	}
}


class Processo {
  constructor(id){
    return this.processo(id)
  }
  async processo(id){
    let processo = await pjeApiObterProcessoDadosPrimarios(id)
		Object.assign(processo,obterDadosDoNumeroDoProcesso(processo.numero))
    return processo 
  }
}
