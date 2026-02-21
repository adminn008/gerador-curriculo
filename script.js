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

// 2. SUGESTÕES DE TEXTO
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
    const preview = document.getElementById('preview-content');
    if(preview) preview.className = 'mode-' + tipo;
    document.querySelectorAll('.model-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 4. FUNÇÃO DE ATUALIZAÇÃO (CORRIGIDA)
function update() {
    // Captura os valores dos inputs
    const nome = document.getElementById('in-nome').value;
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const local = document.getElementById('in-local').value;
    const obj = document.getElementById('in-obj').value;
    const exp = document.getElementById('in-exp').value;
    const edu = document.getElementById('in-edu') ? document.getElementById('in-edu').value : "";
    const skills = document.getElementById('in-skills') ? document.getElementById('in-skills').value : "";

    // Preenche o "molde" do PDF (Preview)
    if(document.getElementById('pre-nome')) document.getElementById('pre-nome').innerText = nome.toUpperCase() || "SEU NOME";
    if(document.getElementById('pre-contato')) document.getElementById('pre-contato').innerText = `${tel} | ${email} | ${local}`;
    if(document.getElementById('pre-obj')) document.getElementById('pre-obj').innerText = obj;
    if(document.getElementById('pre-exp')) document.getElementById('pre-exp').innerText = exp;
    if(document.getElementById('pre-edu')) document.getElementById('pre-edu').innerText = edu;
    if(document.getElementById('pre-skills')) document.getElementById('pre-skills').innerText = skills;

    // Lógica do Botão e Status Tag
    const btn = document.getElementById('btn-gerar');
    const statusTag = document.getElementById('status-tag');

    if(btn) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = "🚀 GERAR CURRÍCULO AGORA";
    }
    
    if(statusTag) {
        if(nome.length > 3 && email.includes('@')) {
            statusTag.innerText = "QUALIDADE: EXCELENTE";
        } else {
            statusTag.innerText = "QUALIDADE: BÁSICA";
        }
    }
}

// 5. GERAÇÃO DE PDF
function gerarPDF() {
    const content = document.getElementById('live-preview').innerHTML;
    document.getElementById('print-area').innerHTML = content;
    window.print();
}

// 6. CONTADOR DINÂMICO
function startCounter() {
    const counterEl = document.getElementById('cv-counter');
    if(!counterEl) return;
    let baseValue = 1248;
    setInterval(() => {
        baseValue += Math.floor(Math.random() * 3);
        counterEl.innerText = baseValue.toLocaleString('pt-BR');
    }, 5000);
}

// 7. CRONÔMETRO REGRESSIVO
function startCountdown() {
    const targetDate = new Date("March 01, 2026 00:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const format = (n) => n < 10 ? "0" + n : n;
        const timerEl = document.getElementById("countdown-timer");
        if (timerEl) {
            if (distance < 0) timerEl.innerHTML = "DISPONÍVEL!";
            else timerEl.innerHTML = `${format(days)}d ${format(hours)}h ${format(minutes)}m ${format(seconds)}s`;
        }
    }, 1000);
}

// 8. FAQ TOGGLE
function toggleFaq(btn) {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    document.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
        }
    });
    item.classList.toggle('active');
    if (item.classList.contains('active')) answer.style.maxHeight = answer.scrollHeight + "px";
    else answer.style.maxHeight = null;
}

// INICIALIZAÇÃO GERAL
document.addEventListener('DOMContentLoaded', () => {
    startCounter();
    startCountdown();

    // Ouvir digitação em todos os campos
    document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', update);
    });

    // Configuração do PIX
    const btnPix = document.getElementById('btn-copy-pix');
    if (btnPix) {
        btnPix.addEventListener('click', () => {
            const pixText = document.getElementById('pix-key').innerText;
            navigator.clipboard.writeText(pixText).then(() => {
                alert("🚀 Chave PIX copiada! Valeu pelo apoio!");
            });
        });
    }
});
