import React from 'react';

export default class CardOption extends React.Component {

    render() {
        const { nomeDoCard, funcaoDoCard } = this.props;
        return (
            <>
                <button className="btn btn-block btn-login" onClick={funcaoDoCard}>
                    {nomeDoCard}
                </button>
            </>
        );

    }
}