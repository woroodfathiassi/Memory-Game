const items = document.getElementsByClassName('back');
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffledArray = shuffleArray(array);

const gameHistory = [];
const playersName = [];

let count = 0;
// filling the cards with numbers
Array.from(items).forEach(item => {
    item.innerHTML = shuffledArray[count];
    count++;
});

let value1 ; // the value of the first card
let value2 ; // the value of the second card
let tempElemetOne ; // pointer to flip the first card again if it's not same with the second one
let indexCard1 ; // storing the index of the first card
let indexCard2 ; // storing the index of the second card
let checkPlayer = false;
let checkCard = false; 
let counter = 0; // The counter to count the number of correct cards
document.addEventListener('click', function(card) {
    const parentElemen = card.target.parentElement;
    if(parentElemen.classList == 'board-item'){
        if(!checkPlayer){
            if(!checkCard){
                tempElemetOne = parentElemen;
                value1 = parentElemen.children[1].innerHTML;
                indexCard1 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
                parentElemen.classList.add('flipped');
                checkCard = true;
            }else{
                value2 = parentElemen.children[1].innerHTML;
                indexCard2 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
                parentElemen.classList.add('flipped');
                checkCard = false;
                if(value1 == value2){
                    counter+=2;
                }else{
                    setTimeout(() => {
                        parentElemen.classList.remove('flipped');
                        tempElemetOne.classList.remove('flipped');
                    }, 500);
                }
                checkPlayer = true;
                document.getElementById('player1').style.borderBottomColor = 'white';
                document.getElementById('player2').style.borderBottomColor = 'red';
                gameHistory.push({player: 'one', option1: value1, option2: value2, card1: indexCard1, card2: indexCard2});
            }
        }else{
            if(!checkCard){
                tempElemetOne = parentElemen;
                value1 = parentElemen.children[1].innerHTML;
                indexCard1 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
                parentElemen.classList.add('flipped');
                checkCard = true;
            }else{
                value2 = parentElemen.children[1].innerHTML;
                indexCard2 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
                parentElemen.classList.add('flipped');
                checkCard = false;
                if(value1 == value2){
                    counter+=2;
                }else{
                    setTimeout(() => {
                        parentElemen.classList.remove('flipped');
                        tempElemetOne.classList.remove('flipped');
                    }, 500);
                }
                checkPlayer = false;
                document.getElementById('player1').style.borderBottomColor = 'red';
                document.getElementById('player2').style.borderBottomColor = 'white';
                gameHistory.push({player: 'two', option1: value1, option2: value2, card1: indexCard1, card2: indexCard2});
            }
        }
    }

    if (counter === 18) {
        const board = document.getElementsByClassName('game-board')[0]; 
        // if (board) {
            board.style.pointerEvents = 'none';
        // } 
        gameHistory.forEach(e => {
            e.success = e.option1 === e.option2;
        });
        document.querySelector('.result').style.display = 'inline';
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayBorad(){
    const name1 = document.getElementById('player1').value;
    const name2 = document.getElementById('player2').value;
    if(name1 !== '' && name2 !== ''){
        playersName.push(name1);
        playersName.push(name2);
        document.querySelector('.game-board').style.display = 'grid';
        document.querySelector('.names input').readOnly = true;
        document.querySelector('.players button').style.display = 'none';
        document.getElementById('player1').style.borderBottomColor = 'red';
    }else{
        alert('Please Enter Palyers names!');
    }
}

function showResult(){
    // console.log(gameHistory);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    localStorage.setItem('playersName', JSON.stringify(playersName));
    setTimeout(() => {
        window.location.href = 'gameResult.html';
    }, 900);
}