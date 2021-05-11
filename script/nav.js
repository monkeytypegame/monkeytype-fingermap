import * as Keyboard from './keyboard.js';
import * as Notifications from './notifications.js';
import * as LocalStorage from './localstorage.js';

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
  history.replaceState('','','/');
  navigator.clipboard.writeText(window.location.href+"?code=" + Keyboard.encode()).then(() => {
    Notifications.add('Link copied',1);
  }, (e) => {
    Notifications.add('Something went wrong: ' + e,-1);
  });
})

document.querySelector(".nav .buttons .save").addEventListener('click', e => {
  LocalStorage.save(Keyboard.encode());
  Notifications.add('Saved',1);
})

document.querySelector(".nav .buttons .screenshot").addEventListener('click', e => {
  
$(".screenshotBottom").removeClass("hidden");
$('body').css('opacity',1);
let src = $(".keyboardContainer");
var sourceX = src.position().left; /*X position from div#target*/
var sourceY = src.position().top; /*Y position from div#target*/
var sourceWidth = src.width(); /*clientWidth/offsetWidth from div#target*/
var sourceHeight = src.height(); /*clientHeight/offsetHeight from div#target*/
try {
  html2canvas(document.body, {
    backgroundColor: "#111",
    height: sourceHeight + 50,
    width: sourceWidth + 50,
    x: sourceX - 25,
    y: sourceY - 25,
  }).then(function (canvas) {
    // html2canvas(src[0], {
    //   backgroundColor: "#111",
    // }).then(function (canvas) {
    // document.body.appendChild(canvas);
    canvas.toBlob(function (blob) {
      try {
        if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
          open(URL.createObjectURL(blob));
          $(".screenshotBottom").addClass("hidden");
        } else {
          navigator.clipboard
            .write([
              new ClipboardItem(
                Object.defineProperty({}, blob.type, {
                  value: blob,
                  enumerable: true,
                })
              ),
            ])
            .then(() => {
              $(".screenshotBottom").addClass("hidden");
            });
        }
      } catch (e) {
        $(".screenshotBottom").addClass("hidden");
        Notifications.add(
          "Error saving image to clipboard: " + e.message,
          -1
        );
      }
    })
  })
  }catch(e){
    $(".screenshotBottom").addClass("hidden");
    Notifications.add(
      "Error saving image to clipboard: " + e.message,
      -1
    );
  }
})
