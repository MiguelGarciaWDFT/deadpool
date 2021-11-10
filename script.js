let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

let img = new Image();
img.src = '/images/deadpool.png';

let animate = 0
let frames = 0
let interval
const cycleLoop = [0, 1, 0, 2, 0, 3, 0, 4]

const background = new Image()
background.src = "/imagenes deadpool/gameback.png";

/*function fondo() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(fondo);
}
fondo();*/

function update() {
    frames++

    if (frames % 12 === 0) {
        animate++
        if (animate === 4) animate = 0
    }
    //ctx.drawImage(img, cycleLoop[animate] * 100, 0, 32, 48, 200, 200, 100, 100)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
        img, //imagen
        cycleLoop[animate] * 100, // posición en x, de la imagen
        // iteramos entre los estados de la imagen: 0, 16, 32
        0, // posición en y, de la imagen
        // iteramos entre los estados de la imagen: 0, 16, 32
        32, // ancho de la fuente (imagen)
        48, //alto de la fuente (imagen)
        200, // el punto x de destino en el canvas
        200, // el punto y de destino en el canvas
        100, // ancho de la imagen en canvas
        100 // alto de la imagen en canvas
    );
}


function init() {
    interval = setInterval(update, 1500 / 60)
}

//init()