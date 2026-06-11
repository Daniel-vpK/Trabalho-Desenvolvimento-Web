let total = 0;
let repetidos = 0;

const formulario = document.getElementById("formulario");
const colecao = document.getElementById("colecao");

// Banco de dados JSON usando o LocalStorage
let colecaoDB =
JSON.parse(localStorage.getItem("colecao")) || [];

colecaoDB.forEach(function(item){
    criarCard(item);
});

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    let item = {
        nome: document.getElementById("nome").value,
        imagem: document.getElementById("imagem").value,
        raridade: document.getElementById("raridade").value,
        repetido: document.getElementById("repetido").checked
    };

    colecaoDB.push(item);

    localStorage.setItem(
        "colecao",
        JSON.stringify(colecaoDB)
    );

    criarCard(item);

    formulario.reset();
});

function criarCard(item){

    let card = document.createElement("div");
    card.className = "card";

    let titulo = document.createElement("h3");
    titulo.textContent = item.nome;

    let img = document.createElement("img");
    img.src = item.imagem;

    let texto = document.createElement("p");
    texto.textContent = "Raridade: " + item.raridade;

    let status = document.createElement("p");
    status.textContent =
        item.repetido ? "Repetido" : "Único";

    let botaoFavorito =
        document.createElement("button");

    botaoFavorito.textContent =
        "Favorito";

    let botaoExcluir =
        document.createElement("button");

    botaoExcluir.textContent =
        "Excluir";

    botaoFavorito.addEventListener("click",
    function(){
        card.classList.toggle("favorito");
    });

    botaoExcluir.addEventListener("click",
    function(){

        card.remove();

        let indice =
        colecaoDB.indexOf(item);

        colecaoDB.splice(indice, 1);

        localStorage.setItem(
            "colecao",
            JSON.stringify(colecaoDB)
        );

        atualizarContador();
    });

    card.appendChild(titulo);
    card.appendChild(img);
    card.appendChild(texto);
    card.appendChild(status);
    card.appendChild(botaoFavorito);
    card.appendChild(botaoExcluir);

    colecao.appendChild(card);

    atualizarContador();
}

function atualizarContador(){

    total = colecaoDB.length;

    repetidos = 0;

    for(let i = 0; i < colecaoDB.length; i++){

        if(colecaoDB[i].repetido){
            repetidos++;
        }
    }

    document.getElementById("total").textContent =
        total;

    document.getElementById("repetidos").textContent =
        repetidos;

    document.getElementById("unicos").textContent =
        total - repetidos;
}

// Busca Ninja
document.getElementById("busca")
.addEventListener("input", function(){

    let pesquisa =
    this.value.toLowerCase();

    let cards =
    document.querySelectorAll(".card");

    for(let i = 0; i < cards.length; i++){

        let nome =
        cards[i]
        .querySelector("h3")
        .textContent
        .toLowerCase();

        if(nome.includes(pesquisa)){
            cards[i].style.display =
            "inline-block";
        }
        else{
            cards[i].style.display =
            "none";
        }
    }
});