const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('').map(Number);

let disk = [];
let fileID = 0;

for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
        for (let j = 0; j < input[i]; j++) {
            disk.push(fileID);
        }
        fileID++;
    } else {
        for (let j = 0; j < input[i]; j++) {
            disk.push(null);
        }
    }
}

let l = 0;
let r = disk.length - 1;
while (l < r) {
    if (disk[l] !== null) {
        l++;
        continue;
    }
    if (disk[r] === null) {
        r--;
        continue;
    }
    disk[l] = disk[r];
    disk[r] = null;
    l++;
    r--;
}

let checkSum = 0;
for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== null) {
        checkSum += i * disk[i];
    }
}

console.log(checkSum);
