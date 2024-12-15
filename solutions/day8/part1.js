const fs = require('fs');

const lines = fs.readFileSync('./example-input.txt', 'utf8').trim().split("\r\n");

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
    return x >= 0 && x < lines[0].length && y >= 0 && y < lines.length
}

for (let i = 0; i < antennas.length; i++) {
    for (let j = i + 1; j < antennas.length; j++) {
        if(i === j) continue;
        const a = antennas[i];
        const b = antennas[j];

        if(a.freq !== b.freq) continue;

        const dx = a.x - b.x;
        const dy = a.y - b.y; 

        if(checkInBounds(a.x + dx, a.y + dy)) {
            antinodeSet.add(`${a.x + dx}, ${a.y + dy}`)
        }

        if(checkInBounds(b.x - dx, b.y - dy)) {
            antinodeSet.add(`${b.x - dx}, ${b.y - dy}`)
        }
    }
}

console.log(antinodeSet.size);
