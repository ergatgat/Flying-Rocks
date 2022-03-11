var meteors = document.querySelectorAll('.meteor');
// function gets meteors and returns each meteor position
function getMeteorPosition(meteors) {
    var ourMeteors = [];
    meteors.forEach(function (element) {
        var meteor = {
            leftPosition: element.getBoundingClientRect().left,
            rightPosition: element.getBoundingClientRect().right,
            topPosition: element.getBoundingClientRect().top,
            bottomPosition: element.getBoundingClientRect().bottom
        };
        ourMeteors.push(meteor);
    });
    return ourMeteors;
}
function moveMeteors(meteors) {
    var bodyWidth = document.body.offsetWidth;
    var bodyHeight = document.body.offsetHeight;
    console.log("bodyWidth: " + bodyWidth + ", bodyHeight:" + bodyHeight);
    meteors.forEach(function (element) {
        element.style.top = getRandomNumber(bodyHeight) + "px";
        element.style.left = getRandomNumber(bodyWidth) + "px";
    });
}
function getRandomNumber(max) {
    var randNumber = Math.floor(Math.random() * max);
    if (randNumber > 100) {
        randNumber -= 100;
    }
    console.log(randNumber);
    return randNumber;
}
