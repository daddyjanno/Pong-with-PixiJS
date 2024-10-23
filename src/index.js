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
let isPlayerTurn = false

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
    if (isPlayerTurn) {
        gameStarted = true
    }
}
bindEvents()

app.ticker.add(() => {
    playerPad.y = mouse.y
    botPad.y += (ball.y - botPad.y) * 0.095

    if (!gameStarted) {
        if (isPlayerTurn) {
            ball.x = playerPad.x + playerPad.width + 5
            ball.y = playerPad.y
            ball.velocity.x = Math.abs(ball.velocity.x)
            ball.velocity.y = 0
        } else {
            ball.x = botPad.x - botPad.width - 5
            ball.y = botPad.y
            ball.velocity.x = -ball.velocity.x
        }
    } else {
        ball.x += ball.velocity.x
        ball.y += ball.velocity.y

        // Collision ball walls left and right
        if (ball.x > app.screen.width) {
            console.log('Player wins')
            gameStarted = false
            isPlayerTurn = false
        } else if (ball.x < 0) {
            console.log('Bot wins')
            isPlayerTurn = true
            gameStarted = false
        }
        // Collision ball walls top and bottom
        if (
            ball.y < ball.height / 2 ||
            ball.y > app.screen.height - ball.height / 2
        ) {
            ball.velocity.y = -ball.velocity.y
        }

        // Collision ball and botPad
        if (
            ball.x + ball.width / 2 > botPad.x - ball.width &&
            ball.x + ball.width / 2 < botPad.x + botPad.width / 2
        ) {
            if (
                ball.y > botPad.y - botPad.height / 2 &&
                ball.y < botPad.y + botPad.height / 2
            ) {
                ball.velocity.x = -ball.velocity.x
                ball.velocity.y =
                    ((ball.y - botPad.y) / (botPad.height / 2)) * 10
            }
        }
        // Collision ball and playerPad
        if (
            ball.x - ball.width / 2 < playerPad.x + playerPad.width &&
            ball.x - ball.width / 2 > playerPad.x - playerPad.width / 2
        ) {
            if (
                ball.y > playerPad.y - playerPad.height / 2 &&
                ball.y < playerPad.y + playerPad.height / 2
            ) {
                ball.velocity.x = -ball.velocity.x
                ball.velocity.y =
                    ((ball.y - playerPad.y) / (playerPad.height / 2)) * 10
            }
        }
    }
})
