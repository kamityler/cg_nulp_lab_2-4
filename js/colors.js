const img = document.querySelector('img');
const color = document.querySelector('.bakk');
const colorChooser = document.querySelector('.form-control');
color.style.background = colorChooser.value;
let str = RGBToHSL(color.style.background);
const range = document.querySelector(".my_range");
const rgbText = document.querySelectorAll(".scale_label");
range.addEventListener("click", () => {
    str = editLightness(str, range.value);
    color.style.background = str;
    console.log(str);
    colorChooser.value = RGBToHSL(color.style.background);
    rgbText[1].textContent = `${cutStr(color.style.background)}`;
    rgbText[3].textContent = `${cutStr(RGBToHSL(color.style.background))}`;
});


function changeColorInput() {
    color.style.background = colorChooser.value;
    rgbText[1].textContent = `${cutStr(color.style.background)}`;
    rgbText[3].textContent = `${cutStr(RGBToHSL(color.style.background))}`;
    str = RGBToHSL(color.style.background);
}

function cutStr(str) {
    return str.split("(")[1].split(")")[0];
}

function RGBToHSL(strs) {
    let reg = strs.toString().match(/\d+/g);
    let r = reg[0] / 255;
    let g = reg[1] / 255;
    let b = reg[2] / 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    if (delta == 0) {
        h = 0;
    } else if (cmax == r) {
        h = ((g - b) / delta) % 6;
    } else if (cmax == g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    // Make negative hues positive behind 360°
    if (h < 0) {
        h += 360;
    }
    // Calculate lightness
    l = (cmax + cmin) / 2;
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    console.log("hsl(" + h + "," + s + "%," + l + "%)");
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

function editLightness(strs, value) {
    const reg = strs.toString().match(/\d.+\d|\d+/g)[0].split(',');
    return `hsl(${+reg[0]}, ${reg[1]}, ${value}%)`;
}