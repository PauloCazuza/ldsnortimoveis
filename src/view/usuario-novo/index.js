import React, { useState } from 'react';
import './usuario-novo.css';

import firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

function UsuarioNovo(props) {

	var usuario = useSelector(state => state.usuario)

	console.log(usuario);
	//IDENTIFICAR A PESSOA
	const [pessoa, setPessoa] = useState(usuario === undefined ? 'fisica' : usuario.tipoDePessoa);
	const [msg, setMsg] = useState();
	const [carregando, setCarregando] = useState();
	const dispatch = useDispatch();

	//AMBOS USUARIOS
	const [email, setEmail] = useState();
	const [senha, setSenha] = useState();
	const [verSenha, setVerSenha] = useState();
	const [telefone, setTelefone] = useState(usuario === undefined ? '' : usuario.telefone);
	const [estado, setEstado] = useState(usuario === undefined ? '' : usuario.estado);
	const [cidade, setCidade] = useState(usuario === undefined ? '' : usuario.cidade);
	const [foto, setFoto] = useState(usuario === undefined ? { name: "" } : { name: usuario.foto });


	// PESSOA FÍSICA
	const [nome, setNome] = useState(usuario === undefined ? '' : usuario.nome);
	const [sobrenome, setSobrenome] = useState(usuario === undefined ? '' : usuario.sobrenome);
	const [cpf, setcpf] = useState(usuario === undefined ? '' : usuario.cpf);
	const [dataDeNasc, setDataDeNasc] = useState(usuario === undefined ? '' : usuario.dataDeNasc);

	const storage = firebase.storage();
	const db = firebase.firestore();

	// PESSOA JURIDICA
	const [razaoSocial, setRazaoSocial] = useState(usuario === undefined ? '' : usuario.razaoSocial);
	const [nomeFantasia, setNomeFantasia] = useState(usuario === undefined ? '' : usuario.nome);
	const [cnpj, setCnpj] = useState(usuario === undefined ? '' : usuario.cnpj);


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
			if (pessoa === "fisica") {
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

		if (pessoa === "fisica") {
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

			<div className="container py-5">
				<div className="container">
					<Tabs defaultActiveKey={pessoa} id="tab-cad" onSelect={key => setPessoa(key)}>
						{/* FORMULARIO DA PESSOA FISICA  */}
						<Tab eventKey="fisica" title="Pessoa Física">

							<form className="form-signin mx-auto" style={{ width: '100%' }}>
								<div className="text-center mb-4">
									<h1 className="h3 mb-3 font-weight-normal">Cadastro</h1>

									<div className="row">
										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Nome</span>
												</div>

												<input onChange={(e) => setNome(e.target.value)} value={nome} type="text" id="inputNome" className="form-control" placeholder="Nome" />
											</div>
										</div>
										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Sobrenome</span>
												</div>

												<input onChange={(e) => setSobrenome(e.target.value)} value={sobrenome} type="text" id="inputSobrenome" className="form-control" placeholder="Sobrenome" required />
											</div>
										</div>
										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">CPF</span>
												</div>

												<input onChange={(e) => setcpf(e.target.value)} type="text" id="inputCpf" value={cpf} className="form-control" placeholder="CPF" required />
											</div>
										</div>
									</div>

									<div className="row">

										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Data de Nascimento</span>
												</div>

												<input onChange={(e) => { setDataDeNasc(e.target.value) }} type="date" value={dataDeNasc} className="form-control" />
											</div>
										</div>

										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Telefone</span>
												</div>

												<input onChange={(e) => { setTelefone(e.target.value) }} type="text" value={telefone} className="form-control" placeholder="8888 - 8888" />
											</div>
										</div>

									</div>

									<div className="row">

										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Estado</span>
												</div>

												<input onChange={(e) => { setEstado(e.target.value) }} value={estado} type="text" className="form-control" placeholder="Ceará" />
											</div>
										</div>

										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Cidade</span>
												</div>

												<input onChange={(e) => { setCidade(e.target.value) }} type="text" value={cidade} className="form-control" placeholder="Sobral" />
											</div>
										</div>

										<div className="col">
											<input onChange={e => { setFoto(e.target.files[0]) }} type="file" className="form-control" />
										</div>
									</div>

								</div>

							</form>
						</Tab>

						{/* FORMULARIO DA PESSOA JURIDICA  */}
						<Tab eventKey="juridica" title="Pessoa Jurídica">
							<form className="form-signin mx-auto" style={{ width: '100%' }}>
								<div className="text-center mb-4">
									<h1 className="h3 mb-3 font-weight-normal">Cadastro</h1>

									<div className="row">
										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Razão Social</span>
												</div>

												<input onChange={(e) => setRazaoSocial(e.target.value)} type="text" value={razaoSocial} className="form-control" placeholder="Nome" />
											</div>
										</div>
										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Nome Fantasia</span>
												</div>

												<input onChange={(e) => setNomeFantasia(e.target.value)} type="text" value={nomeFantasia} className="form-control" placeholder="Sobrenome" required />
											</div>
										</div>
										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">CNPJ</span>
												</div>

												<input onChange={(e) => setCnpj(e.target.value)} type="text" value={cnpj} className="form-control" placeholder="CNPJ" required />
											</div>
										</div>
									</div>

									<div className="row">

										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Estado</span>
												</div>

												<input onChange={(e) => { setEstado(e.target.value) }} value={estado} type="text" className="form-control" placeholder="Ceará" />
											</div>
										</div>

										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Cidade</span>
												</div>

												<input onChange={(e) => { setCidade(e.target.value) }} type="text" value={cidade} className="form-control" placeholder="Sobral" />
											</div>
										</div>

										<div className="col">
											<div className="input-group mb-3">

												<div className="input-group-prepend">
													<span className="input-group-text" id="inputGroup-sizing-sm">Telefone</span>
												</div>

												<input onChange={(e) => { setTelefone(e.target.value) }} type="text" value={telefone} className="form-control" placeholder="8888 - 8888" />
											</div>
										</div>

										<div className="col">
											<input onChange={e => { setFoto(e.target.files[0]) }} type="file" className="form-control" />
										</div>
									</div>
								</div>
							</form>
						</Tab>

					</Tabs>

					{/* PARA AMBOS */}
					{
						usuario === undefined ?
							<div className="row my-5">
								<div className="col">
									<div className="input-group mb-3">

										<div className="input-group-prepend">
											<span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
										</div>

										<input onChange={(e) => { setEmail(e.target.value) }} type="text" className="form-control" placeholder="example@mail.com" />
									</div>
								</div>

								<div className="col">
									<div className="input-group mb-3">

										<div className="input-group-prepend">
											<span className="input-group-text" id="inputGroup-sizing-sm">Senha</span>
										</div>

										<input onChange={(e) => { setSenha(e.target.value) }} type="password" className="form-control" placeholder="********" />
									</div>
								</div>

								<div className="col">
									<div className="input-group mb-3">

										<div className="input-group-prepend">
											<span className="input-group-text" id="inputGroup-sizing-sm">Repita a Senha</span>
										</div>

										<input onChange={(e) => { setVerSenha(e.target.value) }} type="password" className="form-control" placeholder="********" />
									</div>
								</div>

								<button type="button" onClick={cadastrarPessoa} className="btn btn-lg btn-block btn-login my-3">Cadastrar</button>
							</div>
							:
							<div>
								<button type="button" onClick={editarPessoa} className="btn btn-lg btn-block btn-login my-3">Editar</button>
							</div>
					}


				</div>
			</div>
			<Footer />
		</div>
	);
}

export default UsuarioNovo;