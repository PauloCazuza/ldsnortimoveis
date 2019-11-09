import React, {useState} from 'react';
import './usuario-recuperar-senha.css';

import {Link, Redirect} from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth';

import Navbar from '../../components/navbar';

function RecuperarSenha() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();

    function recuperarSenha() {
        firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setMsg('Enviamos um link para seu email para redefinir sua senha');
    }).catch(erro => {
        setMsg('Verifique se seu email está correto');
    })
    }

    return (
        <>
            <Navbar />

            <div className="container">
                <form className="text-center form-login mx-auto mt-5">
                    <h3>Recuperar Senha</h3>
                    <input type="email" onChange={ e => setEmail(e.target.value)}className="form-control my-2" placeholder="exemplo@exemplo.com"/>

                    <button onClick={recuperarSenha} type="button" className="btn btn-lg btn-block btn-enviar">
                        Recuperar Senha
                    </button>
                    
                    <div className="msg my-6">
                        <span> {msg} </span>
                    </div>
                </form>
            </div>

        </>
    );
}

export default RecuperarSenha;