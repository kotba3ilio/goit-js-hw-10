import iziToast from 'izitoast';

const snackbar = {
  delay: null,
  state: null,
  showNotification() {
    console.log('Delay: ', this.delay);
    console.log('State: ', this.state);
    this.createNotification(this.state, this.delay)
      .then(message => {
        iziToast.show({
          color: '#98c379',
          message: message,
        });
      })
      .catch(message => {
        iziToast.show({
          color: '#ffafb4',
          message: message,
        });
      });
  },
  setDelay(delay) {
    this.delay = delay;
  },
  setState(state) {
    this.state = state;
  },
  createNotification(state, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state == 'fulfilled') {
          resolve(`Fulfilled promise in ${delay}ms`);
        } else {
          reject(`Rejected promise in ${delay}ms`);
        }
      }, delay);
    });
  },
};

const form = document.querySelector('.form');

form.addEventListener('change', event => {
  console.log(event);
  const { target: element } = event;
  if (element.name == 'state') {
    snackbar.setState(element.value);
  } else {
    snackbar.setDelay(element.value);
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  snackbar.showNotification();
  form.reset();
});
