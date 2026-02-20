// 1. MÁSCARA DE TELEFONE
const telInput = document.getElementById('in-tel');
if(telInput) {
    telInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        analisarQualidade();
    });
}

// 2. META FINANCEIRA (Configure o valor arrecadado aqui)
const valorArrecadado = 0.00; 
function initMeta() {
    const meta = 50.00;
    const porcentagem = (valorArrecadado / meta) * 100;
    const fill = document.getElementById('meta-fill');
    const txt = document.getElementById('valor-atual');
    if(fill) fill.style.width = porcentagem + "%";
    if(txt) txt.innerText = "R$ " + valorArrecadado.toFixed(2).replace('.', ',');
}

// 3. ANALISADOR DE QUALIDADE EM TEMPO REAL
function analisarQualidade() {
    const campos = {
        'in-nome': 'chk-nome',
        'in-tel': 'chk-tel',
        'in-email': 'chk-email',
        'in-obj': 'chk-obj'
    };

    let score = 0;
    for(let id in campos) {
        const input = document.getElementById(id);
        const check = document.getElementById(campos[id]);
        if(input && input.value.length > 5) {
            score += 25;
            check.style.color = "var(--success)";
            check.innerText = "✓ " + check.innerText.replace("✓ ", "").replace("✕ ", "");
        } else if(check) {
            check.style.color = "var(--text-dim)";
            check.innerText = "✕ " + check.innerText.replace("✓ ", "").replace("✕ ", "");
        }
    }

    const fill = document.getElementById('cv-fill');
    const tag = document.getElementById('status-tag');
    if(fill) fill.style.width = score + "%";
    if(tag) tag.innerText = "QUALIDADE: " + score + "%";
}

// 4. CONTROLE DO MODAL NOVIDADES
function toggleNovidades() {
    const pop = document.getElementById('pop-novidades');
    pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
}

// 5. PREPARAÇÃO DO PDF
window.onbeforeprint = () => {
    document.getElementById('out-nome').innerText = document.getElementById('in-nome').value;
    document.getElementById('out-contato').innerText = 
        `${document.getElementById('in-tel').value} | ${document.getElementById('in-email').value} | ${document.getElementById('in-local').value}`;
    document.getElementById('out-obj').innerText = document.getElementById('in-obj').value;
    document.getElementById('out-exp').innerText = document.getElementById('in-exp').value;
    document.getElementById('out-edu').innerText = document.getElementById('in-edu').value;
    document.getElementById('out-skills').innerText = document.getElementById('in-skills').value;
};

// Start
document.addEventListener('DOMContentLoaded', () => {
    initMeta();
    document.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', analisarQualidade));
});
