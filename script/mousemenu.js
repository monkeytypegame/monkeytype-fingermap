// import * as Tools from './tools.js';
// import * as Fingers from './fingers.js';

// let menu = document.querySelector('.mousemenu');

// let currentFinger = "Left index";
// let multi = false;


// document.addEventListener("mousemove", e => {
//   let left = e.pageX;
//   let top = e.pageY;
//   menu.style.left = left + 25 + 'px';
//   menu.style.top = top + + 25 + 'px';
// })

// function updateText(){
//   menu.innerHTML = `<div>${multi ? "Multi mode" : ""}</div>`;
//   menu.innerHTML = `<div class="top"><box class="${Tools.current}"></box>${currentFinger}</div><div>${multi ? "Multi mode" : ""}</div>`;

// }

// export function updateFinger(){
//   currentFinger = Fingers.list[Tools.current].name;
//   updateText();
// }

// export function updateMultiple(tf){
//   multi = tf;
//   updateText();
// }

