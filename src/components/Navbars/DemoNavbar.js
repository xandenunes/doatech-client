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
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import Data from "../../server/ServerRest"
import { PublicacoesContext } from "context/PublicacoesContext";
import "../../assets/css/navbar.css"
import routes from "routes.js";

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const [publish, setPublish] = useContext(PublicacoesContext)
  const [dropsearchOpen, setDropsearchOpen] = useState(false)
  const [buscar, setBuscar] = useState()
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const [interessado, setInteressado] = useState()
  const [publicacao, setPublicacao] = useState()
  const [notificacao, setNotificacao] = useState(false)
  const [allinteressados, setAllInteressados] = useState()

  useEffect(() =>{
    Interesses(JSON.parse(localStorage.getItem('dados')).idusuario)
    Publicacao()
    AllInteresses()
  }, [],[],[])
  const Interesses = id =>{
      Data.getUsuarioInteressado(id)
      .then(response =>{
        setInteressado(response.data)
        
      })
      .catch(e =>{
        console.log(e)
      })
  }
  const AllInteresses = () =>{
    Data.getAllInteressados()
    .then(response =>{
      setAllInteressados(response.data)
    })
    .catch(e=>{
      console.log(e)
    })
  }
  const Publicacao = () =>{
    Data.getAllPublicacoes()
    .then(response =>{
      setPublicacao(response.data)
    })
    .catch(e =>{
      console.log(e)
    })
    return publicacao
  }


  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownSearchToggle = (e) => {
    setDropsearchOpen(!dropsearchOpen)
  }

  const handleInput = (event) => {
    setBuscar(event.target.value)
  }

  const getBrand = () => {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  console.log(allinteressados && allinteressados.map(inte => 
    publicacao && publicacao.filter(p => p.usuario.idusuario == JSON.parse(localStorage.getItem('dados')).idusuario)
    .map(publi => inte.idmaterial_publicado === publi.idmaterial_publicado && publi.status == 1).includes(true)).includes(true))
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            {/* Início do dropdown do buscar */}

            <Dropdown isOpen={dropsearchOpen} toggle={dropdownSearchToggle} direction="down">
              <DropdownToggle
                tag="span"
                data-toggle="dropdown"
                aria-expanded={dropsearchOpen}
              >
            <InputGroup className="no-border">
              <Input placeholder="Search..." onChange={(e) => {handleInput(e)}} value={buscar}/>

              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
              </InputGroup>

              </DropdownToggle>
              <DropdownMenu>
                {publish && publish.map((publicacao)=>(
                  publicacao.status == 1 && 
                  publicacao.titulo.toLowerCase().indexOf(buscar) != -1 ?
                  <Link to={`/admin/published/${publicacao.idmaterial_publicado}`}>
                    <p>{publicacao.titulo}</p>
                    </Link> :
                  <> </>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Fim do dropdown do buscar */}
          </form>
          <Nav navbar>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"
               color={ interessado && interessado.filter(l => l.id_usuario_contemplado).map(interesse =>
                publicacao && publicacao.map(publicacao => interesse.idmaterial_publicado === publicacao.idmaterial_publicado && publicacao.status != 0).includes(true))[0] ? "#FF5733" : 
                 allinteressados && allinteressados.map(inte => 
                  publicacao && publicacao.filter(p => p.usuario.idusuario == JSON.parse(localStorage.getItem('dados')).idusuario)
                  .map(publi => inte.idmaterial_publicado === publi.idmaterial_publicado && publi.status == 1).includes(true)).includes(true) ? "#FF5733" : "black"} fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
              </svg>
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                {
                  interessado && interessado.filter(l => l.id_usuario_contemplado).map(interesse => 
                    publicacao && publicacao.map(publicacao => interesse.idmaterial_publicado === publicacao.idmaterial_publicado && publicacao.status != 0?(
                      <Link style={{ textDecoration: 'none' }} to={"/admin/published/"+ publicacao.idmaterial_publicado}>
                        <DropdownItem  id="notificacao" tag="p">
                          <svg xmlns="http://www.w3.org/2000/svg" color="#2ECC71" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 20 16">
                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
                          </svg>
                          Você foi escolhido para receber o matérial: {publicacao.titulo}.<br/> Entre em contato com o usuario que fez a publicação!
                        </DropdownItem>
                      </Link> 
                    ):(
                      <></>
                    )))  
                  
                    
                  
                }
                {
                  allinteressados && allinteressados.map(inte => 
                    publicacao && publicacao.filter(p => p.usuario.idusuario == JSON.parse(localStorage.getItem('dados')).idusuario)
                    .map(publi => inte.idmaterial_publicado === publi.idmaterial_publicado && publi.status == 1 ?(
                      <Link style={{ textDecoration: 'none' }} to={"/admin/published/"+ publi.idmaterial_publicado}>
                        <DropdownItem  id="notificacao" tag="p">
                          <svg xmlns="http://www.w3.org/2000/svg" color="#2ECC71" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 20 16">
                            <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z" />
                          </svg>
                          Um usuario ficou interessado no seu matérial: {publi.titulo}!
                        </DropdownItem>
                      </Link>
                    ):(
                      <></>
                    )))
                }
              </DropdownMenu>
            </Dropdown>
            <NavItem>
              <Link to="#pablo" className="nav-link btn-rotate">
                <i className="nc-icon nc-settings-gear-65" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
