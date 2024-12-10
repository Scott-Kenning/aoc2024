const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const grid = data.trim().split('\n');

const gridHeight = grid.length
const gridWidth = grid[0].length

let matches = 0;

function getChar(x, y) {
    if (!(x < 0 || x >= gridWidth || y < 0 || y >= gridHeight)) {
        return grid[y][x];
    }
}

for(y=0; y < gridHeight; y++) {
    for (x=0; x < gridWidth; x++) {
        if (grid[y][x] !== 'A') continue;

        const word1 = getChar(x - 1, y + 1) + 'A' + getChar(x + 1, y - 1);
        const word2 = getChar(x + 1, y + 1 ) + 'A' + getChar(x - 1, y - 1);

        if ((word1 === 'MAS' || word1 === 'SAM') && (word2 === 'MAS' || word2 === 'SAM')) matches++;
    }
}

console.log(matches)