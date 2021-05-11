import "./mousemenu.js";
import * as Keyboard from './keyboard.js';
import "./nav.js";
import * as LocalStorage from './localstorage.js';

window.test = function test(){
  console.log(Keyboard.encode());
}

let serachParams = new URLSearchParams(window.location.search);

if(serachParams.has('code')){
  Keyboard.decode(serachParams.get('code'));
}else{
  let local = LocalStorage.load();
  if(local !== ""){
    Keyboard.decode(local);
  }else{
    Keyboard.init("staggered");
  }
}
setTimeout(()=> {
  $(".content")
  .css("opacity", "0")
  .removeClass("hidden")
  .stop(true, true)
  .animate({ opacity: 1 }, 250, () => {
  });
},250)
