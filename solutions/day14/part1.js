const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

const robots = input.map(line => {
    const match = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/);
    return {
        px: parseInt(match[1], 10),
        py: parseInt(match[2], 10),
        vx: parseInt(match[3], 10),
        vy: parseInt(match[4], 10)
    };
});

const width = 101;
const height = 103;

let topLeft = 0;
let topRight = 0;
let bottomLeft = 0;
let bottomRight = 0;

robots.forEach(robot => {
    const finalX = (robot.px + (robot.vx * 100)) % width;
    const finalY = (robot.py + (robot.vy * 100)) % height;

    const wrappedX = finalX < 0 ? finalX + width : finalX;
    const wrappedY = finalY < 0 ? finalY + height : finalY;

    if (wrappedX === Math.floor(width / 2) || wrappedY === Math.floor(height / 2)) {
        return;
    }

    if (wrappedX < Math.floor(width / 2) && wrappedY < Math.floor(height / 2)) {
        topLeft++;
    } else if (wrappedX >= Math.floor(width / 2) && wrappedY < Math.floor(height / 2)) {
        topRight++;
    } else if (wrappedX < Math.floor(width / 2) && wrappedY >= Math.floor(height / 2)) {
        bottomLeft++;
    } else if (wrappedX >= Math.floor(width / 2) && wrappedY >= Math.floor(height / 2)) {
        bottomRight++;
    }
});

console.log(topLeft * topRight * bottomLeft * bottomRight);
