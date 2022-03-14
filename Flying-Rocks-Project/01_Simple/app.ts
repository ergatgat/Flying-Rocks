console.log('Connected!');

const body:HTMLBodyElement = document.querySelector('body');
let allRocks:NodeList = document.querySelectorAll('.rock');

const rocksAmount:number = 10;

// Function is creating div elements based on argument passed
function generateRocks(rocksAmount:number){
    while(rocksAmount > 0){
        // Creaing new element 'div' => Represents as rock
        const newRock:HTMLDivElement = document.createElement('div');
        // Added clas to newRock named 'rock'
        newRock.classList.add('rock');
        // appended newRock to body
        body.appendChild(newRock)
        rocksAmount--;
    }
}

function moveRocks(){
    
}