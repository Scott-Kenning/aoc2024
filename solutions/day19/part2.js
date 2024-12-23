const fs = require("fs");

const input = fs.readFileSync("./example-input.txt", "utf8").trim().split("\r\n");
const patterns = input[0].split(", ");
const designs = input.slice(2);

const countArrangements = (design, patterns) => {
  const patternMap = new Map();

  const helper = (remainingDesign) => {
    if (remainingDesign === "") return 1;
    if (patternMap.has(remainingDesign)) return patternMap.get(remainingDesign);

    let ways = 0;

    for (const pattern of patterns) {
      if (remainingDesign.startsWith(pattern)) {
        ways += helper(remainingDesign.slice(pattern.length));
      }
    }

    patternMap.set(remainingDesign, ways);
    return ways;
  };

  return helper(design);
};

let totalArrangements = 0;

designs.forEach((design) => {
  const arrangements = countArrangements(design, patterns);
  totalArrangements += arrangements;
});

console.log(totalArrangements);
