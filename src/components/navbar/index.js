import React, {useState} from 'react';
import './navbar.css';

import {Link} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

// import Search from '../search'

function NavBar() {

	
	const dispatch = useDispatch();
	const logado = useSelector(state => state.usuarioLogado)
  // const urlLogo = 'https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Flogo.svg?alt=media&token=ddf9c7d9-53ec-4593-9140-be6e8fa61950'
  const urlLogo = 'https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Flogo-moderna.svg?alt=media&token=4e067975-927c-4824-9f76-62d12d9ed81b'

	return (
		<nav className="navbar navbar-expand-lg">
		  <Link className="navbar-brand logo" to=""> <img src={urlLogo}></img> </Link>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-a="Alterna navegação">
			    <i className="fas fa-bars"></i>
			  </button>
		  <div className="collapse navbar-collapse" id="navbarNav">
		    <ul className="navbar-nav">
		      <li className="nav-item active">
		        <Link className="nav-link" to={logado === 0 ? "login" : "cadastrarimovel"}>Venda seu Imóvel</Link>
		      </li>
		      <li className="nav-item">
		        <Link className="nav-link" to={logado === 0 ? "login" : "cadastrarimovel"}> <i class="fas fa-heart" /> Seus Favoritos </Link>
		      </li>
		      
		      {
		      	useSelector(state => state.usuarioLogado === 0 

		      		? 
				      <>
					      <li className="nav-item">
					        <Link className="nav-link" to="login">Login</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="novousuario">Cadastre-se</Link>
					      </li>
				      </>
		      		:
		      		  <>
					      <li className="nav-item">
					        <Link className="nav-link" to="login">Editar Perfil</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" onClick={() => dispatch({type: "LOG_OUT"})}>Sair</Link>
					      </li>
				      </>
		      		)
		      }

		    </ul>
		  </div>
		</nav>

	);
}

export default NavBar;