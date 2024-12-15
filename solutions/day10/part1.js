const fs = require('fs');

const grid = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\r\n').map(row => row.split('').map(Number));

const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
];

let sum = 0;

function checkInBounds(x, y) {
    return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}

function checkPositionRecursive(x, y, seekNum, visitedForZero) {
    directions.forEach(direction => {
        const newX = x + direction.x;
        const newY = y + direction.y;

        if (checkInBounds(newX, newY) && grid[newY][newX] === seekNum) {
            const positionKey = `${newX},${newY}`;

            if (seekNum === 9) {
                if (!visitedForZero.has(positionKey)) {
                    visitedForZero.add(positionKey);
                    sum++;
                }
            } else {
                checkPositionRecursive(newX, newY, seekNum + 1, visitedForZero);
            }
        }
    });
}

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === 0) {
            const visitedForZero = new Set();
            checkPositionRecursive(x, y, 1, visitedForZero);
        }
    }
}

console.log(sum);
