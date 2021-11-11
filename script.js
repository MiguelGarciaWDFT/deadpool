//Definir canvas
const $canvas = document.querySelector("canvas")
const ctx = $canvas.getContext("2d")


//Variables globales
let frames = 0
const friction = 0.95 //resistencia a moverse

const fondoImage = new Image()
fondoImage.src = "/FRAMESDEADPOOL/gameback.png"

const playerImage = new Image()
playerImage.src = "/FRAMESDEADPOOL/frame-1.png"

//const looseImage = new Image()
//looseImage.src = "/FRAMESDEADPOOL/death_scythe.png"

const winImage = new Image()
winImage.src = "/FRAMESDEADPOOL/vanessa.png"

const hulkImage = new Image()
hulkImage.src = "/FRAMESDEADPOOL/hulk.png"



//Definir clases y sus metodos(fondos, personajes, enemigos)

/*class enemy*/

class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.vx = 0;
        this.vy = 0;
        //this.Image = new Image();
        //this.Image.src = img;
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
        //ctx.drawImage(ballImage, 250, 200, this.width, this.height);
        ctx.drawImage(winImage, 50, 50, this.width, this.height);
        ctx.drawImage(hulkImage, 200, 200, this.width, this.height);

    }

    moveLeft() {
        this.vx--;
        ctx.drawImage(this.leftImage)
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
//const enemyImage = "/FRAMESDEADPOOL/death_scythe.png"
//const enemy = new Character(enemyImage)

class Enemy {

    constructor(x, y, ) {
        this.x = x;
        this.y = y;
        this.radius = 30;
        this.vx = 2.5; //velocidad en la que se mueve
        this.vy = 2.5; //en ambos ejes


    }
    draw() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}

//Definir instancias de las clases
const deadpool = new Character(250, 170)
const enemy = new Enemy(60, 60) //posicion en la que se dibuja

//Funciones del flujo del juego
function start() {
    setInterval(() => {
        update()

    }, 1000 / 60)
}

function update() {
    //Calcular estado
    //frames++;
    enemy.x += enemy.vx;
    enemy.y += enemy.vy;
    if (enemy.y + enemy.vy > $canvas.height || enemy.y + enemy.vy < 0) {
        enemy.vy *= -1;
    }
    if (enemy.x + enemy.vx > $canvas.width || enemy.x + enemy.vx < 0) {
        enemy.vx *= -1;
    }

    if (frames % 60 === 0)

    //Limpiar canvas
        clearCanvas();
    //Dibujar
    deadpool.draw();
    //enemy.draw();

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

//vidas
//colisiones
//disminuir puntos vidas