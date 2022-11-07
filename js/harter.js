function dragonSequence(n) {
    var seq = [1];
    for (let i = 0, a = 0; i < n; i++, a = a ? 0 : 1) {
      seq = seq.concat(a, seq.reverse().map(s => s ? 0 : 1).reverse());
    }
    return seq;
  }

  const radioSection = document.querySelector('.radio_section');
  let inputs = document.querySelectorAll('.rbt');
  radioSection.addEventListener('click' , (e) => {
    if (e.target.classList.contains('rbt')) {
      inputs.forEach((el) => {
        if (el.checked) {
          setup(el.value);
          generate(document.querySelector(".color-sch").value);
        }
      });
      
    }
  });

  function setup(el) {
    let myCanvas = createCanvas(850, 590);
    myCanvas.parent("harterfrac");
    noLoop();
    doLoop=false;
    background(255,255,102);
    colorMode(el);
    console.log(el);
    console.log(colorMode()._colorMode);
  }
  
  function generate(el){
    iterations = select("#iterNumber").value();
    dragon = dragonSequence(iterations);
    l = dragon.length;
    x = width / 2;
    y = width / 2;
    d = 0; 
    s = 1/select("#scaleNumber").value();
    index = 1;
    doLoop=true;
    loop();
    background(0,100,el);
    console.log(el);

  }
  
  function draw() {   

    if(!doLoop) return;
    
    for (let k = 0; k < constrain(l/60,0,1000); k++) {
      d += dragon[index] * 2 - 1;
      var nx = x + cos(TAU / 4 * d) * s;
      var ny = y + sin(TAU / 4 * d) * s;
  
      stroke(360/l*index,127,127);
      line(x, y, nx, ny);
      x = nx;
      y = ny;
  
      index++;
      if (index > dragon.length) noLoop();
    }
  }