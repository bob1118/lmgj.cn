// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 静态输出，部署到海外服务器（免备案），站点地址为正式域名
export default defineConfig({
  site: 'https://lmgj.cn',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
