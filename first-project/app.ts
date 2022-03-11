const meteors:NodeList = document.querySelectorAll('.meteor')

const body:HTMLBodyElement = document.querySelector('body')

// function gets meteors and returns each meteor position
function getMeteorPosition(meteors: NodeList): object {
    const ourMeteors: Array<object> = [];
    meteors.forEach(element => {
        const meteor = {
            leftPosition: element.getBoundingClientRect().left,
            rightPosition: element.getBoundingClientRect().right,
            topPosition: element.getBoundingClientRect().top,
            bottomPosition: element.getBoundingClientRect().bottom,
        }
        ourMeteors.push(meteor)
    })
    return ourMeteors;
}

// function moves meteors individually
function moveMeteors() {
    setInterval(checkCollision,100)
    const bodyWidth = document.body.offsetWidth;
    const bodyHeight = document.body.offsetHeight;
    meteors.forEach(element => {
        element.style.top = getRandomNumber(bodyHeight) + `px`
        element.style.left = getRandomNumber(bodyWidth) + `px`
    })
}

function checkCollision() {
    // Check if meteor[i] collid meteor[i+1]
    const meteorPosition: Array<object> = getMeteorPosition(meteors)
    for (let i = 0; i < meteorPosition.length; i++) {
        for (let j = 1; j < meteorPosition.length; j++) {
            if (i === j) {
                break;
            } else if (meteorPosition[i].leftPosition >= meteorPosition[j].leftPosition &&
                meteorPosition[i].leftPosition <= meteorPosition[j].rightPosition) {
                if (meteorPosition[i].topPosition >= meteorPosition[j].topPosition &&
                    meteorPosition[i].topPosition <= meteorPosition[j].bottomPosition) {
                    // Add Explostion and Remove divs
                    console.log(`${i} and ${j} Are overlapping at X and Y`)
                        

                } else if (meteorPosition[i].bottomPosition >= meteorPosition[j].topPosition &&
                    meteorPosition[i].bottomPosition <= meteorPosition[j].bottomPosition) {
                    // Add Explostion and Remove divs
                    console.log(`${i} and ${j} Are overlapping at X and Y`)

                }
            } else if (meteorPosition[i].rightPosition >= meteorPosition[j].leftPosition &&
                meteorPosition[i].rightPosition <= meteorPosition[j].rightPosition) {
                if (meteorPosition[i].bottomPosition >= meteorPosition[j].topPosition &&
                    meteorPosition[i].bottomPosition <= meteorPosition[j].bottomPosition) {
                    // Add Explostion and Remove divs
                    console.log(`${i} and ${j} Are overlapping at X and Y`)


                } else if (meteorPosition[i].topPosition >= meteorPosition[j].topPosition &&
                    meteorPosition[i].topPosition <= meteorPosition[j].bottomPosition) {
                    // Add Explostion and Remove divs
                    console.log(`${i} and ${j} Are overlapping at X and Y`)


                }
            } else {
                console.log('no overlap')
            }

        }
    }
}

function getRandomNumber(max: number): number {
    let randNumber = Math.floor(Math.random() * max);
    if (randNumber > 100) {
        randNumber -= 100;
    }
    return randNumber;
}

setInterval(moveMeteors,5000)

