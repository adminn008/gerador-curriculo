function atualizar() {
    document.getElementById('out-nome').innerText = document.getElementById('in-nome').value || "NOME";
    document.getElementById('out-cargo').innerText = document.getElementById('in-cargo').value || "CARGO";
    
    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cidade = document.getElementById('in-cidade').value;
    document.getElementById('out-contato').innerText = [email, tel, cidade].filter(Boolean).join(' | ');

    document.getElementById('out-resumo').innerText = document.getElementById('in-resumo').value;
    document.getElementById('out-exp').innerText = document.getElementById('in-exp').value;
    document.getElementById('out-edu').innerText = document.getElementById('in-edu').value;
}

function sugerirTexto() {
    const frases = [
        "Profissional dedicado com foco em resultados e otimização de processos.",
        "Busco oportunidade para aplicar meus conhecimentos técnicos e evoluir.",
        "Experiência em liderança de equipes e gestão de prazos.",
        "Especialista em atendimento com foco total na satisfação do cliente.",
        "Habilidade em resolução de problemas e excelente comunicação."
    ];
    // Agora ele apaga o anterior e coloca o novo
    const sorteio = frases[Math.floor(Math.random() * frases.length)];
    document.getElementById('in-resumo').value = sorteio;
    atualizar();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    document.getElementById('dark-mode-toggle').innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}

function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cv-render').className = 'modelo-' + tipo + ' print-only';
}

function gerar() {
    if(!document.getElementById('in-nome').value) { alert("Preencha o nome!"); return; }
    window.print();
}

function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText);
    alert("PIX Copiado! 🙏");
}
