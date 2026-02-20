// Atualiza a barra de progresso no Gerador
function updateQuality() {
    const inputs = {
        'in-nome': 'chk-nome',
        'in-tel': 'chk-tel',
        'in-email': 'chk-email',
        'in-exp': 'chk-obj'
    };
    
    let score = 0;
    for (let id in inputs) {
        const el = document.getElementById(id);
        const chk = document.getElementById(inputs[id]);
        if (el && el.value.length > 5) {
            score += 25;
            chk.innerHTML = "✔ " + chk.innerText.replace("❌ ", "").replace("✔ ", "");
            chk.style.color = "var(--success)";
        } else if (chk) {
            chk.innerHTML = "❌ " + chk.innerText.replace("❌ ", "").replace("✔ ", "");
            chk.style.color = "var(--text-muted)";
        }
    }
    
    const bar = document.getElementById('cv-fill');
    if(bar) bar.style.width = score + "%";
    
    const tag = document.getElementById('quality-tag');
    if(tag) tag.innerText = `CV ${score}% COMPLETO`;
}

// Escuta todos os campos
document.addEventListener('input', updateQuality);

// Accordion (FAQ)
function toggleAcc(btn) {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
    btn.querySelector('span').innerText = content.style.display === "block" ? "-" : "+";
}

// Inicializa Meta Financeira (Home)
window.onload = () => {
    const fill = document.getElementById('meta-fill');
    if(fill) fill.style.width = "0%"; // Valor inicial
};
