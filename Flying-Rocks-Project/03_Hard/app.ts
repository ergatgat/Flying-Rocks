const body: HTMLBodyElement = document.querySelector('body');
const allRocks: NodeListOf<HTMLDivElement> = document.querySelectorAll('.rock');
const allImages: NodeListOf<HTMLImageElement> = document.querySelectorAll('img');
const imgArray: Array<string> = ["images/boom.png", "images/wow.png", "images/pow.png", "images/zap.png"];
const bombArray: Array<HTMLDivElement> = []; // Array that holds each bomb
body.style.backgroundImage = `url(images/Background.jpg)`

function startGame() {
    setRocksRandomPosition(allRocks);
}

// Function:
// Gets all rocks
// For each rock sets random position
function setRocksRandomPosition(rocks: NodeListOf<HTMLDivElement>) {
    rocks.forEach(element => {
        element.style.left = `${getRandomPosition(rocks)[0]}px` //getRandomPosition(rocks)[0] -> rock X position
        element.style.top = `${getRandomPosition(rocks)[1]}px` //getRandomPosition(rocks)[0] -> rock Y position
    })
}

// Function:
// Returns array with random (X,Y) point
function getRandomPosition(rocks: NodeListOf<HTMLDivElement>): Array<number> {

    /* Explanation randomPosition varibale:
    // randomPosition is an array.
    // randomPosition[0] - Represents left/X axies (Random Value between 0 - body width)
    // randomPosition[1] - Represents top/Y axies (Random Value between 0 - body height)*/

    const randomPosition =
        [Math.floor(Math.random() * body.offsetWidth),
        Math.floor(Math.random() * body.offsetHeight)];

    // Loop over all rocks
    for (let i = 0; i < rocks.length; i++) {
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
function getRockDimenstion(rocks: NodeListOf<HTMLDivElement>): Array<object> {
    const rockArray: Array<object> = [];
    rocks.forEach(element => {
        const rock = {
            'rockWidth': element.offsetWidth,
            'rockHeight': element.offsetHeight,
        }
        rockArray.push(rock);
    })
    return rockArray;
}

// Function
// Gets all rocks
// return rock object represents:
// leftPosition, rightPosition, topPoistion, bottomPoistion
function getRockPosition(rocks: NodeListOf<HTMLDivElement>): Array<object> {
    const ourRocks: Array<object> = [];
    rocks.forEach(element => {
        const rock = {
            'leftPosition': element.getBoundingClientRect().left,
            'rightPosition': element.getBoundingClientRect().right,
            'topPosition': element.getBoundingClientRect().top,
            'bottomPosition': element.getBoundingClientRect().bottom,
            'display': true
        }
        ourRocks.push(rock);
    })
    return ourRocks;
}

// Function
// Gets all rocks
// Sets each rock in random rotation between 0 to 360deg
function setRandomRotation(rocks: NodeListOf<HTMLDivElement>) {
    rocks.forEach(element => {
        // element.style.rotate = `${Math.floor(Math.random() * 360)}deg`
        element.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`
    })
}

// Function:
// Gets number to be max
// Returns number between 0 - max(number)//
function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
}

// Function:
// Gets rocks index number and bomb index
// removes rock and bomb at indexes given
function removeRockAndBomb(rockIndex: number, bombIndex: number) {
    allRocks[rockIndex].remove()
    bombArray[bombIndex].remove()
}

// Function:
// Gets rock index number
// Creates a new div and append it to body,
// Gives div the X,Y of rock
// Add image to div, and append it to it
// Add source to the image
// Remove div after 0.5 seconds
function createExplotion(rockIndex: number) {
    const rockPosition = getRockPosition(allRocks)[rockIndex];
    const explotion = document.createElement('div');
    body.append(explotion)
    explotion.classList.add('explode-holder')
    explotion.style.left = `${rockPosition['leftPosition']}px`
    explotion.style.top = `${rockPosition['topPosition']}px`
    const explotionImage = document.createElement('img');
    explotion.append(explotionImage)
    explotionImage.classList.add('explode-image')
    const randomIndex = getRandomNumber(imgArray.length)
    explotionImage.src = imgArray[randomIndex]
    setTimeout(() => {
        explotion.remove()
    }, 500);
}

// Function
// Gets mouse event
// Creates:
// 1. bombHolder => div Element
// 2. bombImage => image Element
// 3. Sets bombHolder Position to Mouse click
// Returns: bombArray => array with all bombs (divs)//
function createBomb(ev: MouseEvent) {
    const bomb: HTMLDivElement = document.createElement('div'); // Creating div element 
    bomb.classList.add('bomb-holder'); // Adding class to div
    bombArray.push(bomb);// Appending bomb to bombArray
    body.appendChild(bomb); // Appending bomb to body

    const bombImage = document.createElement('img'); // Creating img element
    bombImage.classList.add('bomb-image'); // Adding class to img
    bombImage.src = "images/Mine.png"; // Setting image src to mine
    bomb.appendChild(bombImage); // Appending bombImage to bombHodler

    const bombCenterHeight = ev.clientY - (bomb.offsetHeight) / 2; // calc center height
    const bombCenterWidth = ev.clientX - (bomb.offsetWidth) / 2; // clac center width

    bomb.style.top = `${bombCenterHeight}px`; // Setting bomb in the center height
    bomb.style.left = `${bombCenterWidth}px`; // Setting bomb in the center width
    return bombArray;
}

// Function:
// Gets bombs array
// Check collision between rocks array and bombs
// True:
//      Run create explotion
//      Run remove rock
function checkCollision(bombs: Array<HTMLDivElement>) {
    for (let i = 0; i < allRocks.length; i++) {
        for (let j = 0; j < bombArray.length; j++) {
            if (getRockPosition(allRocks)[i]['leftPosition'] >= parseInt(bombs[j].style.left) &&
                getRockPosition(allRocks)[i]['leftPosition'] <= parseInt(bombs[j].style.left) + bombs[j].offsetWidth) { // X to the right, check to Y option
                if (getRockPosition(allRocks)[i]['topPosition'] >= parseInt(bombs[j].style.top) &&
                    getRockPosition(allRocks)[i]['topPosition'] <= parseInt(bombs[j].style.top) + bombs[j].offsetHeight) {
                    createExplotion(i)
                    removeRockAndBomb(i, j)
                }
                else if (getRockPosition(allRocks)[i]['bottomPosition'] >= parseInt(bombs[j].style.top) &&
                    getRockPosition(allRocks)[i]['bottomPosition'] <= parseInt(bombs[j].style.top) + bombs[j].offsetHeight) {
                    createExplotion(i)
                    removeRockAndBomb(i, j)
                }
            }
            else if (getRockPosition(allRocks)[i]['rightPosition'] >= parseInt(bombs[j].style.left) &&
                getRockPosition(allRocks)[i]['rightPosition'] <= parseInt(bombs[j].style.left) + bombs[j].offsetWidth) {
                if (getRockPosition(allRocks)[i]['topPosition'] >= parseInt(bombs[j].style.top) &&
                    getRockPosition(allRocks)[i]['topPosition'] <= parseInt(bombs[j].style.top) + bombs[j].offsetHeight) {
                    createExplotion(i)
                    removeRockAndBomb(i, j)
                }
                else if (getRockPosition(allRocks)[i]['bottomPosition'] >= parseInt(bombs[j].style.top) &&
                    getRockPosition(allRocks)[i]['bottomPosition'] <= parseInt(bombs[j].style.top) + bombs[j].offsetHeight) {
                    createExplotion(i)
                    removeRockAndBomb(i, j)
                }
            }
            // else {
            //     console.log('no go')
            // }
        }
    }
}

// Function:
// Runs check collision with bombs array for set interval
function mineDetection() {
    checkCollision(bombArray)
}


// Event Listener when click
// Checks if: rockLeftPosition <= *MouseXPosition* <= rockLeftPosition + rockWidth
// Checks if: rockRightPosition <= *MouseYPosition* <= rockRightPosition + rockHeight
// true: remove rock
body.addEventListener('click', (ev) => {
    ev.stopPropagation();
    createBomb(ev)
})


startGame();
setRandomRotation(allRocks);
setTimeout(startGame, 500);
setInterval(startGame, 5000);
setInterval(mineDetection, 100)
