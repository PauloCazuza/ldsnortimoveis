import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import firebase from '../../config/firebase';
import BasicTable from '../../components/tabel-filters';

const corretoresBd = firebase.firestore().collection('usuarios');

const columns = [
    {
        name: 'Nome',
        selector: 'nome',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Cpf',
        selector: 'cpf',
    },
    {
        name: 'Telefone',
        selector: 'telefone',
    },
];

class GerenciarCorretor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            email: '',
            cpf: '',
            telefone: '',
            corretoresCadastrados: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.enviarCorretor = this.enviarCorretor.bind(this);
        this.receberCorretores = this.receberCorretores.bind(this);
        this.receberCorretores();
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    receberCorretores() {
        corretoresBd.where('tipoDePessoa', '==', 'corretor').get().then(async (resultado) => {
          let corretoresCadastrados = [];
          await resultado.docs.forEach(doc => {
            corretoresCadastrados.push({
              ...doc.data()
            })
          })
    
          // console.log("ok deu certo");
          this.setState({ corretoresCadastrados: corretoresCadastrados});
          // console.log(resultado.docs)
        }).catch(erro => {
          alert('Problema de Conexão');
          console.log(erro)
        })
      }

    enviarCorretor(e) {
        e.preventDefault();
        const { nome, email, cpf, telefone } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, '123456').then(function () {
            corretoresBd.add({
                nome: nome,
                email: email,
                cpf: cpf,
                telefone: telefone,
                foto: 'default',
                tipoDePessoa: 'corretor'
            }).then((resultado) => {
                console.log(resultado)
                var corretoresCadastrados = this.state.corretoresCadastrados;
                corretoresCadastrados.push({
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    telefone: telefone,
                    foto: 'default',
                    tipoDePessoa: 'corretor'
                })
                this.setState({ nome: '', email: '', cpf: '', telefone: '', corretoresCadastrados: corretoresCadastrados })
                alert('Corretor Cadastrado com Sucesso');
                // alert("Favoritado")          
            }).catch(erro => {
                var errorMessage = erro.message;
                alert(errorMessage)
                // alert("Erro ao favoritar")          
            })
        }.bind(this))

    }

    render() {
        return (
            <>
                <Navbar />
                <center>
                    <h4>
                        Adiciona Corretor
                    </h4>
                </center>
                <form onSubmit={this.enviarCorretor}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <label>
                                    Nome
                                </label>
                            </div>
                            <div className="col-md-6">
                                <label>
                                    Email
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text" name="nome" className="form-control" onChange={this.handleChange} value={this.state.nome} />
                            </div>
                            <div className="col-md-6">
                                <input type="email" name="email" className="form-control" onChange={this.handleChange} value={this.state.email} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label>
                                    Telefone
                                </label>
                            </div>
                            <div className="col-md-4">
                                <label>
                                    CPF
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="number" name="telefone" className="form-control" onChange={this.handleChange} value={this.state.telefone} />
                            </div>
                            <div className="col-md-4">
                                <input type="text" name="cpf" className="form-control" onChange={this.handleChange} value={this.state.cpf} />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-lg"> Enviar </button>
                            </div>
                        </div>
                    </div>
                </form>
                {
                    this.state.corretoresCadastrados.length !== 0
                        ?
                        <div className="container my-2 border">
                            <BasicTable columns={columns} dados={this.state.corretoresCadastrados} titulo="Lista de Corretores" naoEncontrado={'Não foi possível encontrar nenhum corretor com essa busca!'} />
                        </div>
                        :
                        0
                }
                <Footer />
            </>
        );
    }
}

export default GerenciarCorretor;

