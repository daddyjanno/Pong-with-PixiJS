import { Application } from 'pixi.js'

console.log('Pong with PixiJS')

const app = new Application()
await app.init({
    resizeTo: window,
})
document.body.appendChild(app.canvas)
