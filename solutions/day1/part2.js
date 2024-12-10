import fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8');

const lines = data.trim().split('\n');

const leftList = [];
const rightList = [];

for (let line of lines) {
    const [leftNum, rightNum] = line.trim().split(/\s+/).map(Number);
    leftList.push(leftNum);
    rightList.push(rightNum);
}

const map = new Map();

for (let num of rightList) {
    map.set(num, (map.get(num) || 0) + 1);
}

const similarityScore = leftList.reduce((accumulator, num) => {
    return accumulator + num * (map.get(num) || 0);
}, 0);

console.log(similarityScore);
