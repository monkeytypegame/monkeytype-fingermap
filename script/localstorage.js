export function load(){
  return window.localStorage.getItem("code");
}

export function save(code){
  window.localStorage.setItem("code", code);
}