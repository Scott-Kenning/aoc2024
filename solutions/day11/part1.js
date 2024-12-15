const fs = require('fs');

let stones = fs.readFileSync('./example-input.txt', 'utf8').trim().split(' ').map(Number);

function blink() {
    let newStones=[]

    stones.forEach(stone => {
        if(stone === 0) {
            newStones.push(1)
        } else if(`${stone}`.length % 2 === 0) {
            const middle = `${stone}`.length / 2
            newStones.push(Number((`${stone}`.slice(0, middle))))
            newStones.push(Number((`${stone}`.slice(middle))))
        } else{
            newStones.push(stone * 2024)
        }
    })

    stones = newStones
}

for(i = 0; i < 25; i++) {
    blink()
}

console.log(stones.length);
