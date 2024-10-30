let timer; // Variável para o timer
let time = 25 * 60; // Tempo inicial em segundos (25 minutos)
const audio = document.getElementById('audio');

// Sons para cada card
const sounds = [
    "https://drive.google.com/uc?id=1CRHkV72WUMdcqec5GT_KdsqFz0z3VAOA", // Floresta
    "https://drive.google.com/uc?id=1Ip8xBqAUJ-bty51Wz8JBtX_bWXCgA0P2", // Chuva
    "https://drive.google.com/uc?id=1OxLKpCwg2wrxXFNUHgZxJ51QEt0ac5RA", // Cafeteria
    "https://drive.google.com/uc?id=1MakaBPxJvTa_whaSM3kEbRcxiVd1GRCB"  // Lareira
];

// Função para atualizar o timer
function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('time').innerText = minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

// Funções dos botões
document.querySelector('[data-action="toggleRunning"]').addEventListener('click', () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    } else {
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                alert('Tempo esgotado!');
            }
        }, 1000);
    }
});

document.querySelector('[data-action="togglePause"]').addEventListener('click', () => {
    clearInterval(timer);
    timer = null;
});

document.querySelector('[data-action="toggleIncrease"]').addEventListener('click', () => {
    time += 5 * 60; // Aumenta 5 minutos
    updateTimerDisplay();
});

document.querySelector('[data-action="toggleDecrease"]').addEventListener('click', () => {
    time = Math.max(0, time - 5 * 60); // Diminui 5 minutos
    updateTimerDisplay();
});

// Função para tocar o som
function playSound(sound) {
    audio.src = sound;
    audio.load(); // Carrega o novo som
    audio.play().catch(error => {
        console.error("Erro ao tentar tocar o som:", error);
    });
}

// Seleção de cards
const cards = document.querySelectorAll('.cards button');
cards.forEach((card, index) => {
    card.addEventListener('click', () => {
        // Toca o som associado ao card
        console.log("Tocando som:", sounds[index]); // Log para depuração
        playSound(sounds[index]);
    });
});

// Atualiza o timer na carga da página
updateTimerDisplay();
