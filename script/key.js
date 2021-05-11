import * as ClickTracker from './click.js';
import * as Tools from './tools.js';
import * as Shift from './shift.js';
import * as Fingers from './fingers.js';

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
    Fingers.getFingerCodes().forEach((fingerKey) => {
      let finger = Fingers.list[fingerKey];
      if(this.fingers.includes(finger.code)){
        found.push(finger.color);
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

    
    // history.replaceState('','','/?code='+Keyboard.encode());

  }
}
