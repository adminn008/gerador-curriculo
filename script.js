const obrigatorios=["nome","tel","email"];

const sugestoes=[
"Busco minha primeira oportunidade profissional.",
"Atuar com atendimento ao cliente.",
"Desenvolver carreira administrativa.",
"Trabalhar com vendas e metas.",
"Ingressar na área de tecnologia."
];

function sug(i){
document.getElementById("obj").value=sugestoes[i];
atualizar();
}

document.querySelectorAll("input,textarea,select")
.forEach(e=>e.addEventListener("input",atualizar));

function validarEmail(e){
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function telOk(t){
return t.length>=14;
}

document.getElementById("tel").addEventListener("input",e=>{
let x=e.target.value.replace(/\D/g,'').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
e.target.value=!x[2]?x[1]:'('+x[1]+') '+x[2]+(x[3]?'-'+x[3]:'');
});

function atualizar(){

let faltam=0;

obrigatorios.forEach(id=>{
let el=document.getElementById(id);
let erro=el.nextElementSibling;

let invalido=false;

if(!el.value) invalido=true;
if(id==="email" && !validarEmail(el.value)) invalido=true;
if(id==="tel" && !telOk(el.value)) invalido=true;

if(invalido){
el.classList.add("error");
erro.style.display="block";
faltam++;
}else{
el.classList.remove("error");
erro.style.display="none";
}
});

let total=obrigatorios.length;
let feito=total-faltam;
let p=Math.round((feito/total)*100);

document.getElementById("bar").style.width=p+"%";
document.getElementById("status").innerText=
faltam>0 ? "Faltam "+faltam+" campos obrigatórios" : "Tudo pronto!";
}

function gerar(){
atualizar();
if(document.querySelectorAll(".error").length>0){
alert("Preencha os campos obrigatórios");
return;
}
window.print();
}

atualizar();
