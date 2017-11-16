let myUser;
let grupoAtual;

function carregarMeuUsuario() {
    let cabecalho = document.querySelector("#meuUsuario");
    meuUsuario.textContent = myUser;
}

function pegarGrupo() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4){
            let listaGrupos = JSON.parse(ajax.responseText);
            let grupos = document.querySelector(".grupos");
            if(grupos.childElementCount > 0){
                for(let x = grupos.childElementCount; x > 0; x--){
                    grupos.removeChild(grupos.lastChild);
                }
            }
            for(let i = 0; i < listaGrupos.length; i++){
                mostrarGrupo(listaGrupos[i].groupName,listaGrupos[i].groupID);
            }

        }
    };
    ajax.open("GET", "http://rest.learncode.academy/api/alquimara/groups", true);
    ajax.send();
}

function pegarMensagens(groupName,grupoID) {
    let ajaxM = new XMLHttpRequest();
    ajaxM.onreadystatechange = function () {
        if(ajaxM.readyState == 4){
            let listaMensagem = JSON.parse(ajaxM.responseText);
            activeMensagem(groupName, listaMensagem,myUser);
        }
    };
    ajaxM.open("GET", "http://rest.learncode.academy/api/alquimara/" + grupoID,true);
    ajaxM.send();
}

function postEnviarMsg(usuario,texto) {
    let ajaxMsg = new XMLHttpRequest();
    ajaxMsg.onreadystatechange = function(){
        if(ajaxMsg.readyState==4){
            pegarMensagens(grupoAtual.groupName,grupoAtual.groupID);
        }
    };
    ajaxMsg.open("POST", "http://rest.learncode.academy/api/alquimara/" + grupoAtual.groupID, true);
    ajaxMsg.setRequestHeader("Content-Type","application/json");
    let mensagem = {"userName":usuario , "message":texto};
    let body = JSON.stringify(mensagem);
    ajaxMsg.send(body);
}

function postCadastrarGrupo(nomeGrupo, IDGrupo) {
    let ajaxMsg = new XMLHttpRequest();
    ajaxMsg.onreadystatechange = function(){
        if(ajaxMsg.readyState==4){
            pegarGrupo();
        }
    };
    ajaxMsg.open("POST", "http://rest.learncode.academy/api/alquimara/groups", true);
    ajaxMsg.setRequestHeader("Content-Type","application/json");
    let grupo = {"groupName":nomeGrupo , "groupID":IDGrupo};
    let body = JSON.stringify(grupo);
    ajaxMsg.send(body);
}

function activeMensagem(groupName, listaMensagens, meuUsuario) {
    let mensagemUsuario = document.querySelector(".mensagem-usuario");
    mensagemUsuario.classList.add("active");
    let cabecalho = document.querySelector(".cabecalho-mensagem");

    let paragrafo = document.createElement("p");
    let nomeGrupo = document.createTextNode(groupName);
    paragrafo.classList.add("paragrafo");
    if(cabecalho.childElementCount > 1){
        cabecalho.removeChild(cabecalho.lastChild);
    }
    paragrafo.appendChild(nomeGrupo);
    cabecalho.appendChild(paragrafo);

    let campoMsg = document.querySelector(".mensagens");
    if( campoMsg.childElementCount > 0){
        for (let i = campoMsg.childElementCount; i > 0; i--){
            campoMsg.removeChild(campoMsg.lastChild);
        }
    }
    for(let i = 0; i < listaMensagens.length; i++){
        let span = document.createElement("span");
        let msgUsuario = document.createElement("span");
        let msgTexto = document.createElement("span");
        let nomeUsuario = document.createTextNode(listaMensagens[i].userName);
        let conteudoMsg = document.createTextNode(listaMensagens[i].message);
        msgUsuario.appendChild(nomeUsuario);
        msgTexto.appendChild(conteudoMsg);
        msgUsuario.classList.add("username");
        msgTexto.classList.add("texto");
        span.appendChild(msgUsuario);
        span.appendChild(msgTexto);
        span.classList.add("msg");
        if(listaMensagens[i].userName == meuUsuario){
            span.classList.add("msg-enviada");
        }else{
            span.classList.add("msg-recebida");
        }
        campoMsg.appendChild(span);
    }
}

function mostrarGrupo(groupName,groupID) {
    let grupos = document.querySelector(".grupos");
    let grupo = document.createElement("div");
    let imagem = document.createElement("img");
    let spanGrupo = document.createElement("span");
    let texto = document.createTextNode(groupName);
    grupo.classList.add("grupo");
    spanGrupo.classList.add("usuario");
    imagem.setAttribute("src","icone.png");
    spanGrupo.appendChild(texto);
    grupo.appendChild(imagem);
    grupo.appendChild(spanGrupo);
    grupo.addEventListener("click", function(){
        grupoAtual = {"groupName": groupName, "groupID": groupID};
        pegarMensagens(groupName,groupID);
    });
    grupos.appendChild(grupo);
}

function mostraMensagens(){
    let coluna2 = document.querySelector(".coluna2");
    let mensagemUsuario = document.createElement("div");
    let cabecalho = document.createElement("div");
    let img = document.createElement("img");
    let mensagens = document.createElement("div");
    let barraMsg = document.createElement("div");
    let campoTextMsg = document.createElement("input");
    let botaoEnviarMsg = document.createElement("button");
    //let textoBotao = document.createTextNode("enviar");


    mensagemUsuario.classList.add("mensagem-usuario");
    cabecalho.classList.add("cabecalho-mensagem");
    mensagens.classList.add("mensagens");
    barraMsg.classList.add("barraMsg");
    campoTextMsg.classList.add("campoTextoMsg");
    botaoEnviarMsg.classList.add("botaoEnviarMsg");
    campoTextMsg.setAttribute("placeholder","Digite sua mensagenzinha...");
    botaoEnviarMsg.textContent = "enviar";

    barraMsg.appendChild(campoTextMsg);
    barraMsg.appendChild(botaoEnviarMsg);

    img.setAttribute("src", "icone.png");

    cabecalho.appendChild(img);
    mensagemUsuario.appendChild(cabecalho);
    mensagemUsuario.appendChild(mensagens);
    mensagemUsuario.appendChild(barraMsg);
    coluna2.appendChild(mensagemUsuario);

}

function enviarMsg() {
    let botaoEnviar = document.querySelector(".botaoEnviarMsg");
    let campoTextoMsg= document.querySelector(".campoTextoMsg");
    botaoEnviar.addEventListener("click", function () {
        event.preventDefault();
        if( campoTextoMsg.value == ""){
            alert("É preciso digitar uma mensagem");
        }
        else {
            postEnviarMsg(myUser, campoTextoMsg.value);
            campoTextoMsg.value = "";
        }
    });
}

function cadastrarGrupo() {
    let nomeGrupo = document.querySelector(".input-cadastrar-groupName");
    let IDGrupo = document.querySelector(".input-cadastrar-groupID");
    let botaoCadastrar = document.querySelector(".botao-cadastrar-grupo");
    botaoCadastrar.addEventListener("click", function () {
        if(nomeGrupo.value != "" && IDGrupo.value != ""){
            event.preventDefault();
            postCadastrarGrupo(nomeGrupo.value, IDGrupo.value);
            nomeGrupo.value = "";
            IDGrupo.value = "";
        }else {
            alert("campo nao pode ficar vazio");
        }

    })

}

pegarGrupo();
mostraMensagens();
enviarMsg();
cadastrarGrupo();



let botaoLogin = document.querySelector(".btn-login");
let modal = document.querySelector(".modal");
let modalForm = document.querySelector(".modal-form");
let modalInput = document.querySelector(".input-login");
let modalButton = document.querySelector(".button-entrar");
let conteiner = document.querySelector(".container");



function openModal() {
    modal.classList.add("active");
    modalForm.classList.add("active");
    conteiner.classList.remove("active");
}

function closeModal() {
    modal.classList.remove("active");
    modalForm.classList.add("active");
    modalInput.value = "";
    conteiner.classList.add("active");
}

function logarUsuario() {
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("userid") != null){
            botaoLogin.textContent = "logout";
        } else {
            botaoLogin.textContent = "login";
        }
    }
}

function verificarLogin(){
    if(botaoLogin.textContent == "login"){
        openModal();
    }
    else{
        logout();
    }
}

function login(userId) {
    if(userId.length >= 3){
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem("userid", userId);
            myUser = userId;
            carregarMeuUsuario();
            botaoLogin.textContent = "logout";
        }
        else{
            console.log("Desculpe, Navegador não suporta o aplicativo");
        }
    }
}

function logout(){
    if(typeof(Storage) !== "undefined"){
        localStorage.removeItem("userid");
        botaoLogin.textContent = "login";
        conteiner.classList.remove("active");
        openModal();
    }
}

function carregarClickBotoes() {
    let botaoLogin = document.querySelector(".btn-login");


    window.addEventListener("click", function () {
        if (event.target == modal) {
            closeModal();
        }
    });

    botaoLogin.addEventListener("click", verificarLogin);

    modalButton.addEventListener("click", function () {
        event.preventDefault();
        login(modalInput.value);
        closeModal();
    });
}

logarUsuario();
verificarLogin();
carregarClickBotoes();
