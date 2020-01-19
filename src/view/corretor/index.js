import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import ImovelCard from '../../components/imovel-card';
import firebase from '../../config/firebase';
import { connect } from 'react-redux';

import home from './images/home.svg';

const db = firebase.firestore().collection('imoveis');

class Corretor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listaImoveis: [],
            carregando: true,
        }

        this.receberDoBD = this.receberDoBD.bind(this);
        this.receberDoBD();
    }

    receberDoBD() {
        var listaImoveis = [];
        db.get().then(async (resultado) => {
            await resultado.docs.forEach(doc => {
                listaImoveis.push({
                    id: doc.id,
                    ...doc.data()
                })
            })

            console.log(listaImoveis);
            // console.log("ok deu certo");
            this.setState({ listaImoveis: listaImoveis, carregando: false });
            // console.log(resultado.docs)
        }).catch(erro => {
            alert('Problema de Conexão');
            console.log(erro)
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="container pb-2">
                    <div className="row p-2">
                            <div className="d-flex align-items-end pl-2 pt-4"> <img src={home} style={{ width: "45px" }} /> <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Seus imóveis</h4> </div>
                        </div>
                        <hr className="my"></hr>
                </div>

                <div className="container pb-5">
                    <div className="row p-2">
                        {
                            this.state.carregando
                                ?
                                <label>a</label>
                                :
                                <>

                                    {
                                        this.state.listaImoveis.map(item => {
                                            return (
                                                <>
                                                    <ImovelCard id={item.id} img={item.foto} titulo={item.imovel}
                                                        preco={item.preco}
                                                        detalhes={item.rua} areaUtil={item.areaUtil}
                                                        areaTotal={item.areaTotal} quartos={item.quartos}
                                                        banheiros={item.banheiro} visualizacoes={'1'} corretor={true} />
                                                </>
                                            );
                                        })
                                    }
                                </>
                        }
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const mapStateToProps = state => {
    const { usuarioLogado, usuarioEmail, usuarioFoto, usuarioNome, usuario, editado, pessoa } = state;

    return {
        usuarioLogado: usuarioLogado, usuarioEmail: usuarioEmail, pessoa: pessoa,
        usuarioFoto: usuarioFoto, usuarioNome: usuarioNome, usuario: usuario, editado: editado
    }
}

export default connect(mapStateToProps, null)(Corretor);