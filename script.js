// Alterna entre a Home e o Gerador
function iniciarGerador() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('gerador-section').style.display = 'block';
    window.scrollTo(0, 0);
}

// Troca de modelos
function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cv-render').className = 'modelo-' + tipo + ' print-only';
}

// Atualiza o currículo
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

// Máscara de Telefone Inteligente
function formatarTel(input) {
    let v = input.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length >= 11) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (v.length >= 7) {
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length >= 3) {
        v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (v.length > 0) {
        v = v.replace(/^(\d*)/, "($1");
    }
    input.value = v;
    atualizar();
}

function gerar() {
    const obrigatorios = ['in-nome', 'in-cargo', 'in-email', 'in-tel', 'in-cidade', 'dia-nasc', 'mes-nasc', 'ano-nasc'];
    let erro = false;
    obrigatorios.forEach(id => {
        const el = document.getElementById(id);
        if(!el.value) { el.style.borderColor = "red"; erro = true; }
        else { el.style.borderColor = "#e2e8f0"; }
    });
    if(erro) return alert("Preencha os campos obrigatórios (*)");
    atualizar();
    window.print();
}

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

function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText).then(() => alert("PIX Copiado! 🙏"));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}
