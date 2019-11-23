import React, {useState} from 'react';
import './detalhes-imovel.css';

import firebase from '../../config/firebase';

import {Link} from 'react-router-dom';

import { BounceLoader as Spinner } from 'react-spinners';

import { useSelector} from 'react-redux';


import Navbar from '../../components/navbar';


export default class DetalhesImovel extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            imovel: null,
            urlImg: [],
        }

        console.log(this.props.match.params.id)
        this.receberDoBd();
    }

    async receberDoBd() {
        await firebase.firestore().collection('imoveis').doc(this.props.match.params.id).get().then(async resultado => {
            this.setState({imovel: resultado.data()})
            console.log(this.state.imovel);

            var fotos = [];
            await this.state.imovel.foto.map(item => {
                firebase.storage().ref(`imagensImoveis/${item}`).getDownloadURL().then(url => { 
                    console.log(url);
                    fotos.push(url);
                    if(fotos.length === this.state.imovel.foto.length) {
                        this.setState({urlImg: fotos});
                    }
                });
            })


        })
    }

    render(props) {

        return (
            <>
                {this.state.imovel === null ? 
                    <center>
                        <Spinner
                            sizeUnit={"px"}
                            size={150}
                            color={'#4d6d6d'}
                        />
                    </center>
                    : 
                    <div>
                        {this.state.imovel.imovel}
                        {
                            this.state.urlImg.length === this.state.imovel.foto.length 
                            ? 
                            <>
                            {this.state.urlImg.map( (item, index) => {
                                console.log(item);
                                return (<img src={item} key={index}/>); 
                            })}
                            </>
                            :
                            null
                        }
                    </div>
                }
            </>
        );
    }
}