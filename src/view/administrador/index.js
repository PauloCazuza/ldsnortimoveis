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
const interessesSolicitados = firebase.firestore().collection('interessesSolicitados');
const corretoresBd = firebase.firestore().collection('usuarios');
const feedbackImoveis = firebase.firestore().collection('feedbackImoveis');

export default class Administrador extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      listaImoveis: [],
      listaInteressesSolicitados: [],
      listaInteressesSolicitadosPorImovel: [],
      listaFeedbackDosCorretoresPorImovel: [],
      feedbackDosCorretores: [],
      corretoresCadastrados: [],
      carregando: false,
      contInteressados: 0,
      contFeedback: 0,
    }

    this.funcaoTeste = this.funcaoTeste.bind(this);
    this.receberDoBdImoveis = this.receberDoBdImoveis.bind(this);
    this.receberDoBdInteressesSolicitados = this.receberDoBdInteressesSolicitados.bind(this);
    this.receberCorretores = this.receberCorretores.bind(this);
    this.receberDoBdFeedbackImoveis = this.receberDoBdFeedbackImoveis.bind(this);
    this.receberDoBdFeedbackImoveis();
    this.receberCorretores();
    this.receberDoBdImoveis();
    this.receberDoBdInteressesSolicitados();
  }

  receberCorretores() {
    corretoresBd.where('tipoDePessoa', '==', 'corretor').get().then(async (resultado) => {
      let corretoresCadastrados = [];
      await resultado.docs.forEach(doc => {
        corretoresCadastrados.push({
          ...doc.data()
        })
      })
      console.log(corretoresCadastrados);
      this.setState({ corretoresCadastrados: corretoresCadastrados});
    }).catch(erro => {
      alert('Problema de Conexão');
      console.log(erro)
    })
  }

  receberDoBdImoveis() {
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

  receberDoBdInteressesSolicitados() {
    var cont = 0;
    interessesSolicitados.get().then(async (resultado) => {
      let listaInteressesSolicitadosPorImovel = [];
      let listaInteressesSolicitados = [];

      await resultado.docs.forEach(doc => {
        
        if (listaInteressesSolicitadosPorImovel[doc.data().idMovel] === undefined) {
          listaInteressesSolicitados.push({
            id: doc.id,
            ...doc.data()
          })
          listaInteressesSolicitadosPorImovel[doc.data().idMovel] = [];
          cont++;
          listaInteressesSolicitadosPorImovel[doc.data().idMovel].push({
            id: doc.id,
            ...doc.data()
          })
        } else {
          cont++;
          listaInteressesSolicitadosPorImovel[doc.data().idMovel].push({
            id: doc.id,
            ...doc.data()
          })
        }

      })
      //console.log(listaInteressesSolicitados);
      this.setState({ listaInteressesSolicitadosPorImovel: listaInteressesSolicitadosPorImovel, listaInteressesSolicitados: listaInteressesSolicitados, contInteressados: cont, carregando: false });
      // console.log(resultado.docs)
    }).catch(erro => {
      alert('Problema de Conexão');
      console.log(erro)
    })
  }

  receberDoBdFeedbackImoveis() {
    var cont = 0;
    feedbackImoveis.get().then(async (resultado) => {
      let listaFeedbackDosCorretoresPorImovel = [];
      let feedbackDosCorretores = [];

      await resultado.docs.forEach(doc => {
        
        if (listaFeedbackDosCorretoresPorImovel[doc.data().idImovel] === undefined) {
          feedbackDosCorretores.push({
            id: doc.id,
            ...doc.data()
          })
          listaFeedbackDosCorretoresPorImovel[doc.data().idImovel] = [];
          cont++;
          listaFeedbackDosCorretoresPorImovel[doc.data().idImovel].push({
            id: doc.id,
            ...doc.data()
          })
        } else {
          cont++;
          listaFeedbackDosCorretoresPorImovel[doc.data().idImovel].push({
            id: doc.id,
            ...doc.data()
          })
        }

      })
      //console.log(feedbackDosCorretores);
      this.setState({ listaFeedbackDosCorretoresPorImovel: listaFeedbackDosCorretoresPorImovel, feedbackDosCorretores: feedbackDosCorretores, contFeedback: cont, carregando: false });
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
                <CardOption link="/validarimovel" quant={this.state.listaImoveis.length} corretores={this.state.corretoresCadastrados} imoveis={this.state.listaImoveis} legenda="Validar Imóveis" funcaoDoCard={this.funcaoTeste} img={validarImovel} />
              </div>
              <div class="col-sm">
                <CardOption link="/interessessolicitados" quant={this.state.contInteressados} interessesSolicitados={this.state.listaInteressesSolicitados} interessesSolicitadosPorId={this.state.listaInteressesSolicitadosPorImovel} legenda="Interesses Solicitados" funcaoDoCard={this.funcaoTeste} img={interesse} />
              </div>
              <div class="col-sm">
                <CardOption link="/gerenciarcorretor" legenda="Gerenciar Corretores" corretores={this.state.corretoresCadastrados} funcaoDoCard={this.funcaoTeste} img={corretor} />
              </div>
            </div>
            <div class="row">
              <div class="col-sm pl-5">
                <CardOption link="/feedbackdecorretores" quant={this.state.contFeedback} interessesSolicitados={this.state.feedbackDosCorretores} interessesSolicitadosPorId={this.state.listaFeedbackDosCorretoresPorImovel} legenda="Feedback de Corretores" funcaoDoCard={this.funcaoTeste} img={feedback} />
              </div>
              <div class="col-sm pr-5">
                <CardOption link="" legenda="Relatórios" funcaoDoCard={this.funcaoTeste} img={relatorio} />
              </div>
            </div>
          </div>

        </div>
        <Footer />
      </>
    );
  }
} 