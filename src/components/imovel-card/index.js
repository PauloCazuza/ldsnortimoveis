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
            md: this.props.md === undefined ? "col-md-3" : this.props.md,
        }
        
        this.receberUrl(this.props.img[0]);
    }

    receberUrl(img) {
        firebase.storage().ref(`imagensImoveis/${img}`).getDownloadURL().then(url => { 
            this.setState({url: url})
            // console.log("----------------")
            // console.log(url)
        });
    }
 
    render() {
        const {id, img, titulo, detalhes, visualizacoes, areaUtil, areaTotal, quartos, banheiros} = this.props;
      
        return(
            <div className={`${this.state.md} col-sm-12`}>
              <div className="card">
                <Link to={"/detalhesimovel/" + id }>
                  <img src={this.state.url} className="card-img-top img-cartao" alt="imagem do imovel" />
                </Link>
    
                <div className="card-body">
                    <h5>{titulo}</h5>
                    <p className="card-text">{detalhes}</p>
                    
                    <p className="small text-justify">{`${titulo} com ${areaUtil}m² de área construída, ${areaTotal}m²
                    de terreno, com ${quartos} quartos, possui ${banheiros} banheiro(s).`}</p>

                    <div className="row rodape-card d-flex align-items-center">
                        <div className="col-6">
                          <Link to={"/detalhesimovel/" + id}  className="btn btn-sm">Detalhes <i className="fas fa-angle-right"></i></Link>
                        </div>
                        <div className="col-6 text-right">
                          <i className="fas fa-eye"> </i> <span>{visualizacoes}</span>
                        </div>
                    </div>
    
                </div>
              </div>
            </div>
        );
    }
}
