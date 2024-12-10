const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const lines = data.trim().split('\n');

let safeReportCount = 0;

function isSafeReport(report, removed = false) {
    if (isValid(report)) return true;

    if (removed) return false;

    for (let i = 0; i < report.length; i++) {
        const newReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isValid(newReport)) return true;
    }
    return false;
}

function isValid(report) {
    const firstDiff = report[1] - report[0];
    if (firstDiff === 0) return false;
    
    const direction = firstDiff > 0 ? 'I' : 'D';

    for (let i = 0; i < report.length - 1; i++) {
        const diff = report[i + 1] - report[i];
        const absDiff = Math.abs(diff);

        if (absDiff < 1 || absDiff > 3) {
            return false;
        }

        if ((direction === 'I' && diff <= 0) || (direction === 'D' && diff >= 0)) {
            return false;
        }
    }
    return true;
}

for (let line of lines) {
    const report = line.trim().split(/\s+/).map(Number);

    if (isSafeReport(report)) {
        safeReportCount++;
    }
}

console.log(safeReportCount);
