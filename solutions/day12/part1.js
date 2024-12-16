const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\r\n');

const grid = input.map(line => line.split(''));

const directions = [
    { x: 0, y: -1 }, 
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
];

function isInBounds(x, y) {
    return x >= 0 && y >= 0 && x < grid[0].length && y < grid.length;
}

function exploreRegion(startX, startY, symbol) {
    const regionSet = new Set();
    const stack = [{ x: startX, y: startY }];
    regionSet.add(`${startX},${startY}`);

    while (stack.length > 0) {
        const { x, y } = stack.pop();

        for (const { x: dx, y: dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (isInBounds(newX, newY) && grid[newY][newX] === symbol && !regionSet.has(`${newX},${newY}`)) {
                regionSet.add(`${newX},${newY}`);
                stack.push({ x: newX, y: newY });
            }
        }
    }

    return regionSet;
}

function calculatePerimeter(regionSet) {
    let perimeter = 0;

    regionSet.forEach(point => {
        const [x, y] = point.split(',').map(Number);
        let adjacentCount = 0;

        for (const { x: dx, y: dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (regionSet.has(`${newX},${newY}`)) {
                adjacentCount++;
            }
        }

        perimeter += (4 - adjacentCount);
    });

    return perimeter;
}

let totalPrice = 0;
const visited = new Set();

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        const symbol = grid[y][x];
        if (!visited.has(`${x},${y}`)) {
            const regionSet = exploreRegion(x, y, symbol);
            regionSet.forEach(point => visited.add(point));

            const area = regionSet.size;
            const perimeter = calculatePerimeter(regionSet);
            const price = area * perimeter;

            totalPrice += price;
        }
    }
}

console.log(totalPrice);
