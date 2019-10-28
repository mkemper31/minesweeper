class Minesweeper {
  constructor() {
    this.board = [];
    this.playBoard = [];
  }
  newGame() {
    const h = 10, w = 10, mines = 12;
    for (let i = 0; i < h; i++) {
      const newBoardRow = [];
      const newPlayRow = [];
      for (let j = 0; j < w; j++) {
        newPlayRow.push('X');
      }
      this.board.push(newBoardRow);
      this.playBoard.push(newPlayRow);
    }
    let placedMines = 0;
    while (placedMines < mines) {
      let rH = Math.floor(Math.random() * h), rW = Math.floor(Math.random() * w);
      if (this.board[rH][rW] != 9) {
        this.board[rH][rW] = 9;
        placedMines++;
      }
    }
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        this.board[i][j] = (this.board[i][j] == 9) ? 'm' : this.getAdjacentMines(i,j).toString();
      }
    }
  }
  getAdjacentMines(y, x) {
    let num = 0;
    for (let i = y - 1; i <= y+1; i++) {
      for (let j = x - 1; j <= x + 1; j++) {
        if (i >= 0 && i < this.board.length) {
          if (j >= 0 && j < this.board[i].length) {
            if (this.board[i][j] == 9 || this.board[i][j] == 'm') {
              num++;
            }
          }
        }
      }
    }
    return num;
  }
  /**
   * Reveals the square at the given coordinates, and if it is a 0, recursively calls the function on all neighbors.
   * @param {Number} y y-coordinate on the board
   * @param {Number} x x-coordinate on the board
   */
  revealSquare(y, x) {
    this.playBoard[y][x] = this.board[y][x];
    if (this.playBoard[y][x] == '0') {
      for (let i = (y - 1 >= 0) ? y - 1 : 0; i <= Math.min(y + 1, this.board.length-1); i++) {
        for (let j = (x-1 >= 0) ? x - 1 : 0; j <= Math.min(x+1, this.board[y].length-1); j++) {
          if (this.playBoard[i][j] == 'X') {
            this.revealSquare(i, j);
          }
        }
      }
    }
  }
}

const mines = new Minesweeper();
mines.newGame();

console.log(mines.board);
