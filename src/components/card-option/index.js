import React from 'react';
import './card-option.css'
import { Link } from 'react-router-dom';

export default class CardOption extends React.Component {

  render() {
    const { legenda, funcaoDoCard, img, link, quant, imoveis } = this.props;
    return (
      <>
        <Link to={{
          pathname: link,
          state: {imoveis: imoveis},
        }} className="card-option d-flex flex-column align-items-center justify-content-center" >
          {quant !== undefined && quant > 0 ?
            <>
              {quant}
            </>
            : null}
          <div className="content-logo">
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