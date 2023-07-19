import * as Mousemenu from './mousemenu.js';

export let left = false;
export let right = false;

document.addEventListener('keydown', e => {
  if (e.code === "ShiftLeft")
    left = true;
  if (e.code === "ShiftRight")
    right = true;
})

document.addEventListener('keyup', e => {
  if (e.code === "ShiftLeft")
    left = false;
  if (e.code === "ShiftRight")
    right = false;
})
