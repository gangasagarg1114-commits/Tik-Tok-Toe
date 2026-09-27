const liveClock = document.querySelector("#liveClock");

const stopWatch = document.querySelector("#stopWatch");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");



function updateClock() {
    const time = new Date();
    let period = "AM";

    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    if (hours >= 12) {
        period = "PM";
    };

    if (hours > 12) {
        hours = hours - 12;
    };

    if (hours === 0) {
        hours = 12;
    };

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    liveClock.innerText = hours + ":" + minutes + ":" + seconds + " " + period;


};

updateClock();
setInterval(updateClock, 1000);


let hours = 0;
let minutes = 0;
let seconds = 0;
let interval;


function updatestopWatch() {

    seconds++;

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    const displayHours = String(hours).padStart(2, "0");
    const displayMinutes = String(minutes).padStart(2, "0");
    const displaySeconds = String(seconds).padStart(2, "0");

    stopWatch.innerText = displayHours + ":" + displayMinutes + ":" + displaySeconds;

};

startBtn.addEventListener("click", function () {
    if (interval) {
        return;
    } interval = setInterval(updatestopWatch, 1000);
});

stopBtn.addEventListener("click", function () {
    clearInterval(interval);
    interval = null;
});

resetBtn.addEventListener("click", function () {
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    stopWatch.innerText = "00:00:00";
    interval = null;

});






