// Inicialização de escutas estruturadas após carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
  setupInputListeners();
});

// 1. Sistema de Gerenciamento de Abas
function switchTab(tabId) {
  // Remove classes ativas de todas as abas de conteúdo e botões
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  
  // Ativa a aba solicitada
  document.getElementById(tabId).classList.add('active');
  
  // Encontra o botão correspondente para destacar
  const targetBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => 
    btn.getAttribute('onclick').includes(tabId)
  );
  if (targetBtn) targetBtn.classList.add('active');
}

// 2. Mapeamento de Eventos de Escuta e Máscaras
function setupInputListeners() {
  const fields = ['inName', 'inTitle', 'inEmail', 'inPhone', 'inLocation', 'inSummary', 'inExp', 'inSkills'];
  fields.forEach(fieldId => {
    const el = document.getElementById(fieldId);
    if(el) el.addEventListener('input', updatePreview);
  });

  // Escuta especial para aplicar máscara de telefone em tempo real
  const phoneInput = document.getElementById('inPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      updatePreview();
    });
  }
}

// 3. Atualização Síncrona do Preview A4
function updatePreview() {
  document.getElementById('cvName').innerText = document.getElementById('inName').value || "Seu Nome";
  document.getElementById('cvTitle').innerText = document.getElementById('inTitle').value || "Seu Cargo / Objetivo";
  document.getElementById('cvEmail').innerText = document.getElementById('inEmail').value ? "📧 " + document.getElementById('inEmail').value : "📧 email@exemplo.com";
  document.getElementById('cvPhone').innerText = document.getElementById('inPhone').value ? "📞 " + document.getElementById('inPhone').value : "📞 (00) 00000-0000";
  document.getElementById('cvLocation').innerText = document.getElementById('inLocation').value ? "📍 " + document.getElementById('inLocation').value : "📍 Cidade - UF";
  document.getElementById('cvSummary').innerText = document.getElementById('inSummary').value || "Área destinada ao resumo de suas competências profissionais.";
  document.getElementById('cvExp').innerText = document.getElementById('inExp').value || "Suas passagens por empresas anteriores e atividades desenvolvidas.";
  document.getElementById('cvSkills').innerText = document.getElementById('inSkills').value || "Suas principais habilidades mercadológicas.";

  calculateStrength();
}

// 4. Mecanismo de Troca Dinâmica de Cor do Tema
function setTheme(colorValue) {
  document.documentElement.style.setProperty('--primary', colorValue);
}

// 5. Inserção de Elementos de Texto e Chips Auxiliares
function pasteText(fieldId, context) {
  const input = document.getElementById(fieldId);
  if (input) {
    input.value += context;
    updatePreview();
  }
}

function pasteSkill(skillName) {
  const input = document.getElementById('inSkills');
  if (input) {
    input.value = input.value ? input.value + ", " + skillName : skillName;
    updatePreview();
  }
}

// 6. Modelos de Perfil Profissional Assistidos (Múltiplas Sugestões)
function applyAIProfile() {
  const select = document.getElementById('aiNiche');
  const textarea = document.getElementById('inSummary');
  const cargo = document.getElementById('inTitle').value || "minha área de atuação";

  const templates = {
    tecnologia: `Profissional focado no setor de tecnologia especializado em ${cargo}. Experiência consistente no desenvolvimento de soluções escaláveis, aplicação de metodologias modernas de desenvolvimento e manutenção de código limpo. Voltado para a resolução lógica de problemas complexos e otimização contínua de ecossistemas corporativos digitais.`,
    comercial: `Especialista comercial focado em resultados tangíveis e expansão mercadológica como ${cargo}. Domínio em técnicas avançadas de negociação, prospecção ativa B2B/B2C e gestão estratégica de carteiras de clientes de alta relevância. Histórico sólido no atingimento e superação consistente de metas e KPIs corporativos.`,
    administrativo: `Atuação estratégica em suporte corporativo e gestão operacional na função de ${cargo}. Sólida proficiência na estruturação de fluxos internos organizacionais, gestão de documentos e interface de comunicação entre departamentos. Foco em garantir a máxima eficiência processual e conformidade com os padrões internos da empresa.`,
    primeiro_emprego: `Jovem profissional em busca de inserção no mercado de trabalho para atuar como ${cargo}. Perfil proativo, com alto nível de adaptabilidade, facilidade para aprendizado rápido de novas ferramentas de produtividade e forte inclinação para o trabalho colaborativo dentro de times multidisciplinares.`
  };

  if (select.value && templates[select.value]) {
    textarea.value = templates[select.value];
    updatePreview();
  }
}

// 7. Cálculo da Força de Preenchimento do Currículo
function calculateStrength() {
  let score = 10;
  if (document.getElementById('inName').value.trim()) score += 15;
  if (document.getElementById('inTitle').value.trim()) score += 15;
  if (document.getElementById('inSummary').value.trim().length > 25) score += 20;
  if (document.getElementById('inExp').value.trim().length > 35) score += 20;
  if (document.getElementById('inSkills').value.trim().length > 8) score += 20;

  document.getElementById('meter-bar').style.width = score + "%";
  document.getElementById('strength-txt').innerText = score + "%";
}

// 8. Cópia de Chave PIX Facilitada
function copyPix() {
  navigator.clipboard.writeText('seu-email-pix@provedor.com');
  alert('Chave PIX copiada para a área de transferência com sucesso!');
}

// 9. Gatilho de Impressão com Validação de Termos
function triggerPrint() {
  const accepted = document.getElementById('acceptTerms').checked;
  if (!accepted) {
    alert('Você precisa ler e aceitar os Termos e Políticas de Privacidade marcando a caixa de seleção antes de exportar o PDF!');
    return;
  }
  window.print();
}

