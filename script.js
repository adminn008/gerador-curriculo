// 1. MÁSCARA DE TELEFONE
function mascaraTelefone(i) {
    let v = i.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 10) i.value = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (v.length > 5) i.value = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (v.length > 2) i.value = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    else i.value = v;
    update();
}

// 2. SUGESTÕES
const baseTextos = {
    obj: [
        "Profissional dedicado em busca de novos desafios para aplicar competências técnicas.",
        "Foco em metas e resultados, buscando integrar o time de vendas.",
        "Objetivo de atuar no setor administrativo, organizando processos."
    ],
    exp: ["Empresa X\nCargo | 2024\n• Atendimento ao cliente.\n• Organização de fluxo."]
};

function sugerirMulti(campo, index) {
    const el = document.getElementById('in-' + campo);
    if (el) { el.value = baseTextos[campo][index]; update(); }
}

// 3. MODELOS
function setModel(tipo, btn) {
    const preview = document.getElementById('preview-content');
    if(preview) preview.className = 'mode-' + tipo;
    document.querySelectorAll('.model-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 4. ATUALIZAÇÃO DO PREVIEW
function update() {
    const fields = ['nome', 'tel', 'email', 'local', 'obj', 'exp', 'edu', 'skills'];
    fields.forEach(f => {
        const input = document.getElementById('in-' + f);
        const preview = document.getElementById('pre-' + f);
        if (input && preview) {
            preview.innerText = f === 'nome' ? input.value.toUpperCase() : input.value;
        }
    });
}

// 5. PDF
function gerarPDF() {
    const content = document.getElementById('live-preview').innerHTML;
    document.getElementById('print-area').innerHTML = content;
    window.print();
}

// 6. TIMER
function startCountdown() {
    const targetDate = new Date("March 01, 2026 00:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        const format = (n) => n < 10 ? "0" + n : n;
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        const timerEl = document.getElementById("countdown-timer");
        if (timerEl) timerEl.innerHTML = distance < 0 ? "DISPONÍVEL!" : `${format(d)}d ${format(h)}h ${format(m)}m ${format(s)}s`;
    }, 1000);
}

// 7. MODAL
function toggleNovidades() {
    const pop = document.getElementById('pop-novidades');
    if (pop) pop.style.display = (pop.style.display === 'none' || pop.style.display === '') ? 'block' : 'none';
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    document.querySelectorAll('input, textarea').forEach(el => el.addEventListener('input', update));
    
    const btnNovidades = document.getElementById('btn-novidades');
    if(btnNovidades) btnNovidades.addEventListener('click', toggleNovidades);

    const btnPix = document.getElementById('btn-copy-pix');
    if (btnPix) {
        btnPix.addEventListener('click', () => {
            navigator.clipboard.writeText(document.getElementById('pix-key').innerText).then(() => {
                alert("🚀 Chave PIX copiada!");
            });
        });
    }
});
