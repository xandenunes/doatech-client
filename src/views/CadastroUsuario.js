import React, { useState } from 'react';
import Data from "../server/ServerRest"
import NotificationAlert from "react-notification-alert";
import Loading from 'variables/Loading';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const CadastroUsuario = (props) => {
  console.log("a");
  const dados = {
    nome: "",
    email: "",
    password: ""
  } 

  const [casdastro, setCasdastro] = useState(dados)
  
  const input = event => {
    const { name, value } = event.target;
    setCasdastro({ ...casdastro, [name]: value });
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Cadastro de Usuário</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label htmlFor="nome" >Nome</label>
                        <Input
                          autoFocus
                          name="nome" 
                          id="nome"
                          placeholder="Digite aqui"
                          type="text"
                          onChange={input}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>     
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label htmlFor="email">E-mail</label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Digite aqui"
                            type="email"
                            onChange={input}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="datadenascimento">Data de nascimento</label>
                        <Input
                          defaultValue=""
                          id="datadenascimento"
                          placeholder="Digite aqui"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label htmlFor="cep">CEP</label>
                        <Input onChange=""
                          placeholder="00000-000"
                          id="cep"
                          type="text"
                         
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                <Row>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="bairro">Nome do bairro</label>
                        <Input
                          defaultValue=""
                          id="bairro"
                          placeholder="Digite aqui"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label htmlFor="rua" >Nome da rua</label>
                        <Input
                          defaultValue=""
                          id="rua"
                          placeholder="Rua amazonas,143"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label htmlFor="senha">Senha</label>
                        <Input
                          defaultValue=""
                          id="senha"
                          placeholder="Digite aqui"
                          type="password"
                        />
                      </FormGroup>
                        </Col>
                        <Col md="6">
                      <FormGroup>
                        <label htmlFor="repitaasenha">Repita a senha</label>
                        <Input
                          defaultValue=""
                          id="repitaasenha"
                          placeholder="Digite aqui"
                          type="password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                                  
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Cadastrar
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
    );
}

export default CadastroUsuario;
