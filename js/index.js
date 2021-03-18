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

const demoObj = {
    demo1: {
        target: 403,
        numbers: [75, 25, 10, 6, 6, 7]
    },
    demo2: {
        target: 979,
        numbers: [75, 100, 1, 9, 2, 8]
    }
};
let hardLargeNum = [12, 37, 62, 87];
let largeNum = [25, 50, 75, 100];
let smallNum = [1 , 1 , 2 , 2 , 3 , 3 , 4 , 4 , 5 , 5 , 6 , 6 , 7 , 7 , 8 , 8 , 9 , 9 , 10 , 10];
let selectedNum = [];
let timeIsRunning = false;

//random num generators 
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
};
function getRandomLarge(){
    let numSet;
    if(hardMode.checked === true){
        numSet = hardLargeNum;
    } else {
        numSet = largeNum;    
    }
    let i = getRandomInt(0, numSet.length);
    let result = numSet[i];
    numSet.splice(i, 1);
    return result;
};
function getRandomSmall(){
    let i = getRandomInt(0, smallNum.length);
    let result = smallNum[i];
    smallNum.splice(i, 1);
    return result;
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
    playBtn.disabled = false;
    setBtn.disabled = false;
    largeNumSelector.disabled = false;     
    playBtn.disabled = true;        
    changeTimerBtnStyle(false);        
    resetTimer();    
    //display.style.backgroundColor = "white"   
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
    if(rulesContainer.style.visibility == "visible"){
        rulesContainer.style.visibility = "hidden";        
    } else {
        rulesContainer.style.visibility = "visible";
    };
});
timerBtn.addEventListener('click', () => {
  if(timerContainer.style.visibility == "visible"){
    timerContainer.style.visibility = "hidden";
  } else {
    timerContainer.style.visibility = "visible";
  };
});
//fills with premade data for demo purposes
demoBtn.addEventListener('click', () => { 
    selectedNum = [];      
    let demoTarget = demoObj.demo1.target;
    let demoNum = demoObj.demo1.numbers;    
    largeNumSelector.value = "2";

    for(let i=0; i<demoNum.length; i++){
        selectedNum.push(demoNum[i]);        
    };
    for(let i=0; i<numTableRow.cells.length; i++){
        numTableRow.cells[i].innerHTML = selectedNum[i];        
    };        
    targetDisplay.innerHTML = demoTarget;        
    setBtn.disabled = true;    
    largeNumSelector.disabled = true;       
    playBtn.disabled = true;
});
//timer controls
setTimerBtn.addEventListener('click', () => {    
    let minutes, seconds;        
    minutes = parseInt(timerDuration.value / 60, 10)
    seconds = parseInt(timerDuration.value % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;    
    timer = timerDuration.value;
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
    playBtn.disabled = true;    
});
//toggles hard mode
hardMode.addEventListener('click', () =>{
    const body = document.getElementsByTagName('body')[0];
    if (hardMode.checked === true){
        body.style.backgroundImage = "linear-gradient(rgb(252, 169, 173) .1em, transparent .1em), linear-gradient(90deg, rgb(252, 169, 173) .1em, transparent .1em)";
    } else {
        body.style.backgroundImage = "linear-gradient(rgb(169, 235, 252) .1em, transparent .1em), linear-gradient(90deg, rgb(169, 235, 252) .1em, transparent .1em)";
    };
});