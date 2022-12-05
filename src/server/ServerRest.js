import http from "../http-rest"

//Lista todas as publicações
const getAllPublicacoes = () => {
    return http.get("produto");
};

//Procurar Publicação pelo id
const getPublicacao = id => {
    return http.get(`/produto/${id}`);
};

//Criar Publicação
const createPublicacao = data => {
    return http.post("/produto/criar", data);
};

//Atualizar Publicação
const updatePublicacao = (id, data) => {
    return http.put(`/produto/criar`, data);
};
//Remover Publicação
const removePublicacao = id => {
    return http.delete(`/produto/delete/${id}`);
};

//Lista todos os Usuarios
const getAllUsuarios = () => {
    return http.get("/usuario");
};

//Procurar Usuario pelo id
const getUsuarios = id => {
    return http.get(`/usuario/${id}`);
};

//Criar Usuario
const createUsuarios = data => {
    return http.post("/usuario/criar", data);
};

const loginUsuarios = data => {
    return http.post("/usuario/login", data);
};

//Atualizar Usuario
const updateUsuarios = (id, data) => {
    return http.put(`/usuario/atualizar/${id}`, data);
};
//Remover Usuario
const removeUsuarios = id => {
    return http.delete(`/usuario/${id}`);
};
//Lista todos os tipos de lixos
const getAllLixos = () => {
    return http.get("/categoria");
};

//Procurar tipo de lixo pelo id
const getLixo = id => {
    return http.get(`/categoria/${id}`);
};
//Procurar todos os interessados de todas as publicações
const getAllInteressados = () =>{
    return http.get("/aquisicao")
}

//Procurar Interessados da publicação 
const getInteressado = id => {
    return http.get(`/aquisicao/${id}`)
}

//Postar Interesse na publicação
const createInteressado = dados =>{
    return http.post(`/aquisicao/criar/`, dados)
}
//Procurar Interesses do usuario
const getUsuarioInteressado = id =>{
    return http.get(`/aquisicao/usuario/${id}`)
}
//Deletar Interessado
const deleteInteressado = id =>{
    return http.delete(`/aquisicao/delete/${id}`)
}
export default {
    getAllPublicacoes,
    getPublicacao,
    createPublicacao,
    updatePublicacao,
    removePublicacao,
    getAllUsuarios,
    getUsuarios,
    createUsuarios,
    updateUsuarios,
    removeUsuarios,
    getLixo,
    getAllLixos,
    getInteressado,
    getAllInteressados,
    createInteressado,
    getUsuarioInteressado,
    deleteInteressado,
    loginUsuarios,

};