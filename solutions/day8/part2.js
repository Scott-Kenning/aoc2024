const fs = require('fs');

let lines = fs.readFileSync('./example-input.txt', 'utf8').trim().split("\r\n");

let antennas = [];

for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        const char = lines[y][x];
        if (char !== '.') {
            antennas.push({ x, y, freq: char });
        }
    }
}

let antinodeSet = new Set();

function checkInBounds(x, y) {
    return x >= 0 && x < lines[0].length && y >= 0 && y < lines.length;
}

for (let i = 0; i < antennas.length; i++) {
    const a = antennas[i];

    for (let j = 0; j < antennas.length; j++) {
        if (i === j) continue;
        const b = antennas[j];

        if (a.freq !== b.freq) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;

        let x = a.x;
        let y = a.y;

        while (checkInBounds(x + dx, y + dy)) {
            x += dx;
            y += dy;
            const antinodeKey = `${x}, ${y}`;
            if (!antinodeSet.has(antinodeKey)) {
                antinodeSet.add(antinodeKey);
            }
        }

        x = a.x;
        y = a.y;

        while (checkInBounds(x - dx, y - dy)) {
            x -= dx;
            y -= dy;
            const antinodeKey = `${x}, ${y}`;
            if (!antinodeSet.has(antinodeKey)) {
                antinodeSet.add(antinodeKey);
            }
        }
    }

    let alignCount = 0;
    for (let j = 0; j < antennas.length; j++) {
        if (i !== j && a.freq === antennas[j].freq) {
            alignCount++;
        }
    }

    if (alignCount >= 2) {
        const antinodeKey = `${a.x}, ${a.y}`;
        if (!antinodeSet.has(antinodeKey)) {
            antinodeSet.add(antinodeKey);
        }
    }
}

console.log(antinodeSet.size);
