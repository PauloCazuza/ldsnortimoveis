import React, {useState, useEffect, Component} from 'react';
import './imovel-card.css';

import {Link} from 'react-router-dom';

import firebase from '../../config/firebase';
import { connect } from 'react-redux';


const db = firebase.firestore().collection('favoritos');

class ImovelCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            url: "",
            md: this.props.md === undefined ? "col-md-3" : this.props.md,
            id: props.id,
            favorito: this.props.usuarioEmail === "" ? false : null,
            idFavorito: null,
        }
        this.verSeEfavorito = this.verSeEfavorito.bind(this);
        this.receberUrl(this.props.img[0]);
        this.verSeEfavorito();
    }

    async favoritarImovel() {
      if (this.props.usuarioEmail === "")
        return alert("Faça Login para poder favoritar");

      this.setState({favorito: true})

        db.add({
          id: this.state.id,
          usuario: this.props.usuarioEmail,
        }).then(() => {
          this.setState({carregando: false})
          // alert("Favoritado")          
        }).catch(erro => {
          this.setState({carregando: false})
          // alert("Erro ao favoritar")          
        })

    }

    verSeEfavorito() {
      if (this.props.usuarioEmail === "")
        return;

      db.where('usuario', '==', this.props.usuarioEmail)
      .where('id', '==', this.props.id).get().then( (resultado) => {
        if (resultado.docs.length === 0)
          return this.setState({favorito: false});
        return this.setState({favorito: true, idFavorito: resultado.docs[0].id});
      });
    }

    receberUrl(img) {
        firebase.storage().ref(`imagensImoveis/${img}`).getDownloadURL().then(url => { 
            this.setState({url: url})
        });
    }

    excluirFavorito() {
      db.doc(this.state.idFavorito).delete();
      this.setState({favorito: false})
      // alert('Favorito Removido com Sucesso!');     
    }
 
    render() {
        const {id, img, titulo, preco, detalhes, visualizacoes, areaUtil, areaTotal, quartos, banheiros} = this.props;
      
        return(
            <div className={`${this.state.md} col-sm-12`}>
              <div className="card">
                <div className="d-flex justify-content-end div-heart">
                  { this.state.favorito === null ? null :
                    <>
                      <i hidden={this.state.favorito} className="far fa-heart fa-2x heart" onClick={() => this.favoritarImovel()}/>
                      <i hidden={!this.state.favorito} className="fas fa-heart fa-2x heart red" onClick={() => this.excluirFavorito()}/>
                    </>
                  }
                </div>
                <Link to={"/detalhesimovel/" + id }>
                  <img src={this.state.url} className="card-img-top img-cartao" alt="imagem do imovel" />
                </Link>
    
                <div className="card-body">
                    <h5>{titulo}</h5>
                    <h4>{`R$ ${preco}`}</h4>
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


const mapStateToProps = state => {
  const {usuarioEmail} = state;

return { usuarioEmail: usuarioEmail}
}

export default connect( mapStateToProps,  null)(ImovelCard);
