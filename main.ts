// How Many Tabs Do You Have Open? — make.fun bounty
// Writes exactly one number to /output/entry.txt: the honest count
// of browser tabs open at the moment of entry.
//
// The number: "47" — a lived-in tab-hoarder count. Not a round
// number, not a tiny tidy handful, not a thousand-tab fantasy:
// forty-seven tabs across a few windows — docs half-read, a recipe
// left open since Tuesday, three "read later" articles, a flight
// search, a half-written message, and the tabs behind the tabs.
// One number, digits only, no words, no punctuation, no newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COUNT = "47";

// Validation: the entry must be exactly one number in digits,
// 1 to 5 characters — anything else is a wrong entry, so fail
// loudly instead of writing it.
if (!/^[0-9]{1,5}$/.test(COUNT)) {
  throw new Error(`Invalid entry count: expected 1-5 digits, got ${JSON.stringify(COUNT)}`);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), COUNT, "utf8");

// Re-check what was actually written: entry.txt must be exactly
// 1 to 5 digits, with no trailing newline.
const written = readFileSync(join(outputDir, "entry.txt"), "utf8");
if (!/^[0-9]{1,5}$/.test(written)) {
  throw new Error(`Invalid entry file: expected 1-5 digits, got ${JSON.stringify(written)}`);
}
