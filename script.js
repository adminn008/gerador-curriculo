function setModelo(tipo, btn) {
    const render = document.getElementById('cv-render');
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render.className = 'modelo-' + tipo + ' print-only';
    atualizar();
}

function atualizar() {
    const p = (inId, outId) => {
        const i = document.getElementById(inId);
        const o = document.getElementById(outId);
        if(i && o) o.innerText = i.value;
    };
    p('in-nome', 'out-nome');
    p('in-cargo', 'out-cargo');
    p('in-resumo', 'out-resumo');
    p('in-exp', 'out-exp');
    p('in-edu', 'out-edu');

    const d = document.getElementById('dia-nasc').value;
    const m = document.getElementById('mes-nasc').value;
    const a = document.getElementById('ano-nasc').value;
    const nasc = (d && m && a) ? `${d}/${m}/${a}` : "";
    
    const partes = [
        nasc,
        document.getElementById('in-civil').value,
        document.getElementById('in-email').value,
        document.getElementById('in-tel').value,
        document.getElementById('in-cidade').value,
        document.getElementById('in-linkedin').value,
        document.getElementById('in-extra-info').value
    ].filter(Boolean);
    
    document.getElementById('out-contato').innerText = partes.join(' | ');
}

function gerar() {
    const campos = ['in-nome', 'in-cargo', 'in-email', 'in-tel', 'in-cidade', 'dia-nasc', 'mes-nasc', 'ano-nasc', 'in-resumo'];
    let erro = false;
    campos.forEach(id => {
        const el = document.getElementById(id);
        if(!el.value) { el.style.borderColor = "red"; erro = true; }
        else { el.style.borderColor = "#e2e8f0"; }
    });
    if(erro) return alert("⚠️ Preencha todos os campos obrigatórios (*)");
    atualizar();
    window.print();
}

function baixarImagemReal() {
    atualizar();
    const cv = document.getElementById('cv-render');
    cv.style.display = "block";
    cv.style.position = "absolute";
    cv.style.left = "-9999px";
    
    html2canvas(cv, { scale: 2, backgroundColor: "#ffffff" }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'curriculo-flash.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
        cv.style.display = "none";
    });
}

function sugerirResumo() {
    const cargo = document.getElementById('in-cargo').value || "profissional";
    const sugestoes = [
        `Sou um ${cargo} focado em resultados, com facilidade de aprendizado e ótimo trabalho em equipe.`,
        `Busco oportunidade como ${cargo} para aplicar meus conhecimentos e crescer profissionalmente.`,
        `Profissional comprometido, com experiência na área de ${cargo}, buscando novos desafios.`
    ];
    document.getElementById('in-resumo').value = sugestoes[Math.floor(Math.random() * sugestoes.length)];
    atualizar();
}

function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText).then(() => alert("Chave PIX copiada! 🙏"));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}
