const areaWidth    = 400;
const areaHeight   = 500;
const playerWidth  = 62;
const playerHeight = 91;
const enemyWidth   = 36;
const enemyHeight  = 58;
const medKitWidth  = 20;
const medKitHeight = 22;

const gameArea = new GameArea(areaWidth, areaHeight);
const player   = new Player(playerWidth, playerHeight, areaWidth, areaHeight);

const hp    = document.createElement('div');
const score = document.createElement('div');
const start = document.createElement('div');
const speed = document.createElement('div');

const gameSpeed = 1.05;

let enemies = [];
let medKits = [];

let gameAreaSpeed   = gameSpeed * 4;
let objectsSpeed    = gameSpeed * 2;
let playerMoveSpeed = gameSpeed * 7;

let makeEnemies;
let makeMedKits;
let updateAll;
let updateSpeed;


hp.id    = 'hp';
score.id = 'score';
start.id = 'start';
speed.id = 'speed';

document.body.appendChild(gameArea.el);
document.body.appendChild(hp);
document.body.appendChild(score);
document.body.appendChild(speed);
gameArea.el.appendChild(start);
gameArea.el.appendChild(player.el);

player.updateMove();

start.innerHTML = `<h2>START NEW GAME</h2>`;


const makeObjects = function(className, array, width, heigth, areaWidth, playerHeight) {
    array.push(new className(width, heigth, areaWidth, playerHeight));
    let cur = array[array.length - 1];
    cur.updateMove();
    gameArea.el.appendChild(cur.el);
};

const moveEnvironment = function() {
    gameArea.move(gameAreaSpeed);
    enemies.map(v => v.move(objectsSpeed));
    medKits.map(v => v.move(objectsSpeed));
};

const increaseSpeed = function() {
    gameAreaSpeed   *= gameSpeed;
    objectsSpeed    *= gameSpeed;
    playerMoveSpeed *= gameSpeed;
};

const checkKey = function(e) {
    if (e.keyCode == '37') { player.moveLeft(playerMoveSpeed); }
    if (e.keyCode == '38') { player.moveUp(playerMoveSpeed); }
    if (e.keyCode == '39') { player.moveRight(playerMoveSpeed); }
    if (e.keyCode == '40') { player.moveDown(playerMoveSpeed); }
    player.updateMove();
};

const overlap = function(player, obj) {
    if (obj.positionX - player.positionX < player.width  &&
        obj.positionX - player.positionX > - obj.width   &&
        obj.positionY - player.positionY < player.height &&
        obj.positionY - player.positionY > - obj.height) {
        return true;
    }
};

const update = function() {
    speed.innerHTML = `<h2>Speed: ${Math.round(gameAreaSpeed) + 60} km/h</h2>`;
    score.innerHTML = `<h2>Score: ${player.score}</h2>`;
    hp.innerHTML    = `<h2>Hp: ${player.hp}%</h2>`;
    moveEnvironment();
    gameArea.updateMove();
    player.updateState();

    enemies.map((v,i) => {
        v.updateMove();
        if (!v.crashed && overlap(player, v)) {
            v.crashed = true;
            player.hit();
        }
        if (v.positionY > areaHeight) {
            v.el.remove();
            enemies.splice(i, 1);
        }
        if (v.crashed) {
            v.updateState();
            v.move(gameAreaSpeed - objectsSpeed);
        }
    });

    medKits.map((v) => {
        v.updateMove();
        if (!v.checked && overlap(player, v)) {
            v.checked = true;
            v.el.remove();
            player.repair();
        }
        if (v.positionY > areaHeight) {
            v.el.remove();
            medKits.shift();
        }
    });

    if (player.crashed) {
        document.removeEventListener('keydown', checkKey);
        speed.innerHTML = `<h2>Speed: ${Math.round(gameAreaSpeed) + 60} km/h</h2>`;
        score.innerHTML = `<h2>Score: ${player.score}</h2>`;
        hp.innerHTML    = `<h2>Hp: ${player.hp}%</h2>`;
        start.innerHTML = `<h2>GAME OVER<br>START NEW GAME</h2>`;
        player.updateState();

        clearInterval(makeEnemies);
        clearInterval(makeMedKits);
        clearInterval(updateAll);
        clearInterval(updateSpeed);
        gameArea.el.appendChild(start);
    }

    if (playerMoveSpeed > 25) {
        clearInterval(updateSpeed);
    }
};

const startGame = function() {
    document.addEventListener('keydown', checkKey);
    player.reset();
    start.remove();
    gameAreaSpeed   = gameSpeed * 4;
    objectsSpeed    = gameSpeed * 2;
    playerMoveSpeed = gameSpeed * 7;

    enemies.map((v,i) => v.el.remove());
    medKits.map((v,i) => v.el.remove());
    enemies = [];
    medKits = [];

    player.updateMove();

    makeEnemies = setInterval(makeObjects, 1000, Enemy, enemies, enemyWidth, enemyHeight, areaWidth, playerHeight);
    makeMedKits = setInterval(makeObjects, 8500, MedKit, medKits, medKitWidth, medKitHeight, areaWidth);
    updateAll   = setInterval(update, 1000/60);
    updateSpeed = setInterval(increaseSpeed, 6000);
};

start.addEventListener('click', startGame);
