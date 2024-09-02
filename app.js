let boxes = document.querySelectorAll(".box");
let newGame = document.querySelector("#new-btn");
let resetGame = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let mainGame = document.querySelector(".mainGame");

let turn = true;
let count = 0;
let winnerFound = false;

let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const enableBoxes = () => {
  for (box of boxes) {
    box.innerText = "";
    box.disabled = false;
  }
};

const newGameStart = () => {
  count = 0;
  turn = true;
  winnerFound = false;
  msgContainer.classList.add("hide");
  mainGame.classList.remove("hide");
  enableBoxes();
};

const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  mainGame.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winningPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 == pos2 && pos2 == pos3) {
        winnerFound = true;
        showWinner(pos1);
        disableBoxes();
      }
    }
  }
};

const printDraw = () => {
  msg.innerText = "It's a Drawwww...";
  msgContainer.classList.remove("hide");
  mainGame.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turn) {
      box.innerText = "o";
      checkWinner();
      turn = false;
      box.disabled = true;
    } else {
      box.innerText = "x";
      checkWinner();
      turn = true;
      box.disabled = true;
    }
    if (count == 9 && !winnerFound) {
      printDraw();
    }
  });
});

newGame.addEventListener("click", newGameStart);
resetGame.addEventListener("click", newGameStart);
