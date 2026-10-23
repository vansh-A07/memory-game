let gameSeq = [];
let userSeq = [];

const btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
let highScore = 0;

document.addEventListener("keydown", function () {
    if (!started) {
        console.log("game has started");
        started = true;
        levelup();
    }
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 350);
}

function userflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    const randomidx = Math.floor(Math.random() * btns.length);
    const randColor = btns[randomidx];
    const randbtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    btnflash(randbtn);

    if (highScore < level) {
        highScore = level;
    }
    h3.innerText = `HIGH SCORE : ${highScore}`;
}

function checkans(idx) {
    console.log("current level : ", level);

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 500);
        }
    } else {
        h2.innerHTML = `Game over! your score was <b>${level}</b> <br> Press any key to start`;
        document.body.style.backgroundColor = "red";
        setTimeout(function () {
            document.body.style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress() {
    console.log("button was pressed");
    const btn = this;
    userflash(btn);

    const userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkans(userSeq.length - 1);
}

const allbtns = document.querySelectorAll(".btn");
for (const btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
