function atualizar() {
    const preencher = (idIn, idOut, fallback = "") => {
        const input = document.getElementById(idIn);
        const output = document.getElementById(idOut);
        if (input && output) output.innerText = input.value || fallback;
    };

    preencher('in-nome', 'out-nome', "NOME");
    preencher('in-cargo', 'out-cargo', "CARGO");
    preencher('in-resumo', 'out-resumo');
    preencher('in-exp', 'out-exp');
    preencher('in-edu', 'out-edu');

    const dia = document.getElementById('dia-nasc')?.value || "";
    const mes = document.getElementById('mes-nasc')?.value || "";
    const ano = document.getElementById('ano-nasc')?.value || "";
    const nascimento = (dia && mes && ano) ? `${dia}/${mes}/${ano}` : "";

    const email = document.getElementById('in-email')?.value || "";
    const tel = document.getElementById('in-tel')?.value || "";
    const cidade = document.getElementById('in-cidade')?.value || "";
    const linkedin = document.getElementById('in-linkedin')?.value || "";

    const outContato = document.getElementById('out-contato');
    if (outContato) {
        const partes = [nascimento, email, tel, cidade, linkedin].filter(Boolean);
        outContato.innerText = partes.join(' | ');
    }
}

function gerar() {
    // VALIDAÇÃO REAL: Só deixa passar se preencher os obrigatórios
    const obrigatorios = ['in-nome', 'in-cargo', 'in-email', 'in-tel', 'in-cidade', 'dia-nasc', 'mes-nasc', 'ano-nasc'];
    let faltam = [];
    
    obrigatorios.forEach(id => {
        if (!document.getElementById(id).value) faltam.push(id);
    });

    if (faltam.length > 0) {
        alert("⚠️ Calma! Você esqueceu de preencher alguns campos obrigatórios (*)");
        return;
    }

    atualizar();
    window.print();
}

function sugerirResumo() {
    const cargo = document.getElementById('in-cargo').value || "profissional";
    const sugestoes = [
        `Sou um ${cargo} dedicado, com facilidade em aprender novas funções e focado em entregar resultados com qualidade e agilidade.`,
        `Busco minha primeira oportunidade como ${cargo} para aplicar meus conhecimentos e contribuir com o crescimento da empresa.`,
        `Experiência na área de ${cargo}, com foco em atendimento ao cliente, organização e trabalho em equipe.`
    ];
    
    // Escolhe uma sugestão aleatória
    const escolhida = sugestoes[Math.floor(Math.random() * sugestoes.length)];
    document.getElementById('in-resumo').value = escolhida;
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

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}
