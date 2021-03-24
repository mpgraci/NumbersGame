const playBtn = document.getElementById('play-btn');
const setBtn = document.getElementById('set-btn');
const resetBtn = document.getElementById('reset-btn');
const rulesBtn = document.getElementById('Rules-btn');
const timerBtn = document.getElementById('timer-btn');
const demoBtn = document.getElementById('demo-btn');
const startTimerBtn = document.getElementById('startTime-btn');
const setTimerBtn = document.getElementById('timerSet-btn');
const resetTimerBtn = document.getElementById('resetTime-btn');

const targetDisplay = document.getElementById('target');
const numTableRow = document.getElementById('numTable-row');
const largeNumSelector = document.getElementById('large-num-selector');
const timerDuration = document.getElementById('timer-duration');
const rulesContainer = document.getElementById('rules-container');
const timerContainer = document.getElementById('timer-wrapper');
const hardMode = document.getElementById('hard-mode');
const display = document.querySelector('#timer');
const demoBox = document.getElementById('demo-box');

const demoObj = {
    demo1: {
        target: 403,
        numbers: [75, 25, 10, 6, 6, 7],
        largeNum: 2
    },
    demo2: {
        target: 979,
        numbers: [75, 100, 1, 9, 2, 8],
        largeNum: 2
    },
    demo3: {
        target: 634,
        numbers: [75, 8, 4, 9, 1, 3],
        largeNum: 1
    },
    demo4: {
        target: 564,
        numbers: [75, 25, 100, 5, 8, 8],
        largeNum: 3
    }
};
let hardLargeNum = [12, 37, 62, 87];
let largeNum = [25, 50, 75, 100];
let smallNum = [1 , 1 , 2 , 2 , 3 , 3 , 4 , 4 , 5 , 5 , 6 , 6 , 7 , 7 , 8 , 8 , 9 , 9 , 10 , 10];
let selectedNum = [];
let timeIsRunning = false;
let currentDemo = 0;

//random num generators
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function getRandomLarge(){
    let numSet;
    if(hardMode.checked === true){
        numSet = hardLargeNum;
    } else {
        numSet = largeNum;
    }
    let i = getRandomInt(0, numSet.length - 1);
    let result = numSet[i];
    numSet.splice(i, 1);
    return result;
};
function getRandomSmall(){
    let i = getRandomInt(0, smallNum.length - 1);
    let result = smallNum[i];
    smallNum.splice(i, 1);
    return result;
};
function generateDemo(){
    selectedNum = [];
    let demoTarget;
    let demoNum;
    let rand = getRandomInt(1, 4);
    let demoSelection = `demo${rand}`;
    function setDemo(sel){
        demoTarget = demoObj[sel].target;
        demoNum = demoObj[sel].numbers;
        largeNumSelector.value = demoObj[sel].largeNum;
    };
    setDemo(demoSelection);
    switch(rand){
        case 1:
            demoBox.innerHTML =
            `
            10 x 6 = 60 <br>
            60 x 6 = 360 <br>
            75 - 25 = 50 <br>
            50 - 7 = 43 <br>
            360 + 43 = <b>403</b>
            `;
            break;
        case 2:
            demoBox.innerHTML =
            `
            100 x 9 = 900 <br>
            900 + 75 = 975 <br>
            8 / 2 = 4 <br>
            975 + 4 = <b>979</b>
            `;
            break;
        case 3:
            demoBox.innerHTML =
            `
            75 x 8 = 600 <br>
            9 x 4 = 36 <br>
            3 - 1 = 2 <br>
            36 - 2 = 34 <br>
            600 + 34 = <b>634</b>
            `;
            break;
        case 4:
            demoBox.innerHTML =
            `
            75 x 8 = 600 <br>
            5 x 8 = 40 <br>
            600 - 40 = 560 <br>
            100 / 25 = 4
            560 + 4 = <b>564</b>
            `;
            break;
    };
    for(let i=0; i<demoNum.length; i++){
        selectedNum.push(demoNum[i]);
    };
    for(let i=0; i<numTableRow.cells.length; i++){
        numTableRow.cells[i].innerHTML = selectedNum[i];
    };
    targetDisplay.innerHTML = demoTarget;
    demoBox.style.visibility = "visible";
    setBtn.disabled = true;
    largeNumSelector.disabled = true;
    playBtn.disabled = true;
}
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
//sets target and starts timer
playBtn.addEventListener('click', () => {
    targetDisplay.innerHTML = getRandomInt(101, 999);
    playBtn.disabled = true;

    if(timeIsRunning != true){
        let duration = timer;
        changeTimerBtnStyle(true);
        startTimer(duration);
    }
});
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
    largeNumSelector.value = "0";
    changeTimerBtnStyle(false);
    resetTimer();
});
//sets chosen numbers
setBtn.addEventListener('click', () => {
    let largeNums = largeNumSelector.value;
    selectedNum = [];
    for(let i=0; i<largeNums;i++){
        selectedNum.push(getRandomLarge());
    };
    for(let i=largeNums; i<numTableRow.cells.length; i++){
        selectedNum.push(getRandomSmall());
    };
    for(let i=0; i<numTableRow.cells.length; i++){
        numTableRow.cells[i].innerHTML = selectedNum[i];
    };
    setBtn.disabled = true;
    playBtn.disabled = false;
    largeNumSelector.disabled = true;
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
//fills with premade data for demo purposes
demoBtn.addEventListener('click', generateDemo);

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
//toggles hard mode
hardMode.addEventListener('click', () =>{
    const body = document.getElementsByTagName('body')[0];
    if (hardMode.checked === true){
        body.className = "red-grid";
    } else {
        body.className = "blue-grid";
    };
});