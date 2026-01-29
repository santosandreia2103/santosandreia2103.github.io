// script.js
const WHATS_NUMBER = "5541997304061";

/* ✅ MUDE A MENSAGEM AQUI (1 lugar só) */
const WHATS_MSG_GERAL =
  "Olá! Vim pelo site da AKL Fashion & Beauty e quero fazer um pedido.";

/* ✅ Mensagem quando clicar em COMPRAR */
const WHATS_MSG_PRODUTO =
  "Olá! Tenho interesse no produto: {NOME} por {PRECO}. Consulte tamanhos e cores disponíveis.";

/* Produtos (troque imagens/nomes/preços) */
const produtos = [
  { nome: "Vestido Infantil Brenda", imagem: "produtos/vestido-brenda.png", precoDe: 89.99,  precoPor: 49.99 },
  { nome: "Vestido Giulia",          imagem: "produtos/vestido-giulia.png", precoDe: 129.99, precoPor: 89.99 },
  { nome: "Vestido Ariane",          imagem: "produtos/vestido-ariane.png", precoDe: 129.99, precoPor: 99.99 },
  { nome: "Top Zoe",                 imagem: "produtos/top-zoe.png",        precoDe: 119.99, precoPor: 79.99 },
];

function brl(v){
  return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});
}

function makeWhatsLink(texto){
  return `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(texto)}`;
}

function msgProduto(nome, preco){
  return WHATS_MSG_PRODUTO
    .replace("{NOME}", nome)
    .replace("{PRECO}", brl(preco));
}

/* Links do Whats (topo e botão flutuante) */
const whatsHeader = document.getElementById("whatsHeader");
const whatsFloat  = document.getElementById("whatsFloat");
if (whatsHeader) whatsHeader.href = makeWhatsLink(WHATS_MSG_GERAL);
if (whatsFloat)  whatsFloat.href  = makeWhatsLink(WHATS_MSG_GERAL);

/* Render produtos */
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
        <a class="btn-buy" target="_blank" rel="noopener"
           href="${makeWhatsLink(msgProduto(p.nome, p.precoPor))}">
          COMPRAR
        </a>
      </div>
    </article>
  `;
}).join("");
