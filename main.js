const numOfCards = 18;
const redColor = 'red';
const whiteColor = 'white';
let gameHistory = [];
const playersName = [];

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
                flipCardOne(parentElemen);
            }else{
                checkPlayer = true;
                flipCardTwo(parentElemen, whiteColor, redColor, 'one');
                localStorage.setItem('play', JSON.stringify('two'));
                localStorage.setItem('checkPlayer', JSON.stringify(checkPlayer));
            }
        }else{
            if(!checkCard){
                flipCardOne(parentElemen);
            }else{
                checkPlayer = false;
                flipCardTwo(parentElemen, redColor, whiteColor, 'two');
                localStorage.setItem('play', JSON.stringify('two'));
                localStorage.setItem('checkPlayer', JSON.stringify(checkPlayer));
            }
        }

        if (counter === numOfCards) {
            const board = document.getElementsByClassName('game-board')[0]; 
            board.style.pointerEvents = 'none';
            // gameHistory = JSON.parse(localStorage.getItem('numbersSet')) || [];
            gameHistory.forEach(e => {
                e.success = e.option1 === e.option2;
            });
            localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
            document.querySelector('.result').style.display = 'inline';
        }
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
        localStorage.setItem('playersName', JSON.stringify(playersName));
        document.querySelector('.game-board').style.display = 'grid';
        for(let i=0 ; i<numOfCards ; i++){
            const card = createBoardItem();
            document.querySelector('.game-board').appendChild(card);
        }
        const items = document.getElementsByClassName('back');
        let count = 0;
        // filling the cards with numbers
        const shuffledArray = createArrayOfNumbers(numOfCards);
        Array.from(items).forEach(item => {
            item.innerHTML = shuffledArray[count];
            count++;
        });
        document.querySelector('.names input').readOnly = true;
        document.querySelector('.players button').style.display = 'none';
        document.getElementById('player1').style.borderColor = 'red';
    }else{
        alert('Please Enter Palyers names!');
    }
}

// Check if localStorage is empty or not
if (localStorage.length === 0) {
    // displayBorad();
    
} else {
    const nameData = localStorage.getItem('playersName');
    const pName = JSON.parse(nameData);
    document.getElementById('player1').value = pName[0];
    document.getElementById('player2').value = pName[1];

    document.querySelector('.game-board').style.display = 'grid';
    for(let i=0 ; i<numOfCards ; i++){
        const card = createBoardItem();
        document.querySelector('.game-board').appendChild(card);
    }
    const items = document.getElementsByClassName('back');
    const itemsArray = Array.from(items);
    let count = 0;

    const worood = new Set(JSON.parse(localStorage.getItem('numbersSet')) || []);
    const allCards = document.querySelectorAll('.board-item');
    console.log(worood); ////////////////////////////////////////
    Array.from(worood).forEach(index => {
        allCards[index].classList.add('flipped');
    });
    // filling the cards with numbers
    const shuffledArray = JSON.parse(localStorage.getItem('shuffledArray'));
    Array.from(items).forEach(item => {
        item.innerHTML = shuffledArray[count];
        count++;
    });


    document.querySelector('.names input').readOnly = true;
    document.querySelector('.players button').style.display = 'none';
    document.getElementById('player1').style.borderColor = 'red';

    const istoryData = localStorage.getItem('gameHistory');
    gameHistory = JSON.parse(istoryData);

    const playerData = localStorage.getItem('checkPlayer');
    checkPlayer = JSON.parse(playerData);

    const playData = localStorage.getItem('play');
    const play = JSON.parse(playData);
    if(!checkPlayer){
        document.getElementById('player1').style.borderColor = redColor; 
        document.getElementById('player2').style.borderColor = whiteColor; 
    }else{
        document.getElementById('player1').style.borderColor = whiteColor; 
        document.getElementById('player2').style.borderColor = redColor; 
    }
    counter = JSON.parse(localStorage.getItem('counter')) || 0;
    // if(counter === numOfCards){
    //     showResult();
    // }
    gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
}

function resetGame(){
    localStorage.clear();
    location.reload();
}

function showResult(){
    setTimeout(() => {
        window.location.href = 'gameResult.html';
    }, 800);
}

function createBoardItem(){
    const item = document.createElement('div');
    item.classList.add('board-item');

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');

    item.append(front, back);

    return item;
}

function createArrayOfNumbers(num){
    const numbers = [];
    for(let i=0 ; i<2 ; i++){
        for(let j=1 ; j<=num/2 ; j++){
            numbers.push(j);
        }
    }

    const shuffledArray = shuffleArray(numbers);
    console.log(shuffledArray);
    localStorage.setItem('shuffledArray', JSON.stringify(shuffledArray));
    return shuffledArray;
}

function flipCardOne(parentElemen){
    tempElemetOne = parentElemen;
    value1 = parentElemen.children[1].innerHTML;
    indexCard1 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
    parentElemen.classList.add('flipped'); 
    checkCard = true;
}

function flipCardTwo(parentElemen, color1, color2, numOfPlayer){
    value2 = parentElemen.children[1].innerHTML;
    indexCard2 = Array.from(document.getElementsByClassName('board-item')).indexOf(parentElemen);
    parentElemen.classList.add('flipped');

    let numbersSet = new Set(JSON.parse(localStorage.getItem('numbersSet')) || []);
    numbersSet.add(indexCard2);
    numbersSet.add(indexCard2);
    
    checkCard = false;
    if(value1 == value2){
        counter+=2;
        localStorage.setItem('counter', JSON.stringify(counter));
        let numbersSet = new Set(JSON.parse(localStorage.getItem('numbersSet')) || []);
        numbersSet.add(indexCard1);
        numbersSet.add(indexCard2);
        localStorage.setItem('numbersSet', JSON.stringify([...numbersSet]));  
    }else{
        setTimeout(() => {
            parentElemen.classList.remove('flipped');
            tempElemetOne.classList.remove('flipped'); 
        }, 500);
    }

    document.getElementById('player1').style.borderColor = color1; 
    document.getElementById('player2').style.borderColor = color2; 
    gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];
    gameHistory.push({player: numOfPlayer, option1: value1, option2: value2, card1: indexCard1, card2: indexCard2}); 
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}