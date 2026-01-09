// GOAL: create a timer which starts the countdown with the given time frame

// get all the variables from HTML file
const timerBtn = Array.from(document.querySelectorAll(".timer__button"));
const inputMinutes = document.querySelector("input");
const displayTimeLeft = document.querySelector(".display__time-left");
const displayEndTime = document.querySelector(".display__end-time");

console.log(timerBtn);
console.log(inputMinutes);
console.log(displayTimeLeft);
console.log(displayEndTime);

let checkIfSeconds = false;
let checkIfMinutes = false;
let checkIfHours = false;

let intervalId;

// each button has a data property which specifies the seconds
console.log(timerBtn[0].dataset.time);

// create a function which given seconds returns print seconds/minutes/hours
function getTimeFromSeconds(totalSeconds) {
  if (totalSeconds >= 3600) {
    checkIfSeconds = true;
    checkIfMinutes = true;
    checkIfHours = true;
  } else if (totalSeconds >= 60) {
    console.log("total seconds > 60", totalSeconds);
    checkIfSeconds = true;
    checkIfMinutes = true;
    checkIfHours = false;
  } else if (totalSeconds > 0) {
    console.log("total seconds > 0", totalSeconds);

    checkIfSeconds = true;
    checkIfMinutes = false;
  } else {
    checkIfSeconds = false;
  }

  let time = {
    seconds: 0,
    minutes: 0,
    hours: 0,
  };

  time.minutes = (totalSeconds - (totalSeconds % 60)) / 60;
  time.seconds = totalSeconds % 60;

  time.hours = (time.minutes - (time.minutes % 60)) / 60;
  time.minutes = time.minutes % 60;

  console.log(
    `1 cycle. hours: ${time.hours}, minutes: ${time.minutes}, rest seconds: ${time.seconds}`
  );

  if (checkIfHours) {
    console.table({ checkIfHours, checkIfMinutes, checkIfSeconds });
    displayTimeLeft.innerHTML = `${
      time.hours % 60 < 10 ? time.hours : "0" + time.hours
    }:${time.minutes >= 10 ? time.minutes : "0" + time.minutes}:${
      time.seconds >= 10 ? time.seconds : "0" + time.seconds
    }`;
  } else if (checkIfMinutes) {
    console.table({ checkIfHours, checkIfMinutes, checkIfSeconds });
    displayTimeLeft.innerHTML = `${
      time.minutes >= 10 ? time.minutes : "0" + time.minutes
    }:${time.seconds >= 10 ? time.seconds : "0" + time.seconds}`;
  } else if (checkIfSeconds) {
    console.table({ checkIfHours, checkIfMinutes, checkIfSeconds });
    displayTimeLeft.innerHTML = `${
      time.seconds >= 10 ? time.seconds : "0" + time.seconds
    }`;
  } else displayTimeLeft.innerHTML = "countdown OVER!";

  //   displayTimeLeft.innerHTML = `${time.hours}:${time.minutes}:${time.seconds}`;

  return time;
  // use modulo to calc seconds, minutes and hours
}

// getTimeFromSeconds(999999);

// create a function which, given the seconds as input, start a timer from the given seconds
function countDown(seconds) {
  clearInterval(intervalId);

  let secondsLeft = seconds;
  getTimeFromSeconds(secondsLeft);
  comeBackTime(secondsLeft);

  intervalId = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(intervalId);
      displayTimeLeft.innerHTML = "countdown OVER!";
      return;
    }
    console.log("running timer");

    getTimeFromSeconds(secondsLeft);
    // displayTimeLeft.innerHTML = secondsLeft;
  }, 1000);
}

// get the setInterval id to stop it when new setinterval is triggered

// create a function which displays the time to be back
function comeBackTime(secondsTotal) {
  let seconds = secondsTotal - 1;
  let dateObject = new Date();
  let currentHour = dateObject.getHours();
  let currentMinutes = dateObject.getMinutes();
  let currentSeconds = dateObject.getSeconds();

  console.table({ currentHour, currentMinutes, currentSeconds });

  let timeToAdd = getTimeFromSeconds(seconds);
  console.log(timeToAdd);

  let endSecond = (currentSeconds + timeToAdd.seconds) % 60;
  let endMinute =
    (currentMinutes +
      timeToAdd.minutes +
      Math.floor((currentSeconds + timeToAdd.seconds) / 60)) %
    60;
  let endHour =
    (currentHour +
      timeToAdd.hours +
      Math.floor((currentMinutes + timeToAdd.minutes) / 60)) %
    24;

  displayEndTime.innerHTML = `${endHour}:${endMinute}:${endSecond}`;
}

// let seconds = 18;
// countDown(seconds);

// calculate the time from now + the given seconds

// fetch the number of MINUTES from the form and start a countdown (just type them, no need to press enter to start the new timer)

// add event listener to buttons. when a butto is clicked, fetch its data-time attribute value
timerBtn.forEach((button) =>
  button.addEventListener("click", (e) => {
    console.log(e.target.dataset.time);
    let targetSeconds = Number(e.target.dataset.time);
    countDown(targetSeconds);
  })
);

inputMinutes.addEventListener("input", () => {
  let targetMinutes = Number(inputMinutes.value);
  console.log(targetMinutes);
  if (Number.isNaN(targetMinutes)) {
    alert("insert a valid number");
    return;
  }
  countDown(targetMinutes * 60);
});
