// 1. Atualização em Tempo Real
function atualizar() {
    document.getElementById('out-nome').innerText = document.getElementById('in-nome').value || "NOME COMPLETO";
    document.getElementById('out-cargo').innerText = document.getElementById('in-cargo').value || "SEU CARGO";
    
    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cidade = document.getElementById('in-cidade').value;
    document.getElementById('out-contato').innerText = `${email} | ${tel} | ${cidade}`;

    document.getElementById('out-resumo').innerText = document.getElementById('in-resumo').value;
    document.getElementById('out-exp').innerText = document.getElementById('in-exp').value;
    document.getElementById('out-edu').innerText = document.getElementById('in-edu').value;
}

// 11. Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('dark-mode-toggle');
    btn.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}

// 12. Sugestões de Texto
function sugerirTexto() {
    const frases = [
        "Profissional dedicado com foco em resultados e otimização de processos.",
        "Experiência em liderança de equipes e gestão de projetos complexos.",
        "Busco oportunidade para aplicar meus conhecimentos técnicos e evoluir profissionalmente.",
        "Especialista em atendimento ao cliente com foco em fidelização e satisfação.",
        "Habilidade em resolução de problemas e trabalho sob pressão."
    ];
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];
    const campo = document.getElementById('in-resumo');
    campo.value += (campo.value ? " " : "") + aleatoria;
    atualizar();
}

function gerar() {
    if(!document.getElementById('in-nome').value) { alert("Por favor, preencha o nome!"); return; }
    atualizar();
    window.print();
}

function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cv-render').className = 'modelo-' + tipo + ' print-only';
}

function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText);
    alert("Chave PIX copiada! Obrigado pelo apoio. 🙏");
}
