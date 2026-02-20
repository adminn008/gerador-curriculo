// 1. MÁSCARA DE TELEFONE INTELIGENTE
function mascaraTelefone(i) {
    let v = i.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) i.value = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (v.length > 5) i.value = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (v.length > 2) i.value = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    else i.value = v;
    update();
}

// 2. SUGESTÕES DE TEXTO (FIXAS E FUNCIONAIS)
const baseTextos = {
    obj: [
        "Profissional dedicado em busca de novos desafios para aplicar competências técnicas e evoluir na carreira.",
        "Foco em metas e resultados, buscando integrar o time de vendas para maximizar o faturamento e fidelização.",
        "Objetivo de atuar no setor administrativo, organizando processos e otimizando o fluxo de trabalho da empresa."
    ],
    exp: [
        "Nome da Empresa\nCargo Ocupado | Período: 2024 - Atual\n• Responsável por organizar fluxos de trabalho.\n• Atendimento ao cliente e resolução de problemas.\n• Alcancei metas de produtividade em 20%."
    ]
};

function sugerirMulti(campo, index) {
    const el = document.getElementById('in-' + campo);
    if (el) {
        el.value = baseTextos[campo][index];
        update();
    }
}

// 3. SELEÇÃO DE MODELOS
function setModel(tipo, btn) {
    document.getElementById('preview-content').className = 'mode-' + tipo;
    document.querySelectorAll('.model-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 4. ATUALIZAÇÃO E VALIDAÇÃO DE MILHÕES
function update() {
    // Captura dos dados
    const nome = document.getElementById('in-nome').value;
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const obj = document.getElementById('in-obj').value;
    const exp = document.getElementById('in-exp').value;
    const local = document.getElementById('in-local').value;
    
    // Atualiza os elementos invisíveis (que serão usados no PDF)
    if(document.getElementById('pre-nome')) document.getElementById('pre-nome').innerText = nome.toUpperCase();
    if(document.getElementById('pre-contato')) document.getElementById('pre-contato').innerText = `${tel} | ${email} | ${local}`;
    if(document.getElementById('pre-obj')) document.getElementById('pre-obj').innerText = obj;
    if(document.getElementById('pre-exp')) document.getElementById('pre-exp').innerText = exp;

    // Validação Real para o Botão
    const btn = document.getElementById('btn-gerar');
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const telOk = tel.replace(/\D/g, "").length >= 10;
    const statusTag = document.getElementById('status-tag');
    const statusTagG = document.getElementById('status-tag-grande');

    if(nome.length > 3 && telOk && emailOk && obj.length > 10) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = "🚀 GERAR CURRÍCULO PROFISSIONAL";
        if(statusTag) statusTag.innerText = "QUALIDADE: 100%";
        if(statusTagG) statusTagG.innerText = "QUALIDADE: 100%";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerHTML = "🔒 DADOS INCOMPLETOS";
        if(statusTag) statusTag.innerText = "QUALIDADE: 50%";
        if(statusTagG) statusTagG.innerText = "QUALIDADE: 50%";
    }
}


function gerarPDF() {
    const content = document.getElementById('live-preview').innerHTML;
    document.getElementById('print-area').innerHTML = content;
    window.print();
}

// Ouvir digitais
document.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', update));

// Efeito de contador dinâmico para a Home
function startCounter() {
    const counterEl = document.getElementById('cv-counter');
    if(!counterEl) return;

    let baseValue = 1248; // Valor inicial
    
    setInterval(() => {
        // Aumenta entre 1 e 3 currículos a cada poucos segundos
        baseValue += Math.floor(Math.random() * 3);
        counterEl.innerText = baseValue.toLocaleString('pt-BR');
    }, 5000); // Atualiza a cada 5 segundos
}

// Chame a função quando o documento carregar
document.addEventListener('DOMContentLoaded', startCounter);

// Função para abrir/fechar o modal
function toggleNovidades() {
    const pop = document.getElementById('pop-novidades');
    if (pop) {
        if (pop.style.display === 'none' || pop.style.display === '') {
            pop.style.display = 'block';
            pop.style.animation = 'fadeIn 0.3s ease'; 
        } else {
            pop.style.display = 'none';
        }
    }
}

// GARANTIA: Adiciona o evento de clique assim que o site abrir
document.addEventListener('DOMContentLoaded', () => {
    startCounter(); // Inicia o contador
    const btnNovidades = document.querySelector('.btn-sugerir'); 
    if (btnNovidades && btnNovidades.textContent.includes('mudou')) {
        btnNovidades.addEventListener('click', toggleNovidades);
    }
});

function copyPix() {
    // 1. Busca o elemento que contém a chave
    const pixElement = document.getElementById('pix-key');
    
    if (!pixElement) {
        console.error("Erro: Elemento pix-key não encontrado!");
        return;
    }

    const textoParaCopiar = pixElement.innerText;

    // 2. Tenta usar a API moderna de área de transferência
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            alert("🚀 Chave PIX copiada! Valeu pelo apoio ao CVFLASH!");
        }).catch(err => {
            fallbackCopy(textoParaCopiar);
        });
    } else {
        // 3. Fallback para navegadores antigos ou conexões não-seguras
        fallbackCopy(textoParaCopiar);
    }
}

// Função de segurança caso a API principal falhe
function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        alert("🚀 Chave PIX copiada!");
    } catch (err) {
        alert("Erro ao copiar. Por favor, selecione o texto manualmente.");
    }
    document.body.removeChild(textArea);
}

