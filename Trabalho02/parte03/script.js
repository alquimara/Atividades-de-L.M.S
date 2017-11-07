let meusUsuario = "alquimara";

function carregarMeusUsuario() {
    let myUser = document.createTextNode(meusUsuario);
    let text = document.querySelector("#meuUsuario");
    text.appendChild(myUser);
}
carregarMeusUsuario();



function pegarGrupo() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4 && ajax.status == 200){
            let listaGrupo = JSON.parse(ajax.responseText);
            for(let i = 0; i < listaGrupo.length; i++){
                let nome = listaGrupo[i].groupName;
                mostrarGrupo(nome);
                pegarMensagensGrupo(listaGrupo[i].groupName,listaGrupo[i].groupID);
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
            mostraMensagens(groupName,listaMensagens);
            aparecerMensagensGrupo();
        }
    };
    ajax.open("GET", "http://rest.learncode.academy/api/alquimara/" + groupID, true);
    ajax.send();
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

    mensagensGrupo.classList.add("grupo-mensagens");
    cabecalho.classList.add("cabecalho");
    mensagens.classList.add("mensagens");

    enviarMsg.classList.add("enviar-mensagem");
    enviarMsg.appendChild(enviarMsgInput);

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
        if(listaMensagens[i].userName == meusUsuario){
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
        });
    }
}


pegarGrupo();