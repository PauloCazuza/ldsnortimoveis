import React from 'react';
import NavBar from '../../components/navbar';
import ImovelCard from '../../components/imovel-card';
import { PulseLoader as Spinner } from 'react-spinners';
import Footer from '../../components/footer';
import { connect } from 'react-redux';

import validarImovel from '../administrador/images/valid-imovel.svg'

class ValidarImovel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imoveis: this.props.location.state.imoveis,
            corretores: this.props.location !== undefined ? this.props.location.state.corretores : null
        }
    }

    render() {

        return (
            <>
              <NavBar />
              <div className="container">
                <div className="d-flex align-items-end pl-2 pt-5"> <img src={validarImovel} style={{ width: "55px" }}/> 
                <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Validar Imóveis</h4> </div>
                <hr className="my"></hr>

                <div className="row p-2">
                  {this.state.imoveis.map((item, index) => {
                    return (
                        <>
                          <ImovelCard id={item.id} key={index} img={item.foto} titulo={item.imovel}
                              preco={item.preco} corretores={this.state.corretores}
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