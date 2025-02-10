let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
let a=0;

document.addEventListener("keypress", function () {
    if (started == false) { 
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

    //random btn choose
    let randomidx = Math.floor(Math.random() * 3);
    let randColor = btns[randomidx];
    let randbtn = document.querySelector(`.${randColor}`);
    // console.log(randbtn);
    // console.log(randColor);
    // console.log(randomidx);
    gameSeq.push(randColor);
    btnflash(randbtn);
    
   
    if (a < level) {
        a = level;
    }
    h3.innerHTML = `HIGH SCORE : ${a}`;
   
}

function checkans(idx) { 
    console.log("current level : ", level);

    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) { 
            setTimeout(levelup, 500);
        }
    } else { 
        h2.innerHTML = (`Game over! your score was <b>${level}</b> <br> Press any key to start`);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnpress() { 
    console.log("button was pressed");
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn")
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() { 
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}