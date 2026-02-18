let modeloSelecionado = 'modelo-moderno';

function setModelo(tipo, btn) {
    // Atualiza o visual dos botões
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Salva a escolha
    modeloSelecionado = 'modelo-' + tipo;
    document.getElementById('cv-render').className = modeloSelecionado + ' print-only';
}

// Item 1: Pré-visualização em Tempo Real
function atualizar() {
    const nome = document.getElementById('in-nome').value;
    const cargo = document.getElementById('in-cargo').value;
    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cidade = document.getElementById('in-cidade').value;
    const resumo = document.getElementById('in-resumo').value;
    const exp = document.getElementById('in-exp').value;
    const edu = document.getElementById('in-edu').value;

    // Preencher o CV em tempo real
    document.getElementById('out-nome').innerText = nome || "NOME";
    document.getElementById('out-cargo').innerText = cargo || "CARGO";
    document.getElementById('out-contato').innerText = `${email} | ${tel} | ${cidade}`;
    document.getElementById('out-resumo').innerText = resumo;
    document.getElementById('out-exp').innerText = exp;
    document.getElementById('out-edu').innerText = edu;
}

function gerar() {
    const nome = document.getElementById('in-nome').value;
    if(!nome) { alert("Por favor, digite seu nome."); return; }

    // Garante que tudo esteja atualizado antes de imprimir
    atualizar();

    // Disparar impressão
    window.print();
}

function copiarPix() {
    const chave = document.getElementById('chavePix').innerText;
    navigator.clipboard.writeText(chave).then(() => { alert("Chave PIX copiada! 🙏"); });
}

// Item 11: Modo Noturno
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('dark-mode-toggle');
    
    if (document.body.classList.contains('dark-theme')) {
        btn.innerText = '☀️';
    } else {
        btn.innerText = '🌙';
    }
}
