refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.buttonStart.addEventListener('click', onClickButtonStart);
refs.buttonStop.addEventListener('click', onClickButtonStop);

let timerId = null;
let isActive = false;

function onClickButtonStart() {
  if (isActive) {
    return;
  }

  isActive = true;

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickButtonStop() {
  clearInterval(timerId);
  isActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
