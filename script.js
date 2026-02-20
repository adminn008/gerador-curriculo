// 1. FUNÇÕES DE INTERFACE
function toggleNovidades() {
    const pop = document.getElementById('pop-novidades');
    if (pop) pop.style.display = (pop.style.display === 'none' || pop.style.display === '') ? 'block' : 'none';
}

function copyPix() {
    const key = document.getElementById('pix-key').innerText;
    navigator.clipboard.writeText(key);
    alert("Chave PIX Copiada! Valeu pelo apoio! 🚀");
}

// 2. MÁSCARA DE TELEFONE ( ) 00000-0000
function mascaraTelefone(i) {
    let v = i.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) i.value = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (v.length > 5) i.value = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (v.length > 2) i.value = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    else i.value = v;
    update();
}

// 3. SUGESTÕES (CONSERTADO)
const textosSugestao = {
    obj: [
        "Profissional dedicado em busca de novos desafios para aplicar competências técnicas e evoluir na carreira.",
        "Foco em metas e resultados, buscando integrar o time de vendas para maximizar o faturamento e fidelização.",
        "Objetivo de atuar no setor administrativo, organizando processos e otimizando o fluxo de trabalho."
    ],
    exp: [
        "Nome da Empresa\nCargo Ocupado | Período: 2024 - Atual\n• Responsável por organizar fluxos de trabalho.\n• Atendimento ao cliente e suporte técnico.\n• Alcancei metas de produtividade em 20%."
    ]
};

function sugerirMulti(campo, index) {
    const el = document.getElementById('in-' + campo);
    if (el && textosSugestao[campo][index]) {
        el.value = textosSugestao[campo][index];
        update();
    }
}

function setModel(tipo, btn) {
    document.getElementById('preview-content').className = 'mode-' + tipo;
    document.querySelectorAll('.model-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 4. CORE UPDATE
function update() {
    const nome = document.getElementById('in-nome').value;
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const obj = document.getElementById('in-obj').value;
    const exp = document.getElementById('in-exp').value;
    
    // Preview
    document.getElementById('pre-nome').innerText = nome || "SEU NOME";
    document.getElementById('pre-contato').innerText = `${tel} | ${email}`;
    document.getElementById('pre-obj').innerText = obj;
    document.getElementById('pre-exp').innerText = exp;

    // Validação Real
    const btn = document.getElementById('btn-gerar');
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const telValido = tel.replace(/\D/g, "").length >= 10;

    if(nome.length > 3 && telValido && emailValido && obj.length > 10) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = "🚀 GERAR CURRÍCULO AGORA";
        document.getElementById('status-tag').innerText = "QUALIDADE: 100%";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerHTML = "🔒 DADOS INCOMPLETOS";
        document.getElementById('status-tag').innerText = "QUALIDADE: 50%";
    }
}

function gerarPDF() {
    const printContent = document.getElementById('live-preview').innerHTML;
    document.getElementById('print-area').innerHTML = printContent;
    window.print();
}

// Listener geral
document.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', update));
