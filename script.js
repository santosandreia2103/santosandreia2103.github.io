const WHATS_NUMBER = "5541997304061";

const produtos = [
  {
    nome: "Vestido Infantil Brenda",
    imagem: "produtos/vestido-brenda.png",
    precoDe: 89.99,
    precoPor: 49.99
  },
  {
    nome: "Vestido Giulia",
    imagem: "produtos/vestido-giulia.png",
    precoDe: 129.99,
    precoPor: 89.99
  },
  {
    nome: "Vestido Ariane",
    imagem: "produtos/vestido-ariane.png",
    precoDe: 129.99,
    precoPor: 99.99
  },
  {
    nome: "Top Zoe",
    imagem: "produtos/top-zoe.png",
    precoDe: 119.99,
    precoPor: 79.99
  }
];

function brl(v){
  return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function whatsappLink(nome, preco){
  const txt = `Olá! Quero comprar ${nome} por ${brl(preco)}. Consulte tamanhos e cores disponíveis.`;
  return `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(txt)}`;
}

const grid = document.getElementById("grid-produtos");

grid.innerHTML = produtos.map(p=>{
  const desconto = Math.round((1 - p.precoPor / p.precoDe) * 100);
  return `
    <article class="card">
      <div class="card-img">
        <span class="badge">-${desconto}%</span>
        <img src="${p.imagem}" alt="${p.nome}">
      </div>
      <div class="card-body">
        <h3>${p.nome}</h3>
        <div>
          <span class="old">${brl(p.precoDe)}</span>
          <span class="now">${brl(p.precoPor)}</span>
        </div>
        <a class="btn-buy" target="_blank" href="${whatsappLink(p.nome,p.precoPor)}">
          COMPRAR
        </a>
      </div>
    </article>
  `;
}).join("");
