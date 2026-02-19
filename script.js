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

    // Novos campos v2.0
    const email = document.getElementById('in-email')?.value || "";
    const tel = document.getElementById('in-tel')?.value || "";
    const cidade = document.getElementById('in-cidade')?.value || "";
    const nascimento = document.getElementById('in-nascimento')?.value || "";
    const civil = document.getElementById('in-civil')?.value || "";
    const linkedin = document.getElementById('in-linkedin')?.value || "";
    const extra = document.getElementById('in-extra-info')?.value || "";

    const outContato = document.getElementById('out-contato');
    
    if (outContato) {
        // Formata a linha de contato com os novos dados
        const partes = [nascimento, civil, email, tel, cidade, linkedin, extra].filter(Boolean);
        outContato.innerText = partes.join(' | ');
    }
}

function gerar() {
    const nome = document.getElementById('in-nome').value;
    const cargo = document.getElementById('in-cargo').value;
    const email = document.getElementById('in-email').value;

    if(!nome || !cargo || !email) {
        alert("⚠️ Por favor, preencha os campos obrigatórios (*) antes de gerar.");
        return;
    }
    
    atualizar();
    window.print();
}

function sugerirResumo() {
    const frase = "Profissional dedicado, com facilidade de aprendizado e focado em resultados. Busco aplicar minhas habilidades para contribuir com o crescimento da empresa através de dedicação e aprendizado contínuo.";
    const campo = document.getElementById('in-resumo');
    if(campo) {
        campo.value = frase;
        atualizar();
        alert("Sugestão adicionada! ✨");
    }
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
