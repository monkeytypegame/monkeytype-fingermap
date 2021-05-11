import * as Mousemenu from './mousemenu.js';


export let list = [
  "lp",
  "lr",
  "lm",
  "li",
  "lt",

  "rt",
  "ri",
  "rm",
  "rr",
  "rp",



];

export let colors = [

  "#ffcdd2",
  "#f87680",
  "#e92832",
  "#9a191c",
  "#531313",



  "#09243d",
  "#125490",
  "#1786e7",
  "#67b3f3",
  "#BBDEFB"
];




export let current = "li";
document.addEventListener('keypress', (e) => {
  if(e.key === "1"){
    current = list[0];
    Mousemenu.updateFinger();
  }
  if(e.key === "2"){
    current = list[1];
    Mousemenu.updateFinger();
  }
  if(e.key === "3"){
    current = list[2];
    Mousemenu.updateFinger();
  }
  if(e.key === "4"){
    current = list[3];
    Mousemenu.updateFinger();
  }
  if(e.key === "5"){
    current = list[4];
    Mousemenu.updateFinger();
  }
  if(e.key === "6"){
    current = list[5];
    Mousemenu.updateFinger();
  }
  if(e.key === "7"){
    current = list[6];
    Mousemenu.updateFinger();
  }
  if(e.key === "8"){
    current = list[7];
    Mousemenu.updateFinger();
  }
  if(e.key === "9"){
    current = list[8];
    Mousemenu.updateFinger();
  }
  if(e.key === "0"){
    current = list[9];
    Mousemenu.updateFinger();
  }

})

let buttons = document.querySelectorAll('.fingerbuttons .button');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    current = e.currentTarget.getAttribute("finger");
    Mousemenu.updateFinger();

  })
})