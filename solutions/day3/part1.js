const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const lines = data.trim().split('\n');

let result = 0;

lines.forEach(line => {
    const matches = line.match(/mul\(\d+,\d+\)/g); // I hate regex

    matches.forEach(match => {
        let numbers = match.replace("mul(", "").replace(")", "").split(",") ;
        result += parseInt(numbers[0]) * parseInt(numbers[1]);
    })
})

console.log(result)
