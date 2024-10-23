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
    ball.velocity = {
        x: 10,
        y: 0,
    }
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
    app.stage.on('pointermove', handleMove).on('pointerdown', handleClick)
}

function handleMove(e) {
    mouse.x = e.global.x
    mouse.y = e.global.y
}
function handleClick() {
    gameStarted = true
}
bindEvents()

app.ticker.add(() => {
    playerPad.y = mouse.y

    if (!gameStarted) {
        ball.y = playerPad.y
        ball.x = playerPad.x + playerPad.width
        ball.velocity.x = Math.abs(ball.velocity.x)
    } else {
        ball.x += ball.velocity.x
        ball.y += ball.velocity.y

        // Collision ball and walls
        if (ball.x > app.screen.width) {
            console.log('Player wins')
            gameStarted = false
        } else if (ball.x < 0) {
            console.log('Bot wins')
            gameStarted = false
        }

        // Collision ball and botPad
        if (ball.x + ball.width / 2 > botPad.x - ball.width) {
            if (
                ball.y > botPad.y - botPad.height / 2 &&
                ball.y < botPad.y + botPad.height / 2
            ) {
                ball.velocity.x = -ball.velocity.x
            }
        }
        // Collision ball and playerPad
        if (ball.x - ball.width / 2 < playerPad.x + playerPad.width) {
            if (
                ball.y > playerPad.y - playerPad.height / 2 &&
                ball.y < playerPad.y + playerPad.height / 2
            ) {
                ball.velocity.x = Math.abs(ball.velocity.x)
            }
        }
    }
})
