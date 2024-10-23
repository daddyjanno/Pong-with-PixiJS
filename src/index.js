import { Application } from 'pixi.js'

console.log('Pong with PixiJS')

const app = new Application()
await app.init({
    resizeTo: window,
    antialias: true,
})
document.body.appendChild(app.canvas)
