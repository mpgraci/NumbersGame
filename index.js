const playBtn = document.getElementById('play-btn');
const setBtn = document.getElementById('set-btn');
const resetBtn = document.getElementById('reset-btn');
const rulesBtn = document.getElementById('Rules-btn');
const timerBtn = document.getElementById('timer-btn');
const demoBtn = document.getElementById('demo-btn');
const startTimeBtn = document.getElementById('startTime-btn');
const timerSetBtn = document.getElementById('timerSet-btn');

const targetDisplay = document.getElementById('target');
const numTableRow = document.getElementById('numTable-row');
const largeNumSelector = document.getElementById('large-num-selector');
const timerDuration = document.getElementById('timer-duration');
const rulesContainer = document.getElementById('rules-container');
const timerContainer = document.getElementById('timer-wrapper');
const hardMode = document.getElementById('hard-mode');
const display = document.querySelector('#timer');

let hardLargeNum = [12, 37, 62, 87];
let largeNum = [25, 50, 75, 100];
let smallNum = [1 , 1 , 2 , 2 , 3 , 3 , 4 , 4 , 5 , 5 , 6 , 6 , 7 , 7 , 8 , 8 , 9 , 9 , 10 , 10];
const demoNum = [75, 25, 10, 6, 6, 7];
const demoTarget = [403];
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
     countdown = setInterval(function () {
        formatTimer();
        if(timer === 0){
         timerContainer.style.backgroundColor = "red"  
         startTimeBtn.style.backgroundColor = "lightcoral"
         timerSetBtn.disabled = false;
         timeIsRunning = false;   
         clearInterval(countdown);
        } else if(timer < 11){        
           timerContainer.style.backgroundColor = "yellow"
        }
        if (--timer < 0) {        
            timer = duration;
        }         
    }, 1000);     
 }; 
 function resetTimer() {
    timeIsRunning = false;
    timerContainer.style.backgroundColor = "white"    
    clearInterval(countdown);
    timer = timerDuration.value;    
    formatTimer();
 };

//buttons
//sets target and starts timer
playBtn.addEventListener('click', () => {        
    targetDisplay.innerHTML = getRandomInt(101, 999);      
    playBtn.disabled = true;
    
    if(timeIsRunning != true){        
        let duration = timer;    
        timerSetBtn.disabled = true;
        startTimeBtn.style.backgroundColor = "lightgreen"
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
    }    

    playBtn.disabled = false;
    setBtn.disabled = false;
    largeNumSelector.disabled = false;     
    
    timerContainer.style.backgroundColor = "white"
    timerSetBtn.disabled = false;
    startTimeBtn.style.backgroundColor = "lightcoral"
    resetTimer();    
});
//sets chosen numbers
setBtn.addEventListener('click', () => {            
    let largeNums = largeNumSelector.value;    
    for(let i=0; i<largeNums;i++){
        selectedNum.push(getRandomLarge());        
    }
    for(let i=largeNums; i<6; i++){
        selectedNum.push(getRandomSmall());        
    }
    for(let i=0; i<numTableRow.cells.length; i++){
        numTableRow.cells[i].innerHTML = selectedNum[i];        
    }        
    setBtn.disabled = true;
    largeNumSelector.disabled = true;         
});
startTimeBtn.addEventListener('click', () => {        
    if(timeIsRunning != true){
        let duration = timer;    
        timerSetBtn.disabled = true;
        timeIsRunning = true;
        startTimeBtn.style.backgroundColor = "lightgreen"
        startTimer(duration);
    } else {
        timeIsRunning = false;
        timerSetBtn.disabled = false;
        startTimeBtn.style.backgroundColor = "lightcoral"
        clearInterval(countdown);                
    }    
});
//displays hidden items
rulesBtn.addEventListener('click', () => {
    if(rulesContainer.style.visibility == "visible"){
        rulesContainer.style.visibility = "hidden";
    } else {
        rulesContainer.style.visibility = "visible";
    }
});
timerBtn.addEventListener('click', () => {
  if(timerContainer.style.visibility == "visible"){
    timerContainer.style.visibility = "hidden";
  } else {
    timerContainer.style.visibility = "visible";
  }
});
//fills with premade data for demo purposes
demoBtn.addEventListener('click', () => {   
    for(let i=0; i<6; i++){
        selectedNum.push(demoNum[i]);        
    }
    for(let i=0; i<numTableRow.cells.length; i++){
        numTableRow.cells[i].innerHTML = selectedNum[i];        
    }        
    setBtn.disabled = true;
    largeNumSelector.value = "2";
    largeNumSelector.disabled = true;         

    targetDisplay.innerHTML = demoTarget;        
    playBtn.disabled = true;
});
//sets timer
timerSetBtn.addEventListener('click', () => {    
    let minutes, seconds;        
    minutes = parseInt(timerDuration.value / 60, 10)
    seconds = parseInt(timerDuration.value % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;    
    timer = timerDuration.value;
});
//togles hard mode
hardMode.addEventListener('click', () =>{
    const body = document.getElementsByTagName('body')[0];
    if (hardMode.checked === true){
        body.style.backgroundImage = "linear-gradient(rgb(252, 169, 173) .1em, transparent .1em), linear-gradient(90deg, rgb(252, 169, 173) .1em, transparent .1em)";
    } else {
        body.style.backgroundImage = "linear-gradient(rgb(169, 235, 252) .1em, transparent .1em), linear-gradient(90deg, rgb(169, 235, 252) .1em, transparent .1em)";
    }
});