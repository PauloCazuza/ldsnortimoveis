import React from 'react';

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';

import './carrousel.css';

import { PulseLoader as Spinner } from 'react-spinners';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import firebase from '../../config/firebase';
const db = firebase.firestore().collection('favoritos');

class Carrousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imovel: props.imovel,
      tam: props.imovel.length,
      url: null,
      favoritos: [],
      carregarFavoritos: null,
      indice: 0,
      idFavoritos: [],
    }

    var favoritos = [], idFavoritos = [];

    if (this.props.usuarioEmail === "")
      for (var i = 0; i < props.imovel.length; i++)
        favoritos.push(false);
    else
      for (var i = 0; i < props.imovel.length; i++) {
        idFavoritos.push(null);
        favoritos.push(null);
      }

    this.setState({ favoritos: favoritos, idFavoritos: idFavoritos });
    this.receberUrl = this.receberUrl.bind(this);
    this.verSeEfavorito = this.verSeEfavorito.bind(this);
    this.favoritarImovel = this.favoritarImovel.bind(this);
    this.retornarGallery = this.retornarGallery.bind(this);
    this.onSlideChanged = this.onSlideChanged.bind(this);
    this.receberUrl();
    this.verSeEfavorito();

  }

  receberUrl() {

    var foto = [];
    var i = 0;

    this.state.imovel.map(async (item, index) => {

      await firebase.storage().ref(`imagensImoveis/${item.foto[0]}`).getDownloadURL().then(function (url) {
        foto[index] = url;
        i++;
      }.bind(this));

      if (i === this.state.tam)
        this.setState({ url: foto });

    })
  }

  verSeEfavorito() {
    if (this.props.usuarioEmail === "")
      return this.setState({carregarFavoritos: true });;

    var favoritos = this.state.favoritos;
    var idFavoritos = this.state.idFavoritos;
    var i = 0;

    this.state.imovel.map(async (item, index) => {

      await db.where('usuario', '==', this.props.usuarioEmail)
        .where('id', '==', item.id).get().then((resultado) => {
          console.log("entrou carrousel favorito")
          i++;
          if (resultado.docs.length === 0) {
            favoritos[index] = false;
            idFavoritos[index] = null;
          } else {
            console.log("achou um favorito")
            favoritos[index] = true;
            idFavoritos[index] = resultado.docs[0].id;
          }

        })

      if (i === this.state.tam)
        this.setState({ favoritos: favoritos, idFavoritos: idFavoritos, carregarFavoritos: true });

    })
  }

  async favoritarImovel(id, index) {
    if (this.props.usuarioEmail === "")
      return alert("Faça Login para poder favoritar");

    if (this.state.favoritos[index] === true)
      return;

    var favoritos = this.state.favoritos;
    favoritos[index] = null;
    await this.setState({ favoritos: favoritos, indice: index })
    var idFavoritos = this.state.idFavoritos;

    db.add({
      id: id,
      usuario: this.props.usuarioEmail,
    }).then(async ({ id }) => {
      console.log(id)
      this.setState({ carregando: false, })
      favoritos[index] = true;
      idFavoritos[index] = id;
      this.setState({ favoritos: favoritos, idFavoritos: idFavoritos })
      // alert("Favoritado")          
    }).catch(erro => {
      this.setState({ carregando: false })
      // alert("Erro ao favoritar")          
    })

  }

  async excluirFavorito(id, index) {

    if (this.state.favoritos[index] === false || this.state.idFavoritos[index] === null)
      return;

    const favoritos = this.state.favoritos;
    favoritos[index] = null;
    await this.setState({ favoritos: favoritos, indice: index })
    console.log(this.state.idFavoritos[index])

    db.doc(this.state.idFavoritos[index]).delete().then(apagou => {
      favoritos[index] = false;
      this.setState({ favoritos: favoritos })
    });

    // alert('Favorito Removido com Sucesso!');     
  }

  retornarGallery() {
    if (this.state.carregarFavoritos === null || this.state.url === null)
      return [];
    
    return this.state.url.map((url, index) => {
      let imovel = this.state.imovel[index];

      return (
        <div className="carrousel-container" key={index}>
          <img style={{ backgroundImage: `url(${url})` }} />
          <div className="descricao">
            <div className="div-fav-carrousel">
              <div>
                <span>A partir de </span>
                <h4 className="font-weight-light">{`R$ ${imovel.preco}`}</h4>
              </div>

              {this.state.favoritos[index] === null ?
                // <div className="row mx-auto">
                //   <Spinner
                //     sizeUnit={"px"}
                //     size={5}
                //     color={'#4d6d6d'}
                //   />
                // </div>
                null
                :
                <>
                  <i hidden={this.state.favoritos[index]} className="far fa-heart fa-2x heart" onClick={() => this.favoritarImovel(imovel.id, index)} />
                  <i hidden={!this.state.favoritos[index]} className="fas fa-heart fa-2x heart red" onClick={() => this.excluirFavorito(imovel.id, index)} />
                </>
              }
            </div>

            <h4>{imovel.imovel}</h4>
            <h6>{`${imovel.cidade} - ${imovel.bairro}`}</h6><br />
            <p>{`${imovel.imovel} com ${imovel.areaUtil}m² de área construída, ${imovel.areaTotal}m²
          de terreno, com ${imovel.quartos} quartos, possui ${imovel.banheiro} banheiro(s), 
          situado em ${imovel.rua} no bairro ${imovel.bairro}.`}</p>
            <hr className="my"></hr>
            <Link to={"/detalhesimovel/" + imovel.id} className="btn active float-right" role="button" aria-pressed="true">Mais Detalhes <i className="fas fa-angle-right"></i></Link>
          </div>
        </div>

      )
    })
  }

  onSlideChanged(e) {
    this.setState({indice: e.item});
  }

  render() {

    if (this.state.url === null)
      return (
        <div className="row mx-auto">
          <Spinner
            sizeUnit={"px"}
            size={15}
            color={'#4d6d6d'}
          />
        </div>
      );

    return (

      <div className="container courrosel">
        <AliceCarousel mouseTrackingEnabled
          buttonsDisabled={true}
          autoPlay={true}
          startIndex={this.state.indice}
          autoPlayInterval={8000}
          duration={1500}
          items={this.retornarGallery()}
          onSlideChanged={this.onSlideChanged}
        >


        </AliceCarousel>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { usuarioEmail } = state;

  return { usuarioEmail: usuarioEmail }
}

export default connect(mapStateToProps, null)(Carrousel);