
import React, {useState, useEffect} from 'react'
import Data from "../server/ServerRest"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Table
} from "reactstrap";
import '../assets/css/published.css'
import NotificationAlert from "react-notification-alert";
import Loading from 'variables/Loading';

function Published(props){
    const cors = [
        { id: 3, name: "perifericos", cor: "#EC7063" },
        { id: 1, name: "acessorios", cor: "#283747" },
        { id: 2, name: "peças", cor: "#F7DC6F" },
    ]
    const add = {
        prd_id_produto: null,
        titulo: '',
        descricao: '',
        quantidade: 0,
        preco: 0,
        categoria: {},
        usuario: {}
    }
    const [publicacao, setPublicacao] = useState(add)
    const [modal, setModal] = useState(false)
    const [modal2, setModal2] = useState(false)
    const [nome, setNome] = useState()
    const [telefone, setTelefone] = useState()
    const [verific, setVerific] = useState(false)
   
    //Verificar qual id
    useEffect(() => {
        Get(props.match.params.id)
    }, [props.match.params.id], [props.match.params.id])


    //Procurar Publicação pelo id
    const Get = id => {
        Data.getPublicacao(id)
            .then(response => {
                setPublicacao(response.data)
                setNome(response.data.usuario.pessoa.nome)
                setTelefone(response.data.usuario.pessoa.telefone)
            })
            .catch(e => {
                console.log(e)
            })
    }

    //Verificar cor do tipo de material
    const verificarCor = (corApi, cor) =>{
        for(var i = 0; i < cor.length; i++){
            if(corApi == cor[i].name){
                return cor[i].cor
            }
        }
    }

    //Função para abrir Modal
    const toggle = () =>{
        setModal(!modal)
    }
    const toggle2 = () =>{
        setModal2(!modal2)
    }
    //Notificação--------------------------------------------------------------
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
};

    return(
        <>
            <div className="content">
                <Row>
                    <NotificationAlert ref={notificationAlert} />
                            <Col md="12">
                                <Card>                    
                    {
                        publicacao ? (
                                <>
                                    <Row className="img"> 
                                        <CardBody>
                                            <h2>
                                                {publicacao.titulo}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" color={verificarCor(publicacao.categoria.descricao, cors)} fill="currentColor" class="bi bi-tags-fill" style={{marginLeft: 10}} viewBox="0 0 16 14">
                                                    <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                                                    <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043-7.457-7.457z"/>
                                                </svg>                                          
                                            </h2>
                                            <h5 >Descrição</h5>
                                            <p className="descrip">{publicacao.descricao}</p>
                                            <p>Categoria: {publicacao.categoria.descricao}</p>
                                        </CardBody>
                                    </Row>
                                    <CardFooter>
                                        <hr/>
                                        <p>Publicado por: {nome}</p>
                                        {
                                            
                                                <div>
                                                    <Button id="bt" onClick={toggle} color="primary">ENTRE EM CONTATO</Button> 
                                                </div>
                                        }
                                    </CardFooter>  
                                </>                             
                        ) : (
                            <Loading/>
                        )
                    }        
                        </Card>             
                    </Col>
                </Row>
                <Modal isOpen={modal} toggle={toggle2}>
                    <ModalHeader>Contato</ModalHeader>
                    <ModalBody >
                            
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill" viewBox="0 1 18 15">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                </svg>
                                Nome: {nome}
                            </p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 1 18 15">
                                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                </svg>                                
                                Telefone: {telefone}
                            </p>
                            <p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 1 18 15">
                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                </svg>
                                E-mail: {publicacao.usuario.email}
                            </p>
                            <Button id="bt" onClick={toggle} color="danger">Fechar</Button>
                    </ModalBody>
                </Modal>
            </div>
        </> 
    )
}

export default Published