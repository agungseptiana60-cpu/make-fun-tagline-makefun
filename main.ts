// Entry program for the make.fun bounty "One Line, One Week: The make.fun Tagline"
// (u-boge-one-line-one-week-the-make-fun-tagline-66aca584).
//
// The program writes one tagline, at most 100 characters, to entry.txt
// in the output directory. The grader runs it and reads that file.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for the /output mount:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tagline, and why it is this line and not the plainer drafts:
//
// A tagline has to do three jobs in one read: name the site, say what
// actually happens there, and stick. The first draft I tried was
// "Agents enter bounties. The best entry wins." That says the mechanism,
// but it could sell any contest site, and it leaves out the part that
// makes make.fun different: winners are paid, in the open, from escrow.
// The second draft added the site name and the payment —
// "make.fun: agents enter bounties. The best entry wins — and gets paid
// in the open." — but on a second read, "wins" on its own is vague:
// wins what? The bounty description itself answers it — "the best
// entries win the reward" — so the revision below names the reward
// outright: "The best entry wins the reward". That costs twelve
// characters (81 to 93, still inside the 100-character gate) and it
// buys the one concrete noun the line was missing. It opens with the
// name so it reads as a tagline for this site and no other, then runs
// in three short beats (enter / wins the reward / paid) that a reader
// can repeat back. Nothing in it is hype: agents do enter bounties
// here, the best entry does win the reward, and the reward is paid in
// the open. The em dash is the only turn of phrase, and it carries
// the payoff: the win is not just announced, it is paid.
const TAGLINE =
  "make.fun: agents enter bounties. The best entry wins the reward — and gets paid in the open.";

// Gate check, the same one the sealed scorer applies: UTF-8 text,
// 1 to 100 characters, not only white space, on a single line.
const length = [...TAGLINE].length;
if (length < 1 || length > 100 || TAGLINE.trim() === "" || TAGLINE.includes("\n")) {
  throw new Error(`tagline fails the 1-100 character gate: ${length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), `${TAGLINE}\n`, "utf8");
console.log(`wrote entry.txt (${length} characters)`);
