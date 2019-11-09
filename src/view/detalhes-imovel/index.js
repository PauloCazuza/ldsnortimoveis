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
            urlImg: null,
        }

        console.log(this.props.match.params.id)
        this.receberDoBd();
    }

    receberDoBd() {
        firebase.firestore().collection('imoveis').doc(this.props.match.params.id).get().then(resultado => {
            this.setState({imovel: resultado.data()})
            console.log(this.state.imovel);

            firebase.storage().ref(`imagensImoveis/${this.state.imovel.foto}`).getDownloadURL().then(url => { 
                this.setState({urlImg: url})
            });
        })
    }

    render(props) {

        return (
            <>
                <div>
                    ok
                    <img src={this.state.urlImg} />
                </div>
            </>
        );
    }
}