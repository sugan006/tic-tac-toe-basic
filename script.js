let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

let winningPattern = [
    [0,1,2],
    [0,3,6],
    [2,5,8],
    [6,7,8],
    [3,4,5],
    [1,4,7],
    [0,4,8],
    [2,4,6]
];

let xTurn = true;
let count = 0;

const disableBtns = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
}

const enableBtns = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
    xTurn = true;
}

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableBtns(); 
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableBtns(); 
});

const winningFunction = (winner) => {
    disableBtns();
    if (winner == "X"){
        msgRef.innerHTML = "&#x1F389; <br><br> 'X'  Wins";
    } else {
        msgRef.innerHTML = "&#x1F389; <br><br> 'O'  Wins";}
}

const winChecker = () => {
    for(let i of winningPattern){
        let [e1, e2, e3] = [btnRef[i[0]].innerText,btnRef[i[1]].innerText,btnRef[i[2]].innerText];
        if(e1 != "" && e2 != "" && e3 != ""){
            if(e1 == e2 && e2 == e3){
                winningFunction(e1);
            }
        }
    }
}

const drawFunction = () => {
    disableBtns();
    msgRef.innerHTML = "&#x1F60E; <br><br> It's a Draw";
}

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        element.innerText = "X";
        element.disabled = true;
        let remainingButtons = Array.from(btnRef).filter(btn => btn.innerText === "");
        if (remainingButtons.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingButtons.length);
            const randomButton = remainingButtons[randomIndex];
            count += 1;
            randomButton.innerText = "O";
            randomButton.disabled = true;
        }
        count += 1;
        if(count == 9){
            drawFunction();
        }
        winChecker();
    })
})
