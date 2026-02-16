function gerarCurriculo() {
    // Pega os valores dos inputs
    const nome = document.getElementById('in-nome').value;
    const cargo = document.getElementById('in-cargo').value;
    const email = document.getElementById('in-email').value;
    const tel = document.getElementById('in-tel').value;
    const cidade = document.getElementById('in-cidade').value;
    const resumo = document.getElementById('in-resumo').value;
    const exp = document.getElementById('in-exp').value;
    const edu = document.getElementById('in-edu').value;

    // Validação básica
    if(!nome || !email) {
        alert("Por favor, preencha pelo menos Nome e E-mail.");
        return;
    }

    // Passa para o currículo
    document.getElementById('cv-nome').textContent = nome;
    document.getElementById('cv-cargo').textContent = cargo;
    document.getElementById('cv-email').textContent = email;
    document.getElementById('cv-tel').textContent = tel;
    document.getElementById('cv-cidade').textContent = cidade;
    document.getElementById('cv-resumo').textContent = resumo;
    document.getElementById('cv-exp').textContent = exp;
    document.getElementById('cv-edu').textContent = edu;

    // Mostra o currículo e abre a janela de impressão
    document.getElementById('cv-preview').classList.remove('hidden');
    window.print();
}
