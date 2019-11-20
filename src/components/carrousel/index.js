import React from 'react';

import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css';

import './carrousel.css';

import { PulseLoader as Spinner } from 'react-spinners';

import {Link} from 'react-router-dom';

import firebase from '../../config/firebase';

export default class Carrousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      imovel: props.imovel,
      tam: props.imovel.length,
      url: null,
    }

    this.receberUrl = this.receberUrl.bind(this);

    this.receberUrl();
  }

  receberUrl() {

    var foto = [];
    var i = 0;

    this.state.imovel.map( async (item, index) => {
      
      await firebase.storage().ref(`imagensImoveis/${item.foto}`).getDownloadURL().then(function (url) { 
        foto[index] = url;
        i++;
      }.bind(this));

      if (i == this.state.tam)
        this.setState({url: foto});

    })  
  }
  
  render() {
    const handleOnDragStart = (e) => e.preventDefault();

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
        autoPlayInterval={8000}
        duration={1500}
        >
        
        { this.state.url.map((url, index) => { 
          let imovel = this.state.imovel[index];
          return( 
            <div className="carrousel-container" key={index}>
              <img  style={{ backgroundImage: `url(${url})` }} />
              <div className="descricao">
                <span>A partir de</span>
                <h4 className="font-weight-light">R$ 80.000,00</h4>
                <h4>{imovel.imovel}</h4>
                <h6>{`${imovel.cidade} - ${imovel.bairro}`}</h6><br/>
                <p>{`${imovel.imovel} com ${imovel.areaUtil}m² de área construída, ${imovel.areaTotal}m²
                de terreno, com ${imovel.quartos} quartos, possui ${imovel.banheiro} banheiro(s), 
                situado em ${imovel.rua} no bairro ${imovel.bairro}.`}</p>
                <hr class="my"></hr>
                <Link to={"/detalhesimovel/" + imovel.id }  class="btn active float-right" role="button" aria-pressed="true">Mais Detalhes <i class="fas fa-angle-right"></i></Link>
              </div>
            </div>
        
        )}) }   
        </AliceCarousel>
      </div>
    );
  }
}