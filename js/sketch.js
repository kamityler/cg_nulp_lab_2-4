let coordinats = [];
let canvas;

function setup() {
  createCanvas(650, 650);
  canvas = document.querySelector("#defaultCanvas0");
  canvas.style.backgroundImage = "url('/img/index.png')";
  const wrapper = document.querySelector(".canvas_wrapper");
  canvas.addEventListener('click', getAdress);
  const button = document.querySelector('.btn-primary');
  setValues();
  console.log(button);
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
  });
  button.addEventListener('click', (e) => {
    setValues();
  });
  wrapper.appendChild(canvas);
}

function draw() {
  let [xWindow1, yWindow1] = convertToCoordinateSystem(coordinats[0], coordinats[1]);
  let [xWindow2, yWindow2] = convertToCoordinateSystem(coordinats[2], coordinats[3]);
  let [xWindow3, yWindow3] = convertToCoordinateSystem(coordinats[4], coordinats[5]);
  triangle(xWindow1, yWindow1, xWindow2, yWindow2, xWindow3, yWindow3);
}


const setValues = () => {
  const values = document.querySelectorAll('.form-control');
  coordinats = [];
  const checkBoxes = document.querySelectorAll('.form-check-input');
  values.forEach((el, index) => {
    coordinats.push(el.value);
  });
  let matrA = [
    [+coordinats[0], +coordinats[1]],
    [+coordinats[2], +coordinats[3]],
    [+coordinats[4], +coordinats[5]]
  ];

  if (checkBoxes[0].checked) {
    matrA[0][0] = matrA[0][0] * 1.5 >= 5 ? 5 : matrA[0][0] * 1.5 < -5 ? -5 : matrA[0][0] * 1.5;
    matrA[0][1] = matrA[0][1] * 1.5 >= 5 ? 5 : matrA[0][1] * 1.5 < -5 ? -5 : matrA[0][1] * 1.5;
    matrA[1][0] = matrA[1][0] * 1.5 >= 5 ? 5 : matrA[1][0] * 1.5 < -5 ? -5 : matrA[1][0] * 1.5;
    matrA[1][1] = matrA[1][1] * 1.5 >= 5 ? 5 : matrA[1][1] * 1.5 < -5 ? -5 : matrA[1][1] * 1.5;
    matrA[2][0] = matrA[2][0] * 1.5 >= 5 ? 5 : matrA[2][0] * 1.5 < -5 ? -5 : matrA[2][0] * 1.5;
    matrA[2][1] = matrA[2][1] * 1.5 >= 5 ? 5 : matrA[2][1] * 1.5 < -5 ? -5 : matrA[2][1] * 1.5;
  }

  if (checkBoxes[1].checked) {
    matrA[0][0] *= -1;
    matrA[1][0] *= -1;
    matrA[2][0] *= -1;
    matrA[0][1] *= -1;
    matrA[1][1] *= -1;
    matrA[2][1] *= -1;
  }

  coordinats[0] = matrA[0][0];
  coordinats[1] = matrA[0][1];
  coordinats[2] = matrA[1][0];
  coordinats[3] = matrA[1][1];
  coordinats[4] = matrA[2][0];
  coordinats[5] = matrA[2][1];
  console.log(coordinats);
  context = canvas.getContext('2d'); //
  context.clearRect(0, 0, canvas.width, canvas.height);;
  draw();

};


function getAdress() {
  console.log(`x: ${mouseX} y: ${mouseY}`)
}

function convertToCoordinateSystem(x, y) {
  let cordX, cordY;
  if (x == 0) {
    cordX = 321;
  }
  if (y == 0) {
    cordY = 326;
  }
  if (x > 0) {
    cordX = 321 + (x * 53);
  }
  if (y > 0) {
    cordY = 326 - (y * 53);
  }
  if (x < 0) {
    cordX = 321 + (x * 53);
  }
  if (y < 0) {
    cordY = 326 - (y * 53);
  }

  return [cordX, cordY];
}