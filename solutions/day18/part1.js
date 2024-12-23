const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

const bytePositions = input.map(line => line.split(',').map(Number));

const GRID_SIZE =70;
const START = [0, 0];
const END = [GRID_SIZE, GRID_SIZE];

const grid = Array.from({ length: GRID_SIZE + 1 }, () => Array(GRID_SIZE + 1).fill('.'));

for (let i = 0; i < Math.min(1024, bytePositions.length); i++) {
    const [x, y] = bytePositions[i];
    grid[y][x] = '#'; 
}

const DIRECTIONS = [
    [0, 1], 
    [1, 0],
    [0, -1], 
    [-1, 0]
];

function bfs(grid, start, end) {
    const queue = [[...start, 0, []]];
    const visited = new Set();
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();

        if (x === end[0] && y === end[1]) {
            return steps + 1;
        }

        for (const [dx, dy] of DIRECTIONS) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && nx <= GRID_SIZE &&
                ny >= 0 && ny <= GRID_SIZE &&
                grid[ny][nx] === '.' &&
                !visited.has(`${nx},${ny}`)
            ) {
                queue.push([nx, ny, steps + 1]);
                visited.add(`${nx},${ny}`);
            }
        }
    }

    return -1;
}

const result = bfs(grid, START, END);
console.log(result - 1);
