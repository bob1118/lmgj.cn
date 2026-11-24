# AGENTS.md

## 项目与验证

- Astro 7 静态单页站；入口 `src/pages/index.astro`，按 Hero → 关于 → 产品 → 实力 → 联系组装，无新闻区或详情页。
- Node ≥22.12。发布验证顺序：`npm run check` → `npm run build` → `npm run smoke`；smoke 检查 `dist/`，必须在 build 后运行。CI 同样按此顺序。
- `需求文档.md` 是需求决策来源；未定事项查第 11 节及 `README.md`「待企业确认」，不要自行拍板（如询盘表单、访问统计）。

## 内容与产品

- 双语文案唯一来源为 `src/data/content.ts`；文案字段用 `Pair` 中英成对维护。企业未提供的文案标为 draft，交付时注明待企业确认。
- 产品分类为面料与配饰，页签并列切换；面料分组顺序固定为 trend 流行新品 → knitted 针织 → woven 梭织，配饰平铺且 Trending Accessories 居首。中文统一写「梭织」，英文页签用 Fabrics / Accessories。
- `Products.astro` 编排分组/分类，`ProductCard.astro` 负责产品卡；改分类时保持 `data-cat-tab` 与 `id="cat-<id>"` 对应及同位切换结构。
- 默认语言跟随浏览器（非中文浏览器为英文），用户手动切换后以 localStorage 为准；首帧预读逻辑在 `Layout.astro` 内联脚本中。

## 图片与样式

- 原片目录 `images/` 已忽略，不要取消忽略或提交原片；站点图片放 `src/assets/products/` 或 `src/assets/company/`，不要放内容图到 `public/`。在 `content.ts` 登记图片路径，`src/lib/images.ts` 按文件名映射资产。
- 灯箱图片通过 `toLightboxImages` 异步生成优化图；组件 frontmatter 中需 `await`，勿直接用原图 metadata 的 `.src`。
- 品类颜色在 `src/styles/global.css` 变量中维护；共享 SVG pattern 定义在 `Layout.astro`。响应式断点为 1020/860/640px，调整布局时检查 861–1020px 中间档。
- sitemap 由 `@astrojs/sitemap` 构建生成，`public/robots.txt` 已指向它；无需手工维护 sitemap。
