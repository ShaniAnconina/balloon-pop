'use strict'
var gNextId = 1
var gBalloons
var gInterval


function onInit() {
    gBalloons = createBalloons(10)

    onStart()
    renderBalloons()
}

function renderBalloons() {
    var strHTML = ''
    for (var i = 0; i < gBalloons.length; i++) {
        const bgColor = getRandomColor()
        const left = i * 100
        strHTML += `\n<div style="background-color: ${bgColor}; left:${left}px" class="balloon" onclick="onPopBalloon(this)">${i + 1}</div>`
    }
    const elSky = document.querySelector('.sky')
    elSky.innerHTML = strHTML
}

function createBalloons(count) {
    const balloons = []
    for (var i = 0; i < count; i++) {
        const balloon = createBalloon()
        balloons.push(balloon)
    }

    return balloons
}

function createBalloon() {
    return {
        id: gNextId++,
        speed: getRandomInt(10, 30),
        bottom: 0,
        bgColor: getRandomColor()
    }
}

function onStart() {
    if (gInterval) clearInterval(gInterval)
    gInterval = setInterval(moveBalloons, 500);
}

function moveBalloons() {
    const elBalloons = document.querySelectorAll('.balloon')
    for (var i = 0; i < gBalloons.length; i++) {

        // MODEL
        var balloon = gBalloons[i]
        balloon.bottom += balloon.speed

        // DOM
        var elBalloon = elBalloons[i]
        elBalloon.style.bottom = balloon.bottom + 'px'

        if (balloon.bottom > 800) clearInterval(gInterval)
    }

}

function onPopBalloon(elBalloon) {
    elBalloon.style.opacity = 0.5
    var audio = new Audio('sound/pop.wav')
    audio.play()
    setTimeout(fadeBalloon, 300, elBalloon)
}

function fadeBalloon(elBalloon) {
    elBalloon.style.opacity = 0
}

///////////////////////////////////////////////////////////////////////////////////


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
