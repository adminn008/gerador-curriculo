// 1. Atualizar em tempo real
function atualizar() {
    const nome = document.getElementById('in-nome').value || "NOME";
    const cargo = document.getElementById('in-cargo').value || "CARGO";
    const email = document.getElementById('in-email').value || "";
    const tel = document.getElementById('in-tel').value || "";
    const cidade = document.getElementById('in-cidade').value || "";

    document.getElementById('out-nome').innerText = nome;
    document.getElementById('out-cargo').innerText = cargo;
    document.getElementById('out-contato').innerText = `${email} | ${tel} | ${cidade}`;
    
    document.getElementById('out-resumo').innerText = document.getElementById('in-resumo').value;
    document.getElementById('out-exp').innerText = document.getElementById('in-exp').value;
    document.getElementById('out-edu').innerText = document.getElementById('in-edu').value;
}

// 12. Sugestões de texto
function sugerirTexto() {
    const frases = [
        "Profissional focado em resultados com vasta experiência na área.",
        "Busco novos desafios onde possa aplicar minhas habilidades técnicas.",
        "Destaque em trabalho em equipe e resolução de problemas complexos.",
        "Especialista em atendimento e gestão de processos otimizados.",
        "Comprometido com a evolução constante e entrega de alta performance."
    ];
    const sorteio = frases[Math.floor(Math.random() * frases.length)];
    const resumo = document.getElementById('in-resumo');
    resumo.value += (resumo.value ? " " : "") + sorteio;
    atualizar();
}

// 11. Modo Dark
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
    const btn = document.getElementById('dark-mode-toggle');
    btn.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}

function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cv-render').className = 'modelo-' + tipo + ' print-only';
}

function gerar() {
    if(!document.getElementById('in-nome').value) {
        alert("Digite seu nome para gerar o PDF.");
        return;
    }
    atualizar();
    window.print();
}

function copiarPix() {
    const chave = document.getElementById('chavePix').innerText;
    navigator.clipboard.writeText(chave).then(() => alert("PIX Copiado! 🙏"));
}
