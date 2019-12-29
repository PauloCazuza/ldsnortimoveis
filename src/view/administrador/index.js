import React from 'react';
import Navbar from '../../components/navbar';
import CardOption from '../../components/card-option';

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
                Olá Administrador
                <div className="container">
                    <CardOption nomeDoCard="Botao Teste" funcaoDoCard={this.funcaoTeste} />
                </div>
            </>
        );
    }
} 