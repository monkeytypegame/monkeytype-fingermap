import * as Mousemenu from './mousemenu.js';
import * as Fingers from './fingers.js';

export let current = Fingers.list.li.code;

function updateFingerButtons(){
  let buttons = document.querySelectorAll('.fingerbuttons .button');
  buttons.forEach(button => {
    button.classList.remove('active');
  })
  document.querySelector(`.fingerbuttons .button[finger='${current}']`).classList.add('active');
}

document.addEventListener('keypress', (e) => {
  if(e.key === "1"){
    current = Fingers.list.lp.code;
  }
  if(e.key === "2"){
    current = Fingers.list.lr.code;
  }
  if(e.key === "3"){
    current = Fingers.list.lm.code;
  }
  if(e.key === "4"){
    current = Fingers.list.li.code;
  }
  if(e.key === "5"){
    current = Fingers.list.lt.code;
  }
  if(e.key === "6"){
    current = Fingers.list.rt.code;
  }
  if(e.key === "7"){
    current = Fingers.list.ri.code;
  }
  if(e.key === "8"){
    current = Fingers.list.rm.code;
  }
  if(e.key === "9"){
    current = Fingers.list.rr.code;
  }
  if(e.key === "0"){
    current = Fingers.list.rp.code;
  }
  Mousemenu.updateFinger();
  updateFingerButtons();

})

let buttons = document.querySelectorAll('.fingerbuttons .button');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    current = e.currentTarget.getAttribute("finger");
    Mousemenu.updateFinger();
    updateFingerButtons();
  })
})

