let meuUsuario = "alquimara";
let grupoAtual = -1;
let meusGrupos = [];

function carregarMeuUsuario() {
    let myUser = document.createTextNode(meuUsuario);
    let text = document.querySelector("#meuUsuario");
    text.appendChild(myUser);
}
carregarMeuUsuario();



function pegarGrupo() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4 && ajax.status == 200){
            let listaGrupo = JSON.parse(ajax.responseText);
            meusGrupos = listaGrupo;
            for (let i = 0; i < listaGrupo.length; i++) {
                let nome = listaGrupo[i].groupName;
                mostrarGrupo(nome);
                pegarMensagensGrupo(listaGrupo[i].groupName, listaGrupo[i].groupID);
            }
        }
    };
    ajax.open("GET", "http://rest.learncode.academy/api/alquimara/groups", true);
    ajax.send();
}

function pegarMensagensGrupo(groupName,groupID) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4 && ajax.status == 200){
            let listaMensagens = JSON.parse(ajax.responseText);
            mostraMensagens(groupName, listaMensagens);
            aparecerMensagensGrupo();
            enviarMensagem();
        }
    };
    ajax.open("GET", "http://rest.learncode.academy/api/alquimara/" + groupID, true);
    ajax.send();
}

function enviarMsgPost(usuario,messagem,groupID) {
    let ajaxMsg = new XMLHttpRequest();
    ajaxMsg.onreadystatechange = function () {
        if(ajaxMsg.readyState == 4 && ajaxMsg.status == 200){

        }
    };
    ajaxMsg.open("POST", "http://rest.learncode.academy/api/alquimara/" + groupID, true);
    ajaxMsg.setRequestHeader("Content-Type","application/json");
    let msg = {"userName":usuario , "message":messagem};
    let body = JSON.stringify(msg);
    ajaxMsg.send(body);

}


let todosGrupos = document.querySelector(".grupos");
function mostrarGrupo(groupName) {
    let grupo = document.createElement("div");
    let imagem = document.createElement("img");
    let spanGrupo = document.createElement("span");
    let texto = document.createTextNode(groupName);

    grupo.classList.add("grupo");
    spanGrupo.classList.add("grupo-nome");
    imagem.setAttribute("src","icone.png");
    spanGrupo.appendChild(texto);
    grupo.appendChild(imagem);
    grupo.appendChild(spanGrupo);
    todosGrupos.appendChild(grupo);
}




let coluna2 = document.querySelector(".coluna2");
function mostraMensagens(groupName, listaMensagens){
    let mensagensGrupo = document.createElement("div");
    let cabecalho = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", "icone.png");
    let paragrafo = document.createElement("p");
    let textoNome = document.createTextNode(groupName);
    let mensagens = document.createElement("div");

    let enviarMsg = document.createElement("div");
    let enviarMsgInput = document.createElement("input");
    let enviarMsgButton = document.createElement("button");
    let textoBotao = document.createTextNode("Enviar");

    mensagensGrupo.classList.add("grupo-mensagens");
    cabecalho.classList.add("cabecalho");
    mensagens.classList.add("mensagens");
    enviarMsgInput.classList.add("campo-mensagem");
    enviarMsgButton.classList.add("botao-enviar");
    enviarMsg.classList.add("enviar-mensagem");

    enviarMsgButton.type = "submit";

    enviarMsg.appendChild(enviarMsgInput);
    enviarMsgButton.appendChild(textoBotao);
    enviarMsg.appendChild(enviarMsgButton);

    paragrafo.appendChild(textoNome);
    cabecalho.appendChild(img);
    cabecalho.appendChild(paragrafo);

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
        mensagens.appendChild(span);
    }

    mensagensGrupo.appendChild(cabecalho);
    mensagensGrupo.appendChild(mensagens);
    mensagensGrupo.appendChild(enviarMsg);
    coluna2.appendChild(mensagensGrupo);
}

function aparecerMensagensGrupo() {
    let meusGrupos = document.querySelectorAll(".grupo");
    let mensagemGrupo = document.querySelectorAll(".grupo-mensagens");
    for (let i = 0; i < meusGrupos.length; i++) {
        meusGrupos[i].addEventListener("click", function () {
            for (let j = 0; j < mensagemGrupo.length; j++) {
                mensagemGrupo[j].classList.remove("active");
            }
            mensagemGrupo[i].classList.add("active");
            grupoAtual = i;
        });
    }
}


pegarGrupo();

function enviarMensagem() {
    let listaCampoMsg = document.querySelectorAll(".campo-mensagem");
    let listaBotaoEnviar = document.querySelectorAll(".botao-enviar");
    for (let i = 0; i < listaBotaoEnviar.length; i++) {
        listaBotaoEnviar[i].addEventListener("click", function () {
            event.preventDefault();
            enviarMsgPost(meuUsuario, listaCampoMsg[i].value, meusGrupos[grupoAtual].groupID);
        });
    }
}