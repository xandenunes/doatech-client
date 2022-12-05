/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
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

import ServerRest from "server/ServerRest";
import "../assets/css/level.css"
import icons from "variables/icons";
import { PublicacoesContext } from "context/PublicacoesContext";

function User() {

  useLayoutEffect(() => {
    obterUsuario()
    categoria()
  }, [])

  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('dados')))
  const [modal, setModal] = useState(false);
  const [materialPublicado, setMaterialPublicado] = useState('')
  const [publish, setPublish] = useContext(PublicacoesContext)
  const [cor, setCor] = useState([])
  const [pessoa, setPessoa] = useState([])

  const cors = [
    { id: 3, name: "perifericos", cor: "#EC7063" },
    { id: 1, name: "acessorios", cor: "#283747" },
    { id: 2, name: "peças", cor: "#F7DC6F" },
]
  const categoria = () =>{
    ServerRest.getAllLixos().
    then(response =>{
        setCor(response.data)
    }).catch((e)=>{
        console.log(e)
    })
  }
  const pegarCor = (item) => {
    for (let index = 0; index < cors.length; index++) {
      if (cors[index].name == item.material.titulo_material) {
        return cors[index].cor
      }
    }
  }

  const atualizarPublish = (publicacao)=>{
    var temporaria = publish.map((item)=>{
      if (item.idmaterial_publicado == publicacao.idmaterial_publicado){
        return publicacao;
      } else{
        return item;
      }
    })

    setPublish(temporaria);
  }

  // Deletando publicação filtrando por id.
  const deletarPublish = (publicacao) =>{
    var temporaria = publish.filter((item)=>{
      return item.idmaterial_publicado != publicacao.idmaterial_publicado;
    })
    setPublish(temporaria);
  }

  // const listaPublicacoes = usuario.publicacoes.map((publicacao) => {
  //   const material = {
  //     idmaterial_publicado: publicacao.idmaterial_publicado,
  //     imgURL: publicacao.imgURL,
  //     titulo: publicacao.titulo,
  //     descricao: publicacao.descricao,
  //     telefone: publicacao.telefone,
  //     status: publicacao.status,
  //     material: publicacao.material,
  //     data: publicacao.data,
  //     usuario: { idusuario: usuario.idusuario }
  //   }
  //   return material
  // })

  const obterUsuario = () => {
    ServerRest.getUsuarios(usuario.usr_id_usuario)
      .then(response => {
        setUsuario(response.data)
        setPessoa(response.data.pessoa)
        localStorage.setItem("dados", JSON.stringify(response.data))
      })
      .catch(e => { console.log("Erro ao obter usuario."); })
  }

  const removerPublicacao = (item) => {
    if (window.confirm("Deseja realmente apagar a publicação?")) {
      ServerRest.removePublicacao(item.idmaterial_publicado)
        .then(response => {
          obterUsuario()
          window.alert("Exclusão bem sucedida.")
          localStorage.setItem("dados", JSON.stringify(usuario))
          deletarPublish(item)
        })
        .catch(e => {
          console.log(e);
          window.alert("Erro ao excluir a publicacao")
        })
    }
  }

  const handleInput = event => {
    const { name, value } = event.target;
    setMaterialPublicado({ ...materialPublicado, [name]: value });
  };

  const toggle = () => { setModal(!modal) };

  const atualizarPublicacao = () => {
    ServerRest.updatePublicacao(materialPublicado.idmaterial_publicado, materialPublicado)
      .then(response => {
        obterUsuario()
        window.alert("Material alterado com sucesso!")
        toggle()
        atualizarPublish(materialPublicado)
      })
      .catch(e => {
        window.alert("Erro ao atualizar o material.")
        console.log(e);
      })
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="avatar-card">
              <CardBody>
                <Row xs="2">
                  <Col xl="2" md="3" sm="4" className="px-3">
                    <img
                      alt="..."
                      className="avatar-img"
                      src={ require("assets/img/default-avatar.png").default}
                    />
                  </Col>
                  <Col xl="9" md="9" sm="8" className="text-left">
                    <h5>{usuario.pessoa.nome}</h5>
                    <p>{usuario.email}</p>
                    <p className="description">
                      {usuario.pessoa.endereco}
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <h2 className="m-5">Produtos publicados</h2>
          </Col>
          {/* {listaPublicacoes && listaPublicacoes.map((item) => (
            <Col lg="4" md="6" sm="6">
              <Card className="card-stats">
              <Link to={`/admin/published/${item.idmaterial_publicado}`} style={{ textDecoration: 'none' }}>
                <CardBody>
                  <Row>
                    <Col sm="4" md="4" xs="4">
                      <img className="img-public" src={item.imgURL}></img>
                    </Col>
                    <Col sm="5" md="5" xs="5" >
                      <p className="title">{item.titulo}</p>
                      <div className="t">
                        <Button color="success"
                          className="btn-sm b"
                          onClick={() => {
                            toggle()
                            setMaterialPublicado(item)
                          }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>
                        </Button>

                        <Button color="danger"
                          className="btn-sm b"
                          onClick={() => { removerPublicacao(item) }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>
                        </Button>
                      </div>
                    </Col>
                    <Col sm="3" md="3" lg="3" className="col-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" color={pegarCor(item)} fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                        <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                        <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                      </svg>
                    </Col>

                  </Row>
                </CardBody>
                </Link>
              </Card>
            </Col>
          ))} */}
        </Row>
        {/*------------ Modal ----------*/}
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Atualizar dados</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="titulo">Título</Label>
                  <Input type="text" value={materialPublicado.titulo} name="titulo" id="titulo" onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="descricao">Descrição</Label>
                  <Input type="text" value={materialPublicado.descricao} name="descricao" id="descricao" onChange={handleInput} />
                </FormGroup>
                <FormGroup>
                  <Label for="telefone">Telefone</Label>
                  <Input type="tel" value={materialPublicado.telefone} name="telefone" id="telefone" onChange={handleInput}
                    onBlur={() => { console.log(materialPublicado) }} />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Status</Label>
                  <Input type="select" name="status" id="exampleSelect" defaultValue={materialPublicado.status}
                    onChange={handleInput}>
                    <option value="1">Publicado</option>
                    <option value="0">Não publicado</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="data">Data</Label>
                  <Input type="date" value={materialPublicado.data} name="data" id="data" onChange={handleInput} />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => { atualizarPublicacao() }}>Atualizar</Button>
              <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default User;
