import * as Layouts from './layouts.js';
import * as Tools from './tools.js';
import Key from './key.js';

export let data = {
  layout: 'staggered',
  keys: [],
  wheelListener: null
};

export function init(layout) {
  cleanup();

  data = {
    layout: layout,
    keys: []
  }

  renderHtml(document.querySelector("keyboard"), layout);
  populateKeyData(document.querySelectorAll("key"));

  document.querySelector("keyboard").addEventListener("contextmenu", (e) => {
    e.preventDefault();
  })
  data.wheelListener = data.wheelListener || ((e) => {
    e.preventDefault();
    Tools.getThrottledWheelHandler()(e);
  });
  document.querySelector("keyboard").addEventListener("wheel", data.wheelListener);

  const scaleRefEl = document.querySelector(".ratioScalingSpacer");
  const scaleTargetEl = document.querySelector(".keyboardFingersWrapper");
  const MAX_SCALE = 1;
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      let scale = Math.min(
          entry.contentRect.width / scaleTargetEl.offsetWidth,
          entry.contentRect.height / scaleTargetEl.offsetHeight
      );
      scale = Math.min(scale, MAX_SCALE);
      scaleTargetEl.style.transformOrigin = "center top";
      scaleTargetEl.style.transform = `translate(-50%, 0) scale(${scale})`;
      scaleTargetEl.style.top = "0px";
      scaleTargetEl.style.left = (.5 * entry.contentRect.width) + "px";
    }
  });
  resizeObserver.observe(scaleRefEl);
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

function cleanup() {
  if (data.wheelListener)
    document.querySelector("keyboard").removeEventListener("wheel", data.wheelListener);
}

function renderHtml(keyboardEl, layout) {
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
      if (key.code) {
        attr += `code=${key.code} `
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
  keyboardEl.innerHTML = html;
}

function populateKeyData(keyEls) {
  keyEls.forEach((key) => {
    data.keys.push(new Key(key));
  });
}
