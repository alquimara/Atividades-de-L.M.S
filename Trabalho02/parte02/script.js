let myUser = "alquimara";
function myUsuario() {
    let cabecalho = document.querySelector("#meuUsuario");
    let text = document.createTextNode(myUser);
    cabecalho.appendChild(text);
}
myUsuario();

function pegarGrupo() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4){
            let listaGrupos = JSON.parse(ajax.responseText);
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


let grupos = document.querySelector(".grupos");
function mostrarGrupo(groupName,groupID) {
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
        pegarMensagens(groupName,groupID);
    });
    grupos.appendChild(grupo);
}


let coluna2 = document.querySelector(".coluna2");
function mostraMensagens(){
    let mensagemUsuario = document.createElement("div");
    let cabecalho = document.createElement("div");
    let img = document.createElement("img");
    let mensagens = document.createElement("div");

    mensagemUsuario.classList.add("mensagem-usuario");
    cabecalho.classList.add("cabecalho-mensagem");
    mensagens.classList.add("mensagens");

    img.setAttribute("src", "icone.png");

    cabecalho.appendChild(img);
    mensagemUsuario.appendChild(cabecalho);
    mensagemUsuario.appendChild(mensagens);
    coluna2.appendChild(mensagemUsuario);
}
mostraMensagens();



pegarGrupo();

