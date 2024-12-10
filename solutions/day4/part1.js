const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const grid = data.trim().split('\n');

const gridHeight = grid.length
const gridWidth = grid[0].length

const directions = [
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
    { x: -1, y: -1 }
]

let matches = 0;

for(y=0; y < gridHeight; y++) {
    for (x=0; x < gridWidth; x++) {
        if (grid[y][x] !== 'X') continue;

        matches += directions.reduce((sum, direction) => {
            let word = 'X';
            let curX = x, curY = y;

            for(i=0; i<3; i++) {
                curX += direction.x
                curY += direction.y

                if (!(curX < 0 || curX >= gridWidth || curY < 0 || curY >= gridHeight)) {
                    word += grid[curY][curX]
                }
            }

            return sum + (word === 'XMAS' ? 1 : 0);
        }, 0)
    }
}

console.log(matches)