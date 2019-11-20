import React, {useState} from 'react';
import './search.css';

import {Link, Redirect} from 'react-router-dom';

// import Search from '../search'

const url = 'https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Fsearch-property.svg?alt=media&token=cbf60f70-567d-444f-b9d2-fb6528405fa3'

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirecionar: false,
    }

    this.submitForm = this.submitForm.bind(this);
  }


  submitForm (e) {
    this.setState({redirecionar: true})
  }
  
  render() {
    const {handleChange, filters} = this.props;
    var string = filters.split(",");

    return (
            <div class="s003">
              { this.state.redirecionar ? <Redirect to={`/paginaPesquisa/${filters}`} /> : null}
            <legend>ENCONTRE SEU NOVO LAR AQUI!</legend>
            <form onSubmit={this.submitForm}>
              <div class="inner-form">
                <div class="input-field first-wrap" style={{width: '160px'}}>
                  <div class="input-select">
                    <select data-trigger="" name="filtro1" onChange={handleChange} value={string[0]}>
                      <option>Comprar</option>
                      <option>Alugar</option>
                    </select>
                  </div>
                </div>
                <div class="input-field first-wrap" style={{width: '160px'}}>
                  <div class="input-select">
                    <select data-trigger="" name="filtro2" onChange={handleChange} value={string[1]}>
                      <option>Casa</option>
                      <option>Apartamento</option>
                      <option>Terreno</option>
                    </select>
                  </div>
                </div>
                <div class="input-field second-wrap">
                  <input name="search" id="search" value={string[2]} type="text" placeholder="Busque um imóvel pela sua cidade" onChange={handleChange} />
                </div>
                <div class="input-field third-wrap" style={{height: '50px'}}>
                    <button type="submit" class="btn-search">
                      <img src={url} alt=""/>
                    </button>
                </div>
              </div>
            </form>
            </div>
    );

  }
}

export default Search;

