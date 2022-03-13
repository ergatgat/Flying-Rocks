console.log('Connected!');
var body = document.querySelector('body');
var box = document.querySelector('#box');
body.addEventListener('mousemove', function (ev) {
    var middleElementX = ev.clientX - 50;
    var topElementY = ev.clientY - 50;
    box.style.left = middleElementX + "px";
    box.style.top = topElementY + "px";
});
