import { Application, Graphics } from 'pixi.js'

console.log('Pong with PixiJS')

const app = new Application()
await app.init({
    resizeTo: window,
    antialias: true,
})
document.body.appendChild(app.canvas)

function createGameParts() {
    const ball = createBall(5, 0xffffff)
    ball.x = app.screen.width / 2
    ball.y = app.screen.height / 2
    app.stage.addChild(ball)

    const playerPad = createPad(10, 50, 0xffffff)
    playerPad.x = 50
    playerPad.y = app.screen.height / 2
    app.stage.addChild(playerPad)

    const botPad = createPad(10, 50, 0xffffff)
    botPad.x = app.screen.width - 50
    botPad.y = app.screen.height / 2
    app.stage.addChild(botPad)
}

function createBall(radius, color) {
    const ball = new Graphics().circle(0, 0, radius).fill(color)
    return ball
}

function createPad(width, height, color) {
    const pad = new Graphics()
        .rect(-width / 2, -height / 2, width, height)
        .fill(color)
    return pad
}

createGameParts()
