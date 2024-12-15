const fs = require('fs');

let stones = fs.readFileSync('./example-input.txt', 'utf8').trim().split(' ').map(Number)
    .reduce((map, stone) => {
        map.set(stone, (map.get(stone) || 0) + 1);
        return map;
    }, new Map());

function blink() {
    const newStones = new Map();

    stones.forEach((count, stone) => {
        if (stone === 0) {
            newStones.set(1, (newStones.get(1) || 0) + count);
        } else if (`${stone}`.length % 2 === 0) {
            const middle = `${stone}`.length / 2;
            const part1 = Number(`${stone}`.slice(0, middle));
            const part2 = Number(`${stone}`.slice(middle));

            newStones.set(part1, (newStones.get(part1) || 0) + count);
            newStones.set(part2, (newStones.get(part2) || 0) + count);
        } else {
            const newValue = stone * 2024;
            newStones.set(newValue, (newStones.get(newValue) || 0) + count);
        }
    });

    stones = newStones;
}

for (let i = 0; i < 75; i++) {
    blink();
}

let totalStones = 0;

stones.forEach(count => {
    totalStones += count;
});

console.log(`Total number of stones: ${totalStones}`);
