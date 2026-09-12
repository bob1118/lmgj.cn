/**
 * 全站双语文案（唯一内容源）。
 *
 * 约定：
 * - 所有字段必须中英成对（Pair 结构），修改后中英同步维护。
 * - 标注「draft」的内容为企业未提供的初稿，上线前需企业确认；
 *   页面上以小徽标（draft-pill）提示的位置与此处对应。
 */

/**
 * 产品分类标识：
 * - knitted / woven 为企业确定的两大核心品类；
 * - trend 为「流行新品」分类（2026 新增；分类名称「流行新品/Trending」与中英描述已经企业确认）。
 */
export type ProductCategoryId = 'knitted' | 'woven' | 'trend';

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
  spec: string;
  desc: Pair;
  images?: ProductImage[];
}

export interface ProductCategory {
  id: ProductCategoryId;
  name: Pair;
  desc: Pair;
  items: ProductItem[];
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
  eyebrow: { zh: '针织 · 织造纺织品进出口', en: 'Knitted & Woven Textiles Import & Export' },
  // 标题允许少量 <em> 强调标记（由组件 set:html 渲染）
  titleHtml: {
    zh: '莱盟纺织，织造<em>可信赖</em>的全球供应',
    en: 'Woven with <em>Trust</em>, Delivered Worldwide',
  },
  subtitle: {
    zh: '专注针织与织造纺织品进出口贸易，为国内外采购商提供从选料、打样到大货交付的一站式服务。',
    en: 'Specialized in knitted and woven textile trading — one-stop service from sourcing and sampling to bulk delivery for buyers worldwide.',
  },
  ctaProducts: { zh: '查看产品', en: 'Our Products' },
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
  lead: {
    zh: '金华莱盟纺织品有限公司是一家专注于针织与织造纺织品进出口的外贸企业，依托中国主要纺织产业带的成熟供应链，为全球采购商提供稳定、优质、高效的面料供应服务。',
    en: 'Jinhua Laimeng Textile Factory is an import & export company specializing in knitted and woven textiles. Backed by mature supply chains across China\u2019s major textile hubs, we deliver stable, quality-assured fabrics to buyers worldwide.',
  },
  // 企业已确认文案
  body: {
    zh: '我们长期深耕针织、梭织两大品类，熟悉国际市场的品质标准与合规要求，能够快速响应打样、翻单与大货交付需求，成为客户长期信赖的供应链伙伴。',
    en: 'Focusing on knitted and woven fabrics, we understand international quality standards and compliance requirements, responding quickly to sampling, re-orders and bulk production — a supply chain partner you can rely on for the long term.',
  },
  advantagesTitle: { zh: '核心优势', en: 'Why Choose Us' },
  advantages: [
    {
      title: { zh: '源头供应链', en: 'Source Supply Chain' },
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
 * 为流行新品分类批量生成实拍图列表。
 * 图源：src/assets/products/<slug>-NN.webp（scripts/import-new-products.mjs 一次性导入）。
 * 企业如需逐图定制 alt，可展开为显式列表。
 */
function trendImages(slug: string, count: number, zhBase: string, enBase: string): ProductImage[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      src: `/images/products/${slug}-${String(n).padStart(2, '0')}.webp`,
      alt: { zh: `${zhBase}实拍图${n}`, en: `${enBase} view ${n}` },
    };
  });
}

export const products: {  title: Pair;
  intro: Pair;
  contactLead: Pair;
  contactCta: Pair;
  categories: ProductCategory[];
} = {
  title: { zh: '产品中心', en: 'Products' },
  intro: {
    zh: '聚焦针织与织造两大品类，常年供应主流规格面料；以下为代表产品，更多品类欢迎垂询。',
    en: 'Focused on two core categories — knitted and woven — with mainstream specifications in regular supply. Representative products below; more available on request.',
  },
  contactLead: {
    zh: '需要完整产品目录或寄送样品？',
    en: 'Need the full catalog or samples?',
  },
  contactCta: { zh: '联系我们获取', en: 'Get in Touch' },
  categories: [
    {
      // 「流行新品」分类（置于首位），分类名称与描述已经企业确认；克重企业已提供（醋酸感丝绒 260–300，压花数码印花/压花石纹 240–300，多花型 220–300，仿真丝绒压花/印花 240–280 gsm）。
      // 产品名称来自企业素材文件夹（原片 images/new/ 64 张已压缩为 webp 入库，见 scripts/import-new-products.mjs / import-manifest.json；原片目录已清理）。
      id: 'trend',
      name: { zh: '流行新品', en: 'Trending' },
      desc: {
        zh: '聚焦今年流行款式与色彩方向，紧跟国际时尚趋势提供应季新品面料。',
        en: 'Curated around this year\u2019s trending styles and color directions — in-season new fabrics following international fashion trends.',
      },
      items: [
        {
          name: { zh: '醋酸感丝绒', en: 'Acetate-Feel Velvet' },
          spec: '260–300 gsm',
          desc: {
            zh: '垂坠丝滑、光泽柔和，连衣裙与外套的应季新品面料。',
            en: 'Fluid drape with a soft sheen — a seasonal new fabric for dresses and coats.',
          },
          // 实拍图：企业已提供（企业实拍，8 张，经 scripts/import-new-products.mjs 压缩入库）
          images: trendImages('acetate-velvet', 8, '醋酸感丝绒', 'Acetate-feel velvet'),
        },
        {
          name: { zh: '醋酸感丝绒 · 压花数码印花', en: 'Acetate-Feel Velvet Emboss, Digital Print' },
          spec: '240–300 gsm',
          desc: {
            zh: '数码印花花型与压花绒面结合，图案立体、层次分明。',
            en: 'Digital-print motifs on embossed velvet — dimensional patterns with clear depth.',
          },
          // 实拍图：企业已提供（企业实拍，压花数码印花 8 张，经 scripts/import-new-products.mjs 压缩入库）
          images: trendImages('acetate-velvet-digital-print', 8, '醋酸感丝绒压花数码印花', 'Acetate-feel velvet emboss digital print'),
        },
        {
          name: { zh: '醋酸感丝绒 · 压花石纹', en: 'Acetate-Feel Velvet Stone Emboss' },
          spec: '240–300 gsm',
          desc: {
            zh: '石纹肌理压花，手感立体、光泽内敛，呈现自然质感。',
            en: 'Stone-texture embossed velvet — dimensional hand-feel with a subtle, natural sheen.',
          },
          // 实拍图：企业已提供（企业实拍，压花石纹 8 张，经 scripts/import-new-products.mjs 压缩入库）
          images: trendImages('acetate-velvet-stone', 8, '醋酸感丝绒压花石纹', 'Acetate-feel velvet stone emboss'),
        },
        {
          name: { zh: '醋酸感丝绒 · 多花型', en: 'Acetate-Feel Velvet, Multi-Design' },
          spec: '220–300 gsm',
          desc: {
            zh: '一个绒底承载多组花型，可按服饰款式灵活选配。',
            en: 'One velvet base carrying multiple designs — flexible matching by apparel style.',
          },
          // 实拍图：企业已提供（企业实拍，多花型 8 张，经 scripts/import-new-products.mjs 压缩入库）
          images: trendImages('acetate-velvet-multi-design', 8, '醋酸感丝绒多花型', 'Acetate-feel velvet multi-design'),
        },
        {
          name: { zh: '仿真丝绒 · 压花', en: 'Silk-Feel Velvet Emboss' },
          spec: '240–280 gsm',
          desc: {
            zh: '仿真丝光泽的绒面压花，价格亲民、质感高级。',
            en: 'Silk-look velvet with embossed texture — accessible pricing with a premium feel.',
          },
          // 实拍图：企业已提供（企业实拍，16 张，经 scripts/import-new-products.mjs 压缩入库）
          images: trendImages('copy-silk-velvet-emboss', 16, '仿真丝绒压花', 'Silk-feel velvet emboss'),
        },
        {
          name: { zh: '仿真丝绒 · 印花', en: 'Silk-Feel Velvet Print' },
          spec: '240–280 gsm',
          desc: {
            zh: '绒面印花花型清透、光泽柔和，适合连衣裙与家居用途。',
            en: 'Clear printed motifs on a soft-sheen pile — for dresses and home applications.',
          },
          // 实拍图：企业已提供（企业实拍，16 张，经 scripts/import-new-products.mjs 压缩入库）
          images: trendImages('copy-silk-velvet-print', 16, '仿真丝绒印花', 'Silk-feel velvet print'),
        },
      ],
    },
    {
      id: 'knitted',
      name: { zh: '针织纺织品', en: 'Knitted Textiles' },
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
          // 实拍图：企业已提供（企业实拍，压缩入库）
          images: [
            {
              src: '/images/products/jersey-1.jpg',
              alt: { zh: '汗布实拍图一', en: 'Single jersey fabric view 1' },
            },
            {
              src: '/images/products/jersey-2.jpg',
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
          // 实拍图：企业已提供（企业实拍，压缩入库）
          images: [
            {
              src: '/images/products/rib-1.jpg',
              alt: { zh: '罗纹实拍图一', en: 'Rib fabric view 1' },
            },
            {
              src: '/images/products/rib-2.jpg',
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
          // 实拍图：企业已提供（企业实拍，压缩入库）
          images: [
            {
              src: '/images/products/terry-1.jpg',
              alt: { zh: '毛圈布实拍图一', en: 'French terry fabric view 1' },
            },
            {
              src: '/images/products/terry-2.jpg',
              alt: { zh: '毛圈布实拍图二', en: 'French terry fabric view 2' },
            },
          ],
        },
      ],
    },
    {
      id: 'woven',
      name: { zh: '织造纺织品', en: 'Woven Textiles' },
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
          // 实拍图：企业已提供（企业实拍，压缩入库）
          images: [
            {
              src: '/images/products/poplin-1.jpg',
              alt: { zh: '府绸实拍图一', en: 'Poplin fabric view 1' },
            },
            {
              src: '/images/products/poplin-2.jpg',
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
          // 实拍图：企业已提供（企业实拍，压缩入库）
          images: [
            {
              src: '/images/products/twill-1.jpg',
              alt: { zh: '斜纹布实拍图一', en: 'Twill fabric view 1' },
            },
            {
              src: '/images/products/twill-2.jpg',
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
          // 实拍图：企业已提供（企业实拍，压缩入库）
          images: [
            {
              src: '/images/products/oxford-1.jpg',
              alt: { zh: '牛津布实拍图一', en: 'Oxford fabric view 1' },
            },
            {
              src: '/images/products/oxford-2.jpg',
              alt: { zh: '牛津布实拍图二', en: 'Oxford fabric view 2' },
            },
          ],
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
  tagline: {
    zh: '针织与织造纺织品进出口 · 面向全球的可靠供应',
    en: 'Knitted & woven textiles import and export — reliable supply for the world.',
  },
  navTitle: { zh: '快速导航', en: 'Quick Links' },
  contactTitle: { zh: '联系方式', en: 'Contact' },
  copyright: {
    zh: `© 2020–${new Date().getFullYear()} 金华莱盟纺织品有限公司 版权所有。`,
    en: `© 2020–${new Date().getFullYear()} Jinhua Laimeng Textile Factory. All rights reserved.`,
  },
};
