console.log('Connected!');

const body = document.querySelector('body')
const box:HTMLDivElement = document.querySelector('#box')

body.addEventListener('mousemove', (ev) => {
    const middleElementX = ev.clientX - 50;
    const topElementY = ev.clientY - 50;
    box.style.left = `${middleElementX}px`;
    box.style.top = `${topElementY}px`;
})

