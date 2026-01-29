const WHATS_NUMBER = "5541997304061";

const produtos = [
  {
    nome: "Vestido Infantil Brenda",
    imagem: "produtos/vestido1.png",
    precoDe: 89.99,
    precoPor: 49.99,
    desconto: 44
  },
  {
    nome: "Vestido Giulia",
    imagem: "produtos/vestido2.png",
    precoDe: 129.99,
    precoPor: 89.99,
    desconto: 31
  },
  {
    nome: "Vestido Ariane",
    imagem: "produtos/vestido3.png",
    precoDe: 129.99,
    precoPor: 99.99,
    desconto: 23
  }
];

function brl(n){
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function whatsappLink(nome, precoPor){
  const texto = `Olá! Quero comprar ${nome} por ${brl(precoPor)}. Consulte tamanhos e cores disponíveis.`;
  return `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(texto)}`;
}

function render(){
  const grid = document.getElementById("grid-produtos");
  grid.innerHTML = produtos.map(p => `
    <article class="card">
      <div class="card-img">
        ${p.desconto ? `<div class="badge">-${p.desconto}%</div>` : ``}
        <img src="${p.imagem}" alt="${p.nome}">
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.nome}</h3>
        <div class="prices">
          <span class="old">${brl(p.precoDe)}</span>
          <span class="now">${brl(p.precoPor)}</span>
        </div>
        <a class="btn-buy" target="_blank"
           href="${whatsappLink(p.nome, p.precoPor)}">
           COMPRAR
        </a>
      </div>
    </article>
  `).join("");
}

render();
