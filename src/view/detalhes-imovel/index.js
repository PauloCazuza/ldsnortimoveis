import React, { useState } from 'react';
import './detalhes-imovel.css';

import firebase from '../../config/firebase';

import location from './images/location.svg'
import area from './images/full-screen.svg'
import bathroom from './images/bathtub.svg'
import car from './images/car.svg'
import bed from './images/bed.svg'

import { Link } from 'react-router-dom';

import { PulseLoader as Spinner } from 'react-spinners';

import { useSelector } from 'react-redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";


import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { height } from 'window-size';

var images = [
  /*{
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  }, */
];

const db = firebase.firestore();

export default class DetalhesImovel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imovel: null,
      urlImg: [],
      imagens: [],
      telaCheia: false,
    }

    console.log(this.props.match.params.id)
    this.receberDoBd();
  }

  async receberDoBd() {

    await firebase.firestore().collection('imoveis').doc(this.props.match.params.id).get().then(async resultado => {
      this.setState({ imovel: resultado.data() })
      console.log(this.state.imovel);

      var fotos = [];
      var images = [];
      await this.state.imovel.foto.map(item => {
        firebase.storage().ref(`imagensImoveis/${item}`).getDownloadURL().then(url => {
          console.log(url);
          fotos.push(url);
          images.push({
            original: url,
            thumbnail: url,
          })
          if (fotos.length === this.state.imovel.foto.length) {
            this.setState({ urlImg: fotos, imagens: images });
          }
        });
      })


    })
  }

  validarImovel(validar) {
    db.collection('imoveis').doc(this.props.match.params.id).set({
      ...this.state.imovel,
      validar: validar,
    }).then(() => {
      alert("Foi Validado");
    }).catch(erro => {
      alert("Deu erro na validação");
    })
  }

  render(props) {
    let imovel = this.state.imovel;
    return (
      <>
        <Navbar />
        {this.state.imovel === null ?
          <center>
            <Spinner
              sizeUnit={"px"}
              // height={4}
              // width={100}
              size={15}
              margin={70}
              color={'#4d6d6d'}
            />
          </center>
          :
          <>
            <div className="container-fluid p-2 my-4 tam-fixo" style={{ width: '70%' }}>
              <ImageGallery items={this.state.imagens} showBullets autoPlay
                thumbnailPosition={"left"} showPlayButton={false}
              />
            </div>
            <div className="container-fluid banner-desc-imovel d-flex">

              <div className="desc">
                <p>{`${imovel.imovel} para comprar em`} </p>
                <div className="d-flex">
                  <p className="text-primary">{`${imovel.rua} - ${imovel.cidade}, ${imovel.estado} `}</p>
                  <img src={location} style={{ width: "20px", margin: "5px" }} /></div>
                <p className="mt-3">A PARTIR DE</p>
                <h1>{`R$ ${imovel.preco}`}</h1>
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column align-items-center">
                    <img src={area} style={{ width: "25px", margin: "5px" }} />
                    <p>{`${imovel.areaUtil} - ${imovel.areaTotal} m²`}</p>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <img src={bathroom} style={{ width: "25px", margin: "5px" }} />
                    <p>{`${imovel.banheiro} Suíte${imovel.banheiro > 1 ? 's' : ''}`}</p>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <img src={bed} style={{ width: "25px", margin: "5px" }} />
                    <p>{`${imovel.quartos} Quarto${imovel.quartos > 1 ? 's' : ''}`}</p>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <img src={car} style={{ width: "25px", margin: "5px" }} />
                    <p>{`${imovel.garagem} Vaga${imovel.garagem > 1 ? 's' : ''}`}</p>
                  </div>
                </div>
              </div>
              <div className="w-100 d-flex flex-columln align-items-center justify-content-around">
                <button type="button" className="btn btn-lg btn-login d-flex align-items-baseline">
                  TENHO INTERESSE <i class="far fa-thumbs-up ml-1"></i>
                </button>
                <img src={`http://api.qrserver.com/v1/create-qr-code/?data=${window.location.href}&size=150x150&format=svg`} alt="QRCode" />
              </div>
            </div>

            {this.props.location.state !== undefined && this.props.location.state.validar === true ?
              <>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <button type="button" onClick={ () => this.validarImovel("Validar")} className="btn btn-lg btn-login d-flex align-items-baseline">Validar Imovel</button>
                    <button type="button" onClick={ () => this.validarImovel("Excluido")} className="btn btn-lg btn-login d-flex align-items-baseline">Recusar Imovel</button>
                  </div>
                </div>
                </div>
              </>
              : null}

          </>
        }
        <Footer />
      </>
    );
  }
}