import Keyboard from './keyboard.js';
import Key from './key.js';
import "./mousemenu.js";
import * as Fingers from "./fingers.js";

function buildKeyboard() {
  let html = "";
  Keyboard.forEach((row) => {
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
}

buildKeyboard();

document.querySelectorAll("key").forEach((key) => {
  new Key(key);
});
