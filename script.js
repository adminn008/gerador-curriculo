let modeloAtual = 'moderno';

// 1. MODELOS E SUGESTÕES
const sugestoes = {
    obj: "Busco oportunidade na área de [ÁREA], onde possa aplicar meus conhecimentos em [HABILIDADE] e contribuir para o crescimento da empresa.",
    exp: "Empresa X - Cargo: [NOME] (2023-2024)\nResponsável por [TAREFA 1] e [TAREFA 2], alcançando a meta de [RESULTADO]."
};

function sugerir(campo) {
    const el = document.getElementById('in-' + campo);
    if(el) {
        el.value = sugestoes[campo];
        updateLive();
    }
}

function setModel(tipo, el) {
    modeloAtual = tipo;
    document.querySelectorAll('.model-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('preview-content').className = 'mode-' + tipo;
    updateLive();
}

// 2. ATUALIZAÇÃO EM TEMPO REAL
function updateLive() {
    const nome = document.getElementById('in-nome').value || "Seu Nome";
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const obj = document.getElementById('in-obj').value;

    document.getElementById('pre-nome').innerText = nome;
    document.getElementById('pre-contato').innerText = `${tel} | ${email}`;
    document.getElementById('pre-obj').innerText = obj;

    verificarBloqueio();
}

// 3. VALIDAÇÃO PARA LIBERAR PDF
function verificarBloqueio() {
    const nome = document.getElementById('in-nome').value;
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const obj = document.getElementById('in-obj').value;
    
    const btn = document.getElementById('btn-gerar');
    
    if(nome.length > 3 && tel.length > 8 && email.includes('@') && obj.length > 10) {
        btn.style.opacity = "1";
        btn.innerHTML = "🚀 GERAR PDF AGORA";
        btn.disabled = false;
        analisarQualidade(100);
    } else {
        btn.style.opacity = "0.5";
        btn.innerHTML = "🔒 PREENCHA OS OBRIGATÓRIOS";
        btn.disabled = true;
        analisarQualidade(50);
    }
}

function validarEGerar() {
    const printArea = document.getElementById('print-area');
    printArea.innerHTML = document.getElementById('live-preview').innerHTML;
    window.print();
}

// Reutiliza a função de qualidade do script anterior
function analisarQualidade(score) {
    const tag = document.getElementById('status-tag');
    if(tag) tag.innerText = "QUALIDADE: " + score + "%";
}

// Inicializa a máscara de telefone (conforme o código anterior)
// ...
