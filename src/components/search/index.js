import React, {useState} from 'react';
import './search.css';

import {Link} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

// import Search from '../search'

const url = 'https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Fsearch-property.svg?alt=media&token=cbf60f70-567d-444f-b9d2-fb6528405fa3'

function Search() {

	return (
          <div class="s003">
          <legend>ENCONTRE SEU NOVO LAR AQUI!</legend>
          <form>
            <div class="inner-form">
              <div class="input-field first-wrap">
                <div class="input-select">
                  <select data-trigger="" name="choices-single-defaul">
                    <option placeholder="">Filtros</option>
                    <option>New Arrivals</option>
                    <option>Sale</option>
                    <option>Ladies</option>
                    <option>Men</option>
                  </select>
                </div>
              </div>
              <div class="input-field second-wrap">
                <input id="search" type="text" placeholder="Encontre seu imóvel" />
              </div>
              <div class="input-field third-wrap">
                <button class="btn-search" type="button">
                  <img src={url} alt=""/>
                </button>
              </div>
            </div>
          </form>
          </div>
	);
}

export default Search;

