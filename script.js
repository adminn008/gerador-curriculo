let modeloSelecionado = 'modelo-moderno';

function setModelo(tipo, btn) {
    // Atualiza o visual dos botões
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Salva a escolha
    modeloSelecionado = 'modelo-' + tipo;
    document.getElementById('cv-render').className = modeloSelecionado + ' print-only';
}

function gerar() {
    // Pegar dados
    const nome = document.getElementById('in-nome').value;
    const cargo = document.getElementById('in-cargo').value;
    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cidade = document.getElementById('in-cidade').value;
    const resumo = document.getElementById('in-resumo').value;
    const exp = document.getElementById('in-exp').value;
    const edu = document.getElementById('in-edu').value;

    if(!nome) { alert("Por favor, digite seu nome."); return; }

    // Preencher o CV oculto
    document.getElementById('out-nome').innerText = nome;
    document.getElementById('out-cargo').innerText = cargo;
    document.getElementById('out-contato').innerText = `${email} | ${tel} | ${cidade}`;
    document.getElementById('out-resumo').innerText = resumo;
    document.getElementById('out-exp').innerText = exp;
    document.getElementById('out-edu').innerText = edu;

    // Disparar impressão
    window.print();
}
