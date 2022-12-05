import React, { useContext, useEffect, useState } from 'react'
import NotificationAlert from "react-notification-alert";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    Input,
    Label,
    Button,
  } from "reactstrap";
import { Link } from "react-router-dom";
import Data from '../server/ServerRest'
import { PublicacoesContext } from 'context/PublicacoesContext';

function CreatePublish(){
    const [lixo, setLixo] = useState()
    const [post, setPost] = useState(add)
    const [publish, setPublish] = useContext(PublicacoesContext)
    useEffect(() =>{
        getAllTipo()
    }, [])
    const getAllTipo = () =>{
        Data.getAllLixos().
        then(response =>{
            setLixo(response.data)
        }).catch((e)=>{
            console.log(e)
        })
    }
    const add ={
        prd_id_produto: null,
        titulo: '',
        descricao: '',
        quantidade: 0,
        preco: 0,
        categoria:{ cat_id_categoria: '' },
        usuario: {usr_id_usuario: JSON.parse(localStorage.getItem('dados')).usr_id_usuario},
    }

    const input = event => {
        const { name, value } = event.target
        setPost({ ...post, [name]: value });
    }

    const defineCategoria = nomeCat =>{
        for (var i = 0; i < lixo.length; i++) {
            if (nomeCat == lixo[i].descricao) {
                return lixo[i].cat_id_categoria
            }
        }
    }

    const save = () =>{
        var postagem = {
            titulo: post.titulo,
            descricao: post.descricao,
            quantidade: post.quantidade,
            preco: post.preco.replace(',', '.'),
            categoria: {cat_id_categoria: defineCategoria(post.categoria)},
            usuario: {usr_id_usuario: JSON.parse(localStorage.getItem('dados')).usr_id_usuario},
        }
        
        console.log(postagem)
        notify("tc","success","Matérial publicado com sucesso!")
        Data.createPublicacao(postagem)
        .then(response =>{
            console.log(response.data)
            })
            .catch(e =>{
                console.log(e)
            }
        )
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
    return(
        <>
            <div className="content">
                <NotificationAlert ref={notificationAlert} />
                <Row>
                    <Col md="10">
                        <Card>
                            <CardHeader>
                                <p>Criado por {JSON.parse(localStorage.getItem('dados')).nome}</p>
                                <Label htmlFor="titulo">Titulo</Label>
                                <Input type="text" name="titulo" id="titulo" onChange={input} placeholder="Ex: Bateria"/>    
                                <Label htmlFor="descricao">Descrição</Label>
                                <Input type="textarea" name="descricao" id="descricao" onChange={input} placeholder=" Sobre o matérial ..."/>
                                <br></br>  
                                <Label htmlFor="categoria">Tipo de Matérial</Label> 
                                
                                <Input type="select" name="categoria" id="categoria"  onChange={input}>
                                    <option>selecione</option>
                                    {
                                        
                                        lixo && lixo.map(item =>(
                                            
                                            <option>{item.descricao}</option>
                                        ))
                                        
                                    }
                                </Input>      
                                <Label htmlFor="quantidade">Quantidade</Label>
                                <Input type="text" name="quantidade" id="quantidade" onChange={input} placeholder="Ex: 2"/>
                                <Label htmlFor="preco">Preço</Label>
                                <Input type="text" name="preco" id="preco" onChange={input} placeholder="EX: 3,60"/>
                            </CardHeader>
                            <CardFooter>
                                <hr/>
                                <Button onClick={save} color="success">Enviar</Button>

                                <Link to="/admin/publish">
                                    <Button style={{marginLeft: 10}} color="danger"> Cancelar</Button>
                                </Link>
                            </CardFooter>
                        </Card>

                    </Col>
                </Row>    
            </div>
        </>
    )
}

export default CreatePublish 