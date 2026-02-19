// CORREÇÃO: Função de trocar modelos agora funciona
function setModelo(tipo, btn) {
    const render = document.getElementById('cv-render');
    // Remove classe ativa dos botões
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('active'));
    // Adiciona ao clicado
    btn.classList.add('active');
    // Muda a classe do currículo (modelo-moderno, modelo-classico, etc)
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

    const dia = document.getElementById('dia-nasc').value;
    const mes = document.getElementById('mes-nasc').value;
    const ano = document.getElementById('ano-nasc').value;
    const nasc = (dia && mes && ano) ? `${dia}/${mes}/${ano}` : "";
    
    const partes = [nasc, document.getElementById('in-civil').value, document.getElementById('in-email').value, document.getElementById('in-tel').value, document.getElementById('in-cidade').value, document.getElementById('in-linkedin').value, document.getElementById('in-extra-info').value].filter(Boolean);
    document.getElementById('out-contato').innerText = partes.join(' | ');
}

function gerar() {
    if(!document.getElementById('in-nome').value) return alert("Digite seu nome!");
    atualizar();
    window.print();
}

function baixarImagemReal() {
    atualizar();
    const cv = document.getElementById('cv-render');
    
    // Deixa visível mas fora da tela para capturar
    cv.style.display = "block";
    cv.style.position = "absolute";
    cv.style.left = "-9999px";
    
    html2canvas(cv, { 
        scale: 2,
        backgroundColor: "#ffffff", // Garante fundo branco
        logging: false,
        useCORS: true 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'meu-curriculo-flash.png';
        link.href = canvas.toDataURL("image/png");
        link.click();
        
        // Esconde de novo
        cv.style.display = "none";
        cv.style.position = "static";
    });
}

function sugerirResumo() {
    const c = document.getElementById('in-cargo').value || "profissional";
    document.getElementById('in-resumo').value = `Sou um ${c} dedicado, buscando contribuir para o sucesso da empresa com foco e organização.`;
    atualizar();
}

function copiarPix() {
    navigator.clipboard.writeText(document.getElementById('chavePix').innerText).then(() => alert("Copiado! 🙏"));
}
