const content = document.getElementById("content");
const buttons = document.querySelectorAll(".menu button");

buttons.forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".active")?.classList.remove("active");
    btn.classList.add("active");
    render(btn.dataset.tab);
  };
});

function render(tab) {
  const templates = {

    compostos: `
      <h2>Juros Compostos</h2>
      <input id="c" placeholder="Capital">
      <input id="i" placeholder="Taxa (%)">
      <input id="t" placeholder="Tempo">
      <button class="calc" onclick="compostos()">Calcular</button>
      <div class="result" id="res"></div>
    `,

    simples: `
      <h2>Juros Simples</h2>
      <input id="c" placeholder="Capital">
      <input id="i" placeholder="Taxa (%)">
      <input id="t" placeholder="Tempo">
      <button class="calc" onclick="simples()">Calcular</button>
      <div class="result" id="res"></div>
    `,

    eq1: `
      <h2>Equação 1º Grau</h2>
      <input id="a" placeholder="a">
      <input id="b" placeholder="b">
      <button class="calc" onclick="eq1()">Resolver</button>
      <div class="result" id="res"></div>
    `,

    eq2: `
      <h2>Equação 2º Grau</h2>
      <input id="a" placeholder="a">
      <input id="b" placeholder="b">
      <input id="c" placeholder="c">
      <button class="calc" onclick="eq2()">Resolver</button>
      <div class="result" id="res"></div>
    `,

    func1: `
      <h2>Função 1º Grau</h2>
      <input id="a" placeholder="a">
      <input id="b" placeholder="b">
      <input id="x" placeholder="x">
      <button class="calc" onclick="func1()">Calcular</button>
      <div class="result" id="res"></div>
    `,

    func2: `
      <h2>Função 2º Grau</h2>
      <input id="a" placeholder="a">
      <input id="b" placeholder="b">
      <input id="c" placeholder="c">
      <input id="x" placeholder="x">
      <button class="calc" onclick="func2()">Calcular</button>
      <div class="result" id="res"></div>
    `,

    ineq1: `
      <h2>Inequação 1º Grau</h2>
      <input id="a" placeholder="a">
      <input id="b" placeholder="b">
      <button class="calc" onclick="ineq1()">Resolver</button>
      <div class="result" id="res"></div>
    `,

    ineq2: `
      <h2>Inequação 2º Grau</h2>
      <input id="a" placeholder="a">
      <input id="b" placeholder="b">
      <input id="c" placeholder="c">
      <button class="calc" onclick="ineq2()">Resolver</button>
      <div class="result" id="res"></div>
    `,

    conj: `
      <h2>Conjuntos</h2>
      <input id="a" placeholder="A (1,2,3)">
      <input id="b" placeholder="B (2,3,4)">
      <button class="calc" onclick="conj()">Calcular</button>
      <div class="result" id="res"></div>
    `,

    dom: `
      <h2>Domínio</h2>
      <input id="exp" placeholder="Ex: 1/(x-2)">
      <button class="calc" onclick="dom()">Verificar</button>
      <div class="result" id="res"></div>
    `
  };

  content.innerHTML = templates[tab];
}

// iniciar
render("compostos");

// funções

function compostos() {
  let c = +cVal();
  let i = +iVal()/100;
  let t = +tVal();

  let m = c * (1+i)**t;
  res(`Montante: ${m.toFixed(2)}`);
}

function simples() {
  let c = +cVal();
  let i = +iVal()/100;
  let t = +tVal();

  let j = c*i*t;
  res(`Juros: ${j.toFixed(2)} | Montante: ${(c+j).toFixed(2)}`);
}

function eq1() {
  let a = +val("a");
  let b = +val("b");
  res(`x = ${-b/a}`);
}

function eq2() {
  let a = +val("a");
  let b = +val("b");
  let c = +val("c");

  let d = b*b - 4*a*c;
  if(d<0) return res("Sem solução real");

  let x1 = (-b + Math.sqrt(d))/(2*a);
  let x2 = (-b - Math.sqrt(d))/(2*a);
  res(`x1=${x1}, x2=${x2}`);
}

function func1() {
  let a = +val("a");
  let b = +val("b");
  let x = +val("x");
  res(`f(x) = ${a*x + b}`);
}

function func2() {
  let a = +val("a");
  let b = +val("b");
  let c = +val("c");
  let x = +val("x");
  res(`f(x) = ${a*x*x + b*x + c}`);
}

function ineq1() {
  let a = +val("a");
  let b = +val("b");
  res(`x > ${-b/a}`);
}

function ineq2() {
  let a = +val("a");
  let b = +val("b");
  let c = +val("c");

  let d = b*b - 4*a*c;
  if(d<0) return res("Sem raízes reais");

  let x1 = (-b - Math.sqrt(d))/(2*a);
  let x2 = (-b + Math.sqrt(d))/(2*a);
  res(`Intervalos baseados em ${x1} e ${x2}`);
}

function conj() {
  let A = val("a").split(",");
  let B = val("b").split(",");

  let uniao = [...new Set([...A, ...B])];
  let inter = A.filter(x => B.includes(x));

  res(`União: ${uniao} | Interseção: ${inter}`);
}

function dom() {
  let exp = val("exp");

  if(exp.includes("x-")) {
    let n = exp.split("x-")[1].replace(")","");
    res(`x ≠ ${n}`);
  } else {
    res("Não identificado");
  }
}

// helpers
function val(id){ return document.getElementById(id).value }
function res(txt){ document.getElementById("res").innerText = txt }
function cVal(){ return val("c") }
function iVal(){ return val("i") }
function tVal(){ return val("t") }