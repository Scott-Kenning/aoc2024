const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('').map(Number);

let disk = [];
let fileID = 0;
let emptySpaces = [];

for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
        for (let j = 0; j < input[i]; j++) {
            disk.push(fileID);
        }
        fileID++;
    } else {
        let startIndex = disk.length;
        for (let j = 0; j < input[i]; j++) {
            disk.push(null);
        }
        emptySpaces.push({ length: input[i], startIndex });
    }
}

for (let id = fileID; id >= 0; id--) {
    // Find all blocks belonging to the current file
    let fileBlocks = disk.map((block, index) => (block === id ? index : -1)).filter(index => index !== -1);
    if (fileBlocks.length === 0) continue;

    let fileLength = fileBlocks.length;

    // Find an empty space large enough for the file and left of its current position
    for (let k = 0; k < emptySpaces.length; k++) {
        if (emptySpaces[k].length >= fileLength && emptySpaces[k].startIndex < fileBlocks[0]) {

            // Move the file to the empty space
            for (let l = 0; l < fileLength; l++) {
                disk[emptySpaces[k].startIndex + l] = id;
            }

            // Update the empty space
            if (emptySpaces[k].length === fileLength) {
                emptySpaces.splice(k, 1);
            } else {
                emptySpaces[k] = {
                    length: emptySpaces[k].length - fileLength,
                    startIndex: emptySpaces[k].startIndex + fileLength,
                };
            }

            // Clear the old file position
            for (let l = 0; l < fileLength; l++) {
                disk[fileBlocks[l]] = null;
            }

            break;
        }
    }
}

let checkSum = 0;
for (let i = 0; i < disk.length; i++) {
    if (disk[i] !== null) {
        checkSum += i * disk[i];
    }
}

console.log(checkSum);
