function Board(p1, p2) {
  this.grid = [["","",""],["","",""],["","",""]];
  this.turn = 1;
  this.currentPlayer = p1;
  this.players = [p1, p2]
}

Board.prototype.checkStatus = function() {

  //check if the board has winning moves
  var xDiag = 0;
  var oDiag = 0;
  for (var j=0; j<3; j++) {
    var xCount = 0;
    var oCount = 0;

    for (var i=0; i<3; i++){

      //Check Negative Diagonal Win
      if (i + j == 2 && this.grid[j][i] === "X") {
        xDiag += 1;
        if (xDiag === 3) { console.log('Negative Diagonal X'); return 'X';}
      } else if (i + j == 2 && this.grid[j][i] === "O") {
        oDiag += 1;
        if (oDiag === 3) { console.log('Negative Diagonal O'); return 'O'}
      }
      //Check Horizontal Wins
      if (this.grid[j][i] === "X"){
        xCount += 1;
        if (xCount === 3) { console.log('Horizontal X'); return 'X';}
      } else if (this.grid[j][i] === "O") {
        oCount += 1;
        if (oCount === 3) { console.log('Horizontal O'); return 'O';}
      }
    }
    //Check Vertical Wins
    xCount = 0;
    oCount = 0;
    for (var i=0; i<3; i++){
      if (this.grid[i][j] === "X"){
        xCount += 1;
        if (xCount === 3) { console.log('Vertical X'); return 'X';}
      } else if (this.grid[i][j] === "O") {
        oCount += 1;
        if (oCount === 3) { console.log('Vertical O'); return 'O';}
      }
    }
  }
  //Check Positive Diagonal Win
  var xCount = 0;
  var oCount = 0;
  for (var j=0; j<3; j++) {
    if (this.grid[j][j] === 'X') {
      xCount += 1;
      if (xCount === 3) { console.log('Positive Diagonal X'); return 'X';}
    } else if (this.grid[j][j] === "O") {
      oCount += 1;
      if (oCount === 3) { console.log('Positive Diagonal O'); return 'O';}
    }
  }
  //Check Draw
  if (this.turn>=9){
    console.log("draw = you all lose");
    return 'D';
  }
}

Board.prototype.advanceTurn = function() {
  this.turn += 1;
  if (this.turn % 2 != 0) {       //Switch Players
    this.currentPlayer = this.players[0];
  } else {
    this.currentPlayer = this.players[1];
  }
  return
}

Board.prototype.makeMove = function(row,col) {
    this.grid[row][col] = this.currentPlayer.mark;
}

Board.prototype.checkMove = function(row, col) {
  if (!this.grid[row][col]) {
    return true
  } else {
    return false
  }
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

Player.prototype.checkPlayerId = function(id) {
  if (this.id == id);
  return true
}

player1 = new Player(1);
player2 = new Player(2);
gameBoard = new Board(player1, player2);

function endGame(message) {
  if (message != 'Draw') {
    console.log(message);
    message = "Player " + message + " Wins!"
    return message
  } else {
    console.log(message);
    return message
  }
}

$(document).ready(function(){


//Check and Make a Move
  $('.space').click(function(){
    space = this['id'];
    space = space.split(',');
    row = parseInt(space[0]);
    col = parseInt(space[1]);
    if (gameBoard.checkMove(row,col)) {
      $(this).find('h1').text(gameBoard.currentPlayer.mark);
      gameBoard.makeMove(row,col);
    } else {
      alert('Invalid Choice')
    }
    switch (gameBoard.checkStatus()) {
      case 'X':
      message = endGame(gameBoard.currentPlayer.id);
      $('#endMessage').html(message);
      console.log('X switch');
      break;
      case 'O':
      message = endGame(gameBoard.currentPlayer.id);
      $('#endMessage').html(message);
      console.log('O switch');
      break;
      case 'D':
      message = endGame('Draw');
      $('#endMessage').html(message);
      console.log('DRAW');
      break;
      default:
      console.log('No Win Yet');
    }
    gameBoard.advanceTurn();

  })

});
