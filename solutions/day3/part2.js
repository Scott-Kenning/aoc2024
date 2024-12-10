const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const lines = data.trim().split('\n');

let result = 0;
let disabled = false;

lines.forEach(line => {
    const matches = line.match(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g); // I really hate regex

    // note that this is relying on the matches being returned in order

    matches.forEach(match => {
        if(match == "do()") {
            disabled = false;
        } else if(match == "don't()") {
            disabled = true;
        } else if (!disabled) {
            let numbers = match.replace("mul(", "").replace(")", "").split(",") ;
            result += parseInt(numbers[0]) * parseInt(numbers[1]);
        }
    })
})

console.log(result)
