/**
 * 图片资产解析：内容源（content.ts）中的路径不变，
 * 组件经此 helper 将其映射到 src/assets 下经 astro:assets 优化的产物。
 */
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
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

/** 解析资产在指定宽度的优化产物地址（webp，构建时生成） */
async function getImageSrc(meta: ImageMetadata, width: number): Promise<string> {
  const resolved = await getImage({ src: meta, width, format: 'webp' });
  return resolved.src;
}

export interface LightboxImage {
  src: string;
  altZh: string;
  altEn: string;
}

/** 灯箱所需列表：src 为指定宽度的优化大图地址（构建期生成）；组件 frontmatter 中 await 使用 */
export async function toLightboxImages(
  images: ProductImage[] | undefined,
  width = 1280
): Promise<LightboxImage[]> {
  return Promise.all(
    (images ?? []).map(async (img) => ({
      src: await getImageSrc(assetImage(img.src), width),
      altZh: img.alt.zh,
      altEn: img.alt.en,
    }))
  );
}
