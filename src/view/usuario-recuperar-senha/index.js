import React, {useState} from 'react';
import './usuario-recuperar-senha.css';

import {Link, Redirect} from 'react-router-dom';

import firebase from '../../config/firebase';
import 'firebase/auth';

import key from './images/key.svg'

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

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
                <div className="d-flex align-items-end pl-2 pt-5"> <img src={key} style={{ width: "45px" }}/> 
                <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Recuperar Senha</h4> </div>
                <hr className="my"></hr>

                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Em instantes</strong> você receberá um e-mail para a recuperação de sua senha.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
            </div>
            <div className="container mb-5">
                <form className="form-login mx-auto mt-5">
                    <div className="col-5">
                        <input type="email" 
                            onChange={ e => setEmail(e.target.value)} 
                            className="form-control" 
                            placeholder="exemplo@exemplo.com"
                        />
                        
                        <button 
                            type="button" 
                            onClick={recuperarSenha} 
                            className="btn btn-login">
                              Recuperar Senha
                        </button>
                    </div>

                    
                    
                    <div className="msg my-6">
                        <span> {msg} </span>
                    </div>
                </form>
            </div>
            <Footer/>
        </>
    );
}

export default RecuperarSenha;