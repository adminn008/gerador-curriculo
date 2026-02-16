let currentModel = 'moderno';

function changeModel(model) {
    currentModel = model;
    // Remove classes antigas e adiciona a nova
    const cv = document.getElementById('cv-preview');
    cv.className = 'cv-page modelo-' + model;
    
    // Atualiza botões
    document.querySelectorAll('.btn-model').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

function gerarCurriculo() {
    // Transferência de dados (mesma lógica do anterior)
    document.getElementById('cv-nome').textContent = document.getElementById('in-nome').value || "NOME COMPLETO";
    document.getElementById('cv-cargo').textContent = document.getElementById('in-cargo').value;
    document.getElementById('cv-email').textContent = document.getElementById('in-email').value;
    document.getElementById('cv-tel').textContent = document.getElementById('in-tel').value;
    document.getElementById('cv-cidade').textContent = document.getElementById('in-cidade').value;
    document.getElementById('cv-resumo').textContent = document.getElementById('in-resumo').value;
    document.getElementById('cv-exp').textContent = document.getElementById('in-exp').value;
    document.getElementById('cv-edu').textContent = document.getElementById('in-edu').value;

    document.getElementById('cv-preview').classList.remove('hidden');
    window.print();
}

// LÓGICA DA IA (Dicas que mudam conforme o campo focado)
const dicas = [
    "Dica: Use um e-mail profissional (nome.sobrenome@email.com).",
    "Dica: Liste suas experiências da mais recente para a mais antiga.",
    "Dica: Não é necessário colocar CPF ou RG no currículo.",
    "Dica: Se você não tem experiência, foque em cursos e projetos voluntários."
];

function toggleAI() {
    const body = document.getElementById('ai-body');
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

// Muda a dica a cada 10 segundos
setInterval(() => {
    const dicaAleatoria = dicas[Math.floor(Math.random() * dicas.length)];
    document.getElementById('ai-body').innerHTML = `<p><strong>Dica da IA:</strong> ${dicaAleatoria}</p>`;
}, 10000);
