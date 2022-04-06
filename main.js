var turn = "O";
var countTurns = 0;
var gameOver = false;
var cellXY = Array(Array(3),Array(3),Array(3));

// const heading = document.getElementById("heading");
// heading.innerText = turn + "'s turn";

const cells = document.querySelectorAll(".cell");
disableClick();
document.getElementById("playbuttonid").addEventListener("click", function(){
    let inputName=document.getElementById("playername");
    if (inputName && inputName.value) {
        enableClick();
    }else{
        alert("Ingrese su nombre para poder jugar");        
    }
});
cells.forEach((cell) =>{
  cell.addEventListener("click", function(){
    if(gameOver){
      return;
    }
    if(!cell.hasChildNodes()&&!gameOver){//    if(cell.innerText == ""){
        countTurns++;
        // cell.innerText = turn;
        ////set red or dark token/////
        var img = document.createElement("img");
        if(turn=="O"){
            img.src = "assets/negra.svg";
        }else{
            img.src = "assets/roja.svg";
        }
        img.style.width="60px";
        cell.appendChild(img);
        //////
        cell.classList.add("filled");
        $x = cell.getAttribute("x");
        $y = cell.getAttribute("y");
        cellXY[$x-1][$y-1] = turn;
        /////////
        for(var x = 0; x < 3; x++){
            if(x == $x-1){
                if(cellXY[x][0] == cellXY[x][1] && cellXY[x][0] == cellXY[x][2]){
                    console.error(1111);
                    winner(turn);
                }
            }
        }
        for(var y = 0; y < 3; y++){
            if(y == $y-1){
                if(cellXY[0][y] == cellXY[1][y] && cellXY[0][y] == cellXY[2][y]){      
                    console.error(2222);                                  
                    winner(turn);
                }
            }
        }
        /////////
        if(cellXY[0][0] == cellXY[1][1] && cellXY[0][0] == cellXY[2][2] && cellXY[1][1] == turn){
            console.error(3333);                                  
            winner(turn);
        }
        if(cellXY[2][0] == cellXY[1][1] && cellXY[2][0] == cellXY[0][2] && cellXY[1][1] == turn){
            console.error(4444);                                  
            winner(turn);
        }
        if(turn == "O"){
            turn = "X";
            let ran=getRandomCell();
            console.info("ran: ",ran);
        }else{
            turn = "O";
        }
        //   heading.innerText = turn + "'s turn";
        if(countTurns == 9){
            console.info("Ningún ganador: ",countTurns);
            console.error(5555);                                  
            winner("Ningún ganador");
        }
        console.info("countTurns: ",countTurns);
    }
  });
});

function getRandomCell(){
    let random=generateRandom();
    let initcell=cells[random]
    let flag=initcell.hasChildNodes();
    if(!flag){//if cell has no childs
        console.info("1random: ",random);
        clickCell(initcell);
        return random;
    }else{
        while(flag){
            random=generateRandom();
            iterativecell=cells[random];
            flag=iterativecell.hasChildNodes();
            console.info("try: ",random);
            ///check if all cells R busy
            let emptyFlag=false;
            cells.forEach((cell)=>{
                if(!cell.hasChildNodes()){
                    emptyFlag=true;
                }
            })
            if(!flag && emptyFlag){
                console.info("2randomR: ",random);
                clickCell(iterativecell);
                return random;
            }else{
                console.info("no empty cells: ");
                return 0;
            }
            // if(flag){
            //     console.info("celda vacia aleatoria",random);
            // }
            // console.info("random",random);
        }
    }
}
function generateRandom(min = 1, max = 9) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}
function disableClick(){
    document.getElementById('gridid').style.pointerEvents = 'none';
}
function enableClick(){
    document.getElementById('gridid').style.pointerEvents = 'auto'; 
}
function clickCell(cell){
    disableClick();
    setTimeout(() => {cell.click();}, 1000);
    setTimeout(() => {enableClick();}, 3000);
}

function winner(turn){
    console.warn("winner: ",turn);
  gameOver = true;
  const popup = document.getElementById("popup");
  if(turn=="O"){
    popup.innerText = "Felicidades "+document.getElementById("playername").value + " \n Ganaste el juego!";
  }else if(turn=="X"){
    popup.innerText = "Oh no "+document.getElementById("playername").value + " \n Perdiste el juego!";
  }else{
    popup.innerText = turn;
  }
  popup.style.zIndex = 10;
  popup.style.opacity = 1;
  popup.addEventListener("click", function(){
    turn = "O";
    countTurns = 0;
    gameOver = false;
    // const heading = document.getElementById("heading");
    // heading.innerText = turn + "'s turn";
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) =>{
      cell.classList.remove("filled");
      cell.innerText = "";
      while (cell.firstChild) {cell.removeChild(cell.firstChild);}
    });
    for($x = 0; $x < 3; $x++){
      for($y = 0; $y < 3; $y++){
        cellXY[$x][$y] = "";
      }
    }
    popup.innerText = "";
    popup.style.zIndex = -10;
    popup.style.opacity = 0;
  });
}