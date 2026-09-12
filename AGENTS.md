# AGENTS.md

## 项目背景

- lmgj.cn：纺织品进出口贸易企业官网（主营针织 / 织造纺织品 + 2026 新增「流行新品」丝绒品类）。
- **`需求文档.md` 是唯一的决策来源**；其第 11 节「待确认事项」尚未定案的（询盘表单、访问统计等），不要擅自替企业做决定。
- **原片不入库**：企业原始素材经一次性脚本压缩为 webp 后放 `src/assets/`，原片目录 `images/` 已在 `.gitignore` 中排除（本地磁盘可能仍存在该目录，`git status` 会显示为忽略项，**切勿取消忽略或提交它**；`scripts/import-new-products.mjs` 为流行新品 64 张实拍的导入脚本，台账 `scripts/import-manifest.json`）。

## 关键决策（易错点）

- **单页站**：全部内容在一个页面（`src/pages/index.astro` 组装），导航为锚点滚动，不要搭多页面路由。
- 页面区块固定为：Hero → 关于我们 → 产品中心 → 公司实力 → 联系我们。**没有新闻动态**，不要添加。
- **中英双语**：整页内容切换（中/EN 按钮），默认中文；文案必须中英成对（`Pair`）维护，页面元素用 `.i18n-zh` / `.i18n-en` 成对 span 渲染，由 `html[data-lang]` 控制显隐。
- 产品按三大分类（针织 knitted / 织造 woven / 流行新品 trend，2026 新增流行新品）展示代表产品，**无详情页、无搜索、无后台 CMS**。
- 部署到海外（GitHub Pages，推送 main 自动构建；产物 `dist/`），无 ICP 备案内容。托管平台最终选择企业未定案，不要主动迁移。

## 技术栈与命令

- **Astro 5 静态输出**：`npm run dev`（localhost:4321）/ `npm run check`（类型检查，改完必跑）/ `npm run build` / `npm run preview`。
- 双语文案唯一源：`src/data/content.ts`（440 行左右，含产品/实力/联系全部数据）。
- 图片走 `astro:assets`：新图放进 `src/assets/products/` 或 `src/assets/company/`（ASCII 文件名），在 `content.ts` 登记路径；解析逻辑在 `src/lib/images.ts`（路径仅作 key，按文件名匹配）。**不要往 `public/` 放内容图**（仅 robots.txt）。
- 灯箱图列表用 `src/lib/images.ts` 的 `toLightboxImages`（**异步**，组件 frontmatter 中 `await`）：src 为构建期 `getImage()` 生成的 1280 宽优化 webp 大图，别退回直接用原图 metadata 的 `.src`。
- 织物纹样为共享 SVG pattern（定义在 `Layout.astro`，组件内以 `url(#patt-knit)` 等引用），勿重复定义。
- 双语切换、移动端菜单、滚动高亮、灯箱（`data-lb-images` 属性）等交互脚本都在 `Layout.astro` 尾部。
- 双语随语言切换同步的机制（`Layout.astro` 脚本）：图片 alt 用 `data-alt-zh/en`、链接地址用 `data-href-zh/en`（如邮件询盘 mailto 主题，见 `content.ts` 的 `inquirySubject`）、读屏文案用 `data-aria-zh/en`；SSR 默认输出中文值。
- **语言决策（Q5 已定案）**：默认语言跟随浏览器（`navigator.language` 非 zh 开头 → 英文），用户点过中/EN 按钮则以 localStorage 记录优先；切换逻辑在 `Layout.astro` 首部内联预读脚本，首帧前生效防闪切，勿移到异步脚本。
- 改 logo 需要重跑 `node scripts/make-brand-assets.mjs` 重新生成 og 图 / favicon；`scripts/convert-heic.mjs` 用于企业 iPhone HEIC 原图转 JPG（素材一次性工具，与站点运行无关，勿顺手删）；`scripts/import-new-products.mjs` 为流行新品实拍导入（原片 `images/` 已清理，重跑会因目录不存在而报错，属预期）。

## 内容约定

- 企业未提供的文案可起草初稿，但需在 `content.ts` 中标注 draft 并在产出里注明「待企业确认」。
- 上线前待办清单（WhatsApp 号码、询盘表单 O-01、访问统计 O-02 等企业未定案项）见 `README.md`「待企业确认」一节，接手时先核对。
- 所有正文、注释、提交信息使用中文。
- 构建时自动生成 sitemap（`@astrojs/sitemap`），`public/robots.txt` 已指向它，勿手动维护 sitemap。
