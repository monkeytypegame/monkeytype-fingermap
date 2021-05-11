import * as ClickTracker from './click.js';
import * as Tools from './tools.js';
import * as Shift from './shift.js';


export default class Key{
  constructor(element){
    this.element = element;
    this.fingers = [];


    this.element.addEventListener("mouseover", (e) => {
      if (ClickTracker.leftdrag){
        if(!Shift.left){
          this.fingers = [Tools.current];
        }else{
          if(!this.fingers.includes(Tools.current)){
            this.fingers.push(Tools.current);
          }
        }
        this.refreshColor();
      }
  
      if (ClickTracker.rightdrag){
        if(!Shift.left){
          this.fingers = [];
        }else{
          if(this.fingers.includes(Tools.current)){
            this.fingers = this.fingers.filter(f => f !== Tools.current);
          }
        }
        this.refreshColor();
      }

    });
    this.element.addEventListener("mousedown", (e) => {
      if(e.button === 0){
        if(!Shift.left){
          this.fingers = [Tools.current];
        }else{
          if(!this.fingers.includes(Tools.current)){
            this.fingers.push(Tools.current);
          }
          this.refreshColor();
        }
      }
      if(e.button === 2){
        if(!Shift.left){
          this.fingers = [];
        }else{
          if(this.fingers.includes(Tools.current)){
            this.fingers = this.fingers.filter(f => f !== Tools.current);
          }
        }
      }
      this.refreshColor();
    });
  }

  refreshColor(){
    this.element.style.background = null;
    let found = [];
    Tools.list.forEach((color,i) => {
      if(this.fingers.includes(color)){
        found.push(Tools.colors[i]);
      }
    })

    let bg = "-webkit-linear-gradient(left";

    let lastPercent = 0;
    found.forEach((color, i) => {
      bg += `,${color} ${lastPercent}%`;
      lastPercent = Math.floor(100*((i+1)/found.length));
      bg += `,${color} ${lastPercent}%`;
    })

    bg += ")";

    this.element.style.background = bg;

  }
}


function applyColor(e){
  e.currentTarget.classList.remove("red");
  e.currentTarget.classList.remove("green");
  e.currentTarget.classList.remove("blue");

  if(Tools.current === "red"){
    if (e.button === 0){
      e.currentTarget.classList.add("red");
    }else if (e.button === 2){
      e.currentTarget.classList.remove("red");
    }
  }
  if(Tools.current === "green"){
    if (e.button === 0){
      e.currentTarget.classList.add("green");
    }else if (e.button === 2){
      e.currentTarget.classList.remove("green");
    }
  }
  if(Tools.current === "blue"){
    if (e.button === 0){
      e.currentTarget.classList.add("blue");
    }else if (e.button === 2){
      e.currentTarget.classList.remove("blue");
    }
  }
}

function clearColor(e){

  if(Tools.current === "red"){
    if (e.button === 2){
      e.currentTarget.classList.remove("red");
    }
  }
  if(Tools.current === "green"){
    if (e.button === 2){
      e.currentTarget.classList.remove("green");
    }
  }
  if(Tools.current === "blue"){
    if (e.button === 2){
      e.currentTarget.classList.remove("blue");
    }
  }
}