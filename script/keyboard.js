import * as Layouts from './layouts.js';
import Key from './key.js';

let data = {
  layout: 'staggered',
  keys: []
};

export function init(layout) {
  data = {
    layout: 'staggered',
    keys: []
  }
  let html = "";
  Layouts[layout].forEach((row) => {
    html += "<row>";
    row.forEach((key) => {
      let attr = "";
      if (key.size) {
        attr += `size='${key.size}' `;
      }
      if (key.key.length === 1) {
        attr += `fontSize='2' `;
      }
      if (key.homing === true) {
        attr += `homing='yes' `;
      }
      html += `<key ${attr}>`;

      if (key.key.length === 2) {
        html += `<div>${key.key[0]}</div>`;
        html += `<div>${key.key[1]}</div>`;
      } else if (key.key.length === 1) {
        html += `<div>${key.key[0]}</div>`;
      }
      html += "</key>";
    });
    html += "</row>";
  });
  document.querySelector("keyboard").innerHTML = html;
  
  document.querySelectorAll("key").forEach((key) => {
    data.keys.push(new Key(key));
  });
}

export function encode(){
  let ret = "";
  ret += data.layout + "0";
  data.keys.forEach(key => {
    if(key.fingers.length === 0){
      ret += "";
    }else{
      ret += key.fingers.join('-');
    }
    ret += "0";
  })
  return ret;
}

export function decode(code){
  try{
    let codeSplit = code.split("0");
    let layout = codeSplit.shift();
    let keys = codeSplit;
    init(layout);
    data.keys.forEach((key,index) => {
      let codeKey = keys[index];
      if(codeKey !== ""){
        let fingers = codeKey.split('-');
        key.fingers = fingers;
        key.refreshColor();
      }
    })
  }catch(e){
    init("staggered");
    history.replaceState('','','/');
  }
}