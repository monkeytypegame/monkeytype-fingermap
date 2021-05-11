import * as Mousemenu from './mousemenu.js';

export let left = false;


document.addEventListener('keydown', e => {
  if (e.key === "Shift"){
    left = true;
    Mousemenu.updateMultiple(true);
  }
})

document.addEventListener('keyup', e => {
  if (e.key === "Shift"){
    left = false;
    Mousemenu.updateMultiple(false);
  }
})