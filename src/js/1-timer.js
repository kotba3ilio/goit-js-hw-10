import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const timer = {
  intervalId: null,
  selectedDate: new Date(),
  refs: {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
    button: document.querySelector('button'),
    input: document.querySelector('input'),
  },

  start() {
    this.intervalId = setInterval(() => {
      let interval = this.selectedDate - Date.now();
      if (interval <= 0) {
        this.stop();
        return;
      }
      const time = this.convertMs(interval);
      this.setTime(time);
    }, 1000);
    this.refs.button.classList.add('disable');
    this.refs.input.classList.add('disable');
  },
  stop() {
    clearInterval(this.intervalId);
    this.refs.button.classList.remove('disable');
    this.refs.input.classList.remove('disable');
  },
  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },
  setDate(date) {
    this.selectedDate = date;
    let interval = this.selectedDate - Date.now();
    if (interval <= 0) {
      iziToast.show({
        color: '#ffafb4',
        message: 'Please choose a date in the future',
      });
      this.refs.button.classList.add('disable');
      return;
    }
    this.refs.button.classList.remove('disable');
    const time = this.convertMs(interval);
    this.setTime(time);
  },
  setTime(time) {
    this.refs.days.textContent = this.pad(time.days);
    this.refs.hours.textContent = this.pad(time.hours);
    this.refs.minutes.textContent = this.pad(time.minutes);
    this.refs.seconds.textContent = this.pad(time.seconds);
  },
  pad(value) {
    return String(value).padStart(2, '0');
  },
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timer.setDate(selectedDates[0]);
  },
});

document.querySelector('button').addEventListener('click', () => {
  timer.start();
});
