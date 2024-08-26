let timer;
let running = false;
let startTime;
let lapStartTime;
let lapCount = 1;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startTimer() {
    startTime = Date.now() - (lapStartTime ? lapStartTime : 0);
    timer = setInterval(updateDisplay, 1000);
    running = true;
}

function pauseTimer() {
    clearInterval(timer);
    running = false;
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    display.textContent = '00:00:00';
    lapStartTime = 0;
    lapCount = 1;
    lapsList.innerHTML = '';
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(minutes / 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function lap() {
    const lapTime = Date.now() - startTime;
    const formattedLapTime = formatTime(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount++}: ${formattedLapTime}`;
    lapsList.appendChild(lapItem);
    lapStartTime = Date.now() - startTime;
}

startBtn.addEventListener('click', () => {
    if (!running) startTimer();
});

pauseBtn.addEventListener('click', () => {
    if (running) pauseTimer();
});

resetBtn.addEventListener('click', resetTimer);

lapBtn.addEventListener('click', () => {
    if (running) lap();
});
