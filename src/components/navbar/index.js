import React, { useState } from 'react';
import './navbar.css';

import { Link } from 'react-router-dom';

import firebase from '../../config/firebase';

import { connect } from 'react-redux';

const db = firebase.firestore().collection('usuarios');

// import Search from '../search'
const avatarDefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XcdwpbHbau9Mqfcr9A1npUDVUQcxUXLc7srlXUkwKQeVZzRAag&s"

class NavBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			logado: this.props.usuarioLogado,
			avatar: null,
			usuario: null,
			estadoAvatar: "",
			urlLogo: "https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Flogo-moderna.svg?alt=media&token=4e067975-927c-4824-9f76-62d12d9ed81b",
		}

		this.receberUsario();
	}

	async receberUsario() {
		const email = this.props.usuarioEmail;
		const foto = this.props.usuarioFoto;
		const editado = this.props.editado;

		if (email === "") {
			console.log('okok entrou')
			return 'errado';
		} else {
			console.log(this.state.avatar)
			console.log("saiu")
		}

		if (foto !== null && editado === false)
			return console.log("Já tem Foto")


		db.where('email', '==', email).get().then(async resultado => {
			// console.log(resultado.docs[0].data())
			if (resultado.docs[0] !== undefined)
				// await this.setState({usuario: resultado.docs[0].data()})
				firebase.storage().ref(`imagensUsuarios/${resultado.docs[0].data().foto}`).getDownloadURL().then(url => {
					this.props.SetFotoENome({ email: email, pessoa: resultado.docs[0].data().tipoDePessoa, foto: url, nome: resultado.docs[0].data().nome, usuario: { id: resultado.docs[0].id, foto: url, ...resultado.docs[0].data() } });
				}).catch(erro => {
					this.props.SetFotoENome({ email: email, pessoa: resultado.docs[0].data().tipoDePessoa, foto: avatarDefault, nome: resultado.docs[0].data().nome, usuario: { id: resultado.docs[0].id, foto: avatarDefault, ...resultado.docs[0].data() } });
				})
		})

		return 'aaaaa'
	}

	render() {
		const { usuario, urlLogo, estadoAvatar, avatar } = this.state;

		const logado = this.props.usuarioLogado;

		return (
			<nav className="navbar navbar-expand-lg px-4">
				<Link className="navbar-brand logo" to="/"> <img src={urlLogo}></img> </Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
					<i className="fas fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse d-lg-flex justify-content-end" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<Link className="nav-link btn-nav link-hover" to={logado === 0 ? "/login" : "/cadastrarimovel"}>Anunciar imóveis</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link btn-nav link-hover" to={logado === 0 ? "/login" : "/favoritos"}>Favoritos</Link>
						</li>

						{
							logado === 0

								?
								<>
									<li className="nav-item">
										<Link className="nav-link btn btn-nav link-hover" to="/login"><strong>Entrar</strong></Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link btn btn-info btn-nav" to="/novousuario"><strong>Cadastre-se</strong></Link>
									</li>
								</>
								:
								<>
									<li className="nav-item">
										<Link className="nav-link btn-nav link-hover" to={{
											pathname: "/novousuario",
											// state: { usuario: this.props.usuario }
										}}>Editar Perfil</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link btn-nav link-hover" to="/" onClick={() => this.props.Lougout()}>Sair</Link>
									</li>
								</>

						}
					</ul>
					{
						logado === 0 ? null :
							<ul className="navbar-nav ml-auto">
								<li className="nav-item">
									{(this.props.usuarioFoto === null) ? null :
										<>
											<label className="mx-3">
												Olá, {this.props.usuarioNome.toUpperCase()}!
											</label>
											<img className="avatar" src={this.props.usuarioFoto} alt="Imagem de Perfil" />
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
	const { usuarioLogado, usuarioEmail, usuarioFoto, usuarioNome, usuario, editado } = state;

	return {
		usuarioLogado: usuarioLogado, usuarioEmail: usuarioEmail,
		usuarioFoto: usuarioFoto, usuarioNome: usuarioNome, usuario: usuario, editado: editado
	}
}

const mapDispatchToEvents = (dispatch) => {
	return {
		Lougout: () => {
			dispatch({ type: 'LOG_OUT' });
		},
		SetFotoENome: ({ email, foto, nome, usuario, pessoa }) => {
			dispatch({ type: 'SET_NOME', usuarioEmail: email, usuarioFoto: foto, usuarioNome: nome, usuario: usuario, pessoa: pessoa });
		},

	};
};

export default connect(mapStateToProps, mapDispatchToEvents)(NavBar);