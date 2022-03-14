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
// Event Listener when click
// Checks if: rockLeftPosition <= *MouseXPosition* <= rockLeftPosition + rockWidth
// Checks if: rockRightPosition <= *MouseYPosition* <= rockRightPosition + rockHeight
// true: remove rock
body.addEventListener('click', function (ev) {
    ev.stopPropagation();
    var _loop_1 = function (i) {
        if (ev.clientX >= getRockPosition(allRocks)[i]['leftPosition'] && ev.clientX <= getRockPosition(allRocks)[i]['leftPosition'] + allRocks[i].offsetWidth
            && ev.clientY >= getRockPosition(allRocks)[i]['topPosition'] && ev.clientY <= getRockPosition(allRocks)[i]['topPosition'] + allRocks[i].offsetHeight) {
            var whichImage = getRandomNumber(imgArray.length);
            allImages[i].src = imgArray[whichImage];
            allRocks[i].style.rotate = "0deg";
            allRocks[i].style.top = ev.clientY + "px";
            allRocks[i].style.left = ev.clientX + "px";
            allImages[i].style.animation = "none";
            allImages[i].style.width = "100px";
            allImages[i].style.height = "100px";
            var snap_1 = document.createElement('audio');
            snap_1.src = 'sounds/Snap.mp3';
            body.appendChild(snap_1);
            snap_1.play();
            setTimeout(function () {
                snap_1.remove();
                allRocks[i].remove();
            }, 500);
        }
    };
    for (var i = 0; i < allRocks.length; i++) {
        _loop_1(i);
    }
});
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
startGame();
setRandomRotation(allRocks);
setTimeout(startGame, 500);
setInterval(startGame, 5000);
