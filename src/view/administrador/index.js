import React from 'react';
import Navbar from '../../components/navbar';
import CardOption from '../../components/card-option';
import Footer from '../../components/footer';
import './administrador.css';
import firebase from '../../config/firebase';

import validarImovel from './images/valid-imovel.svg'
import interesse from './images/deal.svg'
import relatorio from './images/contract.svg'
import feedback from './images/check-list.svg'
import corretor from './images/realtor.svg'

const db = firebase.firestore().collection('imoveis');

export default class Administrador extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listaImoveis: [],
      carregando: false,
    }

    this.funcaoTeste = this.funcaoTeste.bind(this);
    this.receberDoBD = this.receberDoBD.bind(this);
    this.receberDoBD();
  }

  receberDoBD() {
    db.where('validar', '==', 'NaoValidado').get().then(async (resultado) => {
      let listaImoveis = [];
      await resultado.docs.forEach(doc => {
        listaImoveis.push({
          id: doc.id,
          ...doc.data()
        })
      })

      // console.log("ok deu certo");
      this.setState({ listaImoveis: listaImoveis, carregando: false });
      // console.log(resultado.docs)
    }).catch(erro => {
      alert('Problema de Conexão');
      console.log(erro)
    })
  }

  funcaoTeste() {
    console.log("Teste")
  }

  render() {

    return (
      <>
        <Navbar />
        {/* Olá Administrador */}
        <div className="container-fluid py-5 container-cinza">
          <h4 className="pl-5"><strong>AÇÕES</strong></h4>
          <div class="container p-3">
            <div class="row">
              <div class="col-sm">
                <CardOption link="validarimovel" quant={this.state.listaImoveis.length} imoveis={this.state.listaImoveis} legenda="Validar Imóveis" funcaoDoCard={this.funcaoTeste} img={validarImovel} />
              </div>
              <div class="col-sm">
                <CardOption link="validarimovel" legenda="Interesses Solicitados" funcaoDoCard={this.funcaoTeste} img={interesse} />
              </div>
              <div class="col-sm">
                <CardOption link="validarimovel" legenda="Gerenciar Corretores" funcaoDoCard={this.funcaoTeste} img={corretor} />
              </div>
            </div>
            <div class="row">
              <div class="col-sm pl-5">
                <CardOption link="validarimovel" legenda="Feedback de Corretores" funcaoDoCard={this.funcaoTeste} img={feedback} />
              </div>
              <div class="col-sm pr-5">
                <CardOption link="validarimovel" legenda="Relatórios" funcaoDoCard={this.funcaoTeste} img={relatorio} />
              </div>
            </div>
          </div>

        </div>
        <Footer />
      </>
    );
  }
} 