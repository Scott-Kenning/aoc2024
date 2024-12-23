const fs = require("fs");

const input = fs.readFileSync("./example-input.txt", "utf8").trim().split("\r\n");
const patterns = input[0].split(", ");
const designs = input.slice(2);

const canConstruct = (design, patterns) => {
  const helper = (remainingDesign) => {
    if (remainingDesign === "") return true;

    for (const pattern of patterns) {
      if (remainingDesign.startsWith(pattern)) {
        if (helper(remainingDesign.slice(pattern.length))) {
          return true;
        }
      }
    }
    return false;
  };

  return helper(design);
};

let possibleDesignsCount = 0;

designs.forEach((design) => {
  if (canConstruct(design, patterns)) {
    possibleDesignsCount++;
  }
});

console.log(possibleDesignsCount);
