// DADOS DAS SUGESTÕES
const sugestoes_objetivo = [
    "Busco minha primeira oportunidade profissional para desenvolver minhas habilidades e contribuir com a empresa.",
    "Procuro estágio na área para aplicar os conhecimentos acadêmicos e crescer profissionalmente.",
    "Atuar na área administrativa, auxiliando na organização de processos e atendimento ao cliente.",
    "Desenvolvedor focado em tecnologias modernas, buscando criar soluções inovadoras e eficientes.",
    "Jovem Aprendiz focado em aprender novas funções e ingressar no mercado de trabalho com dedicação."
];

// 1. GESTÃO DE TEMA (DARK MODE)
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
});

// 2. FUNÇÃO DE SUGESTÃO
function sugerir(campoId, index) {
    const campo = document.getElementById(campoId);
    campo.value = sugestoes_objetivo[index];
    validarCampo(campo); // Atualiza visual
}

// 3. MÁSCARA DE TELEFONE
function maskTel(i) {
    let v = i.value.replace(/\D/g, '');
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    v = v.replace(/(\d)(\d{4})$/, "$1-$2");
    i.value = v;
}

// 4. VALIDAÇÃO DE CAMPOS
function validarCampo(input) {
    const errorMsg = input.parentElement.querySelector('.error-msg');
    if (input.value.trim() === "") {
        input.classList.add('input-error');
        if (errorMsg) errorMsg.style.display = 'block';
        return false;
    } else {
        input.classList.remove('input-error');
        if (errorMsg) errorMsg.style.display = 'none';
        return true;
    }
}

// 5. GERAR PDF COM VALIDAÇÃO
function validarEGerar() {
    const obrigatorios = document.querySelectorAll('.required-field');
    let valido = true;

    obrigatorios.forEach(campo => {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });

    if (!valido) {
        alert("Ops! Por favor, preencha os campos obrigatórios marcados em vermelho.");
        return;
    }

    // Mapeamento para o PDF
    document.getElementById('out-nome').innerText = document.getElementById('in-nome').value;
    document.getElementById('out-obj').innerText = document.getElementById('in-obj').value;
    document.getElementById('out-exp').innerText = document.getElementById('in-exp').value;
    document.getElementById('out-edu').innerText = document.getElementById('in-edu').value;
    
    const contato = `${document.getElementById('in-tel').value} | ${document.getElementById('in-link').value}`;
    document.getElementById('out-contato').innerText = contato;

    window.print();
}

// Adiciona validação ao sair do campo (onblur)
document.querySelectorAll('.required-field').forEach(input => {
    input.addEventListener('blur', () => validarCampo(input));
});

// 6. TROCA DE MODELOS (Exemplo simples)
function setModelo(modelo, btn) {
    document.querySelectorAll('.btn-model').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const render = document.getElementById('cv-render');
    render.className = `modelo-${modelo} print-only`;
}
