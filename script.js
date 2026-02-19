function iniciarGerador() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('gerador-section').style.display = 'block';
    window.scrollTo(0, 0);
}

function formatarTel(input) {
    let v = input.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length >= 11) v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (v.length >= 7) v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (v.length >= 3) v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    else if (v.length > 0) v = v.replace(/^(\d*)/, "($1");
    input.value = v;
    atualizar();
}

function setModelo(tipo, btn) {
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('cv-render').className = 'modelo-' + tipo + ' print-only';
}

function atualizar() {
    const v = (id) => document.getElementById(id).value;
    document.getElementById('out-nome').innerText = v('in-nome') || "NOME COMPLETO";
    document.getElementById('out-cargo').innerText = v('in-cargo') || "CARGO";
    const nasc = (v('dia-nasc') && v('mes-nasc') && v('ano-nasc')) ? `${v('dia-nasc')}/${v('mes-nasc')}/${v('ano-nasc')}` : "";
    const info = [nasc, v('in-civil'), v('in-email'), v('in-tel'), v('in-cidade')].filter(Boolean);
    document.getElementById('out-contato').innerText = info.join(' | ');
    document.getElementById('out-resumo').innerText = v('in-resumo');
    document.getElementById('out-exp').innerText = v('in-exp');
    document.getElementById('out-edu').innerText = v('in-edu');
}

function gerar() {
    atualizar();
    window.print();
}

function sugerirResumo() {
    const cargo = document.getElementById('in-cargo').value || "profissional";
    document.getElementById('in-resumo').value = `Sou um ${cargo} dedicado, focado em resultados e com facilidade para trabalhar em equipe.`;
    atualizar();
}

function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText).then(() => alert("PIX Copiado! 🙏"));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}
