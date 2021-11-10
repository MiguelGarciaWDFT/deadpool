//Definir canvas
const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")


//Variables globales
let frames = 0
const friction = 0.95 //resistencia a moverse

//const fondoImage = new Image()
//fondoImage.src = "/FRAMES DEADPOOL/gameback.png"


const looseImage = new Image()
looseImage.src = "/FRAMES DEADPOOL/death_scythe.png"

const winImage = new Image()
winImage.src = "/FRAMES DEADPOOL/vanessa.png"

const playerImage = new Image()
playerImage.src = "/FRAMES DEADPOOL/frame-1.png"

//const leftImage = new Image()
//leftImage.src = "/FRAMES DEADPOOL/frame-2.png"

const hulkImage = new Image()
hulkImage.src = "/FRAMES DEADPOOL/hulk.png"



//Definir clases y sus metodos(fondos, personajes, enemigos)
class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.heigth = 50;
        this.vx = 0;
        this.vy = 0;

    }
    draw() {
        if (this.y >= $canvas.height - this.heigth) {
            this.y = $canvas.height - this.heigth;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= friction;
        this.vy *= friction;
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.heigth);
        //ctx.drawImage(fondoImage, 0, 0, this.width, this.heigth);
        ctx.drawImage(looseImage, 0, 0, this.width, this.heigth);
        ctx.drawImage(winImage, 50, 50, this.width, this.heigth);
        ctx.drawImage(hulkImage, 200, 200, this.width, this.heigth);
    }

    moveLeft() {
        this.vx--;
        //ctx.drawImage(this.leftImage)
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
}

//Definir instancias de las clases
const deadpool = new Character(250, 170)

//const fondoImage = "/FRAMES DEADPOOL/gameback.png"


//Funciones del flujo del juego
function start() {
    setInterval(() => {
        update()

    }, 1000 / 60)
}

function update() {
    //Calcular estado
    //frames++;
    //checkKeys();
    if (frames % 60 === 0)
    //Limpiar canvas
        clearCanvas();
    //Dibujar
    deadpool.draw();

}

//Crear funciones de apoyo
function clearCanvas() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);

}


//Funcion de interaccion con el usuario
document.onkeydown = (event) => {
        //keys[event.key] = true;
        switch (event.key) {
            case "ArrowLeft":
                deadpool.moveLeft();
                //ctx.drawImage(this.leftImage)
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
            keys[event.key] = false;
            deadpool.stop();
        }
    }
    //Iniciar juego
start();