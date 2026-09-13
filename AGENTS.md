# AGENTS.md

## 项目背景

- lmgj.cn：纺织品面料与配饰进出口贸易企业官网（2026 分类调整：面料 + 配饰两大分类，面料下子分组针织/梭织/流行新品的叫法为企业 2026-09 定稿，woven=梭织勿再写「织造」）。
- **`需求文档.md` 是唯一的决策来源**；其第 11 节「待确认事项」尚未定案的（询盘表单、访问统计等），不要擅自替企业做决定。
- **原片不入库**：企业原始素材经一次性脚本压缩为 webp 后放 `src/assets/`，原片目录 `images/` 已在 `.gitignore` 中排除（本地磁盘可能仍存在该目录，`git status` 会显示为忽略项，**切勿取消忽略或提交它**；`scripts/import-two-categories.mjs` 为面料 + 配饰素材的全量导入脚本——96 张，台账 `scripts/import-manifest-two-categories.json`；旧脚本 `scripts/import-new-products.mjs` 为三分类时代的流行品导入，已被取代仅留档）。

## 关键决策（易错点）

- **单页站**：全部内容在一个页面（`src/pages/index.astro` 组装），导航为锚点滚动，不要搭多页面路由。
- 页面区块固定为：Hero → 关于我们 → 产品中心 → 公司实力 → 联系我们。**没有新闻动态**，不要添加。
- **中英双语**：整页内容切换（中/EN 按钮），默认中文；文案必须中英成对（`Pair`）维护，页面元素用 `.i18n-zh` / `.i18n-en` 成对 span 渲染，由 `html[data-lang]` 控制显隐。
- 产品按两大分类（面料 fabrics / 配饰 accessories；面料子分组显示顺序为企业定稿：**trend 流行新品 → knitted 针织 → woven 梭织**，勿改序，woven 中文一律写「梭织」）展示代表产品，**面料分类含 `groups`，配饰直接平铺 `items`（配饰内 Trending Accessories 按企业要求置于首位）**；英文页签为企业定稿 **Fabrics / Accessories（勿写 Garment Accessories）**；**无详情页、无搜索、无后台 CMS**。配饰 5 款文案与全局定位文案为 draft 待企业确认（需求文档 Q9）。
- 部署到海外（GitHub Pages，推送 main 自动构建；产物 `dist/`），无 ICP 备案内容。托管平台最终选择企业未定案，不要主动迁移。

## 技术栈与命令

- **Astro 7 静态输出**（要求 Node ≥22.12，CI 用 Node 22，本地版本低了会构建失败）：`npm run dev`（localhost:4321）/ `npm run check`（类型检查，改完必跑）/ `npm run build` / `npm run preview`。
- 双语文案唯一源：`src/data/content.ts`（440 行左右，含产品/实力/联系全部数据）。
- 图片走 `astro:assets`：新图放进 `src/assets/products/` 或 `src/assets/company/`（ASCII 文件名），在 `content.ts` 登记路径；解析逻辑在 `src/lib/images.ts`（路径仅作 key，按文件名匹配）。**不要往 `public/` 放内容图**（仅 robots.txt）。
- 灯箱图列表用 `src/lib/images.ts` 的 `toLightboxImages`（**异步**，组件 frontmatter 中 `await`）：src 为构建期 `getImage()` 生成的 1280 宽优化 webp 大图，别退回直接用原图 metadata 的 `.src`。
- 三大品类配色收编在 `src/styles/global.css` 变量（面料子分类 `--cat-knitted` / `--cat-woven` / `--cat-trend(-deep)`，配饰 `--cat-accessories(-deep)`），改品类色改变量，勿在组件硬编码。spec-chip（克重角标）按品类着色：针织靛蓝 / 梭织（默认）青绿 / trend 子分组粉调。
- 织物纹样为共享 SVG pattern（定义在 `Layout.astro`，组件内以 `url(#patt-knit)` / `patt-woven` / `patt-twill` / `patt-beads` 引用），勿重复定义。
- 产品卡是独立组件 `src/components/ProductCard.astro`（灯箱、count/spec/trend 徽标、占位图），`Products.astro` 只做面料子分组与配饰平铺的层级编排。
- **产品两分类同位页签**：`.cat-tabs` 页签（面料/配饰）点击切换 `.category` 显示（非首个默认 `.is-hidden`），切换脚本在 `Layout.astro` 尾部；`data-cat-tab` 与面板 `id="cat-<id>"` 必须成对，换分类结构时勿拆成两块上下堆叠。页签桌面 `position: sticky` 吸顶（≤640px 回落），激活态面料用 brand-ink、配饰用 `--cat-accessories-deep`（选中看 `aria-selected`，勿只依赖 `.is-active`）。
- **响应式断点**：1020 / 860 / 640 三档——861–1020px 产品与优势均两列，≤860px 产品单列；调布局时注意中间档勿再漏。
- 双语切换、移动端菜单、滚动高亮、灯箱（`data-lb-images` 属性）等交互脚本都在 `Layout.astro` 尾部。
- 双语随语言切换同步的机制（`Layout.astro` 脚本）：图片 alt 用 `data-alt-zh/en`、链接地址用 `data-href-zh/en`（如邮件询盘 mailto 主题，见 `content.ts` 的 `inquirySubject`）、读屏文案用 `data-aria-zh/en`；SSR 默认输出中文值。
- **语言决策（Q5 已定案）**：默认语言跟随浏览器（`navigator.language` 非 zh 开头 → 英文），用户点过中/EN 按钮则以 localStorage 记录优先；切换逻辑在 `Layout.astro` 首部内联预读脚本，首帧前生效防闪切，勿移到异步脚本。
- 改 logo 需要重跑 `node scripts/make-brand-assets.mjs` 重新生成 og 图 / favicon；`scripts/convert-heic.mjs` 用于企业 iPhone HEIC 原图转 JPG（素材一次性工具，与站点运行无关，勿顺手删）；`scripts/import-two-categories.mjs` 全量导入现有产品素材（源片在本地 `images/fabrics/` 与 `images/accessories/`，gitignore 内不入库；统一 1920px/Q75 webp，重跑幂等可复现）。

## 内容约定

- 企业未提供的文案可起草初稿，但需在 `content.ts` 中标注 draft 并在产出里注明「待企业确认」。
- 上线前待办清单（WhatsApp 号码、询盘表单 O-01、访问统计 O-02 等企业未定案项）见 `README.md`「待企业确认」一节，接手时先核对。
- 所有正文、注释、提交信息使用中文。
- 构建时自动生成 sitemap（`@astrojs/sitemap`），`public/robots.txt` 已指向它，勿手动维护 sitemap。
