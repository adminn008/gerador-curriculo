// CONTROLES
function toggleNovidades() {
    const pop = document.getElementById('pop-novidades');
    pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
}

function setModel(tipo) {
    document.getElementById('preview-content').className = 'mode-' + tipo;
    update();
}

function sugerir(campo) {
    const txt = {
        obj: "Profissional focado em resultados, com sólida base em [ÁREA].",
        exp: "Empresa X - Cargo Y (2025)\nAtuei na área de..."
    };
    document.getElementById('in-' + campo).value = txt[campo];
    update();
}

function update() {
    const nome = document.getElementById('in-nome').value;
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const obj = document.getElementById('in-obj').value;

    // Preview
    document.getElementById('pre-nome').innerText = nome || "SEU NOME";
    document.getElementById('pre-contato').innerText = `${tel} | ${email}`;
    document.getElementById('pre-obj').innerText = obj;

    // Validação
    const btn = document.getElementById('btn-gerar');
    if(nome.length > 5 && tel.length > 5 && email.includes('@') && obj.length > 5) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = "🚀 GERAR PDF";
        document.getElementById('status-tag').innerText = "QUALIDADE: 100%";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerHTML = "🔒 PREENCHA OS OBRIGATÓRIOS";
    }
}

function gerar() {
    const content = document.getElementById('live-preview').innerHTML;
    document.getElementById('print-area').innerHTML = content;
    window.print();
}

document.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', update));
