// Get the elements
const player = document.querySelector(".player");
const playerVideo = document.querySelector(".player__video");
const playerControls = document.querySelector(".player__controls");
const progress = document.querySelector(".progress");
const progressFilled = document.querySelector(".progress__filled");

const buttonToggle = document.querySelector(".toggle");

const playerButtons = Array.from(document.querySelectorAll('button[data-skip]'));

const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');

let checkPlayerOn = false; 

console.log(progressFilled)


// Build the functions

// 1 play and stop the video when clicking the video or the play button
function playVideo() {
    (!checkPlayerOn) ? playerVideo.play() : playerVideo.pause();
    (!checkPlayerOn) ? buttonToggle.innerHTML = "⏸" : buttonToggle.innerHTML = "►";
    
    checkPlayerOn = !checkPlayerOn;
    console.log("now checkPlayerOn is: ", checkPlayerOn);
    return;
}

// 2 change the volume with the first slider
function changeVolume(amount) {
    playerVideo.volume = amount;
    return;
}

// 3 change the video speed with the second slider
function changeRateSpeed(speed) {
    playerVideo.playbackRate = speed;
    return; 
}

// 4 go forward/onward clicking the 10s/25s buttons
function changePosition(value) {
    playerVideo.currentTime = playerVideo.currentTime + parseInt(value);
    console.log("current time: ", playerVideo.currentTime)
}

// 5 return the percentage of the actual video currentime
function calcPercentage() {
    let currTime = playerVideo.currentTime;
    let totalTime = playerVideo.duration;
    let percentage = currTime/totalTime*100;
    // console.log("percentage :", percentage.toFixed(1))
    progressFilled.hasAttribute('flex-basis');
    progressFilled.setAttribute('style', `flex-basis: ${percentage.toFixed(2)}%`);
}

// Hook up the event listeners
setInterval(calcPercentage, 100)
console.log("progressFilled: ", progressFilled)


playerVideo.addEventListener("click", playVideo);
buttonToggle.addEventListener("click", playVideo);

playbackRateSlider.addEventListener("change", (e) => {
    changeRateSpeed(playbackRateSlider.value);
    console.log("speed changed", e.x)
    console.log("playbackRateSLider values", playbackRateSlider.value)
    return
})

volumeSlider.addEventListener("change", () => {
    changeVolume(volumeSlider.value);
    console.log("volumeSlider values", volumeSlider.value)
    return
})

playerButtons.forEach(button => button.addEventListener("click", () => {
    console.log(button.getAttribute("data-skip"))
    changePosition(button.getAttribute("data-skip"));
}))