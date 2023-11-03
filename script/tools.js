import * as Fingers from './fingers.js';
import * as Util from './util.js';

export let current = Fingers.list.li.code;

export function goNextFinger() {
  current = Fingers.nextFinger(current).code;
  updateFingerButtons();
}

export function goPrevFinger() {
  current = Fingers.prevFinger(current).code;
  updateFingerButtons();
}

const WHEEL_THROTTLE_MILLIS = 150;
export function getThrottledWheelHandler() {
  return Util.throttle((e) => {
    e.deltaY > 0 || e.deltaX > 0
        ? goNextFinger()
        : goPrevFinger();
  }, WHEEL_THROTTLE_MILLIS);
}

function updateFingerButtons(){
  let buttons = document.querySelectorAll('.fingerbuttons .button');
  buttons.forEach(button => {
    button.classList.remove('active');
  })
  document.querySelector(`.fingerbuttons .button[finger='${current}']`).classList.add('active');
}

document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") {
    goNextFinger()
  }
  if (e.key === "ArrowLeft") {
    goPrevFinger()
  }
})

let buttons = document.querySelectorAll('.fingerbuttons .button');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    current = e.currentTarget.getAttribute("finger");
    // Mousemenu.updateFinger();
    updateFingerButtons();
  })
})
