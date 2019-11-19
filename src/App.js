import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

/* PAGINAS */

import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import Home from './view/home';
import RecuperarSenha from './view/usuario-recuperar-senha';
import CadastrarImovel from './view/cadastrar-imovel';
import DetalhesImovel from './view/detalhes-imovel';
import PaginaPesquisa from './view/pagina-pesquisa';

function App() {
  return (
    <Provider store={store}>
    	<Router>
    		<Route exact path="/" component={Home} />
    		<Route exact path="/login" component={Login} />
    		<Route exact path="/novousuario" component={NovoUsuario} />
			<Route exact path="/recuperarsenha" component={RecuperarSenha} />
			<Route exact path="/cadastrarimovel" component={CadastrarImovel} />
			<Route exact path="/paginaPesquisa/:filters" component={PaginaPesquisa} />
			<Route path="/detalhesimovel/:id" component={DetalhesImovel} />
    	</Router>
    </Provider>
  );
}

export default App;
