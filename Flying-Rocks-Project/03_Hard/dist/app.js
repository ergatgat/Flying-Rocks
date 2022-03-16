var body = document.querySelector('body');
var allRocks = document.querySelectorAll('.rock');
var allImages = document.querySelectorAll('img');
var imgArray = ["images/boom.png", "images/wow.png", "images/pow.png", "images/zap.png"];
body.style.backgroundImage = "url(images/Background.jpg)";
function startGame() {
    setRocksRandomPosition(allRocks);
}
// Function:
// Gets all rocks
// For each rock sets random position
function setRocksRandomPosition(rocks) {
    rocks.forEach(function (element) {
        element.style.left = getRandomPosition(rocks)[0] + "px"; //getRandomPosition(rocks)[0] -> rock X position
        element.style.top = getRandomPosition(rocks)[1] + "px"; //getRandomPosition(rocks)[0] -> rock Y position
    });
}
// Function:
// Returns array with random (X,Y) point
function getRandomPosition(rocks) {
    /* Explanation randomPosition varibale:
    // randomPosition is an array.
    // randomPosition[0] - Represents left/X axies (Random Value between 0 - body width)
    // randomPosition[1] - Represents top/Y axies (Random Value between 0 - body height)*/
    var randomPosition = [Math.floor(Math.random() * body.offsetWidth),
        Math.floor(Math.random() * body.offsetHeight)];
    // Loop over all rocks
    for (var i = 0; i < rocks.length; i++) {
        if (randomPosition[0] + getRockDimenstion(rocks)[i]['rockWidth'] > body.offsetWidth) {
            randomPosition[0] -= getRockDimenstion(rocks)[i]['rockWidth'];
        }
        if (randomPosition[1] + getRockDimenstion(rocks)[i]['rockHeight'] > body.offsetHeight) {
            randomPosition[1] -= getRockDimenstion(rocks)[i]['rockHeight'];
        }
    }
    return randomPosition;
    /* Explanation if statement:
    // if random X axies + rockWidth bigger than body width
    // true: reduce from random X axies the rockWidth
    // if random Y axies + rockHeight bigger than body height
    // true: reduce from random Y axies the rockHeight */
}
// Function:
// Gets all rocks
// Returns rock object represents:
// rockWidth , rockHeight
function getRockDimenstion(rocks) {
    var rockArray = [];
    rocks.forEach(function (element) {
        var rock = {
            'rockWidth': element.offsetWidth,
            'rockHeight': element.offsetHeight
        };
        rockArray.push(rock);
    });
    return rockArray;
}
// Function
// Gets all rocks
// return rock object represents:
// leftPosition, rightPosition, topPoistion, bottomPoistion
function getRockPosition(rocks) {
    var ourRocks = [];
    rocks.forEach(function (element) {
        var rock = {
            'leftPosition': element.getBoundingClientRect().left,
            'rightPosition': element.getBoundingClientRect().right,
            'topPosition': element.getBoundingClientRect().top,
            'bottomPosition': element.getBoundingClientRect().bottom,
            'display': true
        };
        ourRocks.push(rock);
    });
    return ourRocks;
}
// Function
// Gets all rocks
// Sets each rock in random rotation between 0 to 360deg
function setRandomRotation(rocks) {
    rocks.forEach(function (element) {
        element.style.rotate = Math.floor(Math.random() * 360) + "deg";
    });
}
// Function:
// Gets number to be max
// Returns number between 0 - max(number)//
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
// Function:
// Gets index(number) -> in this case the number of element that was clicked
// Setting:
// 1. Random Explotion Image
// 2. Rotation of rock to 0
// 3. Width of Explotion to 100px width and height
// 4. Remove Element was clicked
function addPictureSoundAndRemove(index) {
    var randomImage = getRandomNumber(imgArray.length); // Get random number to chose which image
    var snap = document.createElement('audio'); // Creating HTML Audio Element
    allRocks[index].style.rotate = "0deg"; // Set the rock rotatation to 0
    allImages[index].src = imgArray[randomImage]; // Set the image to randomImage from the Array
    allImages[index].style.animation = "none"; // Stopping Animation Rotation
    allImages[index].style.width = "100px"; // Setting Image Width to 100px
    allImages[index].style.height = "100px"; // Setting Image Height to 100px
    snap.src = 'sounds/Snap.mp3'; // Setting the sound to Snap
    snap.play(); // Playing the sound
    setTimeout(function () {
        allRocks[index].remove(); // After 500ms remove rock that was clicked
        clicked = false;
    }, 500);
}
var mouseClick = 0;
var bombArray = [];
function createBomb(ev) {
    console.log(ev);
    var bomb = document.createElement('div');
    bomb.classList.add('bomb');
    bombArray.push(bomb);
    bomb.style.top = ev.clientY + "px";
    bomb.style.left = ev.clientX + "px";
    body.appendChild(bomb);
    return bombArray;
}
function checkCollision(bombs, rocks) {
    for (var i = 0; i < allRocks.length; i++) {
        for (var j = 0; j < bombArray.length; j++) {
            if (rocks[i]['leftPosition'] >= bombs[j].style.left &&
                rocks[i]['leftPosition'] <= bombs[j].style.left + bombs[j].offsetWidth) { // X to the right, check to Y option
                if (rocks[i]['topPosition'] >= bombs[j].style.top &&
                    rocks[i]['topPosition'] <= bombs[j].style.top + bombs[j].offsetHeight) {
                    console.log("Boom!");
                }
                else if (rocks[i]['topPosition'] + rocks[i].offsetWidth >= bombs[j].style.top &&
                    rocks[i]['topPositio'])
                    ;
            }
        }
    }
}
// Event Listener when click
// Checks if: rockLeftPosition <= *MouseXPosition* <= rockLeftPosition + rockWidth
// Checks if: rockRightPosition <= *MouseYPosition* <= rockRightPosition + rockHeight
// true: remove rock
body.addEventListener('click', function (ev) {
    ev.stopPropagation();
    createBomb(ev);
});
startGame();
setRandomRotation(allRocks);
setTimeout(startGame, 500);
setInterval(startGame, 5000);
