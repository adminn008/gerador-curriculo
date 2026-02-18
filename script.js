let modeloSelecionado = 'modelo-moderno';

function setModelo(tipo, btn) {
    const render = document.getElementById('cv-render');
    if (render) {
        document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        modeloSelecionado = 'modelo-' + tipo;
        render.className = modeloSelecionado + ' print-only';
    }
}

function atualizar() {
    // Função auxiliar para evitar erros de "null"
    const preencher = (idIn, idOut, fallback = "") => {
        const input = document.getElementById(idIn);
        const output = document.getElementById(idOut);
        if (input && output) {
            output.innerText = input.value || fallback;
        }
    };

    preencher('in-nome', 'out-nome', "NOME");
    preencher('in-cargo', 'out-cargo', "CARGO");
    preencher('in-resumo', 'out-resumo');
    preencher('in-exp', 'out-exp');
    preencher('in-edu', 'out-edu');

    // Atualização especial para a linha de contacto
    const email = document.getElementById('in-email')?.value || "";
    const tel = document.getElementById('in-tel')?.value || "";
    const cidade = document.getElementById('in-cidade')?.value || "";
    const outContato = document.getElementById('out-contato');
    
    if (outContato) {
        outContato.innerText = [email, tel, cidade].filter(Boolean).join(' | ');
    }
}

function gerar() {
    const nomeInput = document.getElementById('in-nome');
    if (nomeInput && !nomeInput.value) {
        alert("Por favor, digite o seu nome.");
        return;
    }
    atualizar();
    window.print();
}

function copiarPix() {
    const chave = document.getElementById('chavePix')?.innerText;
    if (chave) {
        navigator.clipboard.writeText(chave).then(() => {
            alert("Chave PIX copiada! 🙏");
        }).catch(() => {
            alert("Erro ao copiar. Tente selecionar o texto.");
        });
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('dark-mode-toggle');
    if (btn) {
        btn.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    }
}
