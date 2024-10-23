import { Application } from 'pixi.js'
import { createBall } from './createBall'
import { createPad } from './createPad'

console.log('Pong with PixiJS')

const app = new Application()
await app.init({
    resizeTo: window,
    // width: window.innerWidth,
    // height: window.innerHeight,
    antialias: true,
})
document.body.appendChild(app.canvas)

let ball
let playerPad
let botPad
const mouse = { x: 0, y: 0 }
let gameStarted = false

function createGameParts() {
    ball = createBall(5, 0xffffff)
    ball.x = app.screen.width / 2
    ball.y = app.screen.height / 2
    app.stage.addChild(ball)

    playerPad = createPad(10, 50, 0xffffff)
    playerPad.x = 50
    playerPad.y = app.screen.height / 2
    app.stage.addChild(playerPad)

    botPad = createPad(10, 50, 0xffffff)
    botPad.x = app.screen.width - 50
    botPad.y = app.screen.height / 2
    app.stage.addChild(botPad)
}
createGameParts()

function bindEvents() {
    app.stage.eventMode = 'static'
    app.stage.hitArea = app.screen
    app.stage.on('pointermove', handleMove)
}

function handleMove(e) {
    mouse.x = e.global.x
    mouse.y = e.global.y
}
bindEvents()

app.ticker.add(() => {
    playerPad.y = mouse.y

    if (!gameStarted) {
        ball.y = playerPad.y
        ball.x = playerPad.x + 20
    }
})
