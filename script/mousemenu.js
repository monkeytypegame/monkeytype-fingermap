import * as Tools from './tools.js';

let menu = document.querySelector('.mousemenu');

let currentFinger = "Left index";
let multi = false;


document.addEventListener("mousemove", e => {
  let left = e.pageX;
  let top = e.pageY;
  menu.style.left = left + 25 + 'px';
  menu.style.top = top + + 25 + 'px';
})


export function updateFinger(){
  if(Tools.current === "lp"){
    currentFinger = "Left Pinky";
  }else if(Tools.current === "lr"){
    currentFinger = "Left Ring";
  }else if(Tools.current === "lm"){
    currentFinger = "Left Middle";
  }else if(Tools.current === "li"){
    currentFinger = "Left Index";
  }else if(Tools.current === "lt"){
    currentFinger = "Left Thumb";
  }else if(Tools.current === "rt"){
    currentFinger = "Right Thumb";
  }else if(Tools.current === "ri"){
    currentFinger = "Right Index";
  }else if(Tools.current === "rm"){
    currentFinger = "Right Middle";
  }else if(Tools.current === "rr"){
    currentFinger = "Right Ring";
  }else if(Tools.current === "rp"){
    currentFinger = "Right Pinky";
  }
  updateText();
}

export function updateMultiple(tf){
  multi = tf;
  updateText();
}

function updateText(){
  menu.innerHTML = `<div class="top"><box class="${Tools.current}"></box>${currentFinger}</div><div>${multi ? "Multi mode" : ""}</div>`;
}