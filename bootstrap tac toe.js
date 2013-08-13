/*
This jQuery builds and runs a simple tic tac toe game for bootstrap html and css 
*/
var gridArray = [[0,0,0],[0,0,0],[0,0,0]];
var highPriArray = [[0,"O","O"],["O",0,"O"],["O","O",0],[0,"X","X"],["X",0,"X"],["X","X",0]];
var gameState = 0;

var xImg = "X-img.png";
var oImg = "O-img.png";
var blankImg = "blank.png";

function compare(a,b) {
	if (a === b) {
		return true;
	}
	if (a == null || b == null) {
		return false;
	}
  if (a.length != b.length) {
  	return false;
  }
  for (var i=0; i<a.length; i++) {
  	if (a[i] !== b[i]) return false;
  }
 	return true;
}

function computerTurn() {
	//check for possible wins/blocks HIGH PRIORITY
	for (var i=0; i<3; i++){
		//initialize counter arrays
		if (i == 0){
		var diag1 = [];
		var diag2 = [];
		}
		var check1 = [];
		var check2 = [];
		//fill diag arrays with grid variables
		diag1[i] = gridArray[i][i];			
		diag2[i] = gridArray[i][2-i];
		//check for wins/blocks in diag
		if (i == 2) {
			var array = [];
			for (var k=0; k<highPriArray.length; k++){					
				array = highPriArray[k];
				if (compare(diag1,array)){	
					computerMove(diag1.indexOf(0), diag1.indexOf(0));
					return;
				} else if (compare(diag2,array)){
					computerMove(diag2.indexOf(0), (2-diag2.indexOf(0)));
					return;
				}
			}
		}
		// check for wins/blocks in rows and columns		
		for (var j=0; j<3; j++){
			check1[j] = gridArray[i][j];
			check2[j] = gridArray[j][i];
			if (j == 2){
				var array = [];
				for (var k=0; k<highPriArray.length; k++){					
					array = highPriArray[k];
					if (compare(check1,array)){	
						computerMove(i, check1.indexOf(0));
						return;
					} else if (compare(check2,array)){
						computerMove(check2.indexOf(0), i);
						return;
					}
				}
			}		
		}
	}
	//play in the middle if available
	if (gridArray[1][1] == 0){
		computerMove(1,1);
		return;
	}
	// LOW PRIORITY MOVE - plays around human player. currently assumes human goes first
	var played = true;
  do {
		var a = Math.round(2*Math.random())
		var b = Math.round(2*Math.random())
		if (gridArray[a][b] == 0){
			computerMove(a,b);
			played = false;
		}
	}	while (played);
	return;	
}
// places an O in the grid array and changes class to .O for corresponding div
function computerMove(i,j) {
	gridArray[i][j] = "O";
	var divName = "square_"+i+"_"+j;
	console.log(divName);
	$("#"+divName).children("img").attr('src',oImg);
	document.getElementById(divName).classList.remove("blank");
	document.getElementById(divName).classList.add("O");
	
}

// checks for win condition and displays alert
function gameOver() {
	//check for draw
	var flatArray = gridArray[0].concat(gridArray[1],gridArray[2]);
	console.log(flatArray);
	if (flatArray.indexOf(0) == -1){
		gameState = 1;
		$('#drawModal').modal('show');
	}
	//check for win
	//initialize diag counters 
	var diag1X = 0;
	var diag1O = 0;
	var diag2X = 0;
	var diag2O = 0;
	// row and column checks
	for (var i=0; i<3; i++){
		//console.log(i);
		//counter initialize
		var rowX = 0;
		var rowO = 0;
		var colX = 0;		
		var colO = 0;		
		//check diagonals
		if (gridArray[i][i] == "X"){
			diag1X++;			
		} else if (gridArray[i][i] == "O"){
			diag1O++;
		}	if (gridArray[i][(2-i)] == "X"){
			diag2X++;
		}	else if (gridArray[i][(2-i)] == "O"){
			diag2O++;
		}	/* else */ if (i == 2){					
			if (diag1X == 3 || diag2X == 3) {
				gameState = 1;
				$('#winModal').modal('show');
			}
			else if (diag1O == 3 || diag2O == 3) {
				gameState = 1;
				$('#loseModal').modal('show');
			}
		}
		// count and check rows and columns for win
		for (var j=0; j<3; j++){
			if (gridArray[i][j] == "X"){
				rowX++;				
			}	else if (gridArray[i][j] == "O"){
				rowO++;
			}	if (gridArray[j][i] == "X"){
				colX++;				
			}	else if (gridArray[j][i] == "O"){
				colO++; 					
			} /* else */if (j==2){					
				if (rowX == 3 || colX == 3){
					gameState = 1;
					$('#winModal').modal('show');
				} else if (rowO == 3 || colO == 3){
					gameState = 1;
					$('#loseModal').modal('show');
				}
			}
		}	
	}
}

function xIndex(squareDiv) {
	var x = squareDiv.split("_");
	var i = parseInt(x[1]);
	return i;
}

function yIndex(squareDiv) {
	var x = squareDiv.split("_");
	var i = parseInt(x[2]);
	return i;
}


$(document).ready(function(){

	// Create div Object and add id and class
	for (var i=0; i<3; i++){
		var rowDiv = document.createElement("div");
		rowDiv.classList.add("row");
		
		for (var j=0; j<3; j++){
			var gridDiv = document.createElement("div");
			//var newContent = document.createTextNode( i + " " + j );
			gridDiv.id = "square_" + i +"_"+ j;
			gridDiv.classList.add("col-lg-4");
			gridDiv.classList.add("col-sm-4");
			gridDiv.classList.add("col-4");
			gridDiv.classList.add("blank");
			$('<img/>').attr('src',blankImg).addClass('img-responsive').appendTo(gridDiv);
			//gridDiv.appendChild(newContent);
			rowDiv.appendChild(gridDiv);
		}
		
		document.getElementById("playarea").appendChild(rowDiv);
		if (i<2){
			$("<br>").appendTo(document.getElementById("playarea"));
		}
	}
	
	$(".blank").click(function(){
		if ($(this).hasClass("blank")){
			if (gameState == 0){
				this.classList.remove("blank");
				this.classList.add("X");
				$(this).children("img").attr('src',xImg);
				gridArray[xIndex(this.id)][yIndex(this.id)] = "X";
				gameOver();
				if (gameState == 0) {
					computerTurn();
					gameOver();
				}
			}
		}
	})
});
