import React, { useState, useEffect, useContext } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Data from "../server/ServerRest"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import '../assets/css/publish.css'
import '../routes'
import { PublicacoesContext } from "context/PublicacoesContext";
import Loading from "variables/Loading";
function Publish() {
    const [publish, setPublish] = useContext(PublicacoesContext)
    const [cor, setCor] = useState([])

    useEffect(() => {
        categoria()
        retrieve()
    }, [])
    const categoria = () =>{
        Data.getAllLixos().
        then(response =>{
            setCor(response.data)
        }).catch((e)=>{
            console.log(e)
        })
    }
    const retrieve = () => {
        Data.getAllPublicacoes()
            .then(response => {
                setPublish(response.data)
                console.log(publish);
            })
            .catch(e => {
                console.log(e)
            })
    }
    const verificarCor = (corApi) => {
        for (var i = 0; i < cor.length; i++) {
            if (corApi == cor[i].descricao) {
                return cor[i].cor
            }
        }
    }
    return (
        <>
            <div className="content">
                <Row>
                    <Col lg="12" md="12" sm="12">
                        <Card>
                            <Row className="lixos">
                                {
                                    cor && cor.map(c => (
                                        <Link to={`/admin/filter/${c.id}`} style={{ textDecoration: 'none', color: 'black' }} >
                                            <CardHeader>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" color={c.cor} fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                                                </svg>
                                                <p>{c.descricao}</p>
                                            </CardHeader>
                                        </Link>
                                    ))
                                }

                            </Row>
                        </Card>
                    </Col>

                </Row>
                {
                    publish ? (
                        <Row>
                            {
                                publish && publish.map(publi => (
                                    <Col lg="4" md="6" sm="6">
                                        <Card className="card-stats">
                                            <Link to={`/admin/published/${publi.prd_id_produto}`} style={{ textDecoration: 'none' }}>
                                                <CardBody>
                                                    <Row>
                                                        <Col md="5" xs="5">
                                                            <p className="title">{publi.titulo}</p>
                                                        </Col>
                                                        <Col md="5" xs="5">
                                                            <p className="title">Preço: {publi.preco.toFixed(2)}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="5" xs="5">
                                                            <p className="title">Quantidade: {publi.quantidade}</p>
                                                        </Col>
                                                        <Col>
                                                        <svg xmlns="http://www.w3.org/2000/svg" color={verificarCor(publi.categoria.descricao)} width="30" height="30" fill="currentColor" class="bi bi-tags-fill" viewBox="0 0 16 16">
                                                                <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                                                <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z" />
                                                            </svg>
                                                        </Col>
                                                    </Row>
                                                    
                                                </CardBody>
                                            </Link>
                                        </Card>
                                    </Col>
                                )
                                )
                            }
                        </Row>
                    ) : (
                       <Loading/>
                    )
                }
            </div>
        </>
    )
}

export default Publish