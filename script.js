// CONFIGURAÇÃO DA META (v1.2.1)
let valorArrecadado = 0.00; // Altere este valor para atualizar a barra PIX

function initMeta() {
    const meta = 50.00;
    const porcentagem = (valorArrecadado / meta) * 100;
    const bar = document.getElementById('meta-fill');
    const txt = document.getElementById('txt-arrecadado');
    
    if(bar) bar.style.width = porcentagem + "%";
    if(txt) txt.innerText = "R$ " + valorArrecadado.toFixed(2).replace('.', ',');
}

// MÁSCARA TELEFONE
const tel = document.getElementById('in-tel');
if(tel) {
    tel.addEventListener('input', e => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        updateQuality();
    });
}

// QUALIDADE DO CV (Checklist)
function updateQuality() {
    const fields = {
        'in-nome': 'chk-nome',
        'in-tel': 'chk-tel',
        'in-email': 'chk-email',
        'in-obj': 'chk-obj'
    };
    
    let preenchidos = 0;
    for(let id in fields) {
        const val = document.getElementById(id)?.value;
        const li = document.getElementById(fields[id]);
        if(val && val.length > 3) {
            preenchidos++;
            if(li) li.innerHTML = "✔ " + li.innerText.replace("❌ ", "").replace("✔ ", "");
            if(li) li.style.color = "var(--success)";
        } else {
            if(li) li.innerHTML = "❌ " + li.innerText.replace("❌ ", "").replace("✔ ", "");
            if(li) li.style.color = "var(--text-muted)";
        }
    }
    
    const total = Object.keys(fields).length;
    const perc = Math.round((preenchidos / total) * 100);
    const tag = document.getElementById('quality-tag');
    if(tag) tag.innerText = `CV ${perc}% COMPLETO`;
}

// ACCORDION
function toggleAcc(btn) {
    const content = btn.nextElementSibling;
    const isVisible = content.style.display === "block";
    document.querySelectorAll('.acc-content').forEach(c => c.style.display = 'none');
    content.style.display = isVisible ? "none" : "block";
}

// GERAR PDF
function gerar() {
    const nome = document.getElementById('in-nome').value;
    if(!nome) {
        alert("Pelo menos o nome, né chavão?");
        return;
    }
    window.print();
}

window.onload = () => {
    initMeta();
    document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', updateQuality);
    });
};
