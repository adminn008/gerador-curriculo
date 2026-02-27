// --- SISTEMA DE NAVEGAÇÃO ENTRE ABAS ---
const tabs = document.querySelectorAll('.tab-link');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// --- RELÓGIO PRINCIPAL ---
function updateTime() {
    const now = new Date();
    document.getElementById('clock-display').innerText = now.toLocaleTimeString('pt-BR');
    document.getElementById('date-display').innerText = now.toLocaleDateString('pt-BR', { dateStyle: 'full' });
    checkAlarms(now);
}
setInterval(updateTime, 1000);

// --- CRONÔMETRO ---
let chronoTime = 0, chronoInterval;
const chronoDisplay = document.getElementById('chrono-display');

document.getElementById('chrono-start').onclick = function() {
    if (this.innerText === "Iniciar") {
        this.innerText = "Pausar";
        chronoInterval = setInterval(() => {
            chronoTime += 10;
            let d = new Date(chronoTime);
            chronoDisplay.innerText = d.toISOString().substr(11, 11);
        }, 10);
    } else {
        this.innerText = "Iniciar";
        clearInterval(chronoInterval);
    }
};

document.getElementById('chrono-reset').onclick = () => {
    clearInterval(chronoInterval);
    chronoTime = 0;
    chronoDisplay.innerText = "00:00:00.00";
    document.getElementById('chrono-start').innerText = "Iniciar";
};

// --- GESTÃO DE ALARMES (LocalStorage) ---
let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
const alarmSound = document.getElementById('alarm-sound');

document.getElementById('add-alarm').onclick = () => {
    const time = document.getElementById('alarm-time').value;
    if (time) {
        alarms.push({ time, active: true });
        localStorage.setItem('alarms', JSON.stringify(alarms));
        renderAlarms();
    }
};

function renderAlarms() {
    const list = document.getElementById('alarms-list');
    list.innerHTML = alarms.map((a, i) => `
        <div class="alarm-item">
            <span>${a.time}</span>
            <button onclick="removeAlarm(${i})">Excluir</button>
        </div>
    `).join('');
}

function removeAlarm(i) {
    alarms.splice(i, 1);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    renderAlarms();
}

function checkAlarms(now) {
    const current = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    alarms.forEach(a => {
        if (a.time === current && a.active) {
            alarmSound.play();
            alert("ALARME!");
            a.active = false; // Evita tocar repetidamente no mesmo minuto
        }
    });
}

// --- TEMA E CARREGAMENTO ---
document.getElementById('theme-toggle').onclick = () => {
    document.body.classList.toggle('dark-theme');
};
renderAlarms();
