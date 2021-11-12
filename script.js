//Definir canvas
const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")

//Variables globales
let frames = 0
const friction = 1 //resistencia a moverse
const $button = document.getElementById("btn")
let intervalId //intervalid me va servir para poder parar mi juego en un punto

const fondoImage = new Image()
fondoImage.src = "/FRAMESDEADPOOL/gameback.png"

const playerImage = new Image()
playerImage.src = "/FRAMESDEADPOOL/frame-1.png"

const hulkImage = new Image()
hulkImage.src = "/FRAMESDEADPOOL/hulk.png"

//Definir clases y sus metodos(fondos, personajes, enemigos)

class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.vx = 0;
        this.vy = 0;
    }
    draw() {

        if (this.y >= $canvas.height - this.height) {
            this.y = $canvas.height - this.height; //terminar delimitacion canvas
        }
        if (this.y < 0) this.y = 0;

        if (this.x >= $canvas.width - this.width) {
            this.x = $canvas.width - this.width; //terminar delimitacion canvas
        }
        if (this.x < 0) this.x = 0;

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= friction;
        this.vy *= friction;
        ctx.drawImage(fondoImage, 0, 0, $canvas.width, $canvas.height);
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
        ctx.drawImage(hulkImage, 300, 300, this.width, this.height);
    }

    moveLeft() {
        this.vx--;
    }
    moveRight() {
        this.vx++;
    }
    moveUp() {
        this.vy--;
    }
    moveDown() {
        this.vy++;
    }
    stop() {
        this.vx = 0;
        this.vy = 0;
    }
    isTouching(obj) {
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y
        );
    }
}

const looseImage = new Image()
looseImage.src = "/FRAMESDEADPOOL/death_scythe.png"

class Enemy {
    constructor(x, y, ) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.vx = 3.5; //velocidad en la que se mueve
        this.vy = 3.5; //en ambos ejes
    }
    draw() {
        ctx.drawImage(looseImage, this.x, this.y, this.width, this.height);
    }
}

const winImage = new Image()
winImage.src = "/FRAMESDEADPOOL/vanessa.png"

class Novia {
    constructor(x, y, ) {
        this.x = x;
        this.y = y;
        this.width = 45;
        this.height = 45;
        this.vx = 2.6; //velocidad en la que se mueve
        this.vy = 3; //en ambos ejes
    }
    draw() {
        ctx.drawImage(winImage, this.x, this.y, this.width, this.height);
    }
}
const deathImage = new Image()
deathImage.src = "/FRAMESDEADPOOL/death.png"

class Death {
    constructor(x, y, ) {
        this.x = x;
        this.y = y;
        this.width = 45;
        this.height = 45;
        this.vx = 2.0; //velocidad en la que se mueve
        this.vy = 2.0; //en ambos ejes
    }
    draw() {
        ctx.drawImage(deathImage, this.x, this.y, this.width, this.height);
    }
}

const widowImage = new Image()
widowImage.src = "/FRAMESDEADPOOL/blackwidow.png"

class Widow {
    constructor(x, y, ) {
        this.x = x;
        this.y = y;
        this.width = 45;
        this.height = 45;
        this.vx = 2.0; //velocidad en la que se mueve
        this.vy = 2.0; //en ambos ejes
    }
    draw() {
        ctx.drawImage(widowImage, this.x, this.y, this.width, this.height);
    }
}

//Definir instancias de las clases
const deadpool = new Character(250, 30)
const enemy = new Enemy(100, 50) //posicion en la que se dibuja
const novia = new Novia(50, 300)
const death = new Death(400, 30)
const widow = new Widow(10, 200)


//Funciones del flujo del juego
function start() {
    intervalId = setInterval(() => {
        update()

    }, 1000 / 60)

}

const imageGameover = new Image();
imageGameover.src = "/FRAMESDEADPOOL/itsgameover.png";

const imageYouwin = new Image();
imageYouwin.src = "/FRAMESDEADPOOL/uwin.png";

function checkCollitions() {
    if (deadpool.isTouching(novia)) {
        clearInterval(intervalId)
        ctx.drawImage(imageYouwin, 0, 0, $canvas.width, $canvas.height)

        setTimeout(function() {
            location.reload()
        }, 5000)

    }

    if (deadpool.isTouching(enemy)) {
        clearInterval(intervalId)
        ctx.drawImage(imageGameover, 0, 0, $canvas.width, $canvas.height)

        setTimeout(function() {
                location.reload()
            }, 3000) //el juego se reinicia en 3 segundos
    }
}


function update() {
    //Calcular estado de enemy
    enemy.x += enemy.vx;
    enemy.y += enemy.vy;
    if (enemy.y + enemy.vy > $canvas.height || enemy.y + enemy.vy < 0) {
        enemy.vy *= -1;
    }
    if (enemy.x + enemy.vx > $canvas.width || enemy.x + enemy.vx < 0) {
        enemy.vx *= -1;
    }
    (frames % 60 === 0)
    //estado de novia
    novia.x += novia.vx;
    novia.y += novia.vy;
    if (novia.y + novia.vy > $canvas.height || novia.y + novia.vy < 0) {
        novia.vy *= -1;
    }
    if (novia.x + novia.vx > $canvas.width || novia.x + novia.vx < 0) {
        novia.vx *= -1;
    }
    (frames % 60 === 0)
    //estado de death(relleno)
    death.x += death.vx;
    death.y += death.vy;
    if (death.y + death.vy > $canvas.height || death.y + death.vy < 0) {
        death.vy *= -1;
    }
    if (death.x + death.vx > $canvas.width || death.x + death.vx < 0) {
        death.vx *= -1;
    }
    (frames % 60 === 0)
    //estado de widow
    widow.x += widow.vx;
    widow.y += widow.vy;
    if (widow.y + widow.vy > $canvas.height || widow.y + widow.vy < 0) {
        widow.vy *= -1;
    }
    if (widow.x + widow.vx > $canvas.width || widow.x + widow.vx < 0) {
        widow.vx *= -1;
    }
    (frames % 60 === 0)

    //Limpiar canvas
    clearCanvas();
    //Dibujar
    deadpool.draw();
    enemy.draw();
    novia.draw();
    death.draw();
    widow.draw();
    checkCollitions();

}

//Crear funciones de apoyo
function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
}


//Funcion de interaccion con el usuario
document.onkeydown = (event) => {
    event.preventDefault()
    switch (event.key) {
        case "ArrowLeft":
            deadpool.moveLeft();
            break;
        case "ArrowRight":
            deadpool.moveRight();
            break;
        case "ArrowUp":
            deadpool.moveUp();
            break;
        case "ArrowDown":
            deadpool.moveDown();
            break;
        default:
    };
    document.onkeyup = () => {
        deadpool.stop();
    }
}

//Iniciar juego
$button.addEventListener("click", () => {
    start()
})