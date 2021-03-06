import React from 'react';
import './card-option.css'
import { Link } from 'react-router-dom';

export default class CardOption extends React.Component {

  render() {
    const { legenda, funcaoDoCard, corretores, img, link, quant, imoveis, interessesSolicitados, interessesSolicitadosPorId } = this.props;
    return (
      <>
        <Link to={{
          pathname: link,
          state: { imoveis: imoveis, cont: quant, corretores: corretores, interessesSolicitados: interessesSolicitados, interessesSolicitadosPorId: interessesSolicitadosPorId },
        }} className="card-option d-flex flex-column align-items-center justify-content-center" >
          <div className="content-logo">
            {quant !== undefined && quant > 0 ?
              <>
                <div className="notificacao">
                  <i class="far fa-bell"></i>
                  {quant}
                </div>
              </>
              : null}

            <img src={img} style={{ width: "70px" }} />
          </div>
          <legend className="legenda">
            {legenda}
          </legend>
        </Link>
      </>
    );

  }
}