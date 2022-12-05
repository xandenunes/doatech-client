import React from "react";

// reactstrap components
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
  Col,Container
} from "reactstrap";
const meio={
  display:'flex',
}
const meio2={
 width: 200,
 display:'block',
 marginLeft : 'auto',
 marginRight : 'auto',
}

const justifycontent = {
  justifyContent : 'center'
} 
function EditaPublicacao() {
    return (
      <>
        <div className="content">
        <Container  fluid>
          <Row style={justifycontent}>
            <Col md="10" >
              <Card className="card-user" style={meio}>
                <CardHeader>
                  <CardTitle tag="h5">Edita Material</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                  <Row style={justifycontent}>
                  <img style={meio2} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyuKmbqfzAi9jxFqCNUjDakA-1qc-x07A61o-iAEfqfmGrUwqQ4qq4MrOQAI-9hfuTsu--iTA&usqp=CAc"}></img>
                      <Col className="pr-1" md="11">
                        <FormGroup>
                          <label>Titulo</label>
                          <Input
                            defaultValue=""
                            placeholder="Titulo"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={justifycontent}>     
                      <Col className="pr-1" md="11">
                        <FormGroup>
                          <label >
                            Descrição
                          </label>
                          <Input placeholder="Descrição" type="textarea" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row style={justifycontent}>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Contato</label>
                          <Input
                            defaultValue=""
                            placeholder="(00)00000-0000"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Tipo de material</label>
                          
                          <Input type="select" name="selectMulti" id="exampleSelectMulti">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
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
                          Atualiza Publicação
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        </div>
      </>
    );
  }
  
  export default EditaPublicacao;