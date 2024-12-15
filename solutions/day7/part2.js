const fs = require('fs');

const lines = fs.readFileSync('./example-input.txt', 'utf8').trim().split("\n");

let sum = 0;

function checkMatch(value, numbers) {
    value = Number(value)

    function evaluate(current, remaining) {
        if (remaining.length === 0) {
            return current === value;
        }

        const [next, ...rest] = remaining;
        return (
            evaluate(Number(current + next), rest) || 
            evaluate(Number(current) + Number(next), rest) || 
            evaluate(Number(current) * Number(next), rest)
        );
    }

    const [first, ...rest] = numbers;
    return evaluate(first, rest);
}


lines.forEach(line => {
    const value = line.split(':')[0];
    const numbers = line.split(':')[1].trim().split(' ')

    if(checkMatch(value, numbers)) {
        sum += Number(value);
    }
})

console.log(sum)