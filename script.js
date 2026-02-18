let modeloSelecionado = 'modelo-moderno';

function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    modeloSelecionado = 'modelo-' + tipo;
    document.getElementById('cv-render').className = modeloSelecionado + ' print-only';
}

function atualizar() {
    const nome = document.getElementById('in-nome').value;
    const cargo = document.getElementById('in-cargo').value;
    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cidade = document.getElementById('in-cidade').value;
    const resumo = document.getElementById('in-resumo').value;
    const exp = document.getElementById('in-exp').value;
    const edu = document.getElementById('in-edu').value;

    document.getElementById('out-nome').innerText = nome || "NOME";
    document.getElementById('out-cargo').innerText = cargo || "CARGO";
    document.getElementById('out-contato').innerText = `${email} | ${tel} | ${cidade}`;
    document.getElementById('out-resumo').innerText = resumo;
    document.getElementById('out-exp').innerText = exp;
    document.getElementById('out-edu').innerText = edu;
}

function gerar() {
    if(!document.getElementById('in-nome').value) { alert("Por favor, digite seu nome."); return; }
    atualizar();
    window.print();
}

function copiarPix() {
    const chave = document.getElementById('chavePix').innerText;
    navigator.clipboard.writeText(chave).then(() => { alert("Chave PIX copiada! 🙏"); });
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('dark-mode-toggle');
    btn.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}
