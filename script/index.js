import "./mousemenu.js";
import * as Keyboard from './keyboard.js';
import "./nav.js";

window.test = function test(){
  console.log(Keyboard.encode());
}

let serachParams = new URLSearchParams(window.location.search);

if(serachParams.has('code')){
  Keyboard.decode(serachParams.get('code'));
}else{
  Keyboard.init("staggered");
}