let modeloAtual = 'moderno';

// CONTROLE DE NOVIDADES
function toggleNovidades() {
    const pop = document.getElementById('pop-novidades');
    pop.style.display = (pop.style.display === 'none' || pop.style.display === '') ? 'block' : 'none';
}

// SUGESTÕES
const textos = {
    obj: "Profissional dedicado com experiência em [ÁREA], buscando novos desafios para aplicar minhas habilidades técnicas e contribuir com resultados sólidos para a equipe.",
    exp: "• Liderança de processos operacionais\n• Redução de custos em 15% no primeiro semestre\n• Atendimento ao cliente com foco em fidelização"
};

function sugerir(campo) {
    document.getElementById('in-' + campo).value = textos[campo];
    validar();
}

// MUDAR MODELO (3 MODELOS REAIS)
function setModel(tipo) {
    const preview = document.getElementById('preview-content');
    preview.className = 'mode-' + tipo;
    // O modelo 'executivo' muda a cor de fundo do preview para teste visual
    if(tipo === 'executivo') preview.style.background = "#f0f0f0";
    else if(tipo === 'minimalista') preview.style.background = "#fff";
    else preview.style.background = "white";
}

// VALIDAÇÃO E BLOQUEIO
function validar() {
    const req = document.querySelectorAll('.val-req');
    let preenchidos = 0;
    req.forEach(input => { if(input.value.length > 5) preenchidos++; });

    const btn = document.getElementById('btn-gerar');
    if(preenchidos >= 4) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = "🚀 GERAR CURRÍCULO AGORA";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerHTML = "🔒 PREENCHA OS CAMPOS OBRIGATÓRIOS";
    }
    updateLive();
}

// UPDATE LIVE PREVIEW
function updateLive() {
    document.getElementById('pre-nome').innerText = document.getElementById('in-nome').value || "Seu Nome";
    document.getElementById('pre-contato').innerText = 
        `${document.getElementById('in-tel').value} | ${document.getElementById('in-email').value}`;
}

// ATIVAR VALIDAÇÃO EM TODOS OS INPUTS
document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', validar);
});

function gerarPDF() {
    window.print();
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
