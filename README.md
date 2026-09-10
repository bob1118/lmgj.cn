# lmgj.cn

中英双语单页企业站（Astro 5 静态输出）。需求依据见 `需求文档.md`。

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 本地开发 http://localhost:4321
npm run check      # astro check 类型/语法检查
npm run build      # 构建静态产物至 dist/
npm run preview    # 本地预览构建产物
```

## 结构速览

```
src/
├── data/content.ts        # 全站双语文案（唯一内容源，中英成对维护）
├── assets/                # 图片资产（经 astro:assets 构建优化为 webp）
│   ├── logo.png           # 企业 logo（favicon 备份源）
│   ├── hero-bg.jpg        # 首屏背景（织造车间实拍，源文件 images/company/1.jpg）
│   ├── og-image.jpg       # 1200×630 社交分享图（scripts/make-brand-assets.mjs 生成）
│   ├── favicon-32.png / apple-touch-icon.png   # 图标（同上生成）
│   ├── products/          # 产品实拍图（jersey-1.jpg 等）
│   └── company/           # 车间/证书/设备/品控/市场图（workshop.jpg、business-license.jpg 等）
├── lib/images.ts          # 图片解析 helper（文件名 → 构建资产；灯箱列表）
├── layouts/Layout.astro   # 页头 Meta/SEO、共享织物纹样、灯箱与交互脚本
├── components/            # Header / Hero / About / Products / Strength / Contact / Footer
├── styles/global.css      # 设计系统（品牌青绿 + 亚麻底 + 织纹肌理；品类双色：针织靛蓝/织造青绿）
└── pages/index.astro      # 单页组装
public/
└── robots.txt             # 爬虫规则（sitemap 由 @astrojs/sitemap 构建时生成）
scripts/
├── make-brand-assets.mjs  # 生成 og 分享图 / favicon / touch icon（sharp）
└── convert-heic.mjs       # HEIC 素材转 JPG（企业 iPhone 原图用）
```

## 内容维护

- **改文案**：只改 `src/data/content.ts`，所有字段中英成对（`Pair`），改中文时同步改英文。
- **换/加图片**：把 JPG/PNG 放进 `src/assets/products/` 或 `src/assets/company/`（ASCII 文件名），在 `content.ts` 对应位置登记同名字路径（如 `/images/products/jersey-1.jpg`，`lib/images.ts` 按文件名匹配，路径仅作 key 用途）。
- **切语言行为**：默认中文；`html[data-lang]` 控制成对 span 显隐，切换时同步 `document.title`、meta description 与图片 alt。
- **产品图灯箱**：卡片带 `data-lb-images` 属性，点击进灯箱（键盘 ←/→ 切换、Esc 关闭），逻辑在 `Layout.astro` 尾部脚本。
- **品牌资产重生成**：替换 logo 或产品主图后重跑 `node scripts/make-brand-assets.mjs`。

## 部署

静态产物 `dist/` 可部署至任意海外静态托管（Vercel / Cloudflare Pages / Netlify，待定案），无需备案；托管平台绑定域名 lmgj.cn 即可，推送 Git 自动构建。构建时自动生成 `sitemap-index.xml`，`public/robots.txt` 已指向它。

## 依赖说明

- 运行依赖仅 `astro` 与 `@astrojs/sitemap`。
- devDependencies 中 heic-convert / @ffmpeg-installer/ffmpeg / @jsquash/avif 为**一次性素材转换工具**（配合 `scripts/` 下脚本），与站点运行无关。

## 待企业确认的初稿内容（上线前必须处理）

页面曾有的两处「待确认」徽标（关于我们第二段、中文地址）**已经企业确认，徽标已移除**。其余待办（页面上不可见）：

| 位置 | 内容 | 说明 |
|------|------|------|
| 联系方式-WhatsApp | WhatsApp 号码 | 待企业提供；渠道已从页面移除，号码到位后恢复 |
| 企业邮箱 | info@lmgj.cn | 页面已更新为域名邮箱；需确认企业邮件服务器已开通该地址收信 |
| 询盘表单（O-01） | 未实现 | 需求文档 Q1 待定案；当前为邮件/电话直联方案 |
| 访问统计（O-02） | 未接入 | 需求文档 Q2 待定案 |
