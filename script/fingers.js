 export let list = {
  lp: {
    code: "lp",
    side: "left",
    finger: "pinky",
    name: "Left Pinky"
  },
  lr: {
    code: "lr",
    side: "left",
    finger: "ring",
    name: "Left Ring"
  },
  lm: {
    code: "lm",
    side: "left",
    finger: "middle",
    name: "Left Middle"
  },
  li: {
    code: "li",
    side: "left",
    finger: "index",
    name: "Left Index"
  },
  lt: {
    code: "lt",
    side: "left",
    finger: "thumb",
    name: "Left Thumb"
  },
  rt: {
    code: "rt",
    side: "right",
    finger: "thumb",
    name: "Right Thumb"
  },
  ri: {
    code: "ri",
    side: "right",
    finger: "index",
    name: "Right Index"
  },
  rm: {
    code: "rm",
    side: "right",
    finger: "middle",
    name: "Right Middle"
  },
  rr: {
    code: "rr",
    side: "right",
    finger: "ring",
    name: "Right Ring"
  },
  rp: {
    code: "rp",
    side: "right",
    finger: "pinky",
    name: "Right Pinky"
  }
}

export function getFingerCodes(){
  return Object.keys(list);
}

function initColors(){
  getFingerCodes().forEach(fCode => {
    list[fCode].color = getComputedStyle(document.documentElement).getPropertyValue('--'+fCode).trim();
  })
}

initColors();