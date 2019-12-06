import React from 'react';
import scorpion from './images/team-scorpion.svg'
import './footer.css';

function Footer() {
  const urlLogo = 'https://firebasestorage.googleapis.com/v0/b/ldsnortimoveis.appspot.com/o/imagensSistema%2Flogo-moderna.svg?alt=media&token=4e067975-927c-4824-9f76-62d12d9ed81b'
	return (
    <div className="container-fluid p-5 footer m-0">
				<div className="row flex-sm-row">
				<div className="col-sm d-flex">

					<div className="d-flex flex-column justify-content-start">
					  <div className="logo-footer">
              <img src={urlLogo} />
            </div>
            <p className="p-footer my-0">Rua José de Alencar, 063, próximo ao restaurante Lanche Bem - Pedrinhas - Sobral</p>
            <p className="p-footer my-0">(88) 4002-8922 / (88) 99610-9535 / (88) 99727-3740 | <b><a href="#">norteimoveis@contato.com.br</a></b></p>
					</div>
				</div>
				
      </div>
      <hr className="my"></hr>
      <img className="float-right" src={scorpion} style={{ height: "25px"}}/>
    </div>
	);
}

export default Footer;