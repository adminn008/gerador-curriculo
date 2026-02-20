// 1. MÁSCARA DE TELEFONE AUTOMÁTICA
function mascaraTelefone(input) {
    let v = input.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (v.length > 11) v = v.slice(0, 11); // Limita a 11 dígitos
    
    if (v.length > 10) {
        // Formato (00) 00000-0000
        input.value = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (v.length > 5) {
        // Formato (00) 0000-0000
        input.value = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (v.length > 2) {
        // Formato (00) 0
        input.value = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
        input.value = v;
    }
    update(); // Atualiza o preview e validação
}

// 2. VALIDAÇÃO DE E-MAIL REAL
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 3. ATUALIZAÇÃO E VALIDAÇÃO DE MILHÕES
function update() {
    // Pegando todos os valores (Campos novos inclusos)
    const nome = document.getElementById('in-nome').value;
    const tel = document.getElementById('in-tel').value;
    const email = document.getElementById('in-email').value;
    const obj = document.getElementById('in-obj').value;
    
    // Preview em tempo real
    document.getElementById('pre-nome').innerText = nome || "SEU NOME";
    document.getElementById('pre-contato').innerText = 
        `${tel} | ${email} | ${document.getElementById('in-local').value}`;
    document.getElementById('pre-obj').innerText = obj;

    // Lógica de Bloqueio do Botão
    const btn = document.getElementById('btn-gerar');
    const emailValido = validarEmail(email);
    const telCompleto = tel.replace(/\D/g, "").length >= 10; // Mínimo 10 dígitos

    let progresso = 0;
    if (nome.length > 3) progresso += 25;
    if (telCompleto) progresso += 25;
    if (emailValido) progresso += 25;
    if (obj.length > 10) progresso += 25;

    document.getElementById('status-tag').innerText = `QUALIDADE: ${progresso}%`;

    if (progresso === 100) {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = "🚀 GERAR CURRÍCULO PROFISSIONAL";
    } else {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerHTML = "🔒 DADOS INVÁLIDOS OU INCOMPLETOS";
    }
}

// 4. FUNÇÕES DE APOIO
function setModel(tipo) {
    document.getElementById('preview-content').className = 'mode-' + tipo;
}

function sugerir(campo) {
    const textos = {
        obj: "Profissional proativo com foco em resultados, buscando integrar a equipe de [ÁREA] para aplicar competências técnicas e evoluir profissionalmente.",
        exp: "• Gestão de rotinas administrativas\n• Atendimento ao cliente e resolução de conflitos\n• Batimento de metas mensais superiores a 15%"
    };
    document.getElementById('in-' + campo).value = textos[campo];
    update();
}

function gerarPDF() {
    window.print();
}

function toggleNovidades() {
    const modal = document.getElementById('pop-novidades');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Inicializa os ouvintes
document.addEventListener('DOMContentLoaded', () => {
    const telField = document.getElementById('in-tel');
    if(telField) {
        telField.addEventListener('input', () => mascaraTelefone(telField));
    }
    document.querySelectorAll('input, textarea').forEach(el => {
        el.addEventListener('input', update);
    });
});
