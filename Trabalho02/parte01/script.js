let listaContatos = [
    {
        usuario: "joao03",
        mensagens: [
            {
                usuario: "joao03",
                texto: "Tudo bem?"
            },
            {
                usuario: "victor23",
                texto: "Tudo Tranqs"
            },
            {
                usuario: "joao03",
                texto: "Que bom"
            }
        ]
    },
    {
        usuario: "maria2000",
        mensagens: [
            {
                usuario: "maria2000",
                texto: "Na paz?"
            },
            {
                usuario: "victor23",
                texto: "Show"
            },
            {
                usuario: "maria2000",
                texto: "Que bom"
            }
        ]
    },
    {
        usuario: "robson_alves",
        mensagens: [
            {
                usuario: "victor03",
                texto: "Bom?"
            },
            {
                usuario: "robson_alves",
                texto: "Bom"
            },
            {
                usuario: "victor03",
                texto: "Que bom"
            }
        ]
    }
];

let contatos = document.querySelector(".contatos");
function mostraUsuario(nome) {
    let contato = document.createElement("div");
    let imagem = document.createElement("img");
    let spanUser = document.createElement("span");

    contato.classList.add("contato");
    spanUser.classList.add("usuario");
    let texto = document.createTextNode(nome);
    imagem.setAttribute("src","icone.png");
    spanUser.appendChild(texto);
    contato.appendChild(imagem);
    contato.appendChild(spanUser);
    contatos.appendChild(contato);
}

function mostrarUsuarioList() {
    for(let i = 0; i < listaContatos.length; i++){
        let nome = listaContatos[i].usuario;
        mostraUsuario(nome);
    }
}
mostrarUsuarioList();

let coluna2 = document.querySelector(".coluna2");
function mostraMensagens(nome, listaMensagens){
    let mensagemUsuario = document.createElement("div");
    let cabecalho = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", "icone.png");
    let paragrafo = document.createElement("p");
    let textoNome = document.createTextNode(nome);
    let mensagens = document.createElement("div");
    mensagemUsuario.classList.add("mensagem-usuario");
    cabecalho.classList.add("cabecalho");
    mensagens.classList.add("mensagens");
    paragrafo.appendChild(textoNome);
    cabecalho.appendChild(img);
    cabecalho.appendChild(paragrafo);

    for(let i = 0; i < listaMensagens.length; i++){
        let span = document.createElement("span");
        let texto = document.createTextNode(listaMensagens[i].texto);
        span.appendChild(texto);
        span.classList.add("msg");
        if(nome == listaMensagens[i].usuario){
            span.classList.add("msg-recebida");
        }else{
            span.classList.add("msg-enviada");
        }
        mensagens.appendChild(span);
    }

    mensagemUsuario.appendChild(cabecalho);
    mensagemUsuario.appendChild(mensagens);
    coluna2.appendChild(mensagemUsuario);
}

function carregarMensagens() {
    for(let i = 0; i < listaContatos.length; i++){
        mostraMensagens(listaContatos[i].usuario,listaContatos[i].mensagens);
    }
}
carregarMensagens();

function aparecerMensagensContato() {
    let meusContatos = document.querySelectorAll(".usuario");
    let mensagemUsuario = document.querySelectorAll(".mensagem-usuario");
    for(let  i = 0; i < meusContatos.length; i++){
        meusContatos[i].addEventListener("click",function () {
            for (let j = 0; j < mensagemUsuario.length; j++){
                mensagemUsuario[j].classList.remove("active");
            }
            mensagemUsuario[i].classList.add("active");
        });
    }
}

aparecerMensagensContato();