function endGame(message) {
  if (message != 'Draw!') {
    console.log(message);
    message = "Player " + message + " Wins!"
    return message
  } else {
    console.log(message);
    return message
  }
}

function gridsize(gridInput){
  var tempGridOuter = [];
  var tempGridInner = [];
  var unit = "";
  for (var j = 0; j < gridInput; j++) {
    for (var i = 0; i < gridInput; i++){
      tempGridInner.push(unit);
    }
    tempGridOuter.push(tempGridInner);
    tempGridInner = [];
  }
  return tempGridOuter;
}

function Board(p1, p2, size = 3) {
  this.grid = gridsize(size);
  this.turn = 1;
  this.currentPlayer = p1;
  this.players = [p1, p2]
}

Board.prototype.checkStatus = function() {

  //check if the board has winning moves
  var xDiag = 0;
  var oDiag = 0;
  for (var j=0; j<this.grid.length; j++) {
    var xCount = 0;
    var oCount = 0;

    for (var i=0; i<this.grid.length; i++){

      //Check Negative Diagonal Win
      if (i + j == (this.grid.length-1) && this.grid[j][i] === "X") {
        xDiag += 1;
        if (xDiag === this.grid.length) { console.log('Negative Diagonal X'); return 1;}
      } else if (i + j == (this.grid.length-1) && this.grid[j][i] === "O") {
        oDiag += 1;
        if (oDiag === this.grid.length) { console.log('Negative Diagonal O'); return 2}
      }
      //Check Horizontal Wins
      if (this.grid[j][i] === "X"){
        xCount += 1;
        if (xCount === this.grid.length) { console.log('Horizontal X'); return 1;}
      } else if (this.grid[j][i] === "O") {
        oCount += 1;
        if (oCount === this.grid.length) { console.log('Horizontal O'); return 2;}
      }
    }
    //Check Vertical Wins
    xCount = 0;
    oCount = 0;
    for (var i=0; i<this.grid.length; i++){
      if (this.grid[i][j] === "X"){
        xCount += 1;
        if (xCount === this.grid.length) { console.log('Vertical X'); return 1;}
      } else if (this.grid[i][j] === "O") {
        oCount += 1;
        if (oCount === this.grid.length) { console.log('Vertical O'); return 2;}
      }
    }
  }
  //Check Positive Diagonal Win
  var xCount = 0;
  var oCount = 0;
  for (var j=0; j<this.grid.length; j++) {
    if (this.grid[j][j] === 'X') {
      xCount += 1;
      if (xCount === this.grid.length) { console.log('Positive Diagonal X'); return 1;}
    } else if (this.grid[j][j] === "O") {
      oCount += 1;
      if (oCount === this.grid.length) { console.log('Positive Diagonal O'); return 2;}
    }
  }
  //Check Draw
  if (this.turn>(this.grid.length*this.grid.length)){
    console.log("draw = you all lose");
    return 'Draw!';
  }
  return false;
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




$(document).ready(function(){
  //Build HTML grid
  $('#gridButton').click(function() {
    choice = $('.gridChoice').val();
    gameBoard = new Board(player1, player2, choice);

    console.log(choice);
    display = $('#display');
    display.html("");
    var frameCount = '';
    console.log(gameBoard.grid.length-1);
    for (var j = 0; j < gameBoard.grid.length; j++) {
      frameCount += '1fr ';
      for (var i = 0; i < gameBoard.grid.length; i++) {
        display.append(`<div class="space" id=${j},${i}><h2><br></h2></div>`);
      }
    }
    display.css("grid-template-columns", frameCount)
  })



  //Check and Make a Move
  $('#display').on('click', ".space", function() {
    if (!gameBoard.checkStatus()) {
      space = this['id'];
      space = space.split(',');
      row = parseInt(space[0]);
      col = parseInt(space[1]);
      if (gameBoard.checkMove(row,col)) {
        $(this).find('h2').text(gameBoard.currentPlayer.mark);
        gameBoard.makeMove(row,col);
        gameBoard.advanceTurn();
      } else {
        alert('Invalid Choice')
      }
      if (gameBoard.checkStatus()) {
        message = endGame(gameBoard.checkStatus());
        $('#endMessage').html(message);
      }
    }
  })

});
