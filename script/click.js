export let leftdrag = false;
export let rightdrag = false;

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
})
document.addEventListener("mousedown", (e) => {
  if(e.button === 0){
    leftdrag = true;
  }else if(e.button === 2){
    rightdrag = true;
  }
});
document.addEventListener("mouseup", (e) => {
  if(e.button === 0){
    leftdrag = false;
  }else if(e.button === 2){
    rightdrag = false;
  }
});
