import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { store, persistor } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css'

/* PAGINAS */

import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import Home from './view/home';
import RecuperarSenha from './view/usuario-recuperar-senha';
import CadastrarImovel from './view/cadastrar-imovel';
import DetalhesImovel from './view/detalhes-imovel';
import PaginaPesquisa from './view/pagina-pesquisa';
import Favoritos from './view/favoritos';
import Administrador from './view/administrador';
import ValidarImovel from './view/validar-imovel';
import InteressesSolicitados from './view/interesses-solicitados';
import SolicitacoesDoImovel from './view/solicitacoes-do-Imovel';
import GerenciarCorretor from './view/gerenciar-corretor';

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Router>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/novousuario" component={NovoUsuario} />
					<Route exact path="/recuperarsenha" component={RecuperarSenha} />
					<Route exact path="/cadastrarimovel" component={CadastrarImovel} />
					<Route exact path="/favoritos" component={Favoritos} />
					<Route exact path="/validarimovel" component={ValidarImovel} />
					<Route exact path="/administrador" component={Administrador} /> 
					<Route exact path="/interessessolicitados" component={InteressesSolicitados} />
					<Route exact path="/gerenciarcorretor" component={GerenciarCorretor} />
					<Route exact path="/paginaPesquisa/:filters" component={PaginaPesquisa} />
					<Route path="/detalhesimovel/:id" component={DetalhesImovel} />
					<Route path="/solicitacoesdoimovel/:id" component={SolicitacoesDoImovel} />
				</Router>
			</PersistGate>
		</Provider>
	);
}

export default App;