window.addEventListener('load', start);

var red = document.querySelector('#idRed');
var green = document.querySelector('#idGreen');
var blue = document.querySelector('#idBlue');

function start() {
  red.addEventListener('input', createColor);
  green.addEventListener('input', createColor);
  blue.addEventListener('input', createColor);
}
//prettier-ignore
function createColor() {
  document.getElementById('colorDemonstration').style.backgroundColor = makeRGB();
}

function makeRGB() {
  return 'rgb(' + red.value + ',' + green.value + ',' + blue.value + ')';
}
