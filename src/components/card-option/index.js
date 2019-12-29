import React from 'react';
import './card-option.css'

export default class CardOption extends React.Component {

    render() {
        const { legenda, funcaoDoCard, img } = this.props;
        return (
            <>
              <div className="card-option d-flex flex-column align-items-center justify-content-center" onClick={funcaoDoCard}>   
                  <div className="content-logo">
                    <img src={img} style={{ width: "70px" }}/>
                  </div>
                  <legend className="legenda">
                    {legenda}
                  </legend>
              </div>
            </>
        );

    }
}