// 1. LOCALIZAÇÃO DO USUÁRIO
fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
        document.getElementById('user-location').innerText = `${data.city}, ${data.country_name}`;
    })
    .catch(() => document.getElementById('user-location').innerText = "Horário Local");

// 2. SISTEMA DE FUNDOS
function changeBG(type) {
    const urls = {
        nature: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
        city: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80',
        abstract: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80',
        none: ''
    };
    document.body.style.backgroundImage = `url('${urls[type]}')`;
    localStorage.setItem('user-bg', type);
}

// 3. TELA CHEIA (FULLSCREEN)
const fsBtn = document.getElementById('fullscreen-btn');
fsBtn.onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.body.classList.add('fullscreen');
    } else {
        document.exitFullscreen();
        document.body.classList.remove('fullscreen');
    }
};

// Sair da tela cheia ao apertar ESC
document.onfullscreenchange = () => {
    if (!document.fullscreenElement) document.body.classList.remove('fullscreen');
};

// 4. NAVEGAÇÃO ENTRE ABAS (MELHORADA)
function switchTab(tabId) {
    document.querySelectorAll('.tab-link').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

document.querySelectorAll('.tab-link').forEach(tab => {
    tab.onclick = () => switchTab(tab.dataset.tab);
});

// 5. RELÓGIO (Loop Principal)
setInterval(() => {
    const now = new Date();
    document.getElementById('clock-display').innerText = now.toLocaleTimeString('pt-BR');
    document.getElementById('date-display').innerText = now.toLocaleDateString('pt-BR', { dateStyle: 'full' });
}, 1000);

// Carregar preferências ao iniciar
if(localStorage.getItem('user-bg')) changeBG(localStorage.getItem('user-bg'));
