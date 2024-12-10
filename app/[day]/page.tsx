import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import CodeBlock from '../components/CodeBlock';
import ReactMarkdown from 'react-markdown';

type Params = Promise<{ day: string }>;

export default async function DayPage({ params }: {params: Params}) {
  const { day } = await params;
  const solutionsDir = path.join(process.cwd(), 'solutions', day);

  let description = '';
  let exampleInput = '';
  let part1 = '';
  let part2 = '';

  try {
    const descriptionPath = path.join(solutionsDir, 'description.md');
    description = fs.readFileSync(descriptionPath, 'utf8');
  } catch {
    // leave description as empty string
  }

  try {
    const exampleInputPath = path.join(solutionsDir, 'example-input.txt');
    const part1Path = path.join(solutionsDir, 'part1.js');
    const part2Path = path.join(solutionsDir, 'part2.js');

    exampleInput = fs.readFileSync(exampleInputPath, 'utf8');
    part1 = fs.readFileSync(part1Path, 'utf8');
    part2 = fs.readFileSync(part2Path, 'utf8');
  } catch {
    return notFound();
  }

  return (
    <div className="flex flex-col p-8">
      <p className="my-4">
        See the full problem on the Advent of Code website&nbsp;
        <a
          href={`https://adventofcode.com/2024/day/${day.slice(-1)}`}
          target="_blank"
          rel="noreferrer"
          className="font-bold inline-block underline"
        >
          here
        </a>
        .
      </p>

      {description ? (
        <ReactMarkdown>{description}</ReactMarkdown>
      ) : (
        <p className="mb-4">
          I have not written a description for this problem yet. Please click the link above to view
          the problem.
        </p>
      )}

      <p className="font-semibold mt-4">Example Input:</p>
      <CodeBlock code={exampleInput} />

      <p className="font-semibold">Part 1 Solution:</p>
      <CodeBlock code={part1} language="javascript" />

      <p className="font-semibold">Part 2 Solution:</p>
      <CodeBlock code={part2} language="javascript" />
    </div>
  );
}
