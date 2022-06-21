const gameboardWrapper = document.querySelector('#gameboardWrapper');
const reset = document.querySelector('#reset');
const newGame = document.querySelector('#newGame')
let lastCell ;



//Gameboard---------------------------------------------------------------

const myGameboard = (function(){
    'use strict';

let gameboard = [0,1,2,3,4,5,6,7,8];
    
    function _createGameboard(){
        gameboard.forEach(element => {
            const gbItem = document.createElement('div');
            gbItem.setAttribute('class' , 'gbItem');
            gbItem.setAttribute('data' , `${element}`);
            gameboardWrapper.appendChild(gbItem);
        });
    }
    function createGameboard(){
        _createGameboard();
    }
    return {
        createGameboard: createGameboard  
    };
})();

//Player--------------------------------------------------------------

const Player = (name, mark) => {
   
   let cells = [];
   
   const getName = () => name;
   const getMark = () => mark;
   const getCells = () => cells;
   function addCells (x){
       cells.push(x)
   }
   function resetCells(){
       cells = [];
   }
   

   return {getName , getMark , getCells , addCells , resetCells};
};


// Game ---------------------------------------------------------------


function game (){
    myGameboard.createGameboard();
    const player1 = Player('player1', 'X');
    const player2 = Player('player2', 'O');

    let currentPlayer = player1;
    const gameboardItem = document.querySelectorAll('.gbItem');
    reset.addEventListener('click' , endGame);
    
    // Game loop

    for (const div of gameboardItem) {
          div.addEventListener('click', function() {
          div.textContent = currentPlayer.getMark();
          currentPlayer.addCells((Number(div.getAttribute('data'))));
          div.classList.add('dis');
          
          if (checkWinner() == true) {
              console.log(currentPlayer.getName()+' Wins')
              endGame()
          } else if(checkTie() == true) {
            console.log('Tie')
            endGame()
          }else{
            changePlayer();
          } 
      
        })
      }


      //Change current Player

      function changePlayer(){
          if (currentPlayer == player1) {
              currentPlayer = player2
          }else{
              currentPlayer = player1
          }
      }

      //Check if player win

      function checkWinner () {
        let arr = currentPlayer.getCells();
    
        const wincon1 = [0,1,2];
        const wincon2 = [0,4,8];
        const wincon3 = [0,3,6];
        const wincon4 = [3,4,5];
        const wincon5 = [2,4,6];
        const wincon6 = [2,5,8];
        const wincon7 = [1,4,7];
        const wincon8 = [6,7,8];
    
        let checker = (arr, wincons => wincons.every(v => arr.includes(v)));
        
        if ( checker (wincon1 , arr) || checker (wincon2 , arr) || checker (wincon3 , arr) || checker (wincon4 , arr) ||
             checker (wincon5 , arr) || checker (wincon6 , arr) || checker (wincon7 , arr) || checker (wincon8 , arr))
             return true 

        }

    // Check Tie
        function checkTie (){
            if (currentPlayer.getCells().length == 5) {
                return true
            }
        }
    
        //End game
        function endGame(){
        for (const div of gameboardItem) {
        div.classList.remove('dis');
        div.textContent = ' '
        player1.resetCells()
        player2.resetCells()
        currentPlayer = player1;
        }
      }        
}


newGame.addEventListener('click' , game);







