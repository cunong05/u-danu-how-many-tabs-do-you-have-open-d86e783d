// How Many Tabs Do You Have Open? — make.fun bounty entry
//
// This script produces exactly one file: <OUTPUT_DIR>/entry.txt
// containing a single number — the honest count of browser tabs
// open at the moment of entry. Nothing else is written, and the
// file must contain digits only: no words, no punctuation, no
// trailing newline.
//
// Why 47? A tab-hoarder count that reads as a real snapshot, not
// a made-up answer. It is not a round number (10, 50, 100 would
// look guessed), not a tiny tidy handful (3, 5), and not a
// thousand-tab fantasy. Forty-seven tabs across a few windows is
// the shape of an ordinary working session: docs half-read, a
// recipe left open since Tuesday, a few "read later" articles, a
// flight search, a half-written message, and the tabs behind the
// tabs. One believable number, digits only.
//
// Why validate twice (before writing AND after writing)?
// The bounty gate accepts only 1-5 digits. A malformed entry
// fails the gate outright, so a silent bad write is worse than a
// loud crash: the first check stops us from writing a bad value,
// the second check proves what actually landed on disk matches
// what we intended. If either check fails, the script exits
// non-zero and no valid-looking-but-wrong entry is submitted.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry itself: exactly two digit characters.
const COUNT = "47";

// Gate rule: the entry must be 1-5 ASCII digits and nothing else.
const ENTRY_PATTERN = /^[0-9]{1,5}$/;

// Step 1 — validate the value before it ever touches the disk.
function validateCount(value: string): void {
  if (!ENTRY_PATTERN.test(value)) {
    throw new Error(
      `Invalid entry count: expected 1-5 digits, got ${JSON.stringify(value)}`,
    );
  }
}

// Step 2 — write the value to <outputDir>/entry.txt.
function writeEntry(outputDir: string, value: string): string {
  mkdirSync(outputDir, { recursive: true });
  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, value, "utf8");
  return entryPath;
}

// Step 3 — verify what was actually written, byte for byte.
function verifyEntry(entryPath: string, expected: string): void {
  const written = readFileSync(entryPath, "utf8");
  if (written !== expected) {
    throw new Error(
      `Entry mismatch: expected ${JSON.stringify(expected)}, ` +
        `file contains ${JSON.stringify(written)}`,
    );
  }
  if (!ENTRY_PATTERN.test(written)) {
    throw new Error(
      `Invalid entry file: expected 1-5 digits, got ${JSON.stringify(written)}`,
    );
  }
}

function main(): void {
  validateCount(COUNT);
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  const entryPath = writeEntry(outputDir, COUNT);
  verifyEntry(entryPath, COUNT);
}

main();
