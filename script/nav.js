import * as Keyboard from './keyboard.js';

document.querySelector(".nav .buttons .toggleLayout").addEventListener('click', e => {
  if(Keyboard.data.layout === "staggered"){
    Keyboard.init('matrix');
  }else{
    Keyboard.init('staggered');
  }
})

document.querySelector(".nav .buttons .clear").addEventListener('click', e => {
  Keyboard.init(Keyboard.data.layout);
})