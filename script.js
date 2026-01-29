const WHATS_NUMBER = "5541997304061";

/*
  COMO COLOCAR SUAS IMAGENS REAIS DOS PRODUTOS:
  1) Crie uma pasta no GitHub: produtos/
  2) Faça upload das fotos (ex: produtos/vestido-brenda.png)
  3) Troque "imagem" abaixo para o caminho certo.

  IMPORTANTE: nome tem que ser exatamente igual (maiúsculas contam).
*/

const produtos = [
  // Exemplo (troque pelos seus)
  { nome: "Vestido Infantil Brenda", categoria: "Infantil", marca: "Euro", imagem: "produtos/vestido-brenda.png", precoDe: 89.99, precoPor: 49.99 },
  { nome: "Vestido Giulia", categoria: "Feminino", marca: "Romance", imagem: "produtos/vestido-giulia.png", precoDe: 129.99, precoPor: 89.99 },
  { nome: "Vestido Ariane", categoria: "Feminino", marca: "Euro", imagem: "produtos/vestido-ariane.png", precoDe: 129.99, precoPor: 99.99 },
  { nome: "Top Zoe", categoria: "Feminino", marca: "Romance", imagem: "produtos/top-zoe.png", precoDe: 119.99, precoPor: 79.99 },
];

let catChip = "Feminino";         // chip inicial
let promoOnly = false;            // “Apenas promoções”
let q = "";                       // busca
let min = null, max = null;       // faixa de preço
let catChecks = new Set(["Feminino","Infantil","Masculino"]);
let brandChecks = new Set(["Euro","Romance"]);

function brl(n){
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function descontoPct(precoDe, precoPor){
  if (!Number.isFinite(precoDe) || precoDe <= 0) return null;
  const pct = Math.round((1 - (precoPor / precoDe)) * 100);
  return pct > 0 ? pct : null;
}

function whatsappLink(nome, precoPor){
  const texto = `Olá! Quero comprar ${nome} por ${brl(precoPor)}. Consulte tamanhos e cores disponíveis.`;
  return `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(texto)}`;
}

function applyAllFilters(items){
  let out = [...items];

  // Chip categoria (se não for "Todos")
  if (catChip && catChip !== "Todos") {
    out = out.filter(p => p.categoria === catChip);
  }

  // Checks de categoria
  out = out.filter(p => catChecks.has(p.categoria));

  // Checks de marca
  out = out.filter(p => brandChecks.has(p.marca));

  // Promo
  if (promoOnly) {
    out = out.filter(p => Number.isFinite(p.precoDe) && p.precoDe > p.precoPor);
  }

  // Busca
  if (q.trim()) {
    const s = q.trim().toLowerCase();
    out = out.filter(p => p.nome.toLowerCase().includes(s));
  }

  // Preço
  if (Number.isFinite(min)) out = out.filter(p => p.precoPor >= min);
  if (Number.isFinite(max)) out = out.filter(p => p.precoPor <= max);

  return out;
}

function sortItems(items, mode){
  const out = [...items];
  if (mode === "menor_preco") out.sort((a,b)=>a.precoPor-b.precoPor);
  if (mode === "maior_preco") out.sort((a,b)=>b.precoPor-a.precoPor);
  if (mode === "maior_desconto") {
    out.sort((a,b)=>{
      const da = descontoPct(a.precoDe, a.precoPor) || 0;
      const db = descontoPct(b.precoDe, b.precoPor) || 0;
      return db - da;
    });
  }
  // "relevantes": deixa como está
  return out;
}

function render(){
  const grid = document.getElementById("grid");
  const count = document.getElementById("countProducts");
  const sortMode = document.getElementById("sortSelect").value;

  let items = applyAllFilters(produtos);
  items = sortItems(items, sortMode);

  count.textContent = String(items.length);

  grid.innerHTML = items.map(p => {
    const pct = descontoPct(p.precoDe, p.precoPor);
    return `
      <article class="card">
        <div class="card-img">
          ${pct ? `<div class="badge">-${pct}%</div>` : ``}
          <img src="${p.imagem}" alt="${p.nome}">
        </div>
        <div class="card-body">
          <h3 class="card-title">${p.nome}</h3>
          <div class="prices">
            ${pct ? `<span class="old">${brl(p.precoDe)}</span>` : ``}
            <span class="now">${brl(p.precoPor)}</span>
          </div>
          <a class="btn-buy" target="_blank" rel="noopener" href="${whatsappLink(p.nome, p.precoPor)}">COMPRAR</a>
        </div>
      </article>
    `;
  }).join("");
}

/* Events */
document.querySelectorAll(".chip").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".chip").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    catChip = btn.dataset.cat;
    render();
  });
});

document.querySelectorAll(".link").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    document.querySelectorAll(".link").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    promoOnly = (btn.dataset.filter === "promo");
    render();
  });
});

document.querySelectorAll(".catCheck").forEach(ch=>{
  ch.addEventListener("change", ()=>{
    if (ch.checked) catChecks.add(ch.value);
    else catChecks.delete(ch.value);
    render();
  });
});

document.querySelectorAll(".brandCheck").forEach(ch=>{
  ch.addEventListener("change", ()=>{
    if (ch.checked) brandChecks.add(ch.value);
    else brandChecks.delete(ch.value);
    render();
  });
});

document.getElementById("sortSelect").addEventListener("change", render);

function setQuery(val){
  q = val || "";
  render();
}

document.getElementById("searchBtn").addEventListener("click", ()=>{
  setQuery(document.getElementById("searchInput").value);
});
document.getElementById("searchInput").addEventListener("keydown", (e)=>{
  if (e.key === "Enter") setQuery(e.target.value);
});

document.getElementById("sideSearchBtn").addEventListener("click", ()=>{
  setQuery(document.getElementById("sideSearch").value);
});
document.getElementById("sideSearch").addEventListener("keydown", (e)=>{
  if (e.key === "Enter") setQuery(e.target.value);
});

document.getElementById("applyFilters").addEventListener("click", ()=>{
  const mi = Number(document.getElementById("minPrice").value);
  const ma = Number(document.getElementById("maxPrice").value);
  min = Number.isFinite(mi) && mi > 0 ? mi : null;
  max = Number.isFinite(ma) && ma > 0 ? ma : null;
  render();
});

document.getElementById("clearFilters").addEventListener("click", ()=>{
  promoOnly = false;
  q = "";
  min = null; max = null;
  catChip = "Feminino";
  catChecks = new Set(["Feminino","Infantil","Masculino"]);
  brandChecks = new Set(["Euro","Romance"]);

  document.getElementById("searchInput").value = "";
  document.getElementById("sideSearch").value = "";
  document.getElementById("minPrice").value = "";
  document.getElementById("maxPrice").value = "";
  document.getElementById("sortSelect").value = "relevantes";

  document.querySelectorAll(".chip").forEach(b=>b.classList.remove("active"));
  document.querySelector('.chip[data-cat="Feminino"]').classList.add("active");

  document.querySelectorAll(".link").forEach(b=>b.classListremove?.("active"));
  // fallback simples:
  document.querySelectorAll(".link").forEach(b=>b.classList.remove("active"));
  document.querySelector('.link[data-filter="todos"]').classList.add("active");

  document.querySelectorAll(".catCheck").forEach(ch=> ch.checked = true);
  document.querySelectorAll(".brandCheck").forEach(ch=> ch.checked = true);

  render();
});

// primeira renderização
render();
