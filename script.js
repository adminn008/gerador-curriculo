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

    // Data de Nascimento Veloz
    const dia = document.getElementById('dia-nasc')?.value || "";
    const mes = document.getElementById('mes-nasc')?.value || "";
    const ano = document.getElementById('ano-nasc')?.value || "";
    const nascimento = (dia && mes && ano) ? `${dia}/${mes}/${ano}` : "";

    const email = document.getElementById('in-email')?.value || "";
    const tel = document.getElementById('in-tel')?.value || "";
    const cidade = document.getElementById('in-cidade')?.value || "";
    const civil = document.getElementById('in-civil')?.value || "";
    const linkedin = document.getElementById('in-linkedin')?.value || "";
    const extra = document.getElementById('in-extra-info')?.value || "";

    const outContato = document.getElementById('out-contato');
    if (outContato) {
        const partes = [nascimento, civil, email, tel, cidade, linkedin, extra].filter(Boolean);
        outContato.innerText = partes.join(' | ');
    }
}

function gerar() {
    const nome = document.getElementById('in-nome').value;
    if(!nome) {
        alert("⚠️ Por favor, digite seu nome.");
        return;
    }
    atualizar();
    window.print();
}

// FUNÇÃO BAIXAR IMAGEM REAL (Usando html2canvas)
function baixarImagemReal() {
    const nome = document.getElementById('in-nome').value || 'curriculo';
    atualizar();
    
    const container = document.getElementById('cv-render');
    container.classList.remove('print-only'); // Mostra para capturar
    
    html2canvas(container, {
        scale: 2, // Melhor qualidade
        useCORS: true,
        logging: false
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CV_Flash_${nome.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        container.classList.add('print-only'); // Oculta de novo
    });
}

function sugerirResumo() {
    const frase = "Profissional dedicado, com facilidade de aprendizado e focado em resultados. Busco aplicar minhas habilidades para contribuir com o crescimento da empresa através de dedicação e aprendizado contínuo.";
    document.getElementById('in-resumo').value = frase;
    atualizar();
}

function copiarPix() {
    const chave = document.getElementById('chavePix')?.innerText;
    if (chave) {
        navigator.clipboard.writeText(chave).then(() => {
            alert("Chave PIX copiada! 🙏");
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
