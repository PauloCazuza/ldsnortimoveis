import React, { useState } from 'react';
import './solicitacoes-do-Imovel.css';

import firebase from '../../config/firebase';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

class SolicitacoesDoImovel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            interessados: this.props.location.state.interessados,
        }
    }
    render() {
        return (
            <>
                <Navbar />
                <div className="container my-2">
                    {this.state.interessados.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="row">
                                    <div className="col">
                                        <label>
                                            {item.nome} {item.sobrenome !== undefined ? item.sobrenome : item.razaoSocial}
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label>
                                            Telefone: {item.telefone}
                                        </label>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                </div>
                <Footer />
            </>
        );
    }
}

export default SolicitacoesDoImovel;