console.log("hi");
var meteor1 = document.querySelector('.elm1');
var meteor2 = document.querySelector('.elm2');
var meteor1Pos = {
    leftPosition: meteor1.getBoundingClientRect().x,
    rightPosition: meteor1.getBoundingClientRect().right,
    topPosition: meteor1.getBoundingClientRect().y,
    bottomPosition: meteor1.getBoundingClientRect().bottom
};
var meteor2Pos = {
    leftPosition: meteor2.getBoundingClientRect().x,
    rightPosition: meteor2.getBoundingClientRect().right,
    topPosition: meteor2.getBoundingClientRect().y,
    bottomPosition: meteor2.getBoundingClientRect().bottom
};
if (meteor2Pos.leftPosition >= meteor1Pos.leftPosition && meteor2Pos.leftPosition <= meteor1Pos.rightPosition) {
    if (meteor2Pos.topPosition <= meteor1Pos.bottomPosition && meteor2Pos.topPosition >= meteor1Pos.topPosition) {
        console.log("overlap");
    }
    else {
        console.log("X over lap, y no");
    }
}
else if (meteor1Pos.leftPosition >= meteor2Pos.leftPosition && meteor1Pos.leftPosition <= meteor2Pos.rightPosition) {
    if (meteor1Pos.bottomPosition <= meteor2Pos.bottomPosition && meteor1Pos.bottomPosition >= meteor2Pos.topPosition) {
        console.log("overlap");
    }
    else {
        console.log("2 X over lap, y no");
    }
}
else {
    console.log("no overlap");
}
console.log(meteor1Pos, meteor2Pos);
