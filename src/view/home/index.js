import React, {Component} from 'react';
import './home.css';
import { PulseLoader as Spinner } from 'react-spinners';

import Navbar from '../../components/navbar';
import Search from '../../components/search';
import Footer from '../../components/footer';
import Carrousel from '../../components/carrousel';

import icone_search from './images/search.svg'
import icone_home from './images/home.svg'
import icone_hammer from './images/hammer.svg'

import ImovelCard from '../../components/imovel-card';

import firebase from '../../config/firebase';

const db = firebase.firestore().collection('imoveis');

export default class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			listaImoveis: [],
			carregando: true,
			pesquisa: '',
			search: '',
			filtro1: 'Comprar',
			filtro2: 'Casa',
		}

		this.receberDoBD();
		this.handleChange = this.handleChange.bind(this);
		// console.log(props.match.params);
	}

	receberDoBD() {

		db.get().then( async (resultado) => {
			let listaImoveis = [];
			await resultado.docs.forEach(doc => {
					listaImoveis.push({
						id: doc.id,
						...doc.data()
					})
			})
			
			// console.log("ok deu certo");
			this.setState({listaImoveis: listaImoveis, carregando: false});
			// console.log(resultado.docs)
		}).catch(erro => {
			alert('Problema de Conexão');
			console.log(erro)
		})
	}

	handleChange(event) {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		})
	}

	render() {


		
		return (
			<>
			<Navbar />
      		<Search handleChange={this.handleChange} filters={`${this.state.filtro1},${this.state.filtro2},${this.state.search},`}/>	
			
			<div className="container">

				<div className="row p-2">
					
					{this.state.carregando 
					? 
					<div className="mx-auto">
						<Spinner
							sizeUnit={"px"}
							size={15}
							color={'#4d6d6d'}
						/>
					</div>
					:  
          <>
            <Carrousel imovel={this.state.listaImoveis.slice(0,5)} />
            <legend style={{ color: 'black', marginTop: '25px' }} >Imóveis em Destaque</legend>
						{this.state.listaImoveis.slice(0,8).map( (item, index) => {
							return(
							<>
							<ImovelCard id={item.id} key={index} img={item.foto} titulo={item.imovel} detalhes={item.rua} visualizacoes={'1'}/>
							</>
						)})} 
          </>
					}
				
				</div>
			</div>

			{this.state.carregando ? null:
			<div className="container-fluid p-4 banner">
				<div className="row flex-sm-row">
				<div className="col-sm d-flex">
					
					<div className="d-flex flex-column justify-content-center align-items-center text-center">
					<div className="logo-info">
						<img src={icone_search} alt="home"/>
					</div><br/>
					<h4>As melhores oportunidades:</h4>
					<p>Iremos selecionar alguns imóveis que você pode gostar e considerar a visita com um dos corretores</p>
					</div>

				</div>
				<div className="col-sm d-flex">
					
					<div className="d-flex flex-column justify-content-center align-items-center text-center">
					<div className="logo-info">
						<img src={icone_home} alt="home"/>
					</div><br/>
					<h4>Vamos acompanhar você:</h4>
					<p>Nossos corretores são especialmente treinados para oferecer a você a melhor consultoria na escolha do seu imóvel</p>
					</div>

				</div>
				<div className="col-sm d-flex">
					
					<div className="d-flex flex-column justify-content-center align-items-center text-center">
					<div className="logo-info">
						<img src={icone_hammer} alt="home"/>
					</div><br/>
					<h4>Buscaremos a melhor condição:</h4>
					<p>Nossa equipe irá buscar a melhor condição de fechamento, oferecendo inclusive suporte a financiamento com os principais bancos</p>
					</div>
				</div>
			</div>
      </div>
			}
      <Footer/>
	</>
		);
	}
}