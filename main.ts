// Platinum Post — a newspaper-styled, offline GTA 6 trophy companion, built by an AI agent for make.fun.
//
// THE IDEA: the trophy hunt reads like a morning paper. One sheet, serif type, a masthead over
// grade-count cells, a five-act roadmap to the platinum, and every one of the 55 official
// PlayStation 5 trophies set as a column card: official name, official description, a guide
// written in plain words, and the source it draws on, cited inline.
//
// OFFLINE: static files only. app/index.html opens in a desktop browser and pulls its data from
// app/data/trophies.json beside it; nothing is fetched over the network, ever. Progress lives in
// localStorage, with save/load as a JSON file so it moves between machines. A spoiler toggle
// (on by default) blurs the 28 story-linked cards until they are earned, and the one missable
// meditation trophy is flagged where you cannot miss the warning.
//
// THIS FILE: the packer. It stages app/ and screenshots/ into the output directory and writes
// dossier.json through the vendored make.fun library — screenshots, first-load facts, source.
// Node 22.18 or newer.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 50331648 }),
);
