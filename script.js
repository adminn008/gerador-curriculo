// NAVEGAÇÃO ENTRE ABAS
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

// RELÓGIO
setInterval(() => {
    const now = new Date();
    document.getElementById('clock-display').innerText = now.toLocaleTimeString('pt-BR');
    document.getElementById('date-display').innerText = now.toLocaleDateString('pt-BR', { dateStyle: 'full' });
    checkAlarms(now);
}, 1000);

// CRONÔMETRO
let chronoTime = 0, chronoInt;
document.getElementById('chrono-start').onclick = function() {
    if(this.innerText === "Iniciar") {
        this.innerText = "Pausar";
        chronoInt = setInterval(() => { chronoTime += 10; updateChrono(); }, 10);
    } else {
        this.innerText = "Iniciar";
        clearInterval(chronoInt);
    }
};
function updateChrono() {
    let d = new Date(chronoTime);
    document.getElementById('chrono-display').innerText = d.toISOString().substr(11, 11);
}
document.getElementById('chrono-reset').onclick = () => {
    clearInterval(chronoInt); chronoTime = 0; updateChrono();
    document.getElementById('chrono-start').innerText = "Iniciar";
};

// ALARMES
let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
document.getElementById('add-alarm').onclick = () => {
    const time = document.getElementById('alarm-time').value;
    if(time) { alarms.push(time); localStorage.setItem('alarms', JSON.stringify(alarms)); renderAlarms(); }
};
function renderAlarms() {
    document.getElementById('alarms-list').innerHTML = alarms.map((t, i) => 
        `<div class="alarm-item"><span>${t}</span><button onclick="removeAlarm(${i})">X</button></div>`).join('');
}
window.removeAlarm = (i) => { alarms.splice(i, 1); localStorage.setItem('alarms', JSON.stringify(alarms)); renderAlarms(); };

function checkAlarms(now) {
    const cur = now.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    if(alarms.includes(cur)) { document.getElementById('alarm-sound').play(); }
}

// DARK MODE
document.getElementById('theme-toggle').onclick = () => document.body.classList.toggle('dark-theme');
renderAlarms();
