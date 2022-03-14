console.log('Connected!');
var body = document.querySelector('body');
var allRocks = document.querySelectorAll('.rock');
var rocksAmount = 10;
// Function is creating div elements based on argument passed
function generateRocks(rocksAmount) {
    while (rocksAmount > 0) {
        // Creaing new element 'div' => Represents as rock
        var newRock = document.createElement('div');
        // Added clas to newRock named 'rock'
        newRock.classList.add('rock');
        // appended newRock to body
        body.appendChild(newRock);
        rocksAmount--;
    }
}
function moveRocks() {
}
