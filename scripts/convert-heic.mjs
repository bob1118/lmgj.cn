/**
 * 一次性脚本：将误存为 .jpg 的 HEIC 证书图转换为真正的 JPEG。
 * 用法：node scripts/convert-heic.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import convertHeic from 'heic-convert';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const targets = [
  'src/assets/company/business-license.jpg',
  'src/assets/company/commercial-authorization.jpg',
];

for (const rel of targets) {
  const path = resolve(root, rel);
  const input = await readFile(path);

  // HEIC 探测：ftyp 盒中的 heic/mif1 标记
  const sig = input.subarray(4, 12).toString('latin1');
  if (!/heic|heix|mif1|hevc/.test(sig)) {
    console.log(`跳过（非 HEIC）：${rel}`);
    continue;
  }

  const output = await convertHeic({
    buffer: input,
    format: 'JPEG',
    quality: 0.9,
  });

  await writeFile(path, Buffer.from(output));
  console.log(`已转换：${rel}（${input.length}B -> ${output.length}B JPEG）`);

  // 同步替换归档源（中文名文件）
  const archiveName = rel.includes('business-license')
    ? 'images/company/营业执照.jpg'
    : 'images/company/商业授权.jpg';
  await writeFile(resolve(root, archiveName), Buffer.from(output));
  console.log(`已同步归档：${archiveName}`);
}
