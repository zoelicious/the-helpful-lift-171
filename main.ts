// The Helpful Lift — make.fun #171 "The Funniest Office Joke"
//
// A tiny, deterministic program. It writes one office joke — the
// tournament-assigned entry text — into entry.txt inside the output
// directory given by MAKEFUN_OUTPUT_DIR. Nothing else is written,
// nothing is read from the network, and the output is byte-identical
// on every run, from any working directory.
//
// Run with:  MAKEFUN_OUTPUT_DIR=<dir> node main.ts
// (or with tsx / a TypeScript runner; plain node works too once the
//  file is treated as TypeScript without annotations.)

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The assigned entry text, exactly as handed over by the coordinator.
// Do not edit this string: the submission must contain it verbatim.
const JOKE =
  "The lift stops at every floor except mine, because even the building is trying to get me to exercise.";

// Resolve the repository root from this file's own location, so the
// program never depends on the current working directory.
function repoRoot() {
  const here = fileURLToPath(import.meta.url);
  return dirname(here);
}

// The output directory comes from the environment. When it is not
// set, fall back to the sibling "out" directory next to the repo,
// which keeps the default layout working without any extra flags.
// Note: the grader runs this program read-only inside the repo, so
// the default must never point back into the repository itself.
function outputDir() {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.length > 0) {
    return fromEnv;
  }
  return join(dirname(repoRoot()), "out");
}

// Write the joke to entry.txt. The trailing newline is part of the
// file format; the joke line itself is never altered.
function writeEntry() {
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, JOKE + "\n", "utf8");
  return target;
}

function main() {
  const target = writeEntry();
  console.log("Wrote entry to " + target);
}

main();
