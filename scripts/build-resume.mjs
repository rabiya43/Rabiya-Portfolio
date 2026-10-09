// Builds the resume PDF from resume/Rabiya_Tahir_Resume.tex and puts it everywhere it's used.
//
//   npm run resume
//
// 1. Compiles the LaTeX with Tectonic (https://tectonic-typesetting.github.io).
// 2. Saves it as public/Rabiya_Tahir_Resume.pdf, which the website's resume button opens.
// 3. Copies it (same name) to the folders listed in resume/copy-targets.json, a local file that
//    isn't committed. The .tex can be copied too, so older copies of the source stay in sync.
//
// Tectonic is found through the TECTONIC environment variable, then the usual install folder,
// then PATH.
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const NAME = 'Rabiya_Tahir_Resume';
const TEX = join(ROOT, 'resume', `${NAME}.tex`);
const PUBLIC_PDF = join(ROOT, 'public', `${NAME}.pdf`);
const TARGETS = join(ROOT, 'resume', 'copy-targets.json');

function findTectonic() {
    const candidates = [
        process.env.TECTONIC,
        process.env.LOCALAPPDATA && join(process.env.LOCALAPPDATA, 'Programs', 'tectonic', 'tectonic.exe'),
    ].filter(Boolean);
    const found = candidates.find(existsSync);
    return found || 'tectonic';
}

const tectonic = findTectonic();
const out = mkdtempSync(join(tmpdir(), 'resume-'));
try {
    console.log('Building the resume...');
    try {
        execFileSync(tectonic, ['--outdir', out, '--keep-logs', TEX], { stdio: ['ignore', 'ignore', 'pipe'] });
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.error('Tectonic is not installed. Get it from https://tectonic-typesetting.github.io and try again.');
        } else {
            console.error('The resume has a LaTeX error:\n');
            const log = join(out, `${NAME}.log`);
            const lines = existsSync(log) ? readFileSync(log, 'utf8').split('\n') : String(e.stderr || '').split('\n');
            const at = lines.findIndex(l => l.startsWith('!'));
            console.error(at >= 0 ? lines.slice(at, at + 6).join('\n') : lines.slice(-20).join('\n'));
        }
        process.exit(1);
    }
    const pdf = join(out, `${NAME}.pdf`);

    copyFileSync(pdf, PUBLIC_PDF);
    console.log(`  website    public/${NAME}.pdf`);

    let targets = { pdf: [], tex: [] };
    if (existsSync(TARGETS)) targets = { ...targets, ...JSON.parse(readFileSync(TARGETS, 'utf8')) };
    for (const dir of targets.pdf) {
        if (!existsSync(dir)) { console.warn(`  skipped    ${dir} (folder not found)`); continue; }
        copyFileSync(pdf, join(dir, `${NAME}.pdf`));
        console.log(`  copied     ${join(dir, `${NAME}.pdf`)}`);
    }
    for (const dir of targets.tex) {
        if (!existsSync(dir)) { console.warn(`  skipped    ${dir} (folder not found)`); continue; }
        copyFileSync(TEX, join(dir, `${NAME}.tex`));
        console.log(`  copied     ${join(dir, `${NAME}.tex`)}`);
    }
    console.log('Done. Commit and push public/ to update the website.');
} finally {
    rmSync(out, { recursive: true, force: true });
}
