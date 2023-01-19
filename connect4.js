/** Connect Four
 * 
 * Step 1: Planning
 * 
 * HTML
 *  - DIV for game 
 *  - table for game
 * 
 * you could represent a piece in the html board by appending the DOM with a TD in the corresponding html board TR.
 * 
 * a decent structure for the in-memory game board would be a collection of arrays within an array. Such as [[x,x,x,x,x],
 *                                [x,x,x,x,x],
 *                                [x,x,x,x,x]]
 * 
 * a flow for the game (with possible functions) might be:
 *        make HTML board(table)
 *        add event listeners to the board (referencing clickFunc)
 *        setBoard() - creates in-memory board in JS
 *        set player,
 *        clickFunc() - finds coloumn in table player selected
 *              lowestTD() - finds the lowest possible open TD in column
 *              placePiece() - places piece in html board and updates in-memory board
 *              winner() - checks for winner
 *              switch player 
 * 
 * 
 * 
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
for(let i = 0; i < HEIGHT; i++) {
  board.push([]);
  for(let j = 0; j < WIDTH; j++) {
    board[i].push(null);
  }
  
}
return board};



function makeHtmlBoard() {
  
  const htmlBoard = document.querySelector("#board");
  
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

 
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}



function findSpotForCol(x) {
  let result;
  for(let i = 0; i < board.length; i++) {
    const tile = board[i][x];
    if(i === 0 && board[i][x]) {
       result = null
    }
    else if(board[i][x] === null) {
       result = i
    }
  }
  return result;
  
}


function placeInTable(y, x) {
  const point = (`${y}-${x}`);
  const piece = document.createElement('div');
  piece.className = 'piece';
  if(currPlayer === 1) {
  piece.classList.add('p1')
}
  if(currPlayer === 2) {
    piece.classList.add('p2')
  }
  const cell = document.getElementById(point);
  cell.append(piece);
  
};


function endGame(msg) {
  alert(msg);
}


function handleClick(evt) {
  
  const x = evt.target.id;

  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  board[y][x] = currPlayer;

  placeInTable(y, x);

  
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  
  let filled = board[0].every(el => el !== null);
  
  if(filled) {
    endGame("It's a tie!");
  };

  
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;
}



function checkForWin() {
  function _win(cells) {
    
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
