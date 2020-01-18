import React, { useState } from 'react';
import './cadastrar-imovel.css';
import { Link, Redirect } from 'react-router-dom';
import { BounceLoader as Spinner } from 'react-spinners';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-input';

import firebase from '../../config/firebase';
import 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';

import home from './images/home.svg'
import location from './images/location.svg'
import description from './images/flags.svg'

import NavBar from '../../components/navbar';
import Footer from '../../components/footer';

import Axios from 'axios';


function CadastrarImovel() {

    const [cep, setCep] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [telefone, setTelefone] = useState("");
    const [complemento, setComplemento] = useState("");
    const [horarioDeContato, setHorarioDeContato] = useState("");
    const [imovel, setImovel] = useState();
    const [transacao, setTransacao] = useState();
    const [foto, setFoto] = useState([]);
    const [areaTotal, setAreaTotal] = useState();
    const [areaUtil, setAreaUtil] = useState();
    const [quartos, setQuartos] = useState();
    const [banheiro, setBanheiro] = useState();
    const [garagem, setGaragem] = useState();
    const [usuario, setUsuario] = useState(useSelector(state => state.usuarioEmail));
    const [preco, setPreco] = useState('Preço do Imovel');

    // MENSAGEM PARA O USUARIO
    const [msg, setMsg] = useState();

    // CONTROLE DO SPINNER
    const [carregando, setCarregando] = useState(false);

    // Recebendo JSON pelo Cep
    function receberPorCep(cep) {
        var cepString = "";
        if (cep.length === 10) {
            for (var i = 0; i < cep.length; i++)
                if (!isNaN(cep[i]))
                    cepString += cep[i];
            Axios.get(`https://viacep.com.br/ws/${cepString}/json/`).then(json => {
                const { data } = json;

                if (data.cep !== "")
                    setCep(data.cep);
                if (data.uf !== "")
                    setEstado(data.uf);
                if (data.localidade !== "")
                    setCidade(data.localidade);
                if (data.bairro !== "")
                    setBairro(data.bairro);
                if (data.logradouro !== "")
                    setRua(data.logradouro);

            }).catch(erro => {
                console.log('erro')
            })
        }
        
    }

    const storage = firebase.storage();
    const db = firebase.firestore();

    async function enviarFotos(foto, nomeDaFoto) {
        await storage.ref(`imagensImoveis/${nomeDaFoto}/`).put(foto).then(

        ).catch(erro => {
            console.log('Erro ao enviar a foto ', foto.name);
        });
    }

    function enviarImovel() {
        if (foto.length === 0)
            return alert("Não Há Imagem");

        setMsg(null);
        setCarregando(true);
        var nomesDasFotos = []

        Array.from(foto).forEach((item, index) => {
            nomesDasFotos[index] = (`${item.name} + ${new Date() - 0}`)
            enviarFotos(item, nomesDasFotos[index]);
        })

        db.collection('imoveis').add({
            usuario: usuario,
            cep: cep,
            estado: estado,
            cidade: cidade,
            bairro: bairro,
            rua: rua,
            numero: numero,
            telefone: telefone,
            complemento: complemento,
            horarioDeContato: horarioDeContato,
            imovel: imovel,
            transacao: transacao,
            foto: nomesDasFotos,
            areaTotal: areaTotal,
            areaUtil: areaUtil,
            quartos: quartos,
            banheiro: banheiro,
            preco: preco,
            garagem: garagem,
            criacao: new Date(),
            validar: 'NaoValidado',
        }).then(() => {
            setCarregando(false)
            setMsg('sucesso')
        }).catch(erro => {
            setCarregando(false)
            setMsg('erro')
        })
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="d-flex align-items-end pl-2 pt-4"> <img src={home} style={{ width: "45px" }} /> <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Publicar seu Imóvel</h4> </div>
                </div>
                <hr className="my"></hr>
                <form>
                    <div className="form-group row">
                        <div className="col-4">
                            <label>Imovel</label>
                            <select onChange={e => setImovel(e.target.value)} className="form-control">
                                <option disabled selected value>Selecione um Imóvel</option>
                                <option>Casa</option>
                                <option>Apartamento</option>
                                <option>Terreno</option>
                                <option>Galpão</option>
                            </select>
                        </div>

                        <div className="col-4">
                            <label>Transação</label>
                            <select onChange={e => setTransacao(e.target.value)} className="form-control">
                                <option disabled selected value>Selecione uma Transação</option>
                                <option>Vender</option>
                                <option>Alugar</option>
                            </select>
                        </div>

                        <div className="col-4">
                            <label>Foto Principal</label>
                            <input multiple onChange={e => { console.log(e.target.files); setFoto(e.target.files) }} type="file" className="form-control" />
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="d-flex align-items-end pl-2"> <img src={location} style={{ width: "45px" }} /> <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Localização do Imóvel</h4> </div>
                </div>
                <hr className="my"></hr>

                <form>
                    <div className="row">
                        <div className="col-4">
                            <label>CEP</label>
                            {/* <input type="text" onChange={ e => setCep(e.target.value)} value={cep} className="form-control" placeholder="00000 - 000"/> */}
                            <InputMask mask="99.999-999" maskChar=" " placeholder="00.000-000"
                                className="form-control" onChange={e => setCep(e.target.value)} value={cep} />
                        </div>

                        <div className="col-4">
                            <label>UF </label>
                            <input type="text" onChange={e => setEstado(e.target.value)} value={estado} className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Cidade</label>
                            <input type="text" onChange={e => setCidade(e.target.value)} value={cidade} className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <label>Bairro </label>
                            <input type="text" onChange={e => setBairro(e.target.value)} value={bairro} className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Rua</label>
                            <input type="text" onChange={e => setRua(e.target.value)} value={rua} className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Numero </label>
                            <input type="number" className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <label>Complemento</label>
                            <input onChange={e => setComplemento(e.target.value)} type="text" className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Telefone</label>
                            {/* <input type="text" onChange={ e => setTelefone(e.target.value)} className="form-control"/> */}

                            <InputMask mask="(99) 9 9999-9999" maskChar=" " placeholder="" className="form-control" onChange={e => setTelefone(e.target.value)} value={telefone} />
                        </div>

                        <div className="col-4">
                            <label>Horário para Contato</label>
                            <input type="time" onChange={e => setHorarioDeContato(e.target.value)} className="form-control" />
                        </div>
                    </div>
                </form>

                <div className="row">
                    <div className="d-flex align-items-end pl-2"> <img src={description} style={{ width: "45px" }} /> <h4 className="mt-4 ml-3 mb-0 display-3 title align-text-bottom">Descriçaõ do Imóvel</h4> </div>
                </div>
                <hr className="my"></hr>

                <form>
                    <div className="row">
                        <div className="col-4">
                            <label>Area Total</label>
                            <input type="number" onChange={e => setAreaTotal(e.target.value)} className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Area Útil </label>
                            <input type="number" onChange={e => setAreaUtil(e.target.value)} className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Quartos</label>
                            <input type="text" onChange={e => setQuartos(e.target.value)} className="form-control" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <label>Banheiros </label>
                            <input type="number" onChange={e => setBanheiro(e.target.value)} className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Garagens</label>
                            <input type="number" onChange={e => setGaragem(e.target.value)} className="form-control" />
                        </div>

                        <div className="col-4">
                            <label>Valor do Imóvel</label>
                            <CurrencyInput value={preco} onChangeEvent={e => setPreco(e.target.value)} className="form-control" decimalSeparator="," thousandSeparator="." />
                        </div>
                    </div>

                </form>

                {
                    carregando
                        ?
                        <center>
                            <Spinner
                                className=""
                                sizeUnit={"px"}
                                size={30}
                                color={'#123abc'}
                            />
                        </center>
                        :
                        <button type="button" onClick={enviarImovel} className="btn btn-lg btn-login my-4">Enviar</button>
                }


                {msg === 'sucesso' ? <span>Imovel enviado para a equipe Nortimoveis avaliar, aguarde o contato</span> : null}
                {msg === 'erro' ? <span>Ocorreu um erro ao enviar seu Imóvel</span> : null}
            </div>
            <Footer />
        </>
    );
}

export default CadastrarImovel;