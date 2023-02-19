function criarRodapeDePaginaDaExtensao(){

	let rodape = selecionar('footer')
	if(!rodape)
		return

	criarEstilo()
	criarInformacoes()
	criarLinks()

	function criarEstilo(){

		estilizar(
			rodape,
			`
				footer{
					background:
						var(--extensao-gradiente-branco-preto),
						linear-gradient(0deg,rgba(var(--extensao-cor-preto),0.8) 0%,rgba(var(--extensao-cor-preto),0.8) 100%),
						rgba(var(--extensao-cor-primaria),1)
					;
					bottom:0;
					color:rgba(var(--extensao-cor-branco),0.9);
					font-size:12px;
					height:auto;
					overflow:hidden;
					padding:0;
					position:fixed;
					text-align:center;
					width:100%;
				}

				footer,
				footer nav
				{
					align-items:center;
					display:flex;
					flex-wrap:wrap;
					justify-content:space-between;
				}

				footer dl,
				footer nav
				{
					height:30px;
					line-height:30px;
					margin:0 10px;
				}

				footer dl
				{
					display:flex;
					gap:3px;
				}

				.icone{
					cursor:pointer;
					display:block;
					opacity:0.8;
					background-position:center center;
					background-repeat:no-repeat;
					position:relative;
					transition:all 0.1s;
				}

				.icone:hover
				{
					background-color:rgba(var(--extensao-cor-branco),1);
					height:26px;
					opacity:1;
					margin:2px;
					width:26px;
				}

				.icone,
				.icone:active
				{
					height:20px;
					margin:5px;
					width:20px;
				}

				.icone:hover::before{
					animation:aparecer 0.5s ease-out 0s 1 both;
					border-radius:15px 15px 0 0;
					box-shadow:0px 2px 2px 2px rgba(var(--extensao-cor-preto), 0.3);
					content:attr(aria-label);
					background-color:rgba(var(--extensao-cor-preto),0.9);
					color:rgba(var(--extensao-cor-branco),1);
					display:block;
					font-size:12px;
					font-weight:600;
					line-height:1rem;
					right:30px;
					padding:7px;
					position:absolute;
					text-align:center;
					width:300px;
				}

				#configuracoes{
					background:var(--extensao-icone-engrenagem);
				}
				#github{
					background:var(--extensao-icone-github);
				}
				#pagina{
					background:var(--extensao-icone-branco);
				}
				#pix{
					background:var(--extensao-icone-pix);
				}
				#roadmap{
					background:var(--extensao-icone-estrada);
				}
				#telegram{
					background:var(--extensao-icone-telegram);
				}
				#termos{
					background:var(--extensao-icone-termos) center center / 90% 90% no-repeat;
				}
				#whatsapp{
					background:var(--extensao-icone-whatsapp);
				}
				#youtube{
					background:var(--extensao-icone-youtube);
				}

			`
		)

	}


	function criarInformacoes(){

		criarListaDeDefinicoes(
			'',
			'',
			rodape,
			[
				{
					dt:"Versão:",
					dd:EXTENSAO.version+' '
				},
				{
					dt:"– Desenvolvido por",
					dd:EXTENSAO.author
				}
			]
		)

	}


	function criarLinks(){

		let rodapeLinks = criar('nav','','',rodape)

		criarLinkDoRodape('termos', '', 'Termos de Uso',abrirPaginaTermosDeUso)
		criarLinkDoRodape('configuracoes', '', 'Configurações da extensão', abrirPaginaOpcoesDaExtensao)

		function criarLinkDoRodape(
			id = '',
			endereco = '',
			titulo = '',
			aoClicar = ''
		){
			criarLink(id, 'icone', rodapeLinks, endereco, '', titulo, aoClicar)
		}

	}

}
