import React, {useState} from 'react';
import './login.css';

import {Link, Redirect} from 'react-router-dom';

import { BounceLoader as Spinner } from 'react-spinners';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar';


function Login() {

	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [carregando, setCarregando] = useState(false);

	const dispatch = useDispatch();

	function logar() {

		if (email === "")
			return alert('Preencha o email');
		
		if (senha === "")
			return alert('Preencha a senha');

		setCarregando(true);
		firebase.auth().signInWithEmailAndPassword(email, senha).then( resultado => {
			//alert('LOGIN FEITO!');
			
			dispatch({ type: 'LOG_IN', usuarioEmail: email});
			setCarregando(false);

		}).catch( erro => {
			alert('DEU ERRO')
			setCarregando(false)
		})
	}

	return (
		<div>
			<Navbar/>

			{	useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/" /> : null
			}

			<div className="container">
				<div className="row">
					<div className="login-content d-flex col-sm">
						<form className="form-signin mx-auto" style={{width:'100%'}}>
						  <div className="text-center mb-4">
						    <h1 className="h3 mb-3 font-weight-normal">Faça login</h1>

							<input onChange={ (e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Seu email"/>
							<input onChange={ (e) => setSenha(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" required/>
							
							{
								carregando
								?
									<center>
										<Spinner
											className=""
											sizeUnit={"px"}
											size={30}
											color={'#123abc'}
										/>
									</center>
								:
									<button type="button" onClick={logar} className="btn btn-lg btn-block btn-login">Login</button>
							}
							
							  <Link className="mt-5 mb-3 text-muted" to="recuperarsenha">Recuperar Senha</Link>
					      </div>
					      
					    </form>
					</div>

					<div className="login-content d-flex col-sm">
						<form className="form-signin mx-auto" style={{width:'100%'}}>
						  <div className="text-center mb-4">
						      <h1 className="h3 mb-3 font-weight-normal">Crie sua Conta</h1>

							  <input type="email" id="inputCriarEmail" className="form-control my-2" placeholder="Seu email"/>
							      
							  <Link to="novousuario" mail={email} > <button type="button" className="btn btn-lg btn-block btn-login" >Criar Conta</button> </Link>
					      </div>
					      
					    </form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;