const resetBtn = document.getElementById('reset-btn');
const rulesBtn = document.getElementById('Rules-btn');
const timerBtn = document.getElementById('timer-btn');
const startTimerBtn = document.getElementById('startTime-btn');
const setTimerBtn = document.getElementById('timerSet-btn');
const resetTimerBtn = document.getElementById('resetTime-btn');
const resetLettersBtn = document.getElementById('resetLetters-btn');

const targetDisplay = document.getElementById('target');
const lettersTblRow = document.getElementById('lettersTbl-row');
const wordTblRow = document.getElementById('wordTbl-row');
const timerDuration = document.getElementById('timer-duration');
const rulesContainer = document.getElementById('rules-container');
const timerContainer = document.getElementById('timer-wrapper');
const display = document.querySelector('#timer');

let selectedNum = [];
let timeIsRunning = false;

//random num generators
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//timer
let timer = timerDuration.value;
let countdown;
function formatTimer(){
    let minutes, seconds;
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;
};
function startTimer(duration) {
    timer = duration;
    timeIsRunning = true;
    function beginTimer() {
        formatTimer();
        if(timer === 0){
            timeIsRunning = false;
            changeTimerBtnStyle(false);
            clearInterval(countdown);
            display.style.backgroundColor = "red"
        } else if(timer < 11){
            display.style.backgroundColor = "yellow"
        } else if(timer > 10){
            display.style.backgroundColor = "white"
        }
        if (--timer < 0) {
                timer = duration;
        }
    };
    beginTimer();
    countdown = setInterval(beginTimer, 1000)
};
function resetTimer() {
    timeIsRunning = false;
    timer = timerDuration.value;
    formatTimer();
    clearInterval(countdown);
    display.style.backgroundColor = "white"
};
//changes start/stop timer btn styles
function changeTimerBtnStyle(running){
    if (running){
        startTimerBtn.innerHTML = "&#10074;&#10074;"
        startTimerBtn.style.backgroundColor = "rgb(248, 45, 45)"
        setTimerBtn.disabled = true;
    } else {
        startTimerBtn.innerHTML = "&#9658;"
        startTimerBtn.style.backgroundColor = "green"
        setTimerBtn.disabled = false;
    }
};

//buttons
//resets everything
resetBtn.addEventListener('click', () => {
    targetDisplay.innerHTML = "000";
    hardLargeNum = [12, 37, 62, 87];
    largeNum = [25, 50, 75, 100];
    smallNum = [1 , 1 , 2 , 2 , 3 , 3 , 4 , 4 , 5 , 5 , 6 , 6 , 7 , 7 , 8 , 8 , 9 , 9 , 10 , 10];
    selectedNum = [];
    for(let i=0; i<numTableRow.cells.length; i++){
        numTableRow.cells[i].innerHTML = "0";
    };
    setBtn.disabled = false;
    largeNumSelector.disabled = false;
    playBtn.disabled = true;
    demoBox.style.visibility = "hidden";
    changeTimerBtnStyle(false);
    resetTimer();
});

//displays hidden items
rulesBtn.addEventListener('click', () => {
    if(rulesContainer.style.visibility != "hidden"){
        rulesContainer.style.visibility = "hidden";
    } else {
        rulesContainer.style.visibility = "visible";
    };
});
timerBtn.addEventListener('click', () => {
  if(timerContainer.style.visibility != "hidden"){
    timerContainer.style.visibility = "hidden";
  } else {
    timerContainer.style.visibility = "visible";
  };
});

//timer controls
setTimerBtn.addEventListener('click', () => {
    timer = timerDuration.value;
    formatTimer();
    if(timerDuration.value > 10){
        display.style.backgroundColor = "white"
    };
});
startTimerBtn.addEventListener('click', () => {
    if(timeIsRunning != true){
        let duration = timer;
        timeIsRunning = true;
        changeTimerBtnStyle(true);
        startTimer(duration);
    } else {
        timeIsRunning = false;
        changeTimerBtnStyle(false);
        clearInterval(countdown);
    };
});
resetTimerBtn.addEventListener('click', () => {
    changeTimerBtnStyle(false);
    resetTimer();
});