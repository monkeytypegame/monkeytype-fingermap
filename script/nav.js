import * as Keyboard from './keyboard.js';
import * as Notifications from './notifications.js';

document.querySelector(".nav .buttons .toggleLayout").addEventListener('click', e => {
  if(Keyboard.data.layout === "staggered"){
    Keyboard.init('matrix');
  }else{
    Keyboard.init('staggered');
  }
})

document.querySelector(".nav .buttons .clear").addEventListener('click', e => {
  Keyboard.init(Keyboard.data.layout);
  history.replaceState('','','/');
})

document.querySelector(".nav .buttons .share").addEventListener('click', e => {
    navigator.clipboard.writeText(window.location.href+"?code=" + Keyboard.encode()).then(() => {
      Notifications.add('Link copied',1);
    }, (e) => {
      Notifications.add('Something went wrong: ' + e,-1);
    });
})