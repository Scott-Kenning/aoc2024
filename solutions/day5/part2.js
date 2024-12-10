const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

let [rules, updates] = data.split('\n\r\n')

rules = rules.split('\n').map(rule => {
    return rule.split('|').map(Number)
})

updates = updates.split('\n').map(update => {
    return update.split(',').map(Number)
})

function check(update) {
    return rules.every(rule => {
        if(update.includes(rule[0]) && update.includes(rule[1])) {
            return update.indexOf(rule[0]) < update.indexOf(rule[1])
        }
        return true
    })
}

function sort(update) {
    return update.sort((a, b) => {
        let rule = rules.find((r) => r.includes(a) && r.includes(b));
        return rule.indexOf(a) - rule.indexOf(b);
    })
}

let sum = 0;

updates.forEach(update => {
    if(!check(update)) {
        sort(update)
        sum += update[Math.floor(update.length/2)]
    }
})

console.log(sum)