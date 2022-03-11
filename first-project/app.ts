const meteors:NodeList = document.querySelectorAll('.meteor')

// function gets meteors and returns each meteor position
function getMeteorPosition(meteors:NodeList):object{
    const ourMeteors:Array<object> = [];
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

function moveMeteors(meteors:NodeList){
    const bodyWidth = document.body.offsetWidth;
    const bodyHeight = document.body.offsetHeight;
    console.log(`bodyWidth: ${bodyWidth}, bodyHeight:${bodyHeight}`)
    meteors.forEach(element => {
        element.style.top = getRandomNumber(bodyHeight)+`px`
        element.style.left = getRandomNumber(bodyWidth)+`px`
    })
}

function getRandomNumber(max:number):number{
    let randNumber = Math.floor(Math.random() * max);
    if(randNumber > 100){
        randNumber -= 100;
    }
    console.log(randNumber)
    return randNumber;
}

