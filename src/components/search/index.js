import React, { useState } from 'react';
import './search.css';

import { Link, Redirect } from 'react-router-dom';

// import Search from '../search'

const url = 'https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Fsearch-property.svg?alt=media&token=cbf60f70-567d-444f-b9d2-fb6528405fa3'
var string;

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirecionar: false,
      search: '',
      filtro1: 'Comprar',
      filtro2: 'Casa',
    }

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  submitForm(e) {
    this.setState({ redirecionar: true })
    e.preventDefault()

  }

  async handleChange(event) {
    const { name, value } = event.target;

    await this.setState({
      [name]: value,
    })

  }

  render() {
    var { handleChange, filters } = this.props;

    if (handleChange === undefined) {
      handleChange = this.handleChange;
      string = `${this.state.filtro1}&${this.state.filtro2}&${this.state.search}&`.split("&");
    } else {
      string = filters.split("&");
    }

    return (
      <div className="s003">
        <legend>ENCONTRE SEU NOVO LAR AQUI!</legend>
        {this.state.redirecionar ? this.props.funcaoBD === undefined ?
          <Redirect to={`/paginaPesquisa/${this.state.filtro1}&${this.state.filtro2}&${this.state.search}&`} />
          : <Redirect to={`/paginaPesquisa/${filters}`} /> : null}
        <form onSubmit={this.submitForm}>
          <div className="inner-form">
            <div className="input-field first-wrap" style={{ width: '160px' }}>
              <div className="input-select">
                <select data-trigger="" name="filtro1" onChange={handleChange} value={string[0]}>
                  <option>Comprar</option>
                  <option>Alugar</option>
                </select>
              </div>
            </div>
            <div className="input-field first-wrap" style={{ width: '160px' }}>
              <div className="input-select">
                <select data-trigger="" className="radius-0" name="filtro2" onChange={handleChange} value={string[1]}>
                  <option>Casa</option>
                  <option>Apartamento</option>
                  <option>Terreno</option>
                </select>
              </div>
            </div>
            <div className="input-field second-wrap">
              <input name="search" id="search" value={string[2]} type="text"
                placeholder="Busque um imóvel pela sua cidade" onChange={handleChange}

              />
            </div>
            <div className="input-field third-wrap" style={{ height: '50px' }}>
              <button type="submit" className="btn-search"
                onClick={() => {
                  if (this.props.funcaoBD !== undefined)
                    this.props.funcaoBD(filters)
                }}>
                <Link to={`/paginaPesquisa/${this.props.funcaoBD !== undefined ? filters : this.state.filtro1+this.state.filtro2+this.state.search }`}>
                  <img src={url} alt="" />
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    );

  }
}

export default Search;

