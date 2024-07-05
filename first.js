let noOfRows = document.querySelector("#Rows");
let noOfcols = document.querySelector("#Columns");
let startBtn = document.querySelector("#startBtn");
let rulesBtn = document.querySelector("#rulesBtn");
let backBtn = document.querySelector("#backBtn");
let gameboard = document.querySelector(".button-space");
let menuContainer = document.querySelector(".menu-container");
let scorecard = document.querySelector(".scorecard");
let player1Turn = true;
let player1Score = 0;
let player2Score = 0;
let scoreupdated = false;
let count = 0;

const applyColor = (box) => {
  if (player1Turn) {
    box.style.color = "green";
  }
  else {
    box.style.color = "pink";
  }
}

const splitindex = (id) => {
  for (let i = 0; i < id.length; i++) {
    if (id[i] == ',') {
      return i;
    }
  }
}

const updatescore = (player1Turn) => {
  if (player1Turn) {
    player1Score++;
  }
  else {
    player2Score++;
  }
  scoreupdated = true;
}
function isAnyMatchFound(id, arr, rowcount, colcount) {
  let mid = splitindex(id);
  let x = Number(id.slice(0, mid));
  let y = Number(id.slice(mid + 1));

  if (arr[x][y] == 'O') {
    if (x + 1 < rowcount && x - 1 >= 0 && (arr[x - 1][y] == "S" && arr[x + 1][y] == "S")) {
      updatescore(player1Turn);
    }
    if (y + 1 < colcount && y - 1 >= 0 && (arr[x][y - 1] == "S" && arr[x][y + 1] == "S")) {
      updatescore(player1Turn);
    }
    if ((x + 1 < rowcount && x - 1 >= 0) && (y + 1 < colcount && y - 1 >= 0)) {
      if (arr[x - 1][y - 1] == "S" && arr[x + 1][y + 1] == "S") {
        updatescore(player1Turn);
      }
      if (arr[x + 1][y - 1] == "S" && arr[x - 1][y + 1] == "S") {
        updatescore(player1Turn);
      }
    }
  }
  else {
    if (x + 2 < rowcount && arr[x + 1][y] == "O" && arr[x + 2][y] == "S") {
      updatescore(player1Turn);
    }
    if (x - 2 >= 0 && arr[x - 1][y] == "O" && arr[x - 2][y] == "S") {
      updatescore(player1Turn);
    }
    if (y + 2 < colcount && arr[x][y + 1] == "O" && arr[x][y + 2] == "S") {
      updatescore(player1Turn);
    }
    if (y - 2 >= 0 && arr[x][y - 1] == "O" && arr[x][y - 2] == "S") {
      updatescore(player1Turn);
    }
    if ((x + 2 < rowcount) && (y + 2 < colcount) && (arr[x + 1][y + 1] == "O" && arr[x + 2][y + 2] == "S")) {
      updatescore(player1Turn);
    }
    if ((x - 2 >= 0) && (y - 2 >= 0) && (arr[x - 1][y - 1] == "O" && arr[x - 2][y - 2] == "S")) {
      updatescore(player1Turn);
    }
    if ((x - 2 >= 0) && (y + 2 < colcount) && (arr[x - 1][y + 1] == "O" && arr[x - 2][y + 2] == "S")) {
      updatescore(player1Turn);
    }
    if ((x + 2 < rowcount) && (y - 2 >= 0) && (arr[x + 1][y - 1] == "O" && arr[x + 2][y - 2] == "S")) {
      updatescore(player1Turn);
    }
  }
}
const createboxes = () => {
  for (let i = 0; i < noOfRows.value; i++) {
    let row = document.createElement("li");
    row.setAttribute("class", "row");
    gameboard.append(row);
    for (let j = 0; j < noOfcols.value; j++) {
      let box = document.createElement("button");
      box.setAttribute("data-id", `${i},${j}`)
      box.setAttribute("class", "box");
      box.setAttribute("id", `${i},${j}`);
      row.append(box);
    }
  }
}

function fun(rowcount, colcount, id) {

  const arr = [];
  let rows = document.querySelectorAll(".row");
  for (r of rows) {
    const a = [];
    for (c of r.childNodes) {
      a.push(c.innerText);
    }
    arr.push(a);
  }
  isAnyMatchFound(id, arr, rowcount, colcount);
  if (!scoreupdated) {
    player1Turn = !player1Turn;
  }
  scoreupdated = false;
  document.querySelector(".scorecard").firstChild.innerText = `Player1: ${player1Score}`;
  document.querySelector(".scorecard").lastChild.innerText = `Player2: ${player2Score}`;
}
const checkIfgameCompleted = () => {
  if (count == noOfRows.value * noOfcols.value) {
    document.querySelector(".game-board").style.display = "none";
    if (player1Score > player2Score) {
      document.querySelector(".scorecard").lastChild.remove();
      document.querySelector(".scorecard").firstChild.innerText = `Player1 WON`;
      scorecard.firstChild.classList.add("gameover", "won");
    }
    else if (player2Score > player1Score) {
      document.querySelector(".scorecard").firstChild.remove();
      document.querySelector(".scorecard").lastChild.innerText = `Player2 WON`;
      scorecard.firstChild.classList.add("gameover", "won");
    }
    else {
      document.querySelector(".scorecard").firstChild.remove();
      document.querySelector(".scorecard").lastChild.remove();
      document.querySelector(".scorecard").innerText = "It's A DRAW";
      scorecard.classList.add("gameover", "draw");

    }
  }
}
const boxesclicked = () => {

  
  gameboard.addEventListener("click", (event) => {
    const box = event.target;
    if (!box.disabled) {
      count++;
      box.innerText = "S";
      applyColor(box);
      box.disabled = true;
      fun(noOfRows.value, noOfcols.value, box.getAttribute("data-id"));
      checkIfgameCompleted();
    }
    
  })
  gameboard.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    const box = event.target;
    if (!box.disabled) {
      count++;
      box.innerText = "O";
      applyColor(box);
      box.disabled = true;
      fun(noOfRows.value, noOfcols.value, box.getAttribute("data-id"));
      checkIfgameCompleted();
    }
  })  
  // let boxes = document.querySelectorAll(".box");
  // boxes.forEach((box)=>{
  //   box.addEventListener("click",()=>{
  //     console.log(box.getAttribute('data-id'));
  //     if(!box.disabled){
  //       count++;
  //       box.innerText = "S";
  //       applyColor(box);
  //       box.disabled = true;
  //       fun(noOfRows.value,noOfcols.value,box.getAttribute("id"));
  //       checkIfgameCompleted();
  //     }
  //   });
  //   box.addEventListener("contextmenu",(ev)=>{
  //     ev.preventDefault();
  //     if(!box.disabled){
  //       count++;
  //       box.innerText = "O";
  //       applyColor(box);
  //       box.disabled =true;
  //       fun(noOfRows.value,noOfcols.value,box.getAttribute("id"));
  //       checkIfgameCompleted();
  //     }
  //   });
  // });
}

startBtn.addEventListener("click", () => {

  menuContainer.style.display = "none";
  document.querySelector(".game-board").style.display = "block";
  scorecard.style.display = "flex";
  scorecard.firstChild.innerText = `Player1: 0`;
  scorecard.lastChild.innerText = "Player2: 0";
  if (noOfRows.value == 0) {
    noOfRows.value = 3;
  }
  if (noOfcols.value == 0) {
    noOfcols.value = 3;
  }
  createboxes();
  boxesclicked();

});

rulesBtn.addEventListener("click", () => {
  menuContainer.style.display = "none";
  document.querySelector(".rules-container").style.display = "flex";
})

backBtn.addEventListener("click", () => {
  menuContainer.style.display = "flex";
  document.querySelector(".rules-container").style.display = "none";
})