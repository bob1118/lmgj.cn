/**
 * 图片资产解析：内容源（content.ts）中的路径不变，
 * 组件经此 helper 将其映射到 src/assets 下经 astro:assets 优化的产物。
 */
import type { ImageMetadata } from 'astro';
import type { ProductImage } from '../data/content';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const lookup = new Map<string, ImageMetadata>();
for (const [file, mod] of Object.entries(modules)) {
  lookup.set(file.split('/').pop() ?? file, mod.default);
}

/** 按内容源路径（如 /images/products/jersey-1.jpg）解析为优化后的图片资产 */
export function assetImage(src: string): ImageMetadata {
  const name = src.split('/').pop();
  const img = name ? lookup.get(name) : undefined;
  if (!img) {
    throw new Error(`未找到图片资产：${src}`);
  }
  return img;
}

export interface LightboxImage {
  src: string;
  /** 双语拼接（灯箱内展示用） */
  alt: string;
  /** 单语言（供页面 img alt 随语言切换） */
  altZh: string;
  altEn: string;
}

/** 将内容源的图片列表转为灯箱所需的优化图列表（src 为构建产物地址） */
export function toLightboxImages(images: ProductImage[] | undefined): LightboxImage[] {
  return (images ?? []).map((img) => ({
    src: assetImage(img.src).src,
    alt: `${img.alt.zh} ${img.alt.en}`,
    altZh: img.alt.zh,
    altEn: img.alt.en,
  }));
}
