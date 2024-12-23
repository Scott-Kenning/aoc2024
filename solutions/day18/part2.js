const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

const bytePositions = input.map(line => line.split(',').map(Number));

const GRID_SIZE = 70;
const START = [0, 0];
const END = [GRID_SIZE, GRID_SIZE];

const grid = Array.from({ length: GRID_SIZE + 1 }, () => Array(GRID_SIZE + 1).fill('.'));

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
        const [x, y, steps, path] = queue.shift();

        if (x === end[0] && y === end[1]) {
            return { steps: steps + 1, path: [...path, [x, y]] };
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
                queue.push([nx, ny, steps + 1, [...path, [x, y]]]);
                visited.add(`${nx},${ny}`);
            }
        }
    }

    return { steps: -1, path: [] };
}

for (let i = 0; i < bytePositions.length; i++) {
    const [x, y] = bytePositions[i];
    grid[y][x] = '#';
    if (bfs(grid, START, END).steps === -1) {
        console.log(`${x},${y}`)
        break;
    }
}