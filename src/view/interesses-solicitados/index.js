import React from 'react';
import NavBar from '../../components/navbar';
import ImovelCard from '../../components/imovel-card';
import { PulseLoader as Spinner } from 'react-spinners';
import Footer from '../../components/footer';
import { connect } from 'react-redux';
import CardImovelInteressados from '../../components/card-imovel-interessados';
import './interesses-solicitados.css'

import solicitacoesImovel from '../administrador/images/deal.svg'

class InteressesSolicitados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            interessesSolicitados: this.props.location.state.interessesSolicitados,
            interessesSolicitadosPorId: this.props.location.state.interessesSolicitadosPorId,
            quant: this.props.location.state.cont,
        }


        console.log(this.props.location.state.interessesSolicitadosPorId)
    }

    render() {

        return (
            <>
                <NavBar />
                <div className="container pb-5">
                  <div className="container">
                    <div className="d-flex align-items-end pl-2 pt-5"> <img src={solicitacoesImovel} style={{ width: "55px" }}/> 
                    <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Solicitações de Imóveis</h4> </div>
                    <hr className="my"></hr>
                    
                    <div className="row p-2 content-card-solicitacao">
                        {this.state.interessesSolicitados.map((item, index) => {
                            return (
                                <>
                                    <CardImovelInteressados
                                        id={item.idMovel} solicitacoes={this.state.interessesSolicitadosPorId[item.idMovel].length}
                                        interessados={this.state.interessesSolicitadosPorId[item.idMovel]}
                                    />
                                </>
                            )
                        })}
                    </div>
                  </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default InteressesSolicitados;