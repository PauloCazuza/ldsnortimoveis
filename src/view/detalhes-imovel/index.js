import React, {useState} from 'react';
import './detalhes-imovel.css';

import firebase from '../../config/firebase';

import {Link} from 'react-router-dom';

import { BounceLoader as Spinner } from 'react-spinners';

import { useSelector} from 'react-redux';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";

import Navbar from '../../components/navbar';

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


export default class DetalhesImovel extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            imovel: null,
            urlImg: [],
            imagens: []
        }

        console.log(this.props.match.params.id)
        this.receberDoBd();
    }

    async receberDoBd() {

        await firebase.firestore().collection('imoveis').doc(this.props.match.params.id).get().then(async resultado => {
            this.setState({imovel: resultado.data()})
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
                    if(fotos.length === this.state.imovel.foto.length) {
                        this.setState({urlImg: fotos, imagens: images});
                    }
                });
            })


        })
    }

    render(props) {

        return (
            <>
              <Navbar />
                {this.state.imovel === null ? 
                    <center>
                        <Spinner
                            sizeUnit={"px"}
                            size={150}
                            color={'#4d6d6d'}
                        />
                    </center>
                    : 
                    <>
                        <div className="container-fluid p-2" style={{width: '50%'} }>
                          <ImageGallery items={this.state.imagens} showBullets autoPlay showPlayButton={ false  }/>
                        </div>
                        {this.state.imovel.imovel}
                        
                    </>
                }
            </>
        );
    }
}