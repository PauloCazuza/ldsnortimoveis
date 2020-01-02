import React, { useState } from 'react';
import './solicitacoes-do-Imovel.css';

import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ImageGallery from 'react-image-gallery';

import solicitacoesImovel from './images/telephone.svg'
import person from './images/user.svg'

class SolicitacoesDoImovel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            interessados: this.props.location.state.interessados,
            imagens: [],
            urlImg: [],
        }

        console.log(this.props.match)
        this.receberDoBd = this.receberDoBd.bind(this);
        this.receberDoBd(this.props.location.state.imagens);
    }

    async receberDoBd(imagens) {
        var fotos = [];
        var images = [];
        await imagens.map(item => {
            firebase.storage().ref(`imagensImoveis/${item}`).getDownloadURL().then(url => {
                console.log(url);
                fotos.push(url);
                images.push({
                    original: url,
                    thumbnail: url,
                })
                if (fotos.length === this.props.location.state.imagens.length) {
                    this.setState({ urlImg: fotos, imagens: images });
                }
            });
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="container p-5">
                    <ImageGallery items={this.state.imagens} showBullets autoPlay
                        thumbnailPosition={"left"} showPlayButton={false}
                    />

                    <div className="container">
                        <div className="d-flex align-items-end pl-2 pt-5"> <img src={solicitacoesImovel} style={{ width: "45px" }} />
                            <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Dados de contato</h4> </div>
                        <hr className="my"></hr>

                        {this.state.interessados.map((item, index) => {
                            return (
                                <div className="container mt-5" key={index}>
                                    <div className="row pl-5">
                                        <div className="col-1">
                                            <img src={person} style={{ width: "35px" }} />
                                        </div>
                                        <div className="col-5">
                                            <label>
                                                {item.nome} {item.sobrenome ? item.sobrenome : item.razaoSocial}
                                            </label><br />
                                            <label>
                                                Telefone: {item.telefone}
                                            </label>
                                        </div>

                                        <div className="col">
                                            <label>
                                                Horario para Contato: {item.horarioDeContato}
                                            </label>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default SolicitacoesDoImovel;