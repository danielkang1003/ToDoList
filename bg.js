const body = document.querySelector("body");

const IMG_NUMBER = 8;

function paintImage(randomNumber){
  const image = new Image();
  image.src = `./images/${randomNumber + 1}.jpg`;
  body.appendChild(image);
  image.classList.add("bgImage");
}

function genRandom(){
  //randomNum btw 0 ~ 3
  const number =  Math.floor(Math.random() * IMG_NUMBER);

  return number;
}

function init(){
  //generate number;
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
