import React from 'react';
import { connect } from 'react-redux';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import firebase from '../../config/firebase';

import feedback from '../administrador/images/check-list.svg'

const db = firebase.firestore();

class FeedbackCorretor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nomeDoCliente: '',
            dataDeVisita: '',
            feedbackDoCorretor: '',
            carregando: false,
            idImovel: this.props.location.state.id,
        }

        this.handleChange = this.handleChange.bind(this);
        this.cadastrarFeedback = this.cadastrarFeedback.bind(this);
    }

    handleChange(e) {
        const { value, name } = e.target;

        this.setState({ [name]: value });
    }

    cadastrarFeedback() {
        const { nomeDoCliente, dataDeVisita, feedbackDoCorretor, idImovel } = this.state;

        this.setState({ carregando: true })

        db.collection('feedbackImoveis').add({
            nomeDoCliente,
            dataDeVisita,
            idImovel,
            feedbackDoCorretor,
            corretor: this.props.usuarioEmail,
        }).then(e => {
            this.setState({ carregando: false })
            alert('Enviado com sucesso');
        }).catch(e => {
            this.setState({ carregando: false })
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="container pb-5">
                  <div className="container">
                    <div className="d-flex align-items-end pl-2 pt-5"> <img src={feedback} style={{ width: "55px" }}/> 
                    <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Dar Feedback</h4> </div>
                    <hr className="my mb-4"></hr>

                    <div className="row mb-4">
                        <div className="col-2">
                            <label>Nome do Cliente:</label>
                        </div>
                        <div className="col-6" >
                            <input type="text" className="form-control" name="nomeDoCliente" onChange={this.handleChange} />
                        </div>
                        <div className="col-1">
                            <label>Data de visita:</label>
                        </div>
                        <div className="col-3" >
                            <input type="date" className="form-control" name="dataDeVisita" onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            FeedBack:
                    </div>
                        <div className="col-10">
                            <textarea className="form-control" cols="120" name="feedbackDoCorretor" onChange={this.handleChange} />
                        </div>
                    </div>
                    {
                        this.state.carregando === false
                            ?
                            <div className="row rodape-card d-flex align-items-center">
                                <div className="col-6">
                                    <button className="btn btn-lg" onClick={e => this.cadastrarFeedback()}>Enviar <i className="fas fa-angle-right"></i></button>
                                </div>
                            </div>
                            :
                            <label> Aguarde ... </label>
                    }

                  </div>
                </div>

                <Footer />
            </>
        );
    }
}


const mapStateToProps = state => {
    const { usuarioEmail } = state;

    return {
        usuarioEmail
    }
}

export default connect(mapStateToProps, null)(FeedbackCorretor);