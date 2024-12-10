const tree = `
     /\\
    /\\O\\
   /\\*\\/\\
  /\\O\\/\\*\\
 /\\*\\/\\*\\/\\
/\\O\\/\\*\\/O/\\
     ||
     ||
`;

export default function Home() {
  return (
    <div className="flex flex-col px-4 py-8 max-w-6xl mx-auto space-y-8 items-center md:items-left">
      {/* Left-Aligned Tree */}
      <div className="flex">
        <pre
          className="font-mono font-bold text-green-600"
          style={{
            lineHeight: "1.5",
          }}
        >
          {tree}
        </pre>
      </div>

      {/* Introduction Content */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to my Advent of Code 2024 Solutions!
        </h1>
        <p className="text-gray-700 leading-relaxed">
          Advent of Code is a yearly programming challenge that comes out every December. Every day from December 1st to Christmas Day, two code challenges of increasing difficulty are released, and players race to solve them as quickly as possible.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This website showcases my solutions to each of the problems from the 2024 problem set. If you'd like to learn more about Advent of Code or try it out for yourself (you can still participate after December; the problems stay up forever), check out the official
          <a
          href="https://adventofcode.com"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-blue-500 hover:text-blue-600 transition"
        >
          &nbsp;Advent of Code website
        </a>
        .
        </p>
        <p>
          If you want to see more of my work, you can check out my
          <a
          href="https://scottkenning.ca"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 font-bold hover:text-blue-600 transition"
          >
            &nbsp;portfolio&nbsp;
          </a>
          or my
          <a
          href="https://github.com/scott-kenning"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 font-bold hover:text-blue-600 transition"
          >
            &nbsp;Github
          </a>.
        </p>
      </div>
    </div>
  );
}
