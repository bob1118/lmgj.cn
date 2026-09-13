/**
 * 一次性素材导入：产品分类改为「面料 fabrics + 配饰 accessories」两分类后的全量重建导入。
 * 源目录（本地磁盘，gitignore 不入库）：
 *   - images/fabrics/knitted|woven       面料基础款（平铺文件名，按前缀分产品编号）
 *   - images/fabrics/Trend/<文件夹>      流行新品丝绒（每个子文件夹 = 一款产品）
 *   - images/accessories/<文件夹>        配饰（每个子文件夹 = 一款产品，原片为 hash 文件名）
 * 输出：src/assets/products/<slug>-NN.webp（ASCII 命名，长边 1920px、质量 ~75）。
 * 台账：scripts/import-manifest-two-categories.json（源文件 ↔ 产物；配饰 hash 名务必保留此映射以便日后核对）。
 * 脚本幂等可重跑覆盖；只增不删，旧资产清理另行手工执行。
 * 用法：node scripts/import-two-categories.mjs
 */
import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const OUT_DIR = join(process.cwd(), 'src', 'assets', 'products');
const MAX_SIDE = 1920;
const QUALITY = 75;

// 面料基础款子文件夹 → slug（每个子文件夹 = 一款产品；knitted jersey/rib/terry，woven oxford/poplin/twill）
const BASE_FOLDER_SLUGS = {
  Jersey: 'jersey',
  Rib: 'rib',
  Terry: 'terry',
  Oxford: 'oxford',
  Poplin: 'poplin',
  twill: 'twill',
};

// 面料 trend 子文件夹 → slug（沿用既有命名与 content.ts 对应）
const TREND_FOLDER_SLUGS = {
  'Acetate-like Velvet': 'acetate-velvet',
  'Acetate-like Velvet Emboss Digital print': 'acetate-velvet-digital-print',
  'Acetate-like Velvet Emboss Stone': 'acetate-velvet-stone',
  'Acetate-like Velvet multi design': 'acetate-velvet-multi-design',
  'Copy silk Velvet Emboss': 'copy-silk-velvet-emboss',
  'Copy silk Velvet Print': 'copy-silk-velvet-print',
};

// 配饰子文件夹 → slug（中英文产品名见 content.ts 配饰条目）
const ACCESSORIES_FOLDER_SLUGS = {
  'bugle beads': 'bugle-beads',
  'craft pearl beads': 'craft-pearl-beads',
  'rhinestone beads': 'rhinestone-beads',
  trend: 'accessories-trend',
  'Women Accessories': 'women-accessories',
};

mkdirSync(OUT_DIR, { recursive: true });

const manifest = [];

/** 压缩单张并登记台账 */
async function importOne(sourceRoot, sourceFile, outName) {
  const buf = await sharp(join(process.cwd(), 'images', sourceRoot, sourceFile))
    .rotate() // EXIF 方向矫正
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();
  writeFileSync(join(OUT_DIR, outName), buf);
  manifest.push({ sourceRoot, sourceFile, outName, bytes: buf.length, reused: false });
}

/** 子文件夹目录：文件夹 → slug，内部按文件名字母序编号 */
async function importFolder(root, dir, folder, slug) {
  const files = readdirSync(join(process.cwd(), 'images', root, dir, folder), {
    withFileTypes: true,
  })
    .filter((e) => e.isFile() && /\.jpe?g$/i.test(e.name))
    .map((e) => e.name)
    .sort();
  for (let i = 0; i < files.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    await importOne(`${root}/${dir}/${folder}`, files[i], `${slug}-${num}.webp`);
  }
}

// 面料基础款：knitted 与 woven 各产品子文件夹
for (const [folder, slug] of Object.entries(BASE_FOLDER_SLUGS)) {
  const root = ['Jersey', 'Rib', 'Terry'].includes(folder) ? 'fabrics/knitted' : 'fabrics/woven';
  await importFolder(root, '', folder, slug);
}

// 面料流行新品：Trend 六个产品文件夹
for (const [folder, slug] of Object.entries(TREND_FOLDER_SLUGS)) {
  await importFolder('fabrics', 'Trend', folder, slug);
}

// 配饰：五个产品文件夹（hash 原名经台账保留映射）
for (const [folder, slug] of Object.entries(ACCESSORIES_FOLDER_SLUGS)) {
  await importFolder('accessories', '', folder, slug);
}

writeFileSync(
  join(process.cwd(), 'scripts', 'import-manifest-two-categories.json'),
  JSON.stringify(manifest, null, 2)
);

for (const m of manifest) {
  console.log(`${m.sourceRoot} | ${m.sourceFile} -> ${m.outName} (${(m.bytes / 1024).toFixed(0)} KB)`);
}
console.log(
  `共导入 ${manifest.length} 张，总大小 ${(manifest.reduce((s, m) => s + m.bytes, 0) / 1024 / 1024).toFixed(1)} MB`
);
