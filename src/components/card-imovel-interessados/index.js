import React, { useState, useEffect, Component } from 'react';
import './card-imovel-interessados.css';

import { Link } from 'react-router-dom';
import { PulseLoader as Spinner } from 'react-spinners';

import firebase from '../../config/firebase';
import { connect } from 'react-redux';


const db = firebase.firestore().collection('favoritos');

class CardImovelInteressados extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imovel: null,
            url: "",
        }
        this.receberDoBd(this.props.id);
    }

    async receberDoBd(id) {

        await firebase.firestore().collection('imoveis').doc(id).get().then(async resultado => {
            await this.setState({ imovel: resultado.data() })
            console.log(this.state.imovel);
            console.log(this.state.imovel.foto);
            firebase.storage().ref(`imagensImoveis/${this.state.imovel.foto[0]}`).getDownloadURL().then(url => {
                console.log(url);
                this.setState({ url: url });
            });


        })
    }

    render() {
        const { id, img, titulo, detalhes, solicitacoes, interessados, } = this.props;

        if (this.state.url === "")
            return (
                <div className={`col-md-3 col-sm-12`}>
                    <div className="mx-auto">
                        <Spinner
                            sizeUnit={"px"}
                            size={15}
                            color={'#4d6d6d'}
                        />
                    </div>
                </div>
            );

        return (
            <div className={`col-md-3 col-sm-12`}>
                <div className="card">
                    <Link to={{
                        pathname: "/solicitacoesdoimovel/" + id,
                        state: { interessados: interessados, imagens: this.state.imovel.foto },
                    }}>
                        <img src={this.state.url} className="card-img-top img-cartao" alt="imagem do imovel" />
                    </Link>

                    <div className="card-body">
                        <h5>{this.state.imovel.imovel}</h5>
                        <p className="card-text">{this.state.imovel.preco}</p>


                        <p className="small text-justify">{`${solicitacoes} solicitações a este imóvel. `}</p>

                        <div className="row rodape-card d-flex align-items-center">
                            <div className="col-6">
                                <Link to={{
                                    pathname: "/solicitacoesdoimovel/" + id,
                                    state: { interessados: interessados, imagens: this.state.imovel.foto },
                                }} className="btn btn-sm">Detalhes <i className="fas fa-angle-right"></i></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    const { usuarioEmail } = state;

    return { usuarioEmail: usuarioEmail }
}

export default connect(mapStateToProps, null)(CardImovelInteressados);
