const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

// Parse the initial warehouse state and moves
const warehouse = [];
let moves = '';
let robotPosition = null;
const boxPositions = new Set();

for (const line of input) {
    if (line.startsWith('#')) {
        warehouse.push(line.split(''));
    } else {
        moves += line.trim();
    }
}

for (let y = 0; y < warehouse.length; y++) {
    for (let x = 0; x < warehouse[y].length; x++) {
        if (warehouse[y][x] === '@') {
            robotPosition = { x, y };
        } else if (warehouse[y][x] === 'O') {
            boxPositions.add(`${x},${y}`);
        }
    }
}

const height = warehouse.length;
const width = warehouse[0].length;

const printRoom = () => {
    const room = warehouse.map(row => row.slice());
    for (const box of boxPositions) {
        const [x, y] = box.split(',').map(Number);
        room[y][x] = 'O';
    }
    room[robotPosition.y][robotPosition.x] = '@';
    console.log(room.map(row => row.join('')).join('\n'));
    console.log('\n');
};

const pushBoxes = (x, y, dx, dy) => {
    const nextX = x + dx;
    const nextY = y + dy;
    const boxKey = `${nextX},${nextY}`;

    if (warehouse[nextY][nextX] === '#' || boxPositions.has(boxKey)) {
        if (boxPositions.has(boxKey)) {
            const canPushFurther = pushBoxes(nextX, nextY, dx, dy);
            if (!canPushFurther) return false;
        } else {
            return false;
        }
    }

    boxPositions.delete(`${x},${y}`);
    boxPositions.add(`${nextX},${nextY}`);
    return true;
};

const moveRobot = (dx, dy) => {
    const nextX = robotPosition.x + dx;
    const nextY = robotPosition.y + dy;

    if (warehouse[nextY][nextX] === '#') {
        return;
    }

    const boxKey = `${nextX},${nextY}`;
    if (boxPositions.has(boxKey)) {
        const canPush = pushBoxes(nextX, nextY, dx, dy);
        if (!canPush) return;
    }

    warehouse[robotPosition.y][robotPosition.x] = '.'

    robotPosition.x = nextX;
    robotPosition.y = nextY;
};

for (const move of moves) {
    switch (move) {
        case '^':
            moveRobot(0, -1);
            break;
        case 'v':
            moveRobot(0, 1);
            break;
        case '<':
            moveRobot(-1, 0);
            break;
        case '>':
            moveRobot(1, 0);
            break;
    }
}

let gpsSum = 0;
for (const box of boxPositions) {
    const [x, y] = box.split(',').map(Number);
    gpsSum += 100 * y + x;
}

printRoom();

console.log(`Sum of all boxes' GPS coordinates: ${gpsSum}`);
