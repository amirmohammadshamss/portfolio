import { access, copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const exists = async path => { try { await access(path); return true; } catch { return false; } };
if (await exists('out/portfolio.pdf')) {
  await copyFile('out/portfolio.pdf', 'public/portfolio.pdf');
} else if (!(await exists('public/portfolio.pdf'))) {
  console.log('Preparing the portfolio PDF for local downloads…');
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build:portfolio'], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
