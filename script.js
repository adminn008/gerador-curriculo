// 1. MÁSCARA DE TELEFONE
const telInput = document.getElementById('in-tel');
if(telInput) {
    telInput.addEventListener('input', (e) => {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
}

// 2. MODO DARK
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('cvflash-theme', isDark ? 'dark' : 'light');
});

if(localStorage.getItem('cvflash-theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// 3. SISTEMA DE SUGESTÕES
const sugestoes = {
    'in-obj': [
        "Procuro minha primeira oportunidade de trabalho para aplicar meus conhecimentos e crescer profissionalmente.",
        "Atuar na área administrativa, buscando eficiência em processos e atendimento ao público.",
        "Desenvolvedor júnior focado em criar soluções eficientes e aprender novas tecnologias.",
        "Estagiário dedicado buscando aprendizado prático e contribuição para os projetos da empresa.",
        "Jovem Aprendiz focado em desenvolvimento de competências e auxílio operacional."
    ]
};

document.querySelectorAll('.tag').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.parentElement.getAttribute('data-target');
        const textIndex = Array.from(this.parentElement.children).indexOf(this);
        document.getElementById(targetId).value = sugestoes[targetId][textIndex];
        atualizarQualidade();
    });
});

// 4. CHECKLIST E QUALIDADE (ATUALIZAÇÃO EM TEMPO REAL)
const inputsParaValidar = ['in-nome', 'in-tel', 'in-obj'];

function atualizarQualidade() {
    let preenchidos = 0;
    
    inputsParaValidar.forEach(id => {
        const el = document.getElementById(id);
        const checkItem = document.querySelector(`li[data-field="${id}"]`);
        
        if (el && el.value.length > 3) {
            preenchidos++;
            checkItem.classList.add('ok');
            checkItem.innerHTML = `✔ ${checkItem.innerText.substring(2)}`;
        } else if (checkItem) {
            checkItem.classList.remove('ok');
            checkItem.innerHTML = `❌ ${checkItem.innerText.substring(2)}`;
        }
    });

    const percent = Math.round((preenchidos / inputsParaValidar.length) * 100);
    const scoreFill = document.getElementById('score-fill');
    if(scoreFill) {
        scoreFill.style.width = percent + '%';
        document.getElementById('score-text').innerText = percent + '% completo';
    }
}

document.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', atualizarQualidade);
});

// 5. VALIDAÇÃO E GERAÇÃO DE PDF
function gerarPDF() {
    let erros = 0;
    
    inputsParaValidar.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value || el.value.length < 3) {
            el.classList.add('input-error');
            erros++;
            
            if(!el.nextElementSibling?.classList.contains('error-text')) {
                const msg = document.createElement('span');
                msg.className = 'error-text';
                msg.innerText = 'Preencha este campo obrigatório';
                el.after(msg);
            }
        } else {
            el.classList.remove('input-error');
            if(el.nextElementSibling?.classList.contains('error-text')) {
                el.nextElementSibling.remove();
            }
        }
    });

    if (erros > 0) {
        alert("Ops! Alguns campos obrigatórios estão vazios.");
        return;
    }

    // Preencher saída para o PDF
    document.getElementById('out-nome').innerText = document.getElementById('in-nome').value;
    document.getElementById('out-contato').innerText = `${document.getElementById('in-tel').value} | ${document.getElementById('in-bairro').value}`;
    document.getElementById('out-obj').innerText = document.getElementById('in-obj').value;

    window.print();
}
