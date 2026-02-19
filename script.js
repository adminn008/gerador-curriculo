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
        if (input && output) output.innerText = input.value || fallback;
    };

    preencher('in-nome', 'out-nome', "NOME COMPLETO");
    preencher('in-cargo', 'out-cargo', "CARGO DESEJADO");
    preencher('in-resumo', 'out-resumo');
    preencher('in-exp', 'out-exp');
    preencher('in-edu', 'out-edu');

    // Data Nascimento
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
    // Validação de campos obrigatórios
    const campos = ['in-nome', 'in-cargo', 'in-email', 'in-tel', 'in-cidade', 'dia-nasc', 'mes-nasc', 'ano-nasc', 'in-resumo'];
    let vazios = false;

    campos.forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.value) {
            vazios = true;
            if(el) el.style.borderColor = "red";
        } else {
            if(el) el.style.borderColor = "#e2e8f0";
        }
    });

    if (vazios) {
        alert("⚠️ Por favor, preencha todos os campos com asterisco vermelho (*)");
        return;
    }

    atualizar();
    window.print();
}

function sugerirResumo() {
    const cargo = document.getElementById('in-cargo').value || "profissional";
    const sugestoes = [
        `Sou um ${cargo} dedicado, com facilidade em aprender novas funções e focado em entregar resultados com qualidade. Busco uma oportunidade para contribuir com a empresa.`,
        `Procuro minha primeira oportunidade como ${cargo} para aplicar meus conhecimentos, demonstrar meu comprometimento e crescer profissionalmente junto à equipe.`,
        `Com experiência na área de ${cargo}, possuo habilidades em organização, atendimento ao cliente e trabalho em equipe, sempre buscando a excelência nas tarefas.`
    ];
    const sorteio = sugestoes[Math.floor(Math.random() * sugestoes.length)];
    document.getElementById('in-resumo').value = sorteio;
    atualizar();
}

function baixarImagemReal() {
    const nome = document.getElementById('in-nome').value || 'curriculo';
    atualizar();
    const cv = document.getElementById('cv-render');
    cv.classList.remove('print-only');
    
    html2canvas(cv, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `CV_Flash_${nome}.png`;
        link.href = canvas.toDataURL();
        link.click();
        cv.classList.add('print-only');
    });
}

function copiarPix() {
    const chave = document.getElementById('chavePix').innerText;
    navigator.clipboard.writeText(chave).then(() => alert("Chave PIX copiada! 🙏"));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}
