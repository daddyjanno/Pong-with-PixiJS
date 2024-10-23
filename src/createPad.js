import { Graphics } from 'pixi.js'

export function createPad(width, height, color) {
    const pad = new Graphics()
        .rect(-width / 2, -height / 2, width, height)
        .fill(color)
    return pad
}
