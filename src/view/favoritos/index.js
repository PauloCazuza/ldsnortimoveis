import React from 'react';
import firebase from '../../config/firebase';
import NavBar from '../../components/navbar';
import ImovelCard from '../../components/imovel-card';
import { PulseLoader as Spinner } from 'react-spinners';
import Footer from '../../components/footer';

import { connect } from 'react-redux';

class Favoritos extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            listaImoveis: [],
            carregando: true,
        }

        this.receberIds = this.receberIds.bind(this);

        this.receberIds();
    }

    async receberIds() {
        var consulta = firebase.firestore().collection('favoritos');
        consulta = consulta.where('usuario', '==', this.props.usuarioEmail);
        var i = 0;
        var imoveis = [];
        await this.setState({carregando: true})

        consulta.get().then( async (resultado) => {
            
            if (resultado.docs.length === 0)
                return this.setState({carregando: false, mensagem: 'Sem resultados para a busca'});
            
            var tamanho = resultado.docs.length;
            
            await resultado.docs.forEach(async doc => {
                await firebase.firestore().collection('imoveis').doc(doc.data().id).get().then(async resultado => {
                    await imoveis.push({id: doc.data().id, ...resultado.data()})
                    i++;
                    if (tamanho === i) {
                        console.log('imoveis = ' + imoveis)
                        this.setState({listaImoveis: imoveis, carregando:false})
                    }
                })
            })

            
            
        }).then( ok => {

        })
    }

    

    render() {
        return(
            <>
                <NavBar />

                <div className="container">

				<div className="row p-2">
					
					{this.state.carregando 
					? 
					<div className="mx-auto">
						<Spinner
							sizeUnit={"px"}
							size={15}
							color={'#4d6d6d'}
						/>
					</div>
					:  
          <>
            <legend style={{ color: 'black', marginTop: '25px' }} >Seus Favoritos</legend>
						{this.state.listaImoveis.map( (item, index) => {
							return(
							<>
                                <ImovelCard id={item.id} key={index} img={item.foto} titulo={item.imovel} 
                                preco={item.preco}
                                detalhes={item.rua} areaUtil={item.areaUtil} 
                                areaTotal={item.areaTotal} quartos={item.quartos}
                                banheiros={item.banheiro} visualizacoes={'1'}/>
							</>
						)})} 
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
    const {usuarioEmail} = state;

	return { usuarioEmail: usuarioEmail}
}

export default connect( mapStateToProps,  null)(Favoritos);