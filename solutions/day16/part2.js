const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

const maze = input.map(line => line.split(''));
const height = maze.length;
const width = maze[0].length;

const DIRECTIONS = ['E', 'S', 'W', 'N'];
const DELTAS = {
    E: { dx: 1, dy: 0 },
    S: { dx: 0, dy: 1 },
    W: { dx: -1, dy: 0 },
    N: { dx: 0, dy: -1 },
};

let start = null;
let end = null;

for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (maze[y][x] === 'S') start = { x, y };
        if (maze[y][x] === 'E') end = { x, y };
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(priority, item) {
        this.elements.push({ priority, item });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.elements.shift().item;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

const explorePaths = () => {
    const queue = new PriorityQueue();
    queue.enqueue(0, {
        x: start.x,
        y: start.y,
        direction: 'E',
        score: 0,
        path: []
    });

    let minScore = Infinity;
    const bestPaths = [];
    const visited = new Map();

    while (!queue.isEmpty()) {
        const { x, y, direction, score, path } = queue.dequeue();
        const newPath = [...path, `${x},${y}`];

        if (x === end.x && y === end.y) {
            if (score < minScore) {
                minScore = score;
                bestPaths.length = 0;
            }
            if (score === minScore) {
                bestPaths.push(newPath);
            }
            continue;
        }

        const stateKey = `${x},${y},${direction}`;
        if (visited.has(stateKey) && visited.get(stateKey) < score) {
            continue;
        }
        visited.set(stateKey, score);

        const { dx, dy } = DELTAS[direction];
        const nx = x + dx;
        const ny = y + dy;

        if (
            nx >= 0 &&
            nx < width &&
            ny >= 0 &&
            ny < height &&
            maze[ny][nx] !== '#'
        ) {
            queue.enqueue(score + 1, {
                x: nx,
                y: ny,
                direction,
                score: score + 1,
                path: newPath
            });
        }

        for (const i of [-1, 1]) {
            const newDirection = DIRECTIONS[
                (DIRECTIONS.indexOf(direction) + i + DIRECTIONS.length) % DIRECTIONS.length
            ];
            queue.enqueue(score + 1000, {
                x,
                y,
                direction: newDirection,
                score: score + 1000,
                path: newPath
            });
        }
    }

    return { minScore, bestPaths };
};

const { minScore, bestPaths } = explorePaths();

const bestPathTiles = new Set();
bestPaths.forEach(path => {
    path.forEach(tile => bestPathTiles.add(tile));
});

let pathCount = 0;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (bestPathTiles.has(`${x},${y}`)) {
            maze[y][x] = 'O';
            pathCount++;
        }
    }
}

const mazeWithPaths = maze.map(row => row.join('')).join('\n');
console.log(mazeWithPaths);
console.log(pathCount);
