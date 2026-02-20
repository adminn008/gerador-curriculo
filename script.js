const form = document.getElementById('formCV');
const barra = document.getElementById('barra');
const faltando = document.getElementById('faltando');

if(form){
form.addEventListener('input', atualizar);
}

function atualizar(){
const campos = form.querySelectorAll('input[required]');
let ok = 0;

campos.forEach(c=>{
if(c.value.trim()!=="") ok++;
});

let total = campos.length;
let porcent = Math.round((ok/total)*100);

barra.style.width = porcent+"%";
faltando.innerText = porcent===100 ? "Currículo completo" : `Faltam ${total-ok} campos obrigatórios`;
}

const tel = document.getElementById('telefone');
if(tel){
tel.addEventListener('input', ()=>{
let v = tel.value.replace(/\D/g,'');
v = v.replace(/(\d{2})(\d)/,"($1) $2");
v = v.replace(/(\d{5})(\d)/,"$1-$2");
tel.value = v;
});
}
