import React, {useState, useEffect, Component} from 'react';
import './imovel-card.css';

import {Link} from 'react-router-dom';

import firebase from '../../config/firebase';

import { useSelector, useDispatch } from 'react-redux';

export default class ImovelCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
        }

        this.receberUrl(this.props.img);
    }

    receberUrl(img) {
        firebase.storage().ref(`imagensImoveis/${img}`).getDownloadURL().then(url => { 
            this.setState({url: url})
        });
    }
 
    render() {
        const {id, img, titulo, detalhes, visualizacoes} = this.props;

        return(
            <div className="col-md-3 col-sm-12">
                <img src={this.state.url} className="card-img-top img-cartao" alt="imagem do imovel" />
    
                <div className="card-body">
                    <h5>{titulo}</h5>
                    <p className="card-text text-justify">{detalhes}</p>
    
                    <div className="row rodape-card d-flex align-items-center">
                        <div className="col-6">
                            <Link to={"/detalhesimovel/" + id }  className="btn btn-sm btn-detalhes">+ detalhes</Link>
                        </div>
                        <div className="col-6 text-right">
                            <i className="fas fa-eye"> </i> <span>{visualizacoes}</span>
                        </div>
                    </div>
    
                </div>
            </div>
        );
    }
}
