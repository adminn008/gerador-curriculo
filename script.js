// CONFIGURAÇÃO DA META FINANCEIRA
let valorArrecadado = 0.00; // Altere este valor para atualizar a barra

function atualizarMeta() {
    const meta = 50.00;
    const porcentagem = (valorArrecadado / meta) * 100;
    const bar = document.getElementById('meta-bar-fill');
    const txt = document.getElementById('valor-arrecadado');
    
    if(bar) bar.style.width = porcentagem + "%";
    if(txt) txt.innerText = "R$ " + valorArrecadado.toFixed(2).replace('.', ',');
}

// TOGGLE DO FAQ (ACCORDION)
function toggleAcc(btn) {
    const content = btn.nextElementSibling;
    const span = btn.querySelector('span');
    
    if(content.style.display === "block") {
        content.style.display = "none";
        span.innerText = "+";
    } else {
        content.style.display = "block";
        span.innerText = "-";
    }
}

// BALÃO DE NOVIDADES
function toggleNovidades() {
    const pop = document.getElementById('pop-novidades');
    if(pop) {
        pop.style.display = (pop.style.display === "flex") ? "none" : "flex";
    }
}

// MÁSCARA DE TELEFONE
const inputTel = document.getElementById('in-tel');
if(inputTel) {
    inputTel.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

// INICIALIZAÇÃO
window.onload = () => {
    atualizarMeta();
};
