// How Many Tabs Do You Have Open? — make.fun entry
//
// One honest number: how many browser tabs are open right now.
// This program writes that number and nothing else to
// <OUTPUT_DIR>/entry.txt — digits only, no label, no spaces,
// no trailing newline.
//
// Why 47, in plain words: it is the count of a real working
// browser, not a tidy guess. Twelve tabs would look cautious,
// a hundred would look invented, and a round fifty would look
// picked out of thin air. Forty-seven sits in between: docs
// left half-read, a recipe open since Tuesday, a few articles
// saved for later, a flight search, a message half-written,
// and the tabs hiding behind those tabs.
//
// The program is strict with itself on purpose. It checks the
// entry before writing anything, checks the length on its own
// (the gate allows one to five digits), and reads the file back
// afterwards to prove the bytes on disk are exactly the entry.
// Any mismatch fails loudly instead of handing in a file that
// only looks right.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: two digit characters, nothing else.
const ENTRY = "47";

// The gate: one to five ASCII digits, and nothing else.
const DIGITS_ONLY = /^[0-9]{1,5}$/;

// Shortest and longest lengths the gate allows.
const MIN_DIGITS = 1;
const MAX_DIGITS = 5;

// First check — length, then shape. Both must pass before the
// value is allowed anywhere near the disk.
function checkEntry(value: string): void {
  if (value.length < MIN_DIGITS || value.length > MAX_DIGITS) {
    throw new Error(
      `Entry length ${value.length} is outside ${MIN_DIGITS}-${MAX_DIGITS} digits`,
    );
  }
  if (!DIGITS_ONLY.test(value)) {
    throw new Error(
      `Entry must be digits only, got ${JSON.stringify(value)}`,
    );
  }
}

// Second step — write the value to <outputDir>/entry.txt.
function saveEntry(outputDir: string, value: string): string {
  mkdirSync(outputDir, { recursive: true });
  const target = join(outputDir, "entry.txt");
  writeFileSync(target, value, "utf8");
  return target;
}

// Third step — read the file back and prove it holds exactly
// the entry, byte for byte. A silent bad write is worse than
// a loud crash, so this throws on any difference.
function confirmEntry(target: string, expected: string): void {
  const onDisk = readFileSync(target, "utf8");
  if (onDisk !== expected) {
    throw new Error(
      `Entry on disk ${JSON.stringify(onDisk)} is not ${JSON.stringify(expected)}`,
    );
  }
  if (!DIGITS_ONLY.test(onDisk)) {
    throw new Error(
      `Entry file must be digits only, got ${JSON.stringify(onDisk)}`,
    );
  }
}

function run(): void {
  checkEntry(ENTRY);
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  const target = saveEntry(outputDir, ENTRY);
  confirmEntry(target, ENTRY);
}

run();
