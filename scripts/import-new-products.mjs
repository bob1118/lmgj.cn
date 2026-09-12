/**
 * 一次性素材导入：将 images/new/ 下 6 个产品文件夹的实拍 JPG
 * 压缩为 WebP（长边 1920px、质量 ~75）后复制到 src/assets/products/。
 *
 * - 输出 ASCII 文件名：<slug>-01.webp 按原文件名顺序编号
 * - 结束后打印 slug ↔ 文件夹 对应清单供核对
 * 用法：node scripts/import-new-products.mjs
 */
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC_ROOT = join(process.cwd(), 'images', 'new');
const OUT_DIR = join(process.cwd(), 'src', 'assets', 'products');
const MAX_SIDE = 1920;
const QUALITY = 75;

// 文件夹 → ASCII slug 映射（与 content.ts 中 products 分类条目对应）
const FOLDER_SLUGS = {
  'Acetate-like Velvet': 'acetate-velvet',
  'Acetate-like Velvet Emboss Digital print': 'acetate-velvet-digital-print',
  'Acetate-like Velvet Emboss Stone': 'acetate-velvet-stone',
  'Acetate-like Velvet multi design': 'acetate-velvet-multi-design',
  'Copy silk Velvet Emboss': 'copy-silk-velvet-emboss',
  'Copy silk Velvet Print': 'copy-silk-velvet-print',
};

mkdirSync(OUT_DIR, { recursive: true });

const manifest = [];
for (const [folder, slug] of Object.entries(FOLDER_SLUGS)) {
  const files = readdirSync(join(SRC_ROOT, folder))
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort();
  for (let i = 0; i < files.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    const outName = `${slug}-${num}.webp`;
    const buf = await sharp(join(SRC_ROOT, folder, files[i]))
      .rotate() // 按 EXIF 方向矫正
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toBuffer();
    writeFileSync(join(OUT_DIR, outName), buf);
    manifest.push({ folder, sourceFile: files[i], outName, bytes: buf.length });
  }
}

writeFileSync(
  join(process.cwd(), 'scripts', 'import-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

for (const m of manifest) {
  console.log(`${m.folder} | ${m.sourceFile} -> ${m.outName} (${(m.bytes / 1024).toFixed(0)} KB)`);
}
console.log(`共导入 ${manifest.length} 张，总大小 ${(manifest.reduce((s, m) => s + m.bytes, 0) / 1024 / 1024).toFixed(1)} MB`);
