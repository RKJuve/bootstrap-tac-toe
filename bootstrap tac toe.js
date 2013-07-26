/*
This jQuery builds and runs a simple tic tac toe game for bootstrap html and css 
*/
var gridArray = [[0,0,0],[0,0,0],[0,0,0]];
/*
function computerTurn() {
	var posMoves = new Array();
	for (var i=0, i<2, i++){
		var countBlank = 0;
		var countX = 0;
		var countO = 0;		
		for (var j=0, j<2, j++){
			if (gridArray[i][j] == 0){
				countBlank++;

			}
			if (gridArray[i][j] == "X"){
				countX++;
			}
			if (gridArray[i][j] == "O"){
				countO++;
			}
		}
		if (countO == 2 && countBlank == 1){
			document.getElementById("square_"+i+"_"+j).classList.remove("blank");
			document.getElementById("square_"+i+"_"+j).classList.add("O");
		}
	}
}
*/
// checks for win condition and displays alert
function gameOver() {
	// row and column checks
	for (var i=0; i<3; i++){
		//counter initialize
		var rowX = 0;
		var rowO = 0;
		var colX = 0;		
		var colO = 0;
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
	// check diagonals
	//initialize diag counters 
	var diag1X = 0;
	var diag1O = 0;
	var diag2X = 0;
	var diag2O = 0;	
	for (var i=0; i<3; i++){
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
		rowDiv.classList.add("row-fluid");
		
		for (var j=0; j<3; j++){
			var gridDiv = document.createElement("div");
			var newContent = document.createTextNode( i + " " + j );
			gridDiv.id = "square_" + i +"_"+ j;
			gridDiv.classList.add("span4");
			gridDiv.classList.add("blank");
			gridDiv.appendChild(newContent);
			rowDiv.appendChild(gridDiv);
		}
		
		document.getElementById("playarea").appendChild(rowDiv);
	}
	console.log(gridArray);

	$(".blank").click(function(){
		this.classList.remove("blank");
		this.classList.add("X");
		gridArray[xIndex(this.id)][yIndex(this.id)] = "X";
		console.log(gridArray);
		gameOver();
	}) 
});
