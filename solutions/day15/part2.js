const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

const warehouse = [];
let moves = '';

for (const line of input) {
    if (line.startsWith('#')) {
        warehouse.push(line.split(''));
    } else {
        moves += line.trim();
    }
}

const scaledWarehouse = [];

for (const row of warehouse) {
    const scaledRow = [];
    for (const tile of row) {
        switch (tile) {
            case '#':
                scaledRow.push('#', '#');
                break;
            case 'O':
                scaledRow.push('[', ']');
                break;
            case '.':
                scaledRow.push('.', '.');
                break;
            case '@':
                scaledRow.push('@', '.');
                break;
        }
    }
    scaledWarehouse.push(scaledRow);
}

let robotPosition = null;

for (let y = 0; y < scaledWarehouse.length; y++) {
    for (let x = 0; x < scaledWarehouse[y].length; x++) {
        const tile = scaledWarehouse[y][x];
        if (tile === '@') {
            robotPosition = { x, y };
        }
    }
}

const height = scaledWarehouse.length;
const width = scaledWarehouse[0].length;

const printWarehouse = () => {
    const room = scaledWarehouse.map(row => row.join('')).join('\n');
    console.log(room);
    console.log('\n');
};

const canMoveBoxVertical = (boxRow, boxCol, deltaRow) => {
    if (scaledWarehouse[boxRow][boxCol] === ']') {
        boxCol -= 1;
    }

    const futureRow = boxRow + deltaRow;
    const futureSpotLeft = scaledWarehouse[futureRow][boxCol];
    const futureSpotRight = scaledWarehouse[futureRow][boxCol + 1];

    if (futureSpotLeft === '#' || futureSpotRight === '#') {
        return false;
    }

    if (scaledWarehouse[futureRow] &&
        (scaledWarehouse[futureRow][boxCol] === '[' || scaledWarehouse[futureRow][boxCol] === ']') &&
        !canMoveBoxVertical(futureRow, boxCol, deltaRow)) {
        console.log('false1')
        return false;
    }
    
    if (scaledWarehouse[futureRow] &&
        (scaledWarehouse[futureRow][boxCol + 1] === '[' || scaledWarehouse[futureRow][boxCol + 1] === ']') &&
        !canMoveBoxVertical(futureRow, boxCol + 1, deltaRow)) {
        console.log('false2')
        return false;
    }

    console.log('true')
    return true;
};

const moveBoxVertical = (boxRow, boxCol, deltaRow) => {
    if (scaledWarehouse[boxRow][boxCol] === ']') {
        boxCol -= 1;
    }

    const futureRow = boxRow + deltaRow;

    if (scaledWarehouse[futureRow] &&
        (scaledWarehouse[futureRow][boxCol] === '[' || scaledWarehouse[futureRow][boxCol] === ']')) {
        moveBoxVertical(futureRow, boxCol, deltaRow);
    }

    if (scaledWarehouse[futureRow] &&
        (scaledWarehouse[futureRow][boxCol + 1] === '[' || scaledWarehouse[futureRow][boxCol + 1] === ']')) {
        moveBoxVertical(futureRow, boxCol + 1, deltaRow);
    }

    scaledWarehouse[boxRow][boxCol] = '.';
    scaledWarehouse[boxRow][boxCol + 1] = '.';
    scaledWarehouse[futureRow][boxCol] = '[';
    scaledWarehouse[futureRow][boxCol + 1] = ']';
};

const moveBoxHorizontal = (botRow, botCol, deltaCol) => {
    let futureCol = botCol;

    while (true) {
        futureCol += deltaCol;

        const futureSpot = scaledWarehouse[botRow][futureCol];

        if (futureSpot === '#') {
            return false;
        }

        if (futureSpot === '.') {
            break;
        }
    }

    while (true) {
        const previousCol = futureCol - deltaCol;

        scaledWarehouse[botRow][futureCol] = scaledWarehouse[botRow][previousCol];

        futureCol = previousCol;

        if (futureCol === botCol) {
            break;
        }
    }

    scaledWarehouse[botRow][botCol] = '.';
    return true;
};

const moveRobot = (dx, dy) => {
    const nextX = robotPosition.x + dx;
    const nextY = robotPosition.y + dy;

    if (scaledWarehouse[nextY][nextX] === '#') {
        return;
    }

    if (scaledWarehouse[nextY][nextX] === '[' || scaledWarehouse[nextY][nextX] === ']') {
        if (dy !== 0) {
            if (!canMoveBoxVertical(nextY, nextX, dy)) return;
            moveBoxVertical(nextY, nextX, dy);
        } else {
            const canPush = moveBoxHorizontal(nextY, nextX, dx);
            if (!canPush) return;
        }
    }

    scaledWarehouse[robotPosition.y][robotPosition.x] = '.';
    scaledWarehouse[nextY][nextX] = '@';

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
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        if (scaledWarehouse[y][x] === '[') {
            gpsSum += 100 * y + Math.floor(x);
        }
    }
}

console.log(gpsSum);
