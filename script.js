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
    // ... (mantenha o código de captura de dados que já existe acima)
    
    // Atualiza os elementos invisíveis
    if(document.getElementById('pre-nome')) document.getElementById('pre-nome').innerText = nome.toUpperCase();
    if(document.getElementById('pre-contato')) document.getElementById('pre-contato').innerText = `${tel} | ${email} | ${local}`;
    if(document.getElementById('pre-obj')) document.getElementById('pre-obj').innerText = obj;
    if(document.getElementById('pre-exp')) document.getElementById('pre-exp').innerText = exp;

    // --- NOVA LÓGICA DO BOTÃO (SEM TRAVA) ---
    const btn = document.getElementById('btn-gerar');
    const statusTag = document.getElementById('status-tag');

    // O botão fica sempre ativo agora
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.innerHTML = "🚀 GERAR CURRÍCULO AGORA";
    
    // Opcional: Apenas muda a cor da tag de qualidade para dar um feedback visual
    if(nome.length > 3 && email.includes('@')) {
        if(statusTag) statusTag.innerText = "QUALIDADE: EXCELENTE";
    } else {
        if(statusTag) statusTag.innerText = "QUALIDADE: BÁSICA";
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
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicia o contador de currículos
    startCounter();

    // 2. CONFIGURAÇÃO DO BOTÃO "O QUE MUDOU?"
    const btnNovidades = document.querySelector('.btn-sugerir'); 
    if (btnNovidades && btnNovidades.textContent.includes('mudou')) {
        btnNovidades.addEventListener('click', toggleNovidades);
    }

    // 3. CONFIGURAÇÃO DO BOTÃO PIX
    const btnPix = document.getElementById('btn-copy-pix');
    if (btnPix) {
        btnPix.addEventListener('click', () => {
            const pixText = document.getElementById('pix-key').innerText;
            navigator.clipboard.writeText(pixText).then(() => {
                alert("🚀 Chave PIX copiada! Valeu pelo apoio ao CVFLASH!");
            }).catch(err => {
                const area = document.createElement('textarea');
                area.value = pixText;
                document.body.appendChild(area);
                area.select();
                document.execCommand('copy');
                document.body.removeChild(area);
                alert("🚀 Chave PIX copiada!");
            });
        });
    }
});

// A função toggleNovidades precisa estar fora para ser alcançada pelo botão de fechar
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
    // ... suas outras funções (startCounter, etc)

    const btnPix = document.getElementById('btn-copy-pix');
    if (btnPix) {
        btnPix.addEventListener('click', () => {
            const pixText = document.getElementById('pix-key').innerText;
            
            // Tenta copiar
            navigator.clipboard.writeText(pixText).then(() => {
                alert("🚀 Chave PIX copiada! Valeu pelo apoio ao CVFLASH!");
            }).catch(err => {
                // Se der erro (em alguns celulares), tenta o método antigo
                const area = document.createElement('textarea');
                area.value = pixText;
                document.body.appendChild(area);
                area.select();
                document.execCommand('copy');
                document.body.removeChild(area);
                alert("🚀 Chave PIX copiada!");
            });
        });
    }
});

function toggleFaq(btn) {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    
    // Fecha todos os outros (opcional, se quiser um por vez)
    document.querySelectorAll('.faq-item').forEach(i => {
        if (i !== item) {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
        }
    });

    // Abre ou fecha o atual
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
        answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
        answer.style.maxHeight = null;
    }
}

// CONFIGURAÇÃO DO CRONÔMETRO REGRESSIVO
function startCountdown() {
    // DEFINA A DATA DA PRÓXIMA ATUALIZAÇÃO AQUI (Ano, Mês-1, Dia, Hora, Minuto)
    const targetDate = new Date("March 01, 2026 00:00:00").getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Cálculos de tempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Formatação com zero à esquerda
        const format = (n) => n < 10 ? "0" + n : n;

        const timerEl = document.getElementById("countdown-timer");
        if (timerEl) {
            if (distance < 0) {
                timerEl.innerHTML = "DISPONÍVEL!";
            } else {
                timerEl.innerHTML = `${format(days)}d ${format(hours)}h ${format(minutes)}m ${format(seconds)}s`;
            }
        }
    }, 1000);
}

// Chame a função no seu DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    // ... suas outras funções (startCounter, etc)
});
