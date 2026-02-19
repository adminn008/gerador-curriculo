// 1. TEMA DARK PREMIUM
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Carregar preferência
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-theme');
}

// 2. MÁSCARA DE TELEFONE DINÂMICA
const telInput = document.getElementById('in-tel');
if (telInput) {
    telInput.addEventListener('input', e => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        validateForm();
    });
}

// 3. VALIDAÇÃO REAL E BARRA DE PROGRESSO
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    const nome = document.getElementById('in-nome')?.value || "";
    const email = document.getElementById('in-email')?.value || "";
    const tel = document.getElementById('in-tel')?.value || "";
    
    let score = 0;
    const items = { nome: false, email: false, tel: false };

    if (nome.length > 3) { score += 33.3; items.nome = true; }
    if (validateEmail(email)) { score += 33.3; items.email = true; }
    if (tel.length >= 14) { score += 33.4; items.tel = true; }

    // Atualizar UI
    const bar = document.getElementById('cv-progress');
    const txt = document.getElementById('cv-percent');
    if (bar) bar.style.width = score + '%';
    if (txt) txt.innerText = Math.round(score) + '% completo';

    // Atualizar Checklist
    updateCheck('chk-nome', items.nome, "Nome preenchido");
    updateCheck('chk-email', items.email, "E-mail válido");
    updateCheck('chk-tel', items.tel, "Telefone válido");
}

function updateCheck(id, isValid, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = isValid ? `✔ ${text}` : `❌ ${text}`;
    el.className = isValid ? 'valid' : '';
}

// 4. META FINANCEIRA
function updateMetaProgress(arrecadado) {
    const meta = 50.00;
    const percent = (arrecadado / meta) * 100;
    const fill = document.getElementById('meta-fill');
    const txt = document.getElementById('arrecadado');
    if (fill) fill.style.width = percent + '%';
    if (txt) txt.innerText = `R$ ${arrecadado.toFixed(2).replace('.', ',')}`;
}

// 5. MODAIS
const modais = {
    termos: "<h2>Termos de Uso</h2><p>O CV Flash é gratuito para uso pessoal...</p>",
    privacidade: "<h2>Privacidade</h2><p>Não armazenamos seus dados em nossos servidores...</p>",
    contato: "<h2>Contato</h2><p>Fale conosco: suporte.cvflash@gmail.com</p>"
};

function openModal(tipo) {
    const m = document.getElementById('modal-container');
    const b = document.getElementById('modal-body');
    b.innerHTML = modais[tipo];
    m.style.display = "block";
}

function closeModal() {
    document.getElementById('modal-container').style.display = "none";
}

// 6. DICAS
function toggleTip(id) {
    const tip = document.getElementById(id);
    tip.style.display = tip.style.display === "block" ? "none" : "block";
}

// 7. GERAÇÃO DE PDF
function gerarPDF() {
    const email = document.getElementById('in-email');
    if (!validateEmail(email.value)) {
        email.classList.add('input-error');
        alert("E-mail inválido!");
        return;
    }
    window.print();
}

// Auto-run validation
document.addEventListener('input', validateForm);
