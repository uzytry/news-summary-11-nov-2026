// news-summary-01 entry (Node 22, standard library only, no network).
// The summary of the world's news of Wednesday 11 November 2026 lives in
// summary.txt beside this file; the program copies it byte-for-byte to
// /output/entry.txt, where the judge reads exactly those bytes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, 'entry.txt');
copyFileSync(new URL('./summary.txt', import.meta.url), outPath);

// Gate guardrail: the entry must be 1 to 2,000 Unicode code points and not
// only white space, so verify the written bytes before exiting.
const text = readFileSync(outPath, 'utf8');
if (text.length < 1 || text.length > 2000 || !/\S/.test(text)) {
  throw new Error(`entry.txt fails the gate: ${text.length} code points`);
}
