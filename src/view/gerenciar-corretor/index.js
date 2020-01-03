import React from 'react';
import corretor from '../administrador/images/realtor.svg'
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import firebase from '../../config/firebase';
import BasicTable from '../../components/tabel-filters';
import { PulseLoader as Spinner } from 'react-spinners';
import './gerenciar-corretor.css'

const corretoresBd = firebase.firestore().collection('usuarios');


const columns = [
    {
        name: 'NOME',
        selector: 'nome',
        sortable: true,
    },
    {
        name: 'EMAIL',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'CPF',
        selector: 'cpf',
    },
    {
        name: 'TELEFONE',
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
                <div className="container-fluid container-cinza">
                  <div className="container">
                    <div className="d-flex align-items-end pl-2 pt-5"> <img src={corretor} style={{ width: "55px" }}/> 
                    <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Gerenciar Corretores</h4> </div>
                    <hr className="my"></hr>
                  </div>
                <form onSubmit={this.enviarCorretor}>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label>Nome </label>
                                <input type="text" name="nome" className="form-control" onChange={this.handleChange} value={this.state.nome} />
                            </div>

                            <div className="col">
                                <label>Email </label>
                                <input type="email" name="email" className="form-control" onChange={this.handleChange} value={this.state.email} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Telefone </label>
                                <input type="number" name="telefone" className="form-control" onChange={this.handleChange} value={this.state.telefone} />
                            </div>

                            <div className="col">
                                <label>CPF </label>
                                <input type="text" name="cpf" className="form-control" onChange={this.handleChange} value={this.state.cpf} />
                            </div>
                        </div>
                        <div className="row mb-5 float-right">
                            <div className="col-2">
                                <button className="btn btn-cheio">Adicionar Corretor <i class="fas fa-plus-circle"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
                {
                    this.state.corretoresCadastrados.length !== 0
                        ?
                        <div className="container pb-5">
                            <BasicTable columns={columns} dados={this.state.corretoresCadastrados} titulo="Lista de Corretores" naoEncontrado={'Não foi possível encontrar nenhum corretor com essa busca!'} />
                        </div>
                        :
                        <div className="container pb-5">
                          <div className="row p-2">
                            <div className="mx-auto">
                              <Spinner
                                sizeUnit={"px"}
                                size={15}
                                color={'#4d6d6d'}
                              />
                            </div>
                          </div>
                        </div>
                }
                </div>
                <Footer />
            </>
        );
    }
}

export default GerenciarCorretor;

