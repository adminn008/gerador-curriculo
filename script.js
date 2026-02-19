const toggle = document.getElementById("toggleDark")

if(toggle){
toggle.onclick=()=>{
document.body.classList.toggle("light")
document.body.classList.toggle("dark")
}
}

const tel=document.getElementById("telefone")

if(tel){
tel.addEventListener("input",e=>{
let v=e.target.value.replace(/\D/g,"")
v=v.replace(/(\d{2})(\d)/,"($1) $2")
v=v.replace(/(\d{5})(\d)/,"$1-$2")
e.target.value=v
})
}

const form=document.getElementById("formCV")
const barra=document.getElementById("barraProgresso")
const status=document.getElementById("statusProgresso")

if(form){
const campos=[...form.querySelectorAll("input[required]")]

form.addEventListener("input",()=>{
let preenchidos=0

campos.forEach(c=>{
if(c.value.trim().length>3)preenchidos++
})

let p=Math.round((preenchidos/campos.length)*100)
barra.style.width=p+"%"
status.innerText=p<100?`Faltam ${campos.length-preenchidos} campos obrigatórios`:"Completo"
})

form.addEventListener("submit",e=>{
e.preventDefault()
let valido=true

campos.forEach(c=>{
const erro=c.nextElementSibling
if(!c.value.trim()){
erro.innerText="Campo obrigatório"
c.style.border="2px solid red"
valido=false
}else{
erro.innerText=""
c.style.border="1px solid #555"
}
})

if(valido)alert("PDF gerado (simulação)")
})
}
