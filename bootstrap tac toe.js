/*
This jQuery builds and runs a simple tic tac toe game for bootstrap html and css 
*/
var gridArray = [[0,0,0],[0,0,0],[0,0,0]];

function computerTurn() {
	//check for possible wins/blocks HIGH PRIORITY	
	//check for possible wins/blocks in row/column
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
		diag2[i] = gridArray[i][i];
		//check for possible wins/blocks in diag
		if (i == 2) {
			if (diag1 = [0,"O","O"] || ["O",0,"O"] || ["O","O",0]){
				computerMove(diag1.indexOf(0), diag1.indexOf(0))
				return;
			}
			if (diag2 = [0,"O","O"] || ["O",0,"O"] || ["O","O",0]){
				computerMove(diag2.indexOf(0), diag2.indexOf(0))
				return;
			}
			if (diag1 = [0,"X","X"] || ["X",0,"X"] || ["X","X",0]){
				computerMove(diag1.indexOf(0), diag1.indexOf(0))
				return;
			}
			if (diag2 = [0,"X","X"] || ["X",0,"X"] || ["X","X",0]){
				computerMove(diag2.indexOf(0), diag2.indexOf(0))
				return;
			}
		}
				
		for (var j=0; j<3; j++){
			check1[j] = gridArray[i][j];
			check2[j] = gridArray[j][i];
			if (j == 2){
				if (check1 = [0,"O","O"] || ["O",0,"O"] || ["O","O",0]){
					computerMove(check1.indexOf(0), check1.indexOf(0))
					return;
				}
				if (check2 = [0,"O","O"] || ["O",0,"O"] || ["O","O",0]){
					computerMove(check2.indexOf(0), check2.indexOf(0))
					return;
				}
				if (check1 = [0,"X","X"] || ["X",0,"X"] || ["X","X",0]){
					computerMove(check1.indexOf(0), check1.indexOf(0))
					return;
				}
				if (check2 = [0,"X","X"] || ["X",0,"X"] || ["X","X",0]){
					computerMove(check2.indexOf(0), check2.indexOf(0))
					return;
				}
			}		
		}
	}
	//check for moves if no win/block
}
// places an O in the grid array and changes class to .O for corresponding div
function computerMove(i,j) {
	gridArray[i][j] = "O";

}
// checks for win condition and displays alert
function gameOver() {
	//initialize diag counters 
	var diag1X = 0;
	var diag1O = 0;
	var diag2X = 0;
	var diag2O = 0;
	// row and column checks
	for (var i=0; i<3; i++){
		//counter initialize
		var rowX = 0;
		var rowO = 0;
		var colX = 0;		
		var colO = 0;		
		//check diagonals
		if (gridArray[i][i] == "X"){
			diag1X++;			
		}
		if (gridArray[i][i] == "O"){
			diag1O++;
		}
		if (gridArray[i][(2-i)] == "X"){
			diag2X++;
		}
		if (gridArray[i][(2-i)] == "O"){
			diag2O++;
		}
		else if (diag1X == 3 || diag2X == 3) {
			alert("X wins!!");
		}
		else if (diag1O == 3 || diag2O == 3) {
			alert("O wins!!");
		}
		// count and check rows and columns for win
		for (var j=0; j<3; j++){
			if (gridArray[i][j] == "X"){
				rowX++;				
			}
			if (gridArray[i][j] == "O"){
				rowO++;
			}
			if (gridArray[j][i] == "X"){
				colX++;				
			}
			if (gridArray[j][i] == "O"){
				colO++;
			}		
			else if (rowX == 3 || colX == 3){
				alert("X wins!!");
			}
			else if (rowO == 3 || colO == 3){
				alert("O wins!!");
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
			var newContent = document.createTextNode( i + " " + j );
			gridDiv.id = "square_" + i +"_"+ j;
			gridDiv.classList.add("col-lg-4");
			gridDiv.classList.add("blank");
			gridDiv.appendChild(newContent);
			rowDiv.appendChild(gridDiv);
		}
		
		document.getElementById("playarea").appendChild(rowDiv);
	}
	
	$(".blank").click(function(){
		this.classList.remove("blank");
		this.classList.add("X");
		gridArray[xIndex(this.id)][yIndex(this.id)] = "X";
		console.log(gridArray);
		gameOver();
	}) 
});
