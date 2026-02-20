// ATUALIZAÇÃO EM TEMPO REAL
function update() {
    const nome = document.getElementById('in-nome').value || "SEU NOME";
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const local = document.getElementById('in-local').value;
    const obj = document.getElementById('in-obj').value;
    const exp = document.getElementById('in-exp').value;

    document.getElementById('pre-nome').innerText = nome.toUpperCase();
    document.getElementById('pre-contato').innerText = `${tel} | ${email} | ${local}`;
    document.getElementById('pre-obj').innerText = obj;
    document.getElementById('pre-exp').innerText = exp;

    validar();
}

function validar() {
    const nome = document.getElementById('in-nome').value;
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const obj = document.getElementById('in-obj').value;
    const btn = document.getElementById('btn-gerar');

    const preenchidos = (nome.length > 3 ? 25 : 0) + (tel.length > 5 ? 25 : 0) + (email.includes('@') ? 25 : 0) + (obj.length > 10 ? 25 : 0);
    
    document.getElementById('status-tag').innerText = `QUALIDADE: ${preenchidos}%`;

    if(preenchidos === 100) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.innerHTML = "🚀 GERAR CURRÍCULO PROFISSIONAL";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerHTML = "🔒 COMPLETE O BÁSICO PARA GERAR";
    }
}

function sugerir(campo) {
    const textos = {
        obj: "Busco uma oportunidade para aplicar minhas competências profissionais e colaborar com o crescimento da empresa, focando em resultados e aprendizado contínuo.",
        exp: "• Gestão de processos e equipe\n• Atendimento ao cliente focado em metas\n• Organização e controle de fluxo de caixa"
    };
    document.getElementById('in-' + campo).value = textos[campo];
    update();
}

function setModel(tipo) {
    document.getElementById('preview-content').className = 'mode-' + tipo;
}

function gerarPDF() {
    const content = document.getElementById('live-preview').innerHTML;
    document.getElementById('print-area').innerHTML = content;
    window.print();
}

// Escuta todos os inputs
document.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', update));
