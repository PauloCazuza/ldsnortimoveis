import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';

class loginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
    }
  }

  
  mostrarModal(status) {
    this.props.funcShow(status);
    // this.setState({ show: status })
  }

  render() {

    return (
        <Modal size="lg" show={ this.state.show } onHide={ () => this.mostrarModal(false) } animation={true}>
          <Modal.Header closeButton>
            <Modal.Title><i class="fas fa-key"></i> Faça login para continuar </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-sm d-flex flex-column d-flex flex-column">
                <label>Login</label>
                <input type="text" name="user" className="form-control" />
              </div>
              <div className="col-sm d-flex flex-column">
                <label>Senha</label>
                <input type="text" name="password" className="form-control" />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-login btn-cancel" onClick={() => this.mostrarModal(false)}>
              Fechar
            </button>
            <button className="btn btn-login btn-confirme" onClick={() => this.enviarInteresse()}>
                Confirmar
            </button>
          </Modal.Footer>
        </Modal>
      )
  }
}

export default loginModal