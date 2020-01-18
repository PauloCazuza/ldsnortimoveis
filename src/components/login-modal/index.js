import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import firebase from '../../config/firebase';

const db = firebase.firestore().collection('usuarios');

const avatarDefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XcdwpbHbau9Mqfcr9A1npUDVUQcxUXLc7srlXUkwKQeVZzRAag&s"

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      email: "",
      senha: "",
      carregando: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.logar = this.logar.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({ [name]: value })
  }

  logar() {
    const { email, senha } = this.state;

    if (email === "")
      return alert('Preencha o email');

    if (senha === "")
      return alert('Preencha a senha');

    this.setState({ carregando: false })
    firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
      //alert('LOGIN FEITO!');

      this.props.Login({ type: 'LOG_IN', usuarioEmail: email });
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
      this.props.funcShow(false);
      this.setState({ carregando: false })
    }).catch(erro => {
      alert('DEU ERRO' + erro.message);
      this.setState({ carregando: false })
    })
  }

  mostrarModal(status) {
    this.props.funcShow(status);
    // this.setState({ show: status })
  }

  submitForm(e) {
    e.preventDefault()
    this.logar()
  }

  render() {

    return (
      <Modal size="lg" show={this.state.show} onHide={() => this.mostrarModal(false)} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title><i class="fas fa-key"></i> Faça login para continuar </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm d-flex flex-column d-flex flex-column">
              <label>Login</label>
              <input type="email" name="email" className="form-control" onChange={this.handleChange} />
            </div>
            <div className="col-sm d-flex flex-column">
              <label>Senha</label>
              <input type="password" name="senha" className="form-control" onKeyDown={(e) => {
                if (e.keyCode == 13) this.logar()
              }} onChange={this.handleChange} />
            </div>
          </div>
          <div className="row px-3">
            <Link to="/novousuario"> Não sou cadastrado</Link>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-login btn-cancel" onClick={() => this.mostrarModal(false)}>
            Fechar
            </button>
          <button className="btn btn-login btn-confirme" onClick={() => this.logar()}>
            Login
            </button>
        </Modal.Footer>
      </Modal>
    )
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
    Login: ({ usuarioEmail }) => {
      dispatch({ type: 'LOG_IN', usuarioEmail })
    },
    SetFotoENome: ({ email, foto, nome, usuario, pessoa }) => {
      dispatch({ type: 'SET_NOME', usuarioEmail: email, usuarioFoto: foto, usuarioNome: nome, usuario: usuario, pessoa: pessoa });
    },

  };
};

export default connect(mapStateToProps, mapDispatchToEvents)(LoginModal);
