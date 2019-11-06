var spacesArray = [[1,2,3],[4,5,6],[7,8,9]];

function Board() {
  this.grid = [["","",""],["","",""],["","",""]];
  this.turn = 0;
  this.currentPlayer = 0;

}
Board.prototype.checkStatus = function() {
  //check if the board has winning moves
  for (var j=0; j<3; j++) {
    var xCount = 0;
    var oCount = 0;
    for (var i=0; i<3; i++){
      //Check Vertical Wins
      if (this.grid[j][i] === "X"){
        xCount += 1;
        if (xCount === 3) {return "Player 1 wins"}
      } else if (this.grid[j][i] === "O") {
        oCount += 1;
        if (oCount === 3) {return "Player 2 wins"}
      }
    }
    //Check Horizontal Wins
    xCount = 0;
    oCount = 0;
    for (var i=0; i<3; i++){
      if (this.grid[i][j] === "X"){
        xCount += 1;
        if (xCount === 3) {return "Player 1 wins"}
      } else if (this.grid[i][j] === "O") {
        oCount += 1;
        if (oCount === 3) {return "Player 2 wins"}
      }
    }
  }
  for (var j=0; j<3; j++) {
    var xCount = 0;
    var oCount = 0;
    if (this.grid[j][j] === 'X') {
      xCount += 1;
      if (xCount == 3) {return "Player 1 wins"}
    } else if (this.grid[j][j] === "O") {
      oCount += 1;
      if (oCount === 3) {return "Player 2 wins"}
    }
  }
  //Diagonal
  //x=y
  //x+y=2
  //Check Draw
}

Board.prototype.advanceTurn = function() {
  this.turn += 1
  if (turn % 2 === 0) {       //Determine Player
    this.currentPlayer = 1;
  } else {
    this.currentPlayer = 2
  }
  return
}

Board.prototype.displayBoard = function() {
  //output board to html
}

function Player(id) {
  this.id = id;
  if (this.id === 1) {
    this.mark = 'X';
  } else {
    this.mark = 'O'
  }
  this.wins = 0;
  this.loss = 0;

}

Player.prototype.makeMove = function(x,y,board) {
  if (!board.grid[x][y]) {
    board.grid[x][y] = this.mark;
    console.log('success')
    board.advanceTurn(this);
    return true;
  } else {
    //return an error and alert user
    console.log('space taken')
  }
}

Player.prototype.checkPlayer = function() {
  return this.id;
}

//test objects
testBoard = new Board();
testPlayer = new Player(1);



$(document).ready(function(){

  if (testPlayer.makeMove())


});
