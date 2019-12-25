import React, {useState} from 'react';
import './navbar.css';

import {Link} from 'react-router-dom';

import firebase from '../../config/firebase';

import { connect } from 'react-redux';

import { useSelector, useDispatch } from 'react-redux';


const db = firebase.firestore().collection('usuarios');

// import Search from '../search'

class NavBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			logado: this.props.usuarioLogado,
			avatar: null,
			usuario: null,
			estadoAvatar: "",
			urlLogo:"https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Flogo-moderna.svg?alt=media&token=4e067975-927c-4824-9f76-62d12d9ed81b",
		}

		this.receberUsario();
	}

	async receberUsario() {
		const email = this.props.usuarioEmail;
		const foto = this.props.usuarioFoto;

		if (email === "") {
			console.log('okok entrou')
			return 'errado';
		} else {
			console.log(this.state.avatar)
			console.log("saiu")
		}
		
		if (foto !== null)
			return console.log("Já tem Foto")
		
		db.where('email', '==', email).get().then(async resultado => {
				// console.log(resultado.docs[0].data())
				// await this.setState({usuario: resultado.docs[0].data()})
				if (resultado.docs[0] !== undefined)
					firebase.storage().ref(`imagensUsuarios/${resultado.docs[0].data().foto}`).getDownloadURL().then( url => {
						this.props.SetFotoENome({email: email, foto: url, nome: resultado.docs[0].data().nome});
					})	
		})	

		return 'aaaaa'
	}

	render() {
		const {usuario, urlLogo, estadoAvatar, avatar} = this.state;
		
		const logado = this.props.usuarioLogado;

		return (
			<nav className="navbar navbar-expand-lg">
			  <Link className="navbar-brand logo" to="/"> <img src={urlLogo}></img> </Link>
				  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
					<i className="fas fa-bars"></i>
				  </button>
			  <div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
				  <li className="nav-item active">
					<Link className="nav-link" to={logado === 0 ? "/login" : "/cadastrarimovel"}>Venda seu Imóvel</Link>
				  </li>
				  <li className="nav-item">
					<Link className="nav-link" to={logado === 0 ? "/login" : "/cadastrarimovel"}> <i className="fas fa-heart" /> Seus Favoritos </Link>
				  </li>			  
				  
				  {
					  logado === 0 
		
						  ? 
						  <>
							  <li className="nav-item">
								<Link className="nav-link" to="/login">Login</Link>
							  </li>
							  <li className="nav-item">
								<Link className="nav-link" to="/novousuario">Cadastre-se</Link>
							  </li>
						  </>
						  :
							<>
							  <li className="nav-item">
								<Link className="nav-link" to="/login">Editar Perfil</Link>
							  </li>
							  <li className="nav-item">
								<Link className="nav-link" to="/" onClick={() => this.props.Lougout()}>Sair</Link>
							  </li>
						  </>
						  
				  }
				</ul>
				{
					logado === 0 ? null :
						<ul className="navbar-nav ml-auto">
							<li className="nav-item mx-2">
								{(this.props.usuarioFoto === null) ? null : 
								<>
									<label className="mx-3">
										{this.props.usuarioNome}
									</label>
									<img className="avatar" src={this.props.usuarioFoto} alt="Imagem de Perfil"/>
								</>
								}
							</li>
						</ul>
				}
			  </div>
			</nav>
		
		);
	}

}

const mapStateToProps = state => {
    const {usuarioLogado, usuarioEmail, usuarioFoto, usuarioNome} = state;

	return { usuarioLogado: usuarioLogado, usuarioEmail: usuarioEmail, 
			 usuarioFoto: usuarioFoto, usuarioNome: usuarioNome }
}

const mapDispatchToEvents = (dispatch) => {
	return {
	  Lougout: () => {
		dispatch({type: 'LOG_OUT'});
	  },
	  SetFotoENome: ({email, foto, nome}) => {
		dispatch({type: 'SET_NOME', usuarioEmail: email, usuarioFoto: foto, usuarioNome: nome});
	  },
	  
	};
  };

export default connect( mapStateToProps,  mapDispatchToEvents)(NavBar);