import React, {useState} from 'react';
import './login.css';

import {Link, Redirect} from 'react-router-dom';

import { ClipLoader as Spinner } from 'react-spinners';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

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
  
  function submitForm (e) {
    e.preventDefault()
    logar()
  }

	return (
		<>
			<Navbar/>

			{	useSelector(state => state.usuarioLogado) > 0 ? <Redirect to="/" /> : null }

			<div className="container mb-5">
				<div className="row">
					<div className="login-content d-flex col-md h-auto">
						<form className="form-signin mx-auto" style={{width:'100%'}} onSubmit={submitForm}>
						  <div className="text-center mb-4">
						    <h1 className="h3 mb-3 font-weight-normal">Faça login</h1>

							<input onChange={ (e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2 input" placeholder="Seu email"/>
              <input onChange={ (e) => setSenha(e.target.value)} 
              //onKeyPress={ e => e.key === 'Enter' ? logar() : null} 
              type="password" id="inputPassword" className="form-control my-2 input" placeholder="Senha" required/>
              <span className="link">
                <Link className="mb-3 text-muted" to="recuperarsenha">Recuperar Senha</Link>
              </span>

							{
								carregando
								?
									<center>
										<Spinner
											size={30}
											className=""
											sizeUnit={"px"}
											color={'#123abc'}
										/>
									</center>
								:
									<button type="submit" className="btn btn-block btn-login">ACESSAR CONTA</button>
							}
							
							  </div>
					      
					    </form>
					</div>
          
          <div className="col-md-1 div-hr d-none d-md-flex"> <hr/> </div>    

					<div className="login-content d-flex col-md h-auto mb-3">
						<form className="form-signin mx-auto" style={{width:'100%'}}>
						  <div className="text-center mb-4">
						    <h1 className="h3 mb-3 font-weight-normal">Crie sua Conta</h1>

							  <input type="email" id="inputCriarEmail" className="form-control my-2 input" placeholder="Seu email"/>
							      
							  <Link to="novousuario" mail={email} className="link"> <button type="button" className="btn btn-block btn-login">PROSSEGUIR</button> </Link>
					      </div>
					      
					    </form>
					</div>
				</div>
			</div>
      <Footer/>
		</>
	)
}

export default Login;