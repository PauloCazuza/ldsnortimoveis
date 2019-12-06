import React, {useState} from 'react';
import './usuario-novo.css';

import firebase from '../../config/firebase';
import 'firebase/auth';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

function UsuarioNovo() {

	//IDENTIFICAR A PESSOA
	const [pessoa, setPessoa] = useState('fisica');

	//AMBOS USUARIOS
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	const [verSenha, setVerSennha] = useState();


	// PESSOA FÍSICA
	const [nome, setNome] = useState();
	const [sobrenome, setSobrenome] = useState();
	const [cpf, setcpf] = useState();
	const [dataDeNasc, setDataDeNasc] = useState();
	const [celular, setCelular] = useState();
	const [telefone, setTelefone] = useState();
	const [estado, setEstado] = useState();
	const [cidade, setCidade] = useState();

	// PESSOA JURIDICA
	
	

	return (
		<div>
			<Navbar />
			
			<div className="container py-5">
				<div className="container">
					<Tabs defaultActiveKey="fisica" id="tab-cad" onSelect={key => setPessoa(key)}>
						{/* FORMULARIO DA PESSOA FISICA  */ }
					  <Tab eventKey="fisica" title="Pessoa Física">

							<form className="form-signin mx-auto" style={{width:'100%'}}>
							  <div className="text-center mb-4">
							     <h1 className="h3 mb-3 font-weight-normal">Cadastro</h1>

							     <div className="row">
							     	<div className="col">
							     		<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Nome</span>
										  </div>
										  
										  <input onChange={ (e) => setNome(e.target.value)} type="text" id="inputNome" className="form-control" placeholder="Nome"/>
										</div>
									</div>
							      	<div className="col">
							      		<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Sobrenome</span>
										  </div>
										  
										  <input onChange={ (e) => setSobrenome(e.target.value)} type="text" id="inputSobrenome" className="form-control" placeholder="Sobrenome" required/>
										</div>
							      	</div>
							      	<div className="col">
							      		<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">CPF</span>
										  </div>
										  
										  <input onChange={ (e) => setcpf(e.target.value)} type="text" id="inputCpf" className="form-control" placeholder="CPF" required/>
										</div>
							      	</div>
							     </div>

								<div className="row">

							        <div className="col">
							        	<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Data de Nascimento</span>
										  </div>
										  
										  <input onChange={ (e) => {setDataDeNasc(e.target.value)}} type="date" className="form-control" />  
										</div>
							        </div>

							        <div className="col">
							        	<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Celular</span>
										  </div>
										  
										  <input onChange={ (e) => {setCelular(e.target.value)}} type="text" className="form-control" placeholder="(88) 9 9999 - 9999" />  
										</div>
							        </div>

							    </div>

							    <div className="row">
								
							        <div className="col">
							        	<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Telefone</span>
										  </div>
										  
										  <input onChange={ (e) => {setTelefone(e.target.value)}} type="text" className="form-control" placeholder="8888 - 8888"/>  
										</div>
							        </div>

							        <div className="col">
							        	<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Estado</span>
										  </div>
										  
										  <input onChange={ (e) => {setEstado(e.target.value)}} type="text" className="form-control" placeholder="Ceará" />  
										</div>
							        </div>

							        <div className="col">
							        	<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Cidade</span>
										  </div>
										  
										  <input onChange={ (e) => {setCidade(e.target.value)}} type="text" className="form-control" placeholder="Sobral" />  
										</div>
							        </div>

							    </div>
					      
						      </div>
						      
						    </form>
					  </Tab>

					  	{/* FORMULARIO DA PESSOA JURIDICA  */ }
					  <Tab eventKey="juridica" title="Pessoa Jurídica">
					    <form className="form-signin mx-auto" style={{width:'100%'}}>
							  <div className="text-center mb-4">
							     <h1 className="h3 mb-3 font-weight-normal">Cadastro</h1>

							     <div className="row">
							     	<div className="col">
							     		<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Nome</span>
										  </div>
										  
										  <input onChange={ (e) => setNome(e.target.value)} type="text" id="inputNome" className="form-control" placeholder="Nome"/>
										</div>
									</div>
							      	<div className="col">
							      		<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">Sobrenome</span>
										  </div>
										  
										  <input onChange={ (e) => setSobrenome(e.target.value)} type="text" id="inputSobrenome" className="form-control" placeholder="Sobrenome" required/>
										</div>
							      	</div>
							      	<div className="col">
							      		<div className="input-group mb-3">
										  
										  <div className="input-group-prepend">
										    <span className="input-group-text" id="inputGroup-sizing-sm">CPF</span>
										  </div>
										  
										  <input onChange={ (e) => setcpf(e.target.value)} type="text" id="inputCpf" className="form-control" placeholder="CPF" required/>
										</div>
							      	</div>
							     </div>
							  </div>
						</form>
					  </Tab>

					</Tabs>

						{/* PARA AMBOS */}
					<div className="row my-5">
						<div className="col">
						   	<div className="input-group mb-3">
						 
							  	<div className="input-group-prepend">
							    	<span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
							  	</div>
										  
								<input onChange={ (e) => {setEmail(e.target.value)}} type="text" className="form-control" placeholder="example@mail.com"/>  
							</div>
						</div>

						<div className="col">
						   	<div className="input-group mb-3">
										  
								<div className="input-group-prepend">
							   		<span className="input-group-text" id="inputGroup-sizing-sm">Senha</span>
								</div>
										  
								<input onChange={ (e) => {setSenha(e.target.value)}} type="password" className="form-control" placeholder="********" />  
							</div>
						</div>

						<div className="col">
						   	<div className="input-group mb-3">
										  
								<div className="input-group-prepend">
							   		<span className="input-group-text" id="inputGroup-sizing-sm">Repita a Senha</span>
								</div>
										  
								<input onChange={ (e) => {setVerSennha(e.target.value)}} type="password" className="form-control" placeholder="********" />  
							</div>
						</div>

						<button type="button" onClick={console.log('ok')} className="btn btn-lg btn-block btn-login my-3">Cadastrar</button>
					</div>
				</div>
		</div>
    <Footer/>
	</div>
	);
}

export default UsuarioNovo;