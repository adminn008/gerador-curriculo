// TEMA DARK / LIGHT
function toggleTheme(){
 document.body.classList.toggle("light-theme");
 localStorage.setItem("theme",
   document.body.classList.contains("light-theme") ? "light":"dark"
 );
}
if(localStorage.getItem("theme")==="light"){
 document.body.classList.add("light-theme");
}

// META FINANCEIRA
let valorArrecadado = 0.00;
function atualizarMeta() {
 const meta = 50.00;
 const porcentagem = (valorArrecadado / meta) * 100;
 const bar = document.getElementById('meta-bar-fill');
 const txt = document.getElementById('valor-arrecadado');
 if(bar) bar.style.width = porcentagem + "%";
 if(txt) txt.innerText = "R$ " + valorArrecadado.toFixed(2).replace('.', ',');
}

// POPUP NOVIDADES
function toggleNovidades() {
 const pop = document.getElementById('pop-novidades');
 if(!pop) return;
 pop.classList.toggle("show");
}

// ACCORDION FAQ
function toggleAcc(btn){
 const content = btn.nextElementSibling;
 const span = btn.querySelector("span");
 if(content.style.display==="block"){
   content.style.display="none";
   span.innerText="+";
 } else {
   content.style.display="block";
   span.innerText="-";
 }
}

// MÁSCARA TELEFONE
const inputTel = document.getElementById('in-tel');
if(inputTel){
 inputTel.addEventListener("input", e=>{
   let v = e.target.value.replace(/\D/g,"").slice(0,11);
   let m = v.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
   e.target.value = !m[2]?m[1]:"("+m[1]+") "+m[2]+(m[3]?"-"+m[3]:"");
 });
}

// GERAR PDF COM VALIDAÇÃO
function gerarPDF(){
 const nome=document.getElementById("in-nome").value.trim();
 const tel=document.getElementById("in-tel").value.trim();
 const telValido = tel.length >= 14;
 if(!nome || !telValido){
   alert("Preencha o nome e um telefone válido.");
   return;
 }
 window.print();
}

// INICIALIZAÇÃO
window.onload = () => {
 atualizarMeta();
};

const camposObrigatorios = [
"in-nome",
"in-tel",
"in-email",
"in-formacao",
"in-hab"
];

const todosCampos = [
"in-nome","in-tel","in-email","in-formacao",
"in-hab","in-exp","in-idiomas",
"in-cursos","in-linkedin","in-bairro"
];

function validarEmail(email){
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function telefoneValido(tel){
return tel.length >= 14;
}

function atualizarProgresso(){

let preenchidos = 0;

todosCampos.forEach(id=>{
const el=document.getElementById(id);
if(el && el.value.trim()!=="") preenchidos++;
});

let porcentagem=Math.round((preenchidos/todosCampos.length)*100);

const email=document.getElementById("in-email").value;
const tel=document.getElementById("in-tel").value;

if(!validarEmail(email)) porcentagem-=10;
if(!telefoneValido(tel)) porcentagem-=10;

if(porcentagem<0) porcentagem=0;

document.getElementById("progress-bar").style.width=porcentagem+"%";
document.getElementById("progress-text").innerText=porcentagem+"%";

gerarChecklist();
avaliarCurriculo(porcentagem);
}

function gerarChecklist(){

const lista=document.getElementById("checklist");
lista.innerHTML="";

camposObrigatorios.forEach(id=>{
const el=document.getElementById(id);
if(!el.value.trim()){
const li=document.createElement("li");
li.innerText="Falta preencher "+el.previousElementSibling.innerText;
lista.appendChild(li);
}
});
}

function avaliarCurriculo(p){

const box=document.getElementById("avaliacao");

if(p<40) box.innerText="Currículo fraco — precisa melhorar";
else if(p<70) box.innerText="Currículo bom — pode melhorar mais";
else box.innerText="Currículo excelente!";
}

document.querySelectorAll("input, textarea").forEach(el=>{
el.addEventListener("input", atualizarProgresso);
});
