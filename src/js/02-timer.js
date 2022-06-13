import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputText: document.querySelector('input[type="text"]'),
  buttonStart: document.querySelector('button[data-start]'),
  valueDays: document.querySelector('span[data-days]'),
  valueHours: document.querySelector('span[data-hours]'),
  valueMinutes: document.querySelector('span[data-minutes]'),
  valueSeconds: document.querySelector('span[data-seconds]'),
};

refs.buttonStart.addEventListener('click', onClickButtonStart);
refs.buttonStart.setAttribute('disabled', 'true');

let selectedDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates;
    console.log(selectedDates[0]);

    if (Date.parse(selectedDates) <= Date.now()) {
      Notify.info('Please choose a date in the future');
    } else {
      refs.buttonStart.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.inputText, options);

function onClickButtonStart() {
  refs.inputText.setAttribute('disabled', 'true');
  refs.buttonStart.setAttribute('disabled', 'true');

  timerId = setInterval(() => {
    const currentTime = new Date().getTime();
    const time = Date.parse(selectedDate) - currentTime;

    if (time > 0) {
      convertMs(time);
    } else {
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  refs.valueDays.innerHTML = days;
  refs.valueHours.innerHTML = hours;
  refs.valueMinutes.innerHTML = minutes;
  refs.valueSeconds.innerHTML = seconds;

  return { days, hours, minutes, seconds };
}
