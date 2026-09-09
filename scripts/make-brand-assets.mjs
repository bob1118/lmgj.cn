/**
 * 品牌资产生成（一次性维护脚本，改用素材后重跑即可）：
 * - og-image.jpg          1200×630 社交分享图（面料实拍 + 品牌色遮罩）
 * - favicon-32.png        32×32 站点图标（取自 logo）
 * - apple-touch-icon.png  180×180 iOS 桌面图标（取自 logo）
 */
import sharp from 'sharp';

const jobs = [
  {
    // 分享图：取汗布实拍图裁切，叠品牌青绿遮罩 + 织纹边框
    input: 'src/assets/products/jersey-1.jpg',
    output: 'src/assets/og-image.jpg',
    build: (pipeline) =>
      pipeline
        .resize(1200, 630, { fit: 'cover', position: 'attention' })
        .composite([
          {
            input: Buffer.from(
              '<svg width="1200" height="630">' +
                '<rect width="1200" height="630" fill="rgba(6,47,43,0.42)"/>' +
                '<rect x="40" y="40" width="1120" height="550" fill="none" stroke="rgba(244,239,229,0.45)" stroke-width="3"/>' +
                '</svg>'
            ),
            blend: 'over',
          },
        ])
        .jpeg({ quality: 82, mozjpeg: true }),
  },
  {
    input: 'src/assets/logo.png',
    output: 'src/assets/favicon-32.png',
    build: (pipeline) => pipeline.resize(32, 32, { fit: 'cover' }).png(),
  },
  {
    input: 'src/assets/logo.png',
    output: 'src/assets/apple-touch-icon.png',
    build: (pipeline) => pipeline.resize(180, 180, { fit: 'cover' }).png(),
  },
];

for (const job of jobs) {
  await job.build(sharp(job.input)).toFile(job.output);
  const meta = await sharp(job.output).metadata();
  console.log(`${job.output}: ${meta.width}x${meta.height} (${Math.round(meta.size / 1024)}kB)`);
}
