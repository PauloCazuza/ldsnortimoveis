import React from 'react';
import NavBar from '../../components/navbar';
import ImovelCard from '../../components/imovel-card';
import { PulseLoader as Spinner } from 'react-spinners';
import Footer from '../../components/footer';
import { connect } from 'react-redux';
import CardImovelInteressados from '../../components/card-imovel-interessados';

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
                <div className="container-fluid pb-5 container-cinza">
                    <div className="row p-2">
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
                <Footer />
            </>
        );
    }
}

export default InteressesSolicitados;