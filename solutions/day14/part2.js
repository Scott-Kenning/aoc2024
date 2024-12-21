const fs = require('fs');

const input = fs.readFileSync('./example-input.txt', 'utf8').trim().split('\n');

const robots = input.map(line => {
    const match = line.match(/p=(\d+),(\d+) v=(-?\d+),(-?\d+)/);
    return {
        px: parseInt(match[1], 10),
        py: parseInt(match[2], 10),
        vx: parseInt(match[3], 10),
        vy: parseInt(match[4], 10)
    };
});

const width = 101;
const height = 103;

const calculateDensity = (positions) => {
    let density = 0;
    const set = new Set(positions.map(({ x, y }) => `${x},${y}`));

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!set.has(`${x},${y}`)) {
                density++;
            }
        }
    }

    return density;
};

const simulateAndFindLowestDots = (maxSteps) => {
    let lowestDots = Infinity;
    let bestTime = 0;

    for (let time = 0; time < maxSteps; time++) {
        const positions = robots.map(robot => {
            const finalX = (robot.px + (robot.vx * time)) % width;
            const finalY = (robot.py + (robot.vy * time)) % height;

            const wrappedX = finalX < 0 ? finalX + width : finalX;
            const wrappedY = finalY < 0 ? finalY + height : finalY;

            return { x: wrappedX, y: wrappedY };
        });

        const dotsCount = calculateDensity(positions);
        if (dotsCount < lowestDots) {
            lowestDots = dotsCount;
            bestTime = time;
        }
    }

    console.log(bestTime);
};

simulateAndFindLowestDots(20000);
