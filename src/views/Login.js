import React, { useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    FormGroup,
    Form,
    Input,
    Label
  } from "reactstrap";
import Data from "../server/ServerRest"
import "../assets/css/level.css"
import NotificationAlert from "react-notification-alert";
import Loading from 'variables/Loading';


const Login = (props) => {
    const dados = {
        email: "",
        password: ""
    }    
    const [login, setLogin] = useState(dados)
    const [modal, setModal] = useState(false);
    const [cadastro, setCadastro] = useState(false);
    const [logado, setLogado] = useState(false)
    const [loading, setLoading] = useState(false)

    const redirecionar = (e) => {
        props.history.push('/admin/publish')
    }
    const toggle = () => { setModal(!modal) };

    const handleInput = event => {
        const { name, value } = event.target;
        setCadastro({ ...cadastro, [name]: value });
      };

    const input = event => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    };
    
    if(logado == false){
        localStorage.clear()
    }

    const cadastrando =()=>{
        const pessoa = {
            pes_id_pessoa:null,
            nome: cadastro.nome.concat(cadastro.sobrenome),
            idade: cadastro.idade,
            endereco: cadastro.endereco,
            telefone: cadastro.telefone,
        }
        console.log(pessoa);
          Data.createPessoa(pessoa)
            .then(response => {
                const usuario = {
                    usr_id_usuario: null,
                    login: cadastro.email,
                    email: cadastro.email,
                    password: cadastro.password,
                    tipousuario: { tpu_id_tipo_usuario: 2 },
                    pessoa: { pes_id_pessoa:response.data.pes_id_pessoa}
                }
                console.log(usuario);
                Data.createUsuarios(usuario)
                .then(response => {
    
                  notify("tc","sucess","Cadastrado com sucesso");
                  toggle()
                })
                .catch(e => {
                    notify("tc","danger","Algo deu errado");
                  console.log(e);
                })
            })
            .catch(e => {
                notify("tc","danger","Algo deu errado");
              console.log(e);
            })
    }

    const Get = () => {
        var usuario ={
            login: login.email,
            password: login.password
        }
        setLoading(true)
        Data.loginUsuarios(usuario)
            .then(response => {
                setLoading(false)
                if (response.data.login === usuario.login) {
                    localStorage.setItem("dados", JSON.stringify(response.data));
                    return redirecionar();
                }else{
                    notify("tc","danger","E-mail ou senha Incorreta!");
                }
                
            })
            .catch(e => {
                console.log(e)
            })
            
    }
    const notificationAlert = React.useRef();
    const notify = (place, color,msg) => {
        var options = {};
        options = {
        place: place,
        message: (
            <div>
            <div>
                {msg}
            </div>
            </div>
        ),
        type: color,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 5,
    };
    notificationAlert.current.notificationAlert(options);
    }
    
    return ( 
        <div className="content">
            {!loading ? (
                <Col className="mx-auto" md="4">
                    <NotificationAlert ref={notificationAlert} />
                    <Card className="card-user">
                        
                        <Form>
                            <div>
                                <div>
                                    <p className="text-center m-3">Entre com a sua conta.</p>
                                </div>
                                <div className="m-3">
                                    <label htmlFor="email">
                                        Email address
                                    </label>
                                    <Input placeholder="Email" type="email" id="email" name="email"  onChange={input} />
                                </div>
                                <div className="m-3">
                                    <label htmlFor="password">
                                        Password
                                    </label>
                                    <Input placeholder="Password" type="password" name="password"  id="password"  onChange={input} />
                                </div>
                                <div className="w-50 mx-auto my-4">
                                    <Button
                                        className="btn-round btn-block"
                                        color="primary"
                                        onClick={Get}
                                    >
                                        Login
                                    </Button>
                                </div>
                                <p class="mt-4 text-sm text-center">
                                    Não tem conta?
                                    <a onClick={toggle} class="text-primary text-gradient font-weight-bold">Cadastre-se</a>
                                </p>
                            </div>
                        </Form>
                    </Card>
                </Col>            
            ) : (
                <Loading/>
            )}
            {/*------------ Modal ----------*/}
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Cadastre-se</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="nome">Nome</Label>
                  <Input type="text" name="nome" id="nome" onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="sobrenome">Sobrenome</Label>
                  <Input type="text" name="sobrenome" id="sobrenome" onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="telefone">Telefone</Label>
                  <Input type="text" name="telefone" id="telefone" placeholder="98002-8922" onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="idade">Idade</Label>
                  <Input type="text" name="idade" id="idade" placeholder="21" onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="endereco">Endereço</Label>
                  <Input type="text" name="endereco" placeholder="Pituba-Rua amazonas,143" id="endereco" onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input type="email" name="email" id="email" onChange={handleInput}/>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Senha</Label>
                  <Input type="password" name="password" id="password" onChange={handleInput}/>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => { cadastrando() }}>Cadastro</Button>
              <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </div>
        </div>
);
}

export default Login; 