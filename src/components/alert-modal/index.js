import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import firebase from '../../config/firebase';

const db = firebase.firestore().collection('usuarios');

const avatarDefault = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0XcdwpbHbau9Mqfcr9A1npUDVUQcxUXLc7srlXUkwKQeVZzRAag&s"

class AlertModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      title: props.title,
    }
  }

  handleChange(e) {
    const { value, name } = e.target;

    this.setState({ [name]: value })
  }

  mostrarModal(status) {
    this.props.funcShow(status);
  }

  render() {

    return (
      <Modal size="md" show={this.state.show} onHide={() => this.mostrarModal(false)} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title><i class="fa fa-exclamation-circle mr-2"></i>{ this.state.title }</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button className="btn btn-login btn-cancel" onClick={() => this.mostrarModal(false)}>
            {
              this.state.message ? 'Não' : 'Fechar'
            }
          </button>
          {
            this.state.message ?
            <button className="btn btn-login btn-confirme" onClick={() => this.logar()}>
              Sim
            </button>
            :
            null
          }
        </Modal.Footer>
      </Modal>
    )
  }
}

export default AlertModal;
