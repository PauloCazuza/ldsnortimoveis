import React, {useState, Component,  useEffect} from 'react';
import './home.css';
import { PulseLoader as Spinner } from 'react-spinners';

import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar';
import Carrousel from '../../components/carrousel';

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
		}

		this.receberDoBD();
		console.log(props.match);
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
			
			console.log("ok deu certo");
			this.setState({listaImoveis: listaImoveis, carregando: false});
			console.log(resultado.docs)
		}).catch(erro => {
			alert('Problema de Conexão');
			console.log(erro)
		})
	}

	render() {
		
		return (
			<>
			<Navbar />
				

			<div className="container p-3">
				{/* <input type="text" onChange={ (e) => this.setState({pesquisa: e.target.value})} className="form-control text-center" placeholder="pesquisar pela cidade" /> */}
			</div>
			
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
            <Carrousel imovel={this.state.listaImoveis} />
            
						{this.state.listaImoveis.map( (item, index) => (
							<>
							<ImovelCard id={item.id} key={index} img={item.foto} titulo={item.imovel} detalhes={item.rua} visualizacoes={'1'}/>
							</>
						))} 
          </>
					}
				
				</div>
			</div>
		</>
		);
	}
}