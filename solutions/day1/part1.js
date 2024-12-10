const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const lines = data.trim().split('\n');

const leftList = [];
const rightList = [];

for (let line of lines) {
    const [leftNum, rightNum] = line.trim().split(/\s+/).map(Number);
    leftList.push(leftNum);
    rightList.push(rightNum);
    rightList.sort();
    leftList.sort();
}

const totalDistance = leftList.reduce((accumulator, currentValue, index) => {
    const distance = Math.abs(currentValue - rightList[index]);
    return accumulator + distance;
}, 0);

console.log(totalDistance);