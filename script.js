// Organiza a troca de modelos (Moderno, Executivo, Mínimo)
function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cv-render').className = 'modelo-' + tipo + ' print-only';
}

// Atualiza o texto do currículo em tempo real
function atualizar() {
    const v = (id) => document.getElementById(id).value;
    document.getElementById('out-nome').innerText = v('in-nome') || "NOME COMPLETO";
    document.getElementById('out-cargo').innerText = v('in-cargo') || "CARGO";
    document.getElementById('out-resumo').innerText = v('in-resumo');
    document.getElementById('out-exp').innerText = v('in-exp');
    document.getElementById('out-edu').innerText = v('in-edu');

    const nasc = (v('dia-nasc') && v('mes-nasc') && v('ano-nasc')) ? `${v('dia-nasc')}/${v('mes-nasc')}/${v('ano-nasc')}` : "";
    const info = [nasc, v('in-civil'), v('in-email'), v('in-tel'), v('in-cidade'), v('in-linkedin'), v('in-extra-info')].filter(Boolean);
    document.getElementById('out-contato').innerText = info.join(' | ');
}

// Máscara para o telefone ficar bonito: (00) 00000-0000
function formatarTel(input) {
    let v = input.value.replace(/\D/g, ""); // Tira tudo que não é número
    if (v.length > 11) v = v.slice(0, 11); // Limita o máximo de números
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD
    v = v.replace(/(\d{5})(\d)/, "$1-$2");    // Coloca o hífen
    input.value = v;
}

// Valida campos e abre a tela de impressão
function gerar() {
    const obrigatorios = ['in-nome', 'in-cargo', 'in-email', 'in-tel', 'in-cidade', 'dia-nasc', 'mes-nasc', 'ano-nasc'];
    let erro = false;
    
    obrigatorios.forEach(id => {
        const el = document.getElementById(id);
        if(!el.value) { 
            el.style.borderColor = "red"; 
            erro = true; 
        } else { 
            el.style.borderColor = "#e2e8f0"; 
        }
    });

    if(erro) return alert("Preencha os campos obrigatórios (*)");
    
    atualizar();
    window.print();
}

// Sugestões aleatórias de resumo profissional
function sugerirResumo() {
    const cargo = document.getElementById('in-cargo').value || "profissional";
    const frases = [
        `Sou um ${cargo} dedicado, focado em resultados e com facilidade para trabalhar em equipe.`,
        `Procuro oportunidade como ${cargo} para aplicar minhas habilidades e crescer na carreira.`,
        `Profissional comprometido, organizado e com grande motivação para atuar como ${cargo}.`,
        `Tenho sólida vontade de aprender e contribuir para o sucesso da empresa na função de ${cargo}.`,
        `Busco novos desafios na área de ${cargo}, focado em entregar qualidade e eficiência.`
    ];
    
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];
    document.getElementById('in-resumo').value = aleatoria;
    atualizar();
}

// Copia a chave PIX para o teclado do usuário
function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText).then(() => {
        alert("PIX Copiado! 🙏 Muito obrigado pelo apoio.");
    });
}

// Alterna entre modo claro e escuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}
