let meuUsuario = "alquimara";
function myUsuario() {
    let cabecalho = document.querySelector("#meuUsuario");
    let text = document.createTextNode(meuUsuario);
    cabecalho.appendChild(text);
}
myUsuario();


function pegarGrupo() {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4){
            let listaGrupos = JSON.parse(ajax.responseText);

            for(let i = 0; i < listaGrupos.length; i++){
                let nomeGrupo = listaGrupos[i].groupName;
                mostrarGrupo(nomeGrupo);
                pegarMensagens(nomeGrupo,listaGrupos[i].groupID);
            }

        }
    };
    ajax.open("GET", "http://rest.learncode.academy/api/alquimara/groups", true);
    ajax.send();
}




function pegarMensagens(nomeGrupo,grupoID) {
    let ajaxM = new XMLHttpRequest();
    ajaxM.onreadystatechange = function () {
        if(ajaxM.readyState == 4){
            let listaMensagem = JSON.parse(ajaxM.responseText);
            mostraMensagens(nomeGrupo, listaMensagem);
            aparecerMensagensContato();
        }
    };
    ajaxM.open("GET", "http://rest.learncode.academy/api/alquimara/" + grupoID,true);
    ajaxM.send();
}





let grupos = document.querySelector(".grupos");
function mostrarGrupo(nome) {
    let grupo = document.createElement("div");
    let imagem = document.createElement("img");
    let spanGrupo = document.createElement("span");
    let texto = document.createTextNode(nome);

    grupo.classList.add("grupo");
    spanGrupo.classList.add("usuario");

    imagem.setAttribute("src","icone.png");

    spanGrupo.appendChild(texto);
    grupo.appendChild(imagem);
    grupo.appendChild(spanGrupo);
    grupos.appendChild(grupo);
}



let coluna2 = document.querySelector(".coluna2");
function mostraMensagens(nome, listaMensagens){
    let mensagemUsuario = document.createElement("div");
    let cabecalho = document.createElement("div");
    let img = document.createElement("img");
    let paragrafo = document.createElement("p");
    let textoNome = document.createTextNode(nome);
    let mensagens = document.createElement("div");

    mensagemUsuario.classList.add("mensagem-usuario");
    cabecalho.classList.add("cabecalho");
    mensagens.classList.add("mensagens");

    img.setAttribute("src", "icone.png");

    for(let i = 0; i < listaMensagens.length; i++){
        let span = document.createElement("span");
        let textoMsg = document.createTextNode(listaMensagens[i].message);
        let textoUsuario = document.createTextNode(listaMensagens[i].userName);
        let nomeUsuario = document.createElement("span");
        let spanTexto = document.createElement("span");

        nomeUsuario.classList.add("nome-usuario");
        spanTexto.classList.add("texto");
        span.classList.add("msg");
        if(meuUsuario == listaMensagens[i].userName){
            span.classList.add("msg-enviada");
        }else{
            span.classList.add("msg-recebida");
        }

        nomeUsuario.appendChild(textoUsuario);
        spanTexto.appendChild(textoMsg);
        span.appendChild(nomeUsuario);
        span.appendChild(spanTexto);
        mensagens.appendChild(span);
    }

    paragrafo.appendChild(textoNome);
    cabecalho.appendChild(img);
    cabecalho.appendChild(paragrafo);
    mensagemUsuario.appendChild(cabecalho);
    mensagemUsuario.appendChild(mensagens);
    coluna2.appendChild(mensagemUsuario);
}






function aparecerMensagensContato() {
    let meusContatos = document.querySelectorAll(".grupo");
    console.log(meusContatos);
    let mensagemUsuario = document.querySelectorAll(".mensagem-usuario");
    console.log(mensagemUsuario);

    for(let  i = 0; i < meusContatos.length; i++){

        meusContatos[i].addEventListener("click",function () {
            for (let j = 0; j < mensagemUsuario.length; j++){
                mensagemUsuario[j].classList.remove("active");
            }
            mensagemUsuario[i].classList.add("active");
        });

    }
}

pegarGrupo();

