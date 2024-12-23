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

if (!start || !end) {
    console.error('Start or end position not found in the maze.');
    process.exit(1);
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

const bfs = () => {
    const queue = new PriorityQueue();
    queue.enqueue(0, {
        x: start.x,
        y: start.y,
        direction: 'E',
        score: 0,
    });

    const visited = new Map();

    while (!queue.isEmpty()) {
        const { x, y, direction, score } = queue.dequeue();

        if (x === end.x && y === end.y) {
            return score;
        }

        const stateKey = `${x},${y},${direction}`;

        if (visited.has(stateKey) && visited.get(stateKey) <= score) {
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
            queue.enqueue(score + 1, { x: nx, y: ny, direction, score: score + 1 });
        }

        for (let i = -1; i <= 1; i += 2) {
            const newDirection = DIRECTIONS[
                (DIRECTIONS.indexOf(direction) + i + DIRECTIONS.length) % DIRECTIONS.length
            ];

            const newStateKey = `${x},${y},${newDirection}`;
            const newScore = score + 1000;

            if (!visited.has(newStateKey) || visited.get(newStateKey) > newScore) {
                queue.enqueue(newScore, { x, y, direction: newDirection, score: newScore });
            }
        }
    }

    return Infinity;
};

const lowestScore = bfs();
console.log(lowestScore);
