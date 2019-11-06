var spacesArray = [[1,2,3],[4,5,6],[7,8,9]];

function Board() {
  this.grid = [["","",""],["","",""],["","",""]];
}
Board.prototype.checkStatus = function() {
  //check if the board has winning moves or a draw
  //Vertical
    //along x
  //Horizontal
    //along y
  //Diagonal
    //x=y
    //x+y=2
}
function Player() {
  this.mark = "";
  this.wins = 0;
  this.loss = 0;
}
Player.prototype.makeMove = function(x,y,board) {
  if (board.grid[x][y])
  board.grid[x][y] = this.mark;
}


$(document).ready(function(){

});
