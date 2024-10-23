import { Graphics } from 'pixi.js'

export function createBall(radius, color) {
    const ball = new Graphics().circle(0, 0, radius).fill(color)
    return ball
}
