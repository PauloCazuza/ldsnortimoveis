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

        var string = this.props.match.params.filters.split(",");

        this.state = {
            filtro1: string[0],
            filtro2: string[1],
            search: string[2],
            listaImoveis: [],
            carregando: true,
            mensagem: ''
        }

        this.receberDoBD = this.receberDoBD.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.receberDoBD();
    }

    receberDoBD() {
      this.setState({carregando: true, mensagem: ''});
      var {filtro1, filtro2, search} = this.state;
      var cont = 0;

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
        this.setState({listaImoveis: listaImoveis, carregando: false, mensagem: `Total: ${cont}`});
        console.log(resultado.docs)
      }).catch(erro => {
        alert('Problema de Conexão');
        console.log(erro)
      })
	}

    handleChange(event) {
		const {name, value} = event.target;

		this.setState({
			[name]: value
		})
	}

    render() {

        return (
            <>
            <NavBar />
            <Search handleChange={this.handleChange} filters={`${this.state.filtro1},${this.state.filtro2},${this.state.search},`}/>	
			
            <div className="container mb-5">
                <div className="row float-right">
                    {this.state.mensagem}
                </div>
                <div className="row">
                    <div className="col-md-3 border p-3 filtro">
                        <h4 class="text-muted">Filtros selecionados</h4>

                        <h5 className="mt-3">Organizar</h5>
                        <select class="form-control" id="exampleFormControlSelect1">
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
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 1 quarto</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 2 quartos</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 3 quartos</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 4 quartos ou mais</label>
                          </div>
                        </div>

                        <h5 className="mt-3">Banheiros</h5>
                        <div className="grupo bg-light px-2">
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 1 banheiro</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 2 banheiros</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 3 banheiros</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 4 banheiros ou mais</label>
                          </div>
                        </div>

                        <h5 className="mt-3">Garagens</h5>
                        <div className="grupo bg-light px-2">
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> Sem garagem</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 1 garagem</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
                            <label htmlFor="" className="m-0 ml-1"> 2 garagens</label>
                          </div>
                          <div className="d-flex align-items-center"> 
                            <input type="checkbox" name="" id=""/>
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