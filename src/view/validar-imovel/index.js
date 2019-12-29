import React from 'react';
import NavBar from '../../components/navbar';
import ImovelCard from '../../components/imovel-card';
import { PulseLoader as Spinner } from 'react-spinners';
import Footer from '../../components/footer';
import { connect } from 'react-redux';



class ValidarImovel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imoveis: this.props.location.state.imoveis,
        }
    }

    render() {

        return (
            <>
                <NavBar />
                <div className="container pb-5">
                    <div className="row p-2">
                        {this.state.imoveis.map((item, index) => {
                            return (
                                <>
                                    <ImovelCard id={item.id} key={index} img={item.foto} titulo={item.imovel}
                                        preco={item.preco}
                                        detalhes={item.rua} areaUtil={item.areaUtil}
                                        areaTotal={item.areaTotal} quartos={item.quartos}
                                        banheiros={item.banheiro} validar={true} visualizacoes={'1'} />
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

export default ValidarImovel;