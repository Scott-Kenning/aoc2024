const fs = require('fs');

const field = fs.readFileSync('./example-input.txt', 'utf8').trim().split("\n").map(row => [...row]);

const directions = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
];

function checkLoop() {
    let x, y;

    for (let i = 0; i < field.length; i++) {
        const colIndex = field[i].indexOf('^');
        if (colIndex !== -1) {
            y = i;
            x = colIndex;
            break;
        }
    }

    let currentDirection = directions[0];

    const visitedLocations = new Set();
    
    const turn = () => {
        currentDirection = directions[(directions.indexOf(currentDirection) + 1) % 4];
    };
    
    while (
        y + currentDirection.y >= 0 &&
        y + currentDirection.y < field.length &&
        x + currentDirection.x >= 0 &&
        x + currentDirection.x < field[0].length
    ) {
        while (
            y + currentDirection.y >= 0 &&
            y + currentDirection.y < field.length &&
            x + currentDirection.x >= 0 &&
            x + currentDirection.x < field[0].length &&
            field[y + currentDirection.y][x + currentDirection.x] === '#'
        ) {
            turn();
        }
    
        x += currentDirection.x;
        y += currentDirection.y;
    
        const key = `${x},${y},${currentDirection.x},${currentDirection.y}`;
        if (!visitedLocations.has(key)) {
            visitedLocations.add(key);
        } else {
            return true
        }
    }

    return false
}
let loopCount = 0;

// This could be optimized by only checking squares visited in part 1
for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field.length; x++) {
        if(field[y][x] === '.') {
            field[y][x] = '#'
            if(checkLoop()) {
                loopCount++
            }
            field[y][x] = '.'
        }
    }
}

console.log(loopCount);
