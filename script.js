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

    const dia = document.getElementById('dia-nasc').value;
    const mes = document.getElementById('mes-nasc').value;
    const ano = document.getElementById('ano-nasc').value;
    const nascimento = (dia && mes && ano) ? `${dia}/${mes}/${ano}` : "";

    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cidade = document.getElementById('in-cidade').value;
    const civil = document.getElementById('in-civil').value;
    const linkedin = document.getElementById('in-linkedin').value;
    const extra = document.getElementById('in-extra-info').value;

    const outContato = document.getElementById('out-contato');
    if (outContato) {
        const partes = [nascimento, civil, email, tel, cidade, linkedin, extra].filter(Boolean);
        outContato.innerText = partes.join(' | ');
    }
}

function gerar() {
    const obrigatorios = ['in-nome', 'in-cargo', 'in-email', 'in-tel', 'in-cidade', 'dia-nasc', 'mes-nasc', 'ano-nasc', 'in-resumo'];
    let faltantes = false;

    obrigatorios.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value) {
            el.style.borderColor = "red";
            faltantes = true;
        } else {
            el.style.borderColor = "#e2e8f0";
        }
    });

    if (faltantes) {
        alert("⚠️ Por favor, preencha todos os campos obrigatórios (*)");
        return;
    }

    atualizar();
    window.print();
}

function sugerirResumo() {
    const cargo = document.getElementById('in-cargo').value || "profissional";
    const frases = [
        `Sou um ${cargo} dedicado, focado em resultados e com facilidade para trabalhar em equipe.`,
        `Procuro oportunidade como ${cargo} para aplicar minhas habilidades e crescer profissionalmente.`,
        `Profissional com experiência em ${cargo}, organizado e comprometido com a qualidade.`
    ];
    document.getElementById('in-resumo').value = frases[Math.floor(Math.random() * frases.length)];
    atualizar();
}

function baixarImagemReal() {
    atualizar();
    const cv = document.getElementById('cv-render');
    cv.classList.remove('print-only');
    html2canvas(cv, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'meu-curriculo.png';
        link.href = canvas.toDataURL();
        link.click();
        cv.classList.add('print-only');
    });
}

function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText).then(() => alert("Copiado! 🙏"));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}

function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cv-render').className = 'modelo-' + tipo + ' print-only';
}
