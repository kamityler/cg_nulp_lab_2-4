let k;

function setup(el,val) {
  let myCanvas = createCanvas(850, 590);
  myCanvas.parent("kochfrac");
  frameRate(1);  
  k = new KochFractal();
  stroke(0,70,val);
  colorMode(el);
}

function draw() {
  background(60,100,70);
  k.render();
  k.nextLevel();
  if (k.getCount() > 5) {
    k.restart();
  }

}

const radioSection = document.querySelector('.radio_section');
let inputs = document.querySelectorAll('.rbt');
radioSection.addEventListener('click' , (e) => {
  if (e.target.classList.contains('rbt')) {
    inputs.forEach((el) => {
      if (el.checked) {
        setup(el.value, document.querySelector(".color-sch").value);  
      }
    });
    
  }
});

class KochLine {
  constructor(a,b) {
    this.start = a.copy();
    this.end = b.copy();
  }

  display(el) { 
    // stroke(180,100,40);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  kochA() {
    return this.start.copy();
  }

  kochB() {
    let v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    v.add(this.start);
    return v;
  }

  kochC() {
    let a = this.start.copy();
    let v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    a.add(v);
    v.rotate(-PI/3);
    a.add(v);
    return a;
  }


  kochD() {
    let v = p5.Vector.sub(this.end, this.start);
    v.mult(2/3.0);
    v.add(this.start);
    return v;
  }

  kochE() {
    return this.end.copy();
  }
}


class KochFractal {
  constructor() {
    this.start = createVector(0,height-20);   
    this.end = createVector(width,height-20); 
    this.lines = [];                         
    this.count = 0;
    this.restart();
  }

  nextLevel() {

    this.lines = this.iterate(this.lines);
    this.count++;
  }

  restart() {
    this.count = 0;      
    this.lines = [];  
    this.lines.push(new KochLine(this.start,this.end));  
  }

  getCount() {
    return this.count;
  }

  render() {
    for(let i = 0; i < this.lines.length; i++) {
      this.lines[i].display();
    }
  }

  iterate(before) {
    let now = [];    
    for(let i = 0; i < this.lines.length; i++) {
      let l = this.lines[i];
      let a = l.kochA();
      let b = l.kochB();
      let c = l.kochC();
      let d = l.kochD();
      let e = l.kochE();

      now.push(new KochLine(a,b));
      now.push(new KochLine(b,c));
      now.push(new KochLine(c,d));
      now.push(new KochLine(d,e));
    }
    return now;
  }
}