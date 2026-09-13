/**
 * 全站双语文案（唯一内容源）。
 *
 * 约定：
 * - 所有字段必须中英成对（Pair 结构），修改后中英同步维护。
 * - 标注「draft」的内容为企业未提供的初稿，上线前需企业确认；
 *   页面上以小徽标（draft-pill）提示的位置与此处对应。
 */

/**
 * 产品分类（2026 企业调整：由针织/织造/流行新品三分类改为「面料 + 配饰」两分类）：
 * - fabrics 面料：子分组 knitted 针织 / woven 梭织 / trend 流行新品
 *   （原三大分类名称与描述已经企业确认，降级为面料子分组后沿用，不重新起草）；
 * - accessories 配饰：2026 新增板块，子目录=产品（企业素材目录为结构依据，文案 draft 待企业确认）。
 */
export type ProductCategoryId = 'fabrics' | 'accessories';
export type ProductGroupId = 'knitted' | 'woven' | 'trend';

export interface Pair {
  zh: string;
  en: string;
}

/** 产品实拍图（可选；未提供时组件回退为纹样占位） */
export interface ProductImage {
  src: string;
  alt: Pair;
}

export interface ProductItem {
  name: Pair;
  /** 克重/规格；企业未提供时留空，卡片不渲染规格角标 */
  spec?: string;
  desc: Pair;
  images?: ProductImage[];
  /** 可选角标（如配饰「流行新品」），渲染于缩略图上 */
  badge?: Pair;
}

/** 面料分类下的子分组（分组结构与素材子目录一致） */
export interface ProductGroup {
  id: ProductGroupId;
  name: Pair;
  desc: Pair;
  items: ProductItem[];
}

export interface ProductCategory {
  id: ProductCategoryId;
  name: Pair;
  desc: Pair;
  /** 面料等有子分组的分类；缺省时直接平铺 items（配饰） */
  groups?: ProductGroup[];
  /** 无子分组的分类直接平铺产品（配饰） */
  items?: ProductItem[];
}

/** 品牌（企业已确认：中文名 金华莱盟纺织品有限公司，英文名 Jinhua Laimeng Textile Factory） */
export const site = {
  nameZh: '金华莱盟纺织品有限公司',
  nameEn: 'Jinhua Laimeng Textile Factory',
  domain: 'lmgj.cn',
  url: 'https://lmgj.cn',
};

export const nav: { id: string; label: Pair }[] = [
  { id: 'home', label: { zh: '首页', en: 'Home' } },
  { id: 'about', label: { zh: '关于我们', en: 'About' } },
  { id: 'products', label: { zh: '产品中心', en: 'Products' } },
  { id: 'strength', label: { zh: '公司实力', en: 'Strength' } },
  { id: 'contact', label: { zh: '联系我们', en: 'Contact' } },
];

export const hero = {
  // draft：定位由「针织织造」扩为「面料 + 配饰」，待企业确认
  eyebrow: { zh: '面料 · 配饰进出口', en: 'Fabrics & Accessories Import & Export' },
  // 标题允许少量 <em> 强调标记（由组件 set:html 渲染）
  titleHtml: {
    zh: '莱盟纺织，织造<em>可信赖</em>的全球供应',
    en: 'Woven with <em>Trust</em>, Delivered Worldwide',
  },
  // draft：描述同步补充配饰板块，待企业确认
  subtitle: {
    zh: '专注面料与配饰进出口贸易，为国内外采购商提供从选料、打样到大货交付的一站式服务。',
    en: 'Specialized in fabrics and accessories trading — one-stop service from sourcing and sampling to bulk delivery for buyers worldwide.',
  },
  ctaProducts: { zh: '查看产品', en: 'View Products' },
  ctaContact: { zh: '联系我们', en: 'Contact Us' },
  // 以下数字已经企业确认
  stats: [
    { value: { zh: '6+', en: '6+' }, label: { zh: '年行业经验', en: 'Years of Experience' } },
    { value: { zh: '30+', en: '30+' }, label: { zh: '出口国家与地区', en: 'Export Destinations' } },
    { value: { zh: '200+', en: '200+' }, label: { zh: '合作工厂与伙伴', en: 'Partner Mills' } },
  ],
};

export const about = {
  title: { zh: '关于我们', en: 'About Us' },
  // draft：原文（专注针织与织造纺织品进出口）已经企业确认，扩充配饰后待企业确认
  lead: {
    zh: '金华莱盟纺织品有限公司是一家专注于面料与配饰进出口的外贸企业，依托中国主要纺织产业带的成熟供应链，为全球采购商提供稳定、优质、高效的供应服务。',
    en: 'Jinhua Laimeng Textile Factory is an import & export company specializing in fabrics and accessories. Backed by mature supply chains across China\u2019s major textile hubs, we deliver stable, quality-assured products to buyers worldwide.',
  },
  // draft：原文为企业确认文案，扩写配饰后待企业确认
  body: {
    zh: '我们长期深耕针织、梭织面料与配饰板块，熟悉国际市场的品质标准与合规要求，能够快速响应打样、翻单与大货交付需求，成为客户长期信赖的供应链伙伴。',
    en: 'Focusing on knitted, woven fabrics and accessories, we understand international quality standards and compliance requirements, responding quickly to sampling, re-orders and bulk production — a supply chain partner you can rely on for the long term.',
  },
  advantagesTitle: { zh: '核心优势', en: 'Why Choose Us' },
  advantages: [
    {
      title: { zh: '源头供应链', en: 'Mill-Direct Supply' },
      desc: {
        zh: '直连产业带工厂，货源稳定、价格有竞争力。',
        en: 'Direct access to mill clusters — stable supply at competitive prices.',
      },
    },
    {
      title: { zh: '品质管控', en: 'Quality Control' },
      desc: {
        zh: '从坯布到成品出运的全流程检验与把控。',
        en: 'Full-process inspection from greige fabric to shipment.',
      },
    },
    {
      title: { zh: '贸易专业度', en: 'Trade Expertise' },
      desc: {
        zh: '熟悉国际标准、单证与合规要求，沟通顺畅。',
        en: 'Fluent in international standards, documentation and compliance.',
      },
    },
    {
      title: { zh: '高效交付', en: 'Efficient Delivery' },
      desc: {
        zh: '起订量灵活，按时交货，物流方案成熟。',
        en: 'Flexible MOQ, on-time shipment and mature logistics.',
      },
    },
  ],
};

/**
 * 为产品批量生成实拍图列表（多图灯箱用）。
 * 图源：src/assets/products/<slug>-NN.webp（scripts/import-two-categories.mjs 全量导入，
 * 台账 scripts/import-manifest-two-categories.json；原片目录 images/ gitignore 不入库）。
 * 企业如需逐图定制 alt，可展开为显式列表。
 */
function productPhotos(slug: string, count: number, zhBase: string, enBase: string): ProductImage[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      src: `/images/products/${slug}-${String(n).padStart(2, '0')}.webp`,
      alt: { zh: `${zhBase}实拍图${n}`, en: `${enBase} view ${n}` },
    };
  });
}
export const products: {
  /** 区块 kicker（页面上方的小标签，双语成对） */
  kicker: Pair;
  /** 空分类占位提示（产品未上架时显示） */
  emptyHint: Pair;
  title: Pair;
  intro: Pair;
  contactLead: Pair;
  contactCta: Pair;
  categories: ProductCategory[];
} = {
  kicker: { zh: '产品分类', en: 'Categories' },
  emptyHint: {
    zh: '款式与颜色方案整理中，欢迎垂询获取最新样品。',
    en: 'New styles and colorways being curated — ask us for the latest samples.',
  },
  title: { zh: '产品中心', en: 'Products' },
  // draft：定位由「两大品类」改为「面料 + 配饰」两分类，待企业确认
  intro: {
    zh: '聚焦面料与配饰两大板块，涵盖针织、梭织与流行新品面料及配饰产品；以下为代表产品，更多品类欢迎垂询。',
    en: 'Focused on fabrics and accessories — knitted, woven and trending fabrics alongside trims and beadwork. Representative products below; more available on request.',
  },
  contactLead: {
    zh: '需要完整产品目录或寄送样品？',
    en: 'Need the full catalog or samples?',
  },
  contactCta: { zh: '欢迎垂询', en: 'Get in Touch' },
  categories: [
    {
      // 面料：子分组结构对应素材目录 images/fabrics/{knitted,woven,Trend}，各产品的子文件夹见台账
      id: 'fabrics',
      // draft：分类名与描述为两分类调整后的新定位，待企业确认
      name: { zh: '面料', en: 'Fabrics' },
      desc: {
        zh: '涵盖针织、梭织与流行新品三大类面料，常年供应主流规格，支持打样与大货定制。',
        en: 'Knitted, woven and Trending collections — mainstream specifications in regular supply, sampling and bulk production on request.',
      },
      groups: [
        {
          // 「流行新品」名称与描述已经企业确认，降级为面料子分组沿用；克重企业已提供（醋酸感丝绒 260–300，压花数码印花/压花石纹 240–300，多花型 220–300，仿真丝绒压花/印花 240–280，企业口径 gsm，站点统一展示为 g/m²）。
          // 产品名称来自企业素材文件夹（原片 images/fabrics/Trend/ 6 组 64 张重新压缩入库）。
          id: 'trend',
          name: { zh: '流行新品', en: 'Trending' },
          desc: {
            zh: '聚焦今年流行款式与色彩方向，紧跟国际时尚趋势提供应季新品面料。',
            en: 'Curated around this year\u2019s trending styles and color directions — in-season new fabrics following international fashion trends.',
          },
          items: [
            {
              name: { zh: '醋酸感丝绒', en: 'Acetate-Feel Velvet' },
              spec: '260–300 g/m²',
              desc: {
                zh: '垂坠丝滑、光泽柔和，连衣裙与外套的应季新品面料。',
                en: 'Fluid drape with a soft sheen — a seasonal new fabric for dresses and coats.',
              },
              // 实拍图：企业已提供（企业实拍 8 张）
              images: productPhotos('acetate-velvet', 8, '醋酸感丝绒', 'Acetate-feel velvet'),
            },
            {
              name: { zh: '醋酸感丝绒 · 压花数码印花', en: 'Acetate-Feel Velvet Emboss, Digital Print' },
              spec: '240–300 g/m²',
              desc: {
                zh: '数码印花花型与压花绒面结合，图案立体、层次分明。',
                en: 'Digital-print motifs on embossed velvet — dimensional patterns with clear depth.',
              },
              // 实拍图：企业已提供（企业实拍 8 张）
              images: productPhotos('acetate-velvet-digital-print', 8, '醋酸感丝绒压花数码印花', 'Acetate-feel velvet emboss digital print'),
            },
            {
              name: { zh: '醋酸感丝绒 · 压花石纹', en: 'Acetate-Feel Velvet Stone Emboss' },
              spec: '240–300 g/m²',
              desc: {
                zh: '石纹肌理压花，手感立体、光泽内敛，呈现自然质感。',
                en: 'Stone-texture embossed velvet — dimensional hand-feel with a subtle, natural sheen.',
              },
              // 实拍图：企业已提供（企业实拍 8 张）
              images: productPhotos('acetate-velvet-stone', 8, '醋酸感丝绒压花石纹', 'Acetate-feel velvet stone emboss'),
            },
            {
              name: { zh: '醋酸感丝绒 · 多花型', en: 'Acetate-Feel Velvet, Multi-Design' },
              spec: '220–300 g/m²',
              desc: {
                zh: '一个绒底承载多组花型，可按服饰款式灵活选配。',
                en: 'One velvet base carrying multiple designs — flexible matching by apparel style.',
              },
              // 实拍图：企业已提供（企业实拍 8 张）
              images: productPhotos('acetate-velvet-multi-design', 8, '醋酸感丝绒多花型', 'Acetate-feel velvet multi-design'),
            },
            {
              name: { zh: '仿真丝绒 · 压花', en: 'Silk-Feel Velvet Emboss' },
              spec: '240–280 g/m²',
              desc: {
                zh: '仿真丝光泽的绒面压花，价格亲民、质感高级。',
                en: 'Silk-look velvet with embossed texture — accessible pricing with a premium feel.',
              },
              // 实拍图：企业已提供（企业实拍 16 张）
              images: productPhotos('copy-silk-velvet-emboss', 16, '仿真丝绒压花', 'Silk-feel velvet emboss'),
            },
            {
              name: { zh: '仿真丝绒 · 印花', en: 'Silk-Feel Velvet Print' },
              spec: '240–280 g/m²',
              desc: {
                zh: '绒面印花花型清透、光泽柔和，适合连衣裙与家居用途。',
                en: 'Clear printed motifs on a soft-sheen pile — for dresses and home applications.',
              },
              // 实拍图：企业已提供（企业实拍 16 张）
              images: productPhotos('copy-silk-velvet-print', 16, '仿真丝绒印花', 'Silk-feel velvet print'),
            },
          ],
        },
        {
          // 子分组名称/描述沿用原企业确认文案；结构对应 images/fabrics/knitted/{Jersey,Rib,Terry}
          id: 'knitted',
          name: { zh: '针织面料', en: 'Knitted Fabrics' },
          desc: {
            zh: '手感柔软、弹性良好，广泛用于 T 恤、运动服与内衣。',
            en: 'Soft hand-feel with natural stretch — widely used for T-shirts, activewear and underwear.',
          },
          items: [
            {
              name: { zh: '汗布', en: 'Single Jersey' },
              spec: '100–220 g/m²',
              desc: {
                zh: '透气亲肤，T 恤与居家服经典面料。',
                en: 'Breathable & skin-friendly, a classic for T-shirts and loungewear.',
              },
              // 实拍图：企业已提供（Jersey 2 张，经 scripts/import-two-categories.mjs 压缩入库；Jersey1500 型号对应见台账）
              images: [
                {
                  src: '/images/products/jersey-01.webp',
                  alt: { zh: '汗布实拍图一', en: 'Single jersey fabric view 1' },
                },
                {
                  src: '/images/products/jersey-02.webp',
                  alt: { zh: '汗布实拍图二', en: 'Single jersey fabric view 2' },
                },
              ],
            },
            {
              name: { zh: '罗纹', en: 'Rib Fabric' },
              spec: '150–300 g/m²',
              desc: {
                zh: '弹性足、回弹好，用于领口袖口与修身款。',
                en: 'High stretch & recovery, for collars, cuffs and fitted styles.',
              },
              // 实拍图：企业已提供（Rib 2 张）
              images: [
                {
                  src: '/images/products/rib-01.webp',
                  alt: { zh: '罗纹实拍图一', en: 'Rib fabric view 1' },
                },
                {
                  src: '/images/products/rib-02.webp',
                  alt: { zh: '罗纹实拍图二', en: 'Rib fabric view 2' },
                },
              ],
            },
            {
              name: { zh: '毛圈布', en: 'French Terry' },
              spec: '200–350 g/m²',
              desc: {
                zh: '柔软吸汗，卫衣帽衫常用面料。',
                en: 'Soft and absorbent, the go-to fabric for hoodies and sweatshirts.',
              },
              // 实拍图：企业已提供（Terry 2 张）
              images: [
                {
                  src: '/images/products/terry-01.webp',
                  alt: { zh: '毛圈布实拍图一', en: 'French terry fabric view 1' },
                },
                {
                  src: '/images/products/terry-02.webp',
                  alt: { zh: '毛圈布实拍图二', en: 'French terry fabric view 2' },
                },
              ],
            },
          ],
        },
        {
          // 子分组沿用原企业确认文案；结构对应 images/fabrics/woven/{Oxford,Poplin,twill}
          id: 'woven',
          name: { zh: '梭织面料', en: 'Woven Fabrics' },
          desc: {
            zh: '结构挺括、结实耐久，适用于衬衫、工装与家纺。',
            en: 'Crisp, structured and durable — for shirts, workwear and home textiles.',
          },
          items: [
            {
              name: { zh: '府绸', en: 'Poplin' },
              spec: '100–160 g/m²',
              desc: {
                zh: '细洁平滑、手感爽挺，经典衬衫面料。',
                en: 'Fine, smooth and crisp — a classic shirting fabric.',
              },
              // 实拍图：企业已提供（Poplin 2 张）
              images: [
                {
                  src: '/images/products/poplin-01.webp',
                  alt: { zh: '府绸实拍图一', en: 'Poplin fabric view 1' },
                },
                {
                  src: '/images/products/poplin-02.webp',
                  alt: { zh: '府绸实拍图二', en: 'Poplin fabric view 2' },
                },
              ],
            },
            {
              name: { zh: '纱卡 / 斜纹', en: 'Twill / Drill' },
              spec: '200–350 g/m²',
              desc: {
                zh: '结实耐磨，工装裤装首选面料。',
                en: 'Strong and abrasion-resistant, first choice for workwear and trousers.',
              },
              // 实拍图：企业已提供（twill 2 张）
              images: [
                {
                  src: '/images/products/twill-01.webp',
                  alt: { zh: '斜纹布实拍图一', en: 'Twill fabric view 1' },
                },
                {
                  src: '/images/products/twill-02.webp',
                  alt: { zh: '斜纹布实拍图二', en: 'Twill fabric view 2' },
                },
              ],
            },
            {
              name: { zh: '牛津布', en: 'Oxford' },
              spec: '150–300 g/m²',
              desc: {
                zh: '挺括耐用，箱包、休闲服饰与家纺适用。',
                en: 'Sturdy and durable, for bags, casual wear and home textiles.',
              },
              // 实拍图：企业已提供（Oxford 2 张）
              images: [
                {
                  src: '/images/products/oxford-01.webp',
                  alt: { zh: '牛津布实拍图一', en: 'Oxford fabric view 1' },
                },
                {
                  src: '/images/products/oxford-02.webp',
                  alt: { zh: '牛津布实拍图二', en: 'Oxford fabric view 2' },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      // 配饰：结构对应素材目录 images/accessories 五个子文件夹，每个子文件夹 = 一款产品
      // draft：以下全部中英文命名与描述为按目录直译起草，待企业确认
      id: 'accessories',
      name: { zh: '配饰', en: 'Accessories' },
      desc: {
        zh: '涵盖串珠、珍珠、水钻到女装配饰的全品类珠饰与辅料，可按款式与配色定制。',
        en: 'Full-range beadwork and trims — from bugle, pearl and rhinestone beads to women\u2019s accessories, customizable by style and colorway.',
      },
      items: [
        {
          name: { zh: '流行饰品', en: 'Trending Accessories' },
          // badge：角标文案，渲染于产品缩略图上；企业要求置于配饰首位
          badge: { zh: '流行新品', en: 'New & Trending' },
          desc: {
            zh: '紧贴本季流行趋势的配饰单品，新款持续更新，欢迎垂询。',
            en: 'Accessory styles following this season\u2019s trends — new arrivals updated regularly.',
          },
          // 实拍图：企业已提供（企业实拍 8 张）
          images: productPhotos('accessories-trend', 8, '流行饰品', 'Trending accessories'),
        },
        {
          name: { zh: '串珠管珠', en: 'Bugle Beads' },
          desc: {
            zh: '细长管形珠饰，点缀礼服、针织与箱包配饰。',
            en: 'Slender tube-shaped beads for gowns, knitwear and bag accents.',
          },
          // 实拍图：企业已提供（企业实拍 4 张，原片为 hash 文件名，台账可溯源）
          images: productPhotos('bugle-beads', 4, '串珠管珠', 'Bugle beads'),
        },
        {
          name: { zh: '工艺珍珠', en: 'Craft Pearl Beads' },
          desc: {
            zh: '珠面圆润、光泽柔和，适合女装与礼服的细节点缀。',
            en: 'Round pearls with a soft sheen — refined accents for women\u2019s wear and gowns.',
          },
          // 实拍图：企业已提供（企业实拍 3 张）
          images: productPhotos('craft-pearl-beads', 3, '工艺珍珠', 'Craft pearl beads'),
        },
        {
          name: { zh: '水钻珠', en: 'Rhinestone Beads' },
          desc: {
            zh: '高折射水晶质感，为高级定制与舞台服饰增亮。',
            en: 'High-refraction crystal sparkle for couture and stage wear.',
          },
          // 实拍图：企业已提供（企业实拍 2 张）
          images: productPhotos('rhinestone-beads', 2, '水钻珠', 'Rhinestone beads'),
        },
        {
          name: { zh: '女装配饰', en: 'Women\u2019s Accessories' },
          desc: {
            zh: '女装配套珠饰与装饰件，可按款式与配色定制。',
            en: 'Matching beadwork and trims for women\u2019s wear — customizable by style and colorway.',
          },
          // 实拍图：企业已提供（企业实拍 3 张）
          images: productPhotos('women-accessories', 3, '女装配饰', 'Women\u2019s accessories'),
        },
      ],
    },
  ],
};

export const strength = {
  title: { zh: '公司实力', en: 'Company Strength' },
  intro: {
    zh: '可靠的品质来自可靠的体系——资质认证、生产设备、品控流程与全球市场的实景展示。',
    en: 'Consistent quality comes from a consistent system — a real view of our qualifications, equipment, QC process and global market.',
  },
  // 资质与认证：企业已提供（企业实拍，压缩入库并改用 ASCII 文件名）
  certificates: [
    {
      src: '/images/company/business-license.jpg',
      label: { zh: '营业执照', en: 'Business Licence' },
      alt: { zh: '金华莱盟纺织品有限公司营业执照', en: 'Business licence of Jinhua Laimeng Textile Factory' },
    },
    {
      src: '/images/company/commercial-authorization.jpg',
      label: { zh: '商业授权', en: 'Commercial Authorization' },
      alt: { zh: '商业授权书', en: 'Commercial authorization letter' },
    },
  ],
  // 生产设备：企业已提供实景照片（企业实拍，压缩入库）
  equipment: [
    {
      src: '/images/company/equipment-1.jpg',
      label: { zh: '设备实景一', en: 'Equipment View 1' },
      alt: { zh: '生产设备实景一', en: 'Production equipment view 1' },
    },
    {
      src: '/images/company/equipment-2.jpg',
      label: { zh: '设备实景二', en: 'Equipment View 2' },
      alt: { zh: '生产设备实景二', en: 'Production equipment view 2' },
    },
  ],
  // 品控流程：企业已提供实景照片（企业实拍，压缩入库）
  qualityControl: [
    {
      src: '/images/company/qc-1.jpg',
      label: { zh: '品控实景一', en: 'Quality Control View 1' },
      alt: { zh: '品控流程实景一', en: 'Quality control process view 1' },
    },
    {
      src: '/images/company/qc-2.jpg',
      label: { zh: '品控实景二', en: 'Quality Control View 2' },
      alt: { zh: '品控流程实景二', en: 'Quality control process view 2' },
    },
  ],
  // 全球市场：企业已提供实景照片（企业实拍，压缩入库）
  market: [
    {
      src: '/images/company/market-1.jpg',
      label: { zh: '市场实景一', en: 'Market View 1' },
      alt: { zh: '全球市场实景一', en: 'Global market view 1' },
    },
    {
      src: '/images/company/market-2.jpg',
      label: { zh: '市场实景二', en: 'Market View 2' },
      alt: { zh: '全球市场实景二', en: 'Global market view 2' },
    },
  ],
  cards: [
    { title: { zh: '资质与认证', en: 'Certificates & Qualifications' } },
    { title: { zh: '生产设备', en: 'Production Equipment' } },
    { title: { zh: '品控流程', en: 'Quality Assurance' } },
    { title: { zh: '全球市场', en: 'Global Market' } },
  ],
};

/** 邮件询盘主题：Contact.astro 按当前语言组装进 mailto;语言切换时由 Layout 脚本同步 href */
export const inquirySubject: Pair = { zh: '产品咨询', en: 'Product Inquiry' };

export const contact = {
  title: { zh: '联系我们', en: 'Contact Us' },
  intro: {
    zh: '有产品咨询或合作意向？欢迎随时联系，我们将尽快回复。',
    en: 'Have an inquiry or a partnership in mind? Get in touch — we will respond promptly.',
  },
  // 邮箱、电话、地址已经企业确认；微信二维码与 WhatsApp 待企业提供
  channels: [
    {
      key: 'email',
      label: { zh: '电子邮箱', en: 'Email' },
      value: 'info@lmgj.cn',
      // 主题由 inquirySubject 按当前语言组装（Contact.astro），此处保持纯 mailto
      href: 'mailto:info@lmgj.cn',
    },
    {
      key: 'phone',
      label: { zh: '联系电话', en: 'Phone' },
      value: '+86 178 1553 0975',
      href: 'tel:+8617815530975',
    },
  ],
  address: {
    label: { zh: '公司地址', en: 'Address' },
    value: {
      // 中英文地址均已企业确认
      zh: '浙江省义乌市福田街道兴隆三区9幢4单元205号展厅',
      en: 'Showroom 205, Unit 4, Building 9, Xinglong Third District, Futian Street, Yiwu City, Jinhua City, Zhejiang Province',
    },
  },
  cta: { zh: '邮件询盘', en: 'Email Us' },
};

export const footer = {
  // draft：定位同步补充配饰板块，待企业确认
  tagline: {
    zh: '面料与配饰进出口 · 面向全球的可靠供应',
    en: 'Fabrics & accessories import and export — reliable supply, worldwide.',
  },
  navTitle: { zh: '快速导航', en: 'Quick Links' },
  contactTitle: { zh: '联系方式', en: 'Contact' },
  copyright: {
    zh: `© 2020–${new Date().getFullYear()} 金华莱盟纺织品有限公司 版权所有。`,
    en: `© 2020–${new Date().getFullYear()} Jinhua Laimeng Textile Factory. All rights reserved.`,
  },
};
