import React, { useState } from 'react';
import './usuario-novo.css';

import firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

import newUser from './images/new-user.svg'
import editUser from './images/edit-user.svg'

function UsuarioNovo(props) {
	// USUARIO PRÉ-DETERMINADO
	var usuario = useSelector(state => state.usuario);
	const mail = props.location.state === undefined ? '' : props.location.state.email;

	// IDENTIFICAR A PESSOA
	const [pessoa, setPessoa] = useState(usuario === undefined ? 'fisica' : usuario.tipoDePessoa);
	const [msg, setMsg] = useState();
	const [carregando, setCarregando] = useState();
	const dispatch = useDispatch();

	// AMBOS USUARIOS
	const [email, setEmail] = useState(mail);
	const [senha, setSenha] = useState();
	const [verSenha, setVerSenha] = useState();
	const [telefone, setTelefone] = useState(usuario === undefined ? '' : usuario.telefone);
	const [estado, setEstado] = useState(usuario === undefined ? '' : (usuario.estado === undefined ? '' : usuario.estado));
	const [cidade, setCidade] = useState(usuario === undefined ? '' : (usuario.cidade === undefined ? '' : usuario.cidade));
	const [foto, setFoto] = useState(usuario === undefined ? { name: "" } : { name: usuario.foto });


	// PESSOA FÍSICA
	const [nome, setNome] = useState(usuario === undefined ? '' : usuario.nome);
	const [sobrenome, setSobrenome] = useState(usuario === undefined ? '' : (usuario.sobrenome === undefined ? '' : usuario.sobrenome));
	const [cpf, setcpf] = useState(usuario === undefined ? '' : usuario.cpf);
	const [dataDeNasc, setDataDeNasc] = useState(usuario === undefined ? '' : (usuario.dataDeNasc === undefined ? '' : usuario.dataDeNasc))

	// PESSOA JURIDICA
	const [razaoSocial, setRazaoSocial] = useState(usuario === undefined ? '' : usuario.razaoSocial);
	const [nomeFantasia, setNomeFantasia] = useState(usuario === undefined ? '' : usuario.nome);
	const [cnpj, setCnpj] = useState(usuario === undefined ? '' : usuario.cnpj);

	// CONFIGURAÇÕES DO BD
	const storage = firebase.storage();
	const db = firebase.firestore();


	async function enviarFoto(foto) {
		await storage.ref(`imagensUsuarios/${foto.name}/`).put(foto).then(

		).catch(erro => {
			console.log('Erro ao enviar a foto ', foto.name);
		});
	}

	function cadastrarPessoa() {
		if (senha !== verSenha)
			return alert("A repetição de senha não confere");

		if (foto.name !== "") {
			enviarFoto(foto)
		}

		firebase.auth().createUserWithEmailAndPassword(email, senha).then(function () {
			if (pessoa === 'fisica') {
				db.collection('usuarios').add({
					nome: nome,
					sobrenome: sobrenome,
					tipoDePessoa: pessoa,
					cpf: cpf,
					dataDeNasc: dataDeNasc,
					telefone: telefone,
					estado: estado,
					cidade: cidade,
					foto: foto.name,
					email: email,
				}).then(() => {
					setCarregando(false)
					setMsg('sucesso')
				}).catch(erro => {
					setCarregando(false)
					setMsg('erro')
				})
			} else {
				db.collection('usuarios').add({
					tipoDePessoa: pessoa,
					razaoSocial: razaoSocial,
					nome: nomeFantasia,
					cnpj: cnpj,
					telefone: telefone,
					estado: estado,
					cidade: cidade,
					foto: foto.name,
					email: email,
				}).then(() => {
					setCarregando(false)

					setMsg('sucesso')
				}).catch(erro => {

					setCarregando(false)
					setMsg('erro')
				})
			}
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			setCarregando(false)
			setMsg('erro')
			var errorMessage = error.message;
			alert(errorMessage)
			// ...
		});


	}

	async function editarPessoa() {

		if (foto.name !== "") {
			enviarFoto(foto)
		}

		if (pessoa === 'fisica' || pessoa === 'corretor' || pessoa === 'administrador') {
			db.collection('usuarios').doc(usuario.id).set({
				nome: nome,
				sobrenome: sobrenome,
				tipoDePessoa: pessoa,
				cpf: cpf,
				dataDeNasc: dataDeNasc,
				telefone: telefone,
				estado: estado,
				cidade: cidade,
				foto: foto.name,
				email: usuario.email,
			}).then(() => {
				setCarregando(false)
				alert("FOi atualizado");
				dispatch({
					type: 'ATUALIZA_USUARIO', usuario: {
						id: usuario.id,
						nome: nome,
						sobrenome: sobrenome,
						tipoDePessoa: pessoa,
						cpf: cpf,
						dataDeNasc: dataDeNasc,
						telefone: telefone,
						estado: estado,
						cidade: cidade,
						foto: foto.name,
						email: usuario.email,
					}
				});
				setMsg('sucesso')
			}).catch(erro => {
				setCarregando(false)
				alert("Deu erro na atualização");
				setMsg('erro')
			})
		} else {
			db.collection('usuarios').doc(usuario.id).set({
				tipoDePessoa: pessoa,
				razaoSocial: razaoSocial,
				nome: nomeFantasia,
				cnpj: cnpj,
				telefone: telefone,
				estado: estado,
				cidade: cidade,
				foto: foto.name,
				email: usuario.email,
			}).then(() => {
				setCarregando(false)
				alert("FOi atualizado");
				dispatch({
					type: 'ATUALIZA_USUARIO', usuario: {
						id: usuario.id,
						tipoDePessoa: pessoa,
						razaoSocial: razaoSocial,
						nome: nomeFantasia,
						cnpj: cnpj,
						telefone: telefone,
						estado: estado,
						cidade: cidade,
						foto: foto.name,
						email: usuario.email,
					}
				});
				setMsg('sucesso')
			}).catch(erro => {
				setCarregando(false)
				alert("Deu erro na atualização");
				setMsg('erro')
			})
		}




	}


	return (
		<div>
			<Navbar />
			<div className="container">
				<div className="d-flex align-items-end pl-2 pt-5"> <img className={usuario ? 'mb-1' : ''} src={usuario ? editUser : newUser} style={{ width: usuario ? "35px" : "45px" }} />
					<h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">{usuario ? 'Editar' : 'Novo'} Usuário</h4> </div>
				<hr className="my"></hr>
			</div>

			<div className="container py-4">
				<div className="container">
					<Tabs id="tab-cad" onSelect={key => setPessoa(key)}>
						{/* FORMULARIO DA PESSOA FISICA  */}
						{
							usuario === undefined || usuario.tipoDePessoa === "fisica" || usuario.tipoDePessoa === "administrador" || usuario.tipoDePessoa === "corretor"  ?

								<Tab eventKey="fisica" title="Pessoa Física">

									<form className="form-signin mx-auto" style={{ width: '100%' }}>
										<div>

											<div className="row mt-4">

												<div className="col">
													<label>Nome</label>
													<input onChange={(e) => setNome(e.target.value)} value={nome} type="text" id="inputNome" className="form-control" placeholder="Nome" />
												</div>

												<div className="col">
													<label>Sobrenome</label>
													<input onChange={(e) => setSobrenome(e.target.value)} value={sobrenome} type="text" id="inputSobrenome" className="form-control" placeholder="Sobrenome" required />
												</div>

												<div className="col">
													<label>CPF</label>
													<input onChange={(e) => setcpf(e.target.value)} type="text" id="inputCpf" value={cpf} className="form-control" placeholder="CPF" required />
												</div>

											</div>

											<div className="row">
												<div className="col">
													<label>Data de nascimento</label>
													<input onChange={(e) => { setDataDeNasc(e.target.value) }} type="date" value={dataDeNasc} className="form-control" />
												</div>

												<div className="col">
													<label>Telefone</label>
													<input onChange={(e) => { setTelefone(e.target.value) }} type="text" value={telefone} className="form-control" placeholder="8888 - 8888" />
												</div>
											</div>

											<div className="row">

												<div className="col">
													<label>Estado</label>
													<input onChange={(e) => { setEstado(e.target.value) }} value={estado} type="text" className="form-control" placeholder="Ceará" />
												</div>

												<div className="col">
													<label>Cidade</label>
													<input onChange={(e) => { setCidade(e.target.value) }} type="text" value={cidade} className="form-control" placeholder="Sobral" />
												</div>

												<div className="col">
													<label>Adicionar uma foto</label>
													<input onChange={e => { setFoto(e.target.files[0]) }} type="file" className="form-control" />
												</div>
											</div>

										</div>

									</form>
								</Tab>
								: null
						}
						{/* FORMULARIO DA PESSOA JURIDICA  */}
						{
							usuario === undefined || usuario.tipoDePessoa === "juridica" ?
								<Tab eventKey="juridica" title="Pessoa Jurídica">
									<form className="form-signin mx-auto" style={{ width: '100%' }}>
										<div>

											<div className="row mt-4">
												<div className="col">
													<label>Razão Social</label>
													<input onChange={(e) => setRazaoSocial(e.target.value)} type="text" value={razaoSocial} className="form-control" placeholder="Nome" />
												</div>

												<div className="col">
													<label>Nome Fantasia</label>
													<input onChange={(e) => setNomeFantasia(e.target.value)} type="text" value={nomeFantasia} className="form-control" placeholder="Sobrenome" required />
												</div>

												<div className="col">
													<label>CNPJ</label>
													<input onChange={(e) => setCnpj(e.target.value)} type="text" value={cnpj} className="form-control" placeholder="CNPJ" required />
												</div>
											</div>

											<div className="row">
												<div className="col">
													<label>Estado</label>
													<input onChange={(e) => { setEstado(e.target.value) }} value={estado} type="text" className="form-control" placeholder="Ceará" />
												</div>

												<div className="col">
													<label>Cidade</label>
													<input onChange={(e) => { setCidade(e.target.value) }} type="text" value={cidade} className="form-control" placeholder="Sobral" />
												</div>
											</div>
											<div className="row">
												<div className="col">
													<label>Telefone</label>
													<input onChange={(e) => { setTelefone(e.target.value) }} type="text" value={telefone} className="form-control" placeholder="8888 - 8888" />
												</div>

												<div className="col">
													<label>Adicionar uma foto</label>
													<input onChange={e => { setFoto(e.target.files[0]) }} type="file" className="form-control" />
												</div>
											</div>
										</div>
									</form>
								</Tab>
								: null
						}

					</Tabs>

					{/* PARA AMBOS */}
					{
						usuario === undefined ?
							<>
								<div className="row">

									<div className="col">
										<label>Email</label>
										<input onChange={(e) => { setEmail(e.target.value) }} value={email} type="text" className="form-control" placeholder="example@mail.com" />
									</div>

									<div className="col">
										<label>Senha</label>
										<input onChange={(e) => { setSenha(e.target.value) }} type="password" className="form-control" placeholder="********" />
									</div>

									<div className="col">
										<label>Repita a senha</label>
										<input onChange={(e) => { setVerSenha(e.target.value) }} type="password" className="form-control" placeholder="********" />
									</div>

								</div>
								<button type="button" onClick={cadastrarPessoa} className="btn btn-lg btn-login my-4">Cadastrar</button>
							</>
							:
							<button type="button" onClick={editarPessoa} className="btn btn-lg btn-login my-4">Editar</button>
					}


				</div>
			</div>
			<Footer />
		</div>
	);
}

export default UsuarioNovo;