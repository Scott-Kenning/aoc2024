const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

let initialA, initialB, initialC;
let program = [];

input.forEach(line => {
    if (line.startsWith('Register A:')) {
        initialA = parseInt(line.split(':')[1].trim(), 10);
    } else if (line.startsWith('Register B:')) {
        initialB = parseInt(line.split(':')[1].trim(), 10);
    } else if (line.startsWith('Register C:')) {
        initialC = parseInt(line.split(':')[1].trim(), 10);
    } else if (line.startsWith('Program:')) {
        program = line.split(':')[1].trim().split(',').map(Number);
    }
});

const mod = (n, m) => ((n % m) + m) % m;

function executeProgram(A, B, C, program) {
    let instructionPointer = 0;
    const output = [];

    const getComboValue = (operand) => {
        if (operand <= 3) return operand;
        if (operand === 4) return A;
        if (operand === 5) return B;
        if (operand === 6) return C;
        throw new Error('Invalid combo operand');
    };

    while (instructionPointer < program.length) {
        const opcode = program[instructionPointer];
        const operand = program[instructionPointer + 1];
        let jumped = false;

        switch (opcode) {
            case 0: { // adv
                A = Math.trunc(A / Math.pow(2, getComboValue(operand)));
                break;
            }
            case 1: { // bxl
                B = (B ^ operand) >>> 0;
                break;
            }
            case 2: { // bst
                B = mod(getComboValue(operand), 8);
                break;
            }
            case 3: { // jnz
                if (A !== 0) {
                    instructionPointer = operand;
                    jumped = true;
                }
                break;
            }
            case 4: { // bxc
                B = (B ^ C) >>> 0;
                break;
            }
            case 5: { // out
                output.push(mod(getComboValue(operand), 8));
                break;
            }
            case 6: { // bdv
                B = Math.trunc(A / Math.pow(2, getComboValue(operand)));
                break;
            }
            case 7: { // cdv
                C = Math.trunc(A / Math.pow(2, getComboValue(operand)));
                break;
            }
            default:
                throw new Error(`Invalid opcode: ${opcode}`);
        }

        if (!jumped) instructionPointer += 2;
    }

    return output.join(',');
}

const result = executeProgram(initialA, initialB, initialC, program);
console.log(result);
