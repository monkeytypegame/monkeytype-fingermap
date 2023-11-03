import * as ClickTracker from './click.js';
import * as Tools from './tools.js';
import * as Shift from './shift.js';
import * as Fingers from './fingers.js';

const BUTTON_LEFT_MOUSE = 0;
const BUTTON_RIGHT_MOUSE = 2;
const SHIFT_SUPPRESS_MILLIS = 250;

export default class Key{
  constructor(element ){
    this.element = element;
    this.fingers = [];
    this.shiftKeydownTimeout = null;
    this.shiftKeyupSuppressed = true;

    this.element.addEventListener("mouseover", (e) => {
      if (ClickTracker.leftdrag){
        Shift.left || Shift.right
          ? this.setFinger(Tools.current)
          : this.addFinger(Tools.current);
      }
      if (ClickTracker.rightdrag){
        Shift.left || Shift.right
          ? this.clearFingers()
          : this.removeFinger(Tools.current);
      }
      this.refreshColor();
    });
    this.element.addEventListener("mousedown", (e) => {
      switch(e.button) {
        case BUTTON_LEFT_MOUSE:
          Shift.left || Shift.right
            ? this.setFinger(Tools.current)
            : this.addFinger(Tools.current);
          break;
        case BUTTON_RIGHT_MOUSE:
          Shift.left || Shift.right
            ? this.clearFingers()
            : this.removeFinger(Tools.current);
          break;
      }
      this.refreshColor();
    });
    document.addEventListener("keydown", (e) => {
      if (e.code === this.element.attributes?.code?.value) {
        if (e.key === "Shift") {
            this.shiftKeyupSuppressed = false;
            this.shiftKeydownTimeout = setTimeout(() => {
              this.shiftKeyupSuppressed = true;
            }, SHIFT_SUPPRESS_MILLIS)
        }
        else {
          Shift.left || Shift.right
              ? this.setFinger(Tools.current)
              : this.addFinger(Tools.current);
          this.refreshColor();
        }
      }
      // Stop spacebar from scrolling page
      if(e.key === " " && e.target == document.body) {
        e.preventDefault();
      }
    })
    document.addEventListener("keyup", (e) => {
      if (e.code === this.element.attributes?.code?.value) {
        if (e.key === "Shift") {
          if (!this.shiftKeyupSuppressed) {
            (Shift.left && e.code === "ShiftRight") || (Shift.right && e.code === "ShiftLeft")
                ? this.setFinger(Tools.current)
                : this.addFinger(Tools.current);
            this.refreshColor();
          }
          clearTimeout(this.shiftKeydownTimeout);
          this.shiftKeydownTimeout = null;
          this.shiftKeyupSuppressed = true;
        }
      }
    })
  }
  hasFinger(finger) {
    return this.fingers.indexOf(finger) > -1;
  }

  addFinger(finger) {
    this.fingers.push(finger)
  }

  removeFinger(finger) {
    this.fingers = this.fingers.filter(f => f !== finger);
  }

  setFinger(finger) {
    this.fingers = [finger];
  }

  clearFingers() {
    this.fingers = []
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
