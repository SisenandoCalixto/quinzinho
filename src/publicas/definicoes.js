/**
 * VARIÁVEIS GLOBAIS, DISPONÍVEIS PARA TODAS AS FUNÇÕES:
 */


var
	CONFIGURACAO = {},
	DATA = definirDatas(),
	EXPRESSAO = definirExpressoesRegulares(),
	EXTENSAO = browser.runtime.getManifest(),
	INFORMACOES = {},
	JANELA = window.location.href || '',
	LINK = {},
	MODO = definirModo(),
	PROCESSO = {},
	TAREFA = {},
	TEXTO = definirTextos(),
	TRIBUNAL = definirTRT()


function definirTRT(){
	let tribunal = {}
	tribunal.regiao = '15'
	tribunal.nome = 'Tribunal Regional do Trabalho da ' + tribunal.regiao + 'ª Região'
	return tribunal
}

async function definicoesGlobais(){

	definirChavesPrimariasDoArmazenamento()

	//	MODO.relatar = true
	LINK = definirLinks()

	relatar('CONFIGURACAO:',CONFIGURACAO) //CONTÉM TODO O STORAGE
	relatar('DATA:',DATA) //CONTÉM A DATA ATUAL
	relatar('EXTENSAO:',EXTENSAO) // CONTÉM TODAS AS VARIÁVEIS DO MANIFEST.JSON
	relatar('LINK:',LINK) //CONTÉM TODOS OS LINKS PADRÕES DA EXTENSÃO
	relatar('MODO:', MODO) //CONTÉM A CONFIGURAÇÃO PARA MUDANÇA DE MODO TESTE

	async function definirChavesPrimariasDoArmazenamento(){
		if(!CONFIGURACAO?.janela) await browser.storage.local.set({janela:{}})
		if(!CONFIGURACAO?.menuMovel) await browser.storage.local.set({menuMovel:{h:0,v:0}})
		if(!CONFIGURACAO?.usuario) await browser.storage.local.set({usuario:{}})
		if(!CONFIGURACAO?.juizosPorOrgao) await browser.storage.local.set({juizosPorOrgao:{}})
	}

}


function definirModo(){
	let modo = {}
	modo.relatar = false
	return modo
}


function definirDatas(){

	let agora = new Date()
	let data = {}
	data.agora = agora
	data.hoje = {}
	data.mesAnterior = {}

	data.hoje.curta = agora.toLocaleDateString()
	data.hoje.dia = agora.getDate()
	data.hoje.ano = agora.getFullYear()
	data.hoje.mes = Number(agora.getMonth()) + 1
	data.hoje.mais30dias = somarDias(agora,30)
	data.mesAnterior.primeiroDia = mesAnteriorPrimeiroDia(agora)
	data.mesAnterior.ultimoDia = mesAnteriorUltimoDia(agora)

	return data

	function somarDias(data,dias){
		let resultado = new Date(data)
		resultado.setDate(resultado.getDate() + dias)
		return resultado?.toLocaleDateString() || ''
	}

	function mesAnteriorPrimeiroDia(data=''){
		if(!data) data = new Date()
		let resultado = new Date(data)
		resultado.setDate(0)
		resultado.setDate(1)
		return resultado?.toLocaleDateString() || ''
	}

	function mesAnteriorUltimoDia(data=''){
		if(!data) data = new Date()
		let resultado = new Date(data)
		resultado.setDate(0)
		return resultado?.toLocaleDateString() || ''
	}

}


function definirExpressoesRegulares(){

	let expressao = {}

	expressao.bbContaJudicial = new RegExp(/\d{9,19}[-]0/g)
	expressao.chassi = new RegExp(/(?![IOQ])[A-Za-z0-9]{17}/g)
	expressao.cnpj = new RegExp(/\d{2}[.]\d{3}[.]\d{3}[/]\d{4}[-]\d{2}/g)
	expressao.cpf = new RegExp(/\d{3}[.]\d{3}[.]\d{3}[-]\d{2}/g)
	expressao.data = new RegExp(/\d{2}[/]\d{2}[/]\d{4}/g)
	expressao.hora = new RegExp(/\d{2}[:]\d{2}/g)
	expressao.correiosObjeto = new RegExp(/[A-Za-z]{2}\d{9}[A-Za-z]{2}/gi)
	expressao.email = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi)
	expressao.nomeCompleto = new RegExp(/\b\w+\b\s.*/g)
	expressao.pje = new RegExp(/pje[.].*?[.]jus[.]br/gi)
	expressao.prazo = new RegExp(/(prazo).*?(de).*?((dia|hora)(s))/gi)
	expressao.processoNumero = new RegExp(/\d{7}\D\d{2}\D\d{4}\D\d{1}\D\d{2}\D\d{4}/)
	expressao.processoNumeroParcial = new RegExp(/\d{1,7}\D\d{2}\D\d{4}/)
	expressao.processoNumeroSemSeparadores = new RegExp(/\d{20}/g)
	expressao.quebraDeLinha = new RegExp(/(\r\n|\n|\r)/gi)
	expressao.valorMonetario = new RegExp(/\d.*?[,]\d{2}/gi)

	return expressao

}


function definirLinks(){

	let link = {}

	link.egestao = 'https://novoegestao.tst.jus.br/'
	link.extensao = obterLinkExtensao()
	link.eCarta = obterLinkEcarta()
	link.github = 'https://github.com/SisenandoCalixto/quinzinho/'
	link.google = obterLinkGoogle()
	link.pje = obterLinkPje()
	link.tribunal = obterLinkTribunal()
	link.wikivt = 'https://fluxonacional.jt.jus.br/'

	return link

	function obterLinkExtensao(){
		let url = {}
		//url.lista = caminho('navegador/pje-lista/pagina.htm?lista=')
		return url
	}

	function obterLinkTribunal(){
		let url = {}
		url.dominio = obterDominioTribunal()
		url.cnc = montarUrl(url,'','institucional/corregedoria/consolidacao-das-normas-da-corregedoria')
		url.designacoes = montarUrl(url,'satelites','designacoes/index.jsp?tipoConsulta=21')
		url.exe15 = montarUrl(url,'satelites','nucleo_execucao')
		url.intranet = montarUrl(url,'satelites','aplicacoesExtranet')
		url.portal = montarUrl(url)
		url.proad = montarUrl(url,'proad')
		url.raiz = montarUrl(url)
		return url
	}

	function obterLinkGoogle(){
		let usuario = CONFIGURACAO?.usuario?.email || '0'
		let url = {}
		url.dominio = 'google.com'
		url.raiz = montarUrl(url)
		url.agenda = montarUrl(url,'calendar')
		url.drive = montarUrl(url,'drive')
		url.mail = montarUrl(url,'mail')
		url.meet = montarUrl(url,'meet')
		url.documents = montarUrl(url,'docs','document')
		url.planilhas = montarUrl(url,'docs','spreadsheets')
		url.tradutor = montarUrl(url,'translate','?sl=en&tl=pt&text=')
		return url
	}

	function obterLinkEcarta(){
		let url = {}
		url.dominio = obterDominioTribunal()
		url.instalacao = 'eCarta-web'
		url.subdominio = 'ecarta'
		url.raiz = montarUrl(url,url.subdominio,url.instalacao)
		url.consultarProcesso = url.raiz + '/consultarProcesso.xhtml?codigo='
		return url
	}

	function montarUrl(
		url = '',
		subdominio = '',
		caminho = '',
		protocolo = 'https'
	){
		if(subdominio) subdominio = subdominio + '.'
		return encodeURI(protocolo + '://' + subdominio + '.' + url.dominio + '/' + caminho)
	}


	function obterLinkPje(){

		let url = {}
		url.api = {}
		url.consulta = {}
		url.painel = {}

		url.dominio = 'pje.' + obterDominioTribunal()
		url.raiz = 'https://' + url.dominio + '/'
		url.kz = url.raiz + 'pjekz/'
		url.calc = url.raiz + 'pjecalc'
		url.legado = {}
		url.primeirograu = url.raiz + 'primeirograu/'
		url.segundograu = url.raiz + 'segundograu/'
		url.legado.painel = url.primeirograu + 'Painel/painel_usuario/list.seam'
		url.consulta.advogado = url.primeirograu + 'PessoaAdvogado/ConfirmarCadastro/listView.seam'
		url.consulta.pessoa = url.primeirograu + 'ConsultaPessoa/listView.seam'
		url.consulta.instancia2 = url.raiz + 'consultaprocessual/detalhe-processo/'
		url.consulta.processos = url.raiz + 'administracao/consulta/processo/index?pagina=1&tamanhoPagina=50000'
		url.consulta.processosTodos = url.consulta.processos + '?pagina=1&tamanhoPagina=50000&'
		url.painel.audiencias = url.kz + 'pauta-audiencias'
		url.painel.gigs = url.kz + 'gigs/relatorios/atividades'
		url.painel.global = url.kz + 'painel/global/'
		url.painel.pericias = url.kz + 'painel/pauta-pericias?situacao=D&situacao=M&situacao=A&situacao=L&situacao=P&situacao=S'
		url.pauta = url.kz + 'pauta-audiencias'
		url.modelos = url.kz + 'configuracao/modelos-documentos'
		url.processo = url.kz + 'processo/'
		url.api.administracao = url.raiz + 'pje-administracao-api/api/'
		url.api.comum = url.raiz + 'pje-comum-api/api/'
		url.api.consulta = url.raiz + 'pje-consulta-api/api/'
		url.api.etiquetas = url.raiz + 'pje-etiquetas-api/api/processos/'
		url.api.mandados = url.raiz + 'pje-centralmandados-api/api/'
		url.api.seguranca = url.raiz + 'pje-seguranca/api/'
		url.api.sif = url.raiz + 'sif-financeiro-api/api/'
		url.api.gigs = url.raiz + 'pje-gigs-api/api/'

		return url

	}

}


function definirTextos(){
	let texto = {}
	texto.autentique = 'Autentique-se no PJe para poder executar esta funcionalidade.'
	texto.permissoes = 'Verifique se o sistema está online e se as permissões de acesso a URLs foram concedidas.'
	return texto
}


function obterDominioTribunal(){
	return 'trt' + TRIBUNAL.regiao + '.jus.br'
}


function googleApiPlanilhaChave(){

	return decodificar('065073122097083121068122090108069076085073107051120097050099108049101097067085056072052114079072104071083109099086111')

}