import React from 'react';
import firebase from '../../config/firebase';
import Search from '../../components/search';
import NavBar from '../../components/navbar';
import ImovelCard from '../../components/imovel-card';
import { PulseLoader as Spinner } from 'react-spinners';
import Footer from '../../components/footer';

const db = firebase.firestore().collection('imoveis');

class paginaPesquisa extends React.Component {

    constructor(props) {
        super(props);

        var string = this.props.match.params.filters.split("&");

        this.state = {
            filtro1: string[0],
            filtro2: string[1],
            search: string[2],
            relevancia: '',
            quarto1: false,
            quarto2: false,
            quarto3: false,
            quarto4: false,
            banheiro1: false,
            banheiro2: false,
            banheiro3: false,
            banheiro4: false,
            garagem0: false,
            garagem1: false,
            garagem2: false,
            garagem3: false,
            listaImoveis: [],
            backup: [],
            listaFiltrados: [],
            carregando: true,
            mensagem: ''
        }

        this.receberDoBD = this.receberDoBD.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.receberDoBD();
    }

    receberDoBD(string = this.props.match.params.filters ) {
      this.setState({carregando: true, mensagem: ''});
      string = string.split("&");
      var filtro1 = string[0];
      var filtro2 = string[1];
      var search = string[2];
      var relevancia = string[3];
      var cont = 0;
      
      this.setState({listaImoveis: []})

      if (filtro1 === "Comprar")
          filtro1 = "Vender";

      var consulta = firebase.firestore().collection('imoveis');

      if (search !== "") {
          search = search[0].toUpperCase() + search.substring(1,search.length).toLowerCase()
          consulta = consulta.where('cidade', '==', search);
      }
      
      if (filtro1 !== "" && filtro1 !== "Filtros")
          consulta = consulta.where('transacao', '==', filtro1);

      if (filtro2 !== "" && filtro2 !== "Filtros")
          consulta = consulta.where('imovel', '==', filtro2);
      
      if (relevancia === "Menor Preço") {
        console.log("Menor Preço")
        consulta = consulta.orderBy('preco', 'asc');
      }

      if (relevancia === "Maior Preço") {
        console.log("Maior Preço")
        consulta = consulta.orderBy('preco', 'desc');
      }

      consulta.get().then( async (resultado) => {
        let listaImoveis = [];
        
        if (resultado.docs.length === 0)
            return this.setState({carregando: false, mensagem: 'Sem resultados para a busca'});

        await resultado.docs.forEach(doc => {
            cont++;
            listaImoveis.push({
              id: doc.id,
              ...doc.data()
            })
        })
        
        console.log("ok deu certo");

        await this.setState({listaImoveis: listaImoveis, backup: listaImoveis, carregando: false, mensagem: `Total: ${cont}`});
        console.log(resultado.docs)
      }).catch(erro => {
        alert('Problema de Conexão');
        console.log(erro)
        this.setState({carregando: false, mensagem: 'Sem resultados para a busca'})
      })
	}

    async handleChange(event) {
    const {name, value, type, checked} = event.target;

    console.log(event.target.value)

    await this.setState({
      [name]: type === "checkbox" ? value == "false" ? true : false : value
    })
    if (type === "checkbox")
      this.consultaOffline();
    }
    
    async consultaOffline() {
      const {quarto1, quarto2, quarto3, quarto4, banheiro1, banheiro2, banheiro3, banheiro4,
      garagem0, garagem1, garagem2, garagem3} = this.state;
      const imoveisFiltrados = [];
      var i, cont = 0, quarto = false, banheiro: false, garagem: false;
      
      if (quarto1 === true || quarto2 === true || quarto3 === true || quarto4 === true)
        quarto = true;
      if (banheiro1 === true || banheiro2 === true || banheiro3 === true || banheiro4 === true)
        banheiro = true;
      if (garagem0 === true || garagem1 === true || garagem2 === true || garagem3 === true)
        garagem = true;
      
      if (!quarto && !banheiro && !garagem)
        return this.setState({listaImoveis: this.state.backup, carregando: false,  mensagem: "Total: " + this.state.backup.length});
      
      await this.setState({carregando: true, listaImoveis: []})

      for (i = 0; i < this.state.backup.length; i++) {
          console.log(this.state.backup[i].quartos)
          if (quarto1 && this.state.backup[i].quartos == 1) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            console.log(this.state.backup[i])
            continue;
          }
          if ((quarto2) && this.state.backup[i].quartos == 2) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (quarto3 && this.state.backup[i].quartos == 3) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (quarto4 && this.state.backup[i].quartos >= 4) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (banheiro1 && this.state.backup[i].banheiro == 1) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (banheiro2 && this.state.backup[i].banheiro == 2) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (banheiro3 && this.state.backup[i].banheiro == 3) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (banheiro4 && this.state.backup[i].banheiro >= 4) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (garagem0 && this.state.backup[i].garagem == 0) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (garagem1 && this.state.backup[i].garagem == 1) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (garagem2 && this.state.backup[i].garagem == 2) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
          if (garagem3 && this.state.backup[i].garagem >= 3) {
            imoveisFiltrados[cont] = (this.state.backup[i]);
            cont++;
            continue;
          }
      }


      setTimeout(() => {
        this.setState({listaImoveis: imoveisFiltrados, carregando: false, mensagem: "Total: " + cont})
      }, 1000); 

    }


    render() {

        return (
            <>
            <NavBar />
            <Search handleChange={this.handleChange} 
              filters=
              {`${this.state.filtro1}&${this.state.filtro2}&${this.state.search}&${this.state.relevancia}`}
              funcaoBD={this.receberDoBD}
            />	
			
            <div className="container mb-5">
                <div className="row float-right">
                    {this.state.mensagem}
                </div>
                <div className="row">
                    <div className="col-md-3 border p-3 filtro">
                        <h4 class="text-muted">Filtros selecionados</h4>

                        <h5 className="mt-3">Organizar</h5>
                        <select class="form-control" id="exampleFormControlSelect1" name="relevancia" onChange={this.handleChange}>
                          <option>Relevância</option>
                          <option>Menor Preço</option>
                          <option>Maior Preço</option>
                        </select>
                        
                        <h5 className="mt-3">Bairros</h5>
                        <select class="form-control" id="exampleFormControlSelect1">
                          <option>Pedrinhas</option>
                          <option>Alto do Cristo</option>
                          <option>Coab II</option>
                        </select>

                        <h5 className="mt-3">Quartos</h5>
                        <div className="grupo bg-light px-2">
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="quarto1" value={this.state.quarto1} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 1 quarto</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="quarto2" value={this.state.quarto2} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 2 quartos</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="quarto3" value={this.state.quarto3} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 3 quartos</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="quarto4" value={this.state.quarto4} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 4 quartos ou mais</label>
                          </div>
                        </div>

                        <h5 className="mt-3">Banheiros</h5>
                        <div className="grupo bg-light px-2">
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="banheiro1" value={this.state.banheiro1} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 1 banheiro</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="banheiro2" value={this.state.banheiro2} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 2 banheiros</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="banheiro3" value={this.state.banheiro3} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 3 banheiros</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="banheiro4" value={this.state.banheiro4} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 4 banheiros ou mais</label>
                          </div>
                        </div>

                        <h5 className="mt-3">Garagens</h5>
                        <div className="grupo bg-light px-2">
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="garagem0" value={this.state.garagem0} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> Sem garagem</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="garagem1" value={this.state.garagem1} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 1 garagem</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="garagem2" value={this.state.garagem2} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 2 garagens</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="garagem3" value={this.state.garagem3} id="" onChange={this.handleChange} />
                            <label htmlFor="" className="m-0 ml-1"> 3 garagens ou mais</label>
                          </div>
                        </div>

                    </div>
                    <div className="col-md-9">
                        <div className="row mx-2">
                            {this.state.carregando ?
                                        <div className="mx-auto">
                                            <Spinner
                                                sizeUnit={"px"}
                                                size={15}
                                                color={'#4d6d6d'}
                                            />
                                        </div>
                                    : this.state.listaImoveis.map( (item, index) => (
                                        <>
                                        <ImovelCard md="col-md-4 px-2" id={item.id} key={index} img={item.foto} titulo={item.imovel} 
                                        detalhes={item.rua} areaUtil={item.areaUtil} 
                                        areaTotal={item.areaTotal} quartos={item.quartos}
                                        banheiros={item.banheiro} visualizacoes={'1'}/>
                                        </>
                                    ))}
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer/>
            </>
        );
    }
}

export default paginaPesquisa;