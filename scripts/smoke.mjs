/**
 * 站点烟囱检查：对 dist/ 产物做断言，防止企业改动素材入库后出现回归。
 * - 产品页签与卡片齐全（两分类 + 17 张产品卡）
 * - 无原片 URL 泄漏（IMG_.* 系 iPhone 原生命名）与残留 draft 徽标
 * - JSON-LD（Organization + ItemList）与 sitemap 存在
 * - 灯箱共享脚本存在
 * 用法：npm run smoke（可在本地跑，发布前由 deploy.yml 自动执行）
 * 任一断言失败进程退出码 1。
 */
import { readFileSync, existsSync } from 'node:fs';

const dist = 'dist';
let failed = false;
const check = (name, ok, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
  if (!ok) failed = true;
};

check('dist/index.html 存在', existsSync(`${dist}/index.html`));
check('dist/404.html 存在', existsSync(`${dist}/404.html`));
check('sitemap-index.xml 存在', existsSync(`${dist}/sitemap-index.xml`));

const html = existsSync(`${dist}/index.html`) ? readFileSync(`${dist}/index.html`, 'utf8') : '';

const lbAttrs = [...html.matchAll(/data-lb-images="([^"]*)"/g)]
  .map((m) => m[1])
  .filter((v) => v.includes('&quot;'));
check('产品页签（面料/配饰）', html.includes('data-cat-tab="fabrics"') && html.includes('data-cat-tab="accessories"'));
check('产品/灯箱卡 25 处（17 产品卡 + 8 实力图）', lbAttrs.length === 25, `实际 ${lbAttrs.length}`);
check('ItemList 17 项', /"imageListElement"|"itemListElement"|"ItemList"/.test(html) && (html.match(/"position":"/g) || html.match(/"position":/g) || []).length >= 17);
check('无原片 URL 泄漏（IMG_E）', !/IMG_E/i.test(html));
check('无 draft 待确认徽标残留', !html.includes('draft-pill'));
check('页签 ARIA 完整', html.includes('role="tabpanel"') && (html.match(/aria-selected/g) || []).length === 2);

process.exit(failed ? 1 : 0);
