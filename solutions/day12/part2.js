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

        directions.forEach(direction => {
            const newX = x + direction.x;
            const newY = y + direction.y;

            if (isInBounds(newX, newY) && grid[newY][newX] === symbol && !regionSet.has(`${newX},${newY}`)) {
                regionSet.add(`${newX},${newY}`);
                stack.push({ x: newX, y: newY });
            }
        })
    }

    return regionSet;
}

function calculateSides(regionSet) {
    let totalSides = 0;

    regionSet.forEach(point => {
        const [x, y] = point.split(',').map(Number);
        let sides = 4;

        for (const { x: dx, y: dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;

            if (regionSet.has(`${newX},${newY}`)) {
                sides--;
            }
        }

        const leftX = x - 1;
        if (regionSet.has(`${leftX},${y}`)) {
            if (!regionSet.has(`${leftX},${y - 1}`) && !regionSet.has(`${x},${y - 1}`)) {
                sides--;
            }
            if (!regionSet.has(`${leftX},${y + 1}`) && !regionSet.has(`${x},${y + 1}`)) {
                sides--;
            }
        }
        
        const aboveY = y - 1;
        if (regionSet.has(`${x},${aboveY}`)) {
            if (!regionSet.has(`${x - 1},${aboveY}`) && !regionSet.has(`${x - 1},${y}`)) {
                sides--;
            }
            if (!regionSet.has(`${x + 1},${aboveY}`) && !regionSet.has(`${x + 1},${y}`)) {
                sides--;
            }
        }

        totalSides += sides;
    });
    
    return totalSides;
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
            const sides = calculateSides(regionSet);
            const price = area * sides;

            totalPrice += price;
        }
    }
}

console.log(totalPrice);
