import React from 'react';
import Navbar from '../../components/navbar';
import CardOption from '../../components/card-option';
import Footer from '../../components/footer';
import './administrador.css'

import validarImovel from './images/valid-imovel.svg'
import interesse from './images/deal.svg'
import relatorio from './images/contract.svg'
import feedback from './images/check-list.svg'
import corretor from './images/realtor.svg'

export default class Administrador extends React.Component {

    constructor(props) {
        super(props);

        this.funcaoTeste = this.funcaoTeste.bind(this);
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
                        <CardOption legenda="Validar Imóveis" funcaoDoCard={this.funcaoTeste} img={validarImovel}/>
                      </div>
                      <div class="col-sm">
                      <CardOption legenda="Interesses Solicitados" funcaoDoCard={this.funcaoTeste} img={interesse}/>
                      </div>
                      <div class="col-sm">
                        <CardOption legenda="Gerenciar Corretores" funcaoDoCard={this.funcaoTeste} img={corretor}/>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm pl-5">
                        <CardOption legenda="Feedback de Corretores" funcaoDoCard={this.funcaoTeste} img={feedback}/>
                      </div>
                      <div class="col-sm pr-5">
                        <CardOption legenda="Relatórios" funcaoDoCard={this.funcaoTeste} img={relatorio}/>
                      </div>
                    </div>
                  </div>

                </div>
                <Footer/>
            </>
        );
    }
} 