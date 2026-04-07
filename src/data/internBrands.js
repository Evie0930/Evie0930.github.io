const base = import.meta.env.BASE_URL;

/** 实习模块 Logo 矩阵（首页）与路由 slug */
export const INTERN_BRANDS = [
  {
    id: 'chagee',
    slug: 'chagee',
    name: '霸王茶姬',
    logo: `${base}intern/logos/chagee.png`,
    logoAlt: 'CHAGEE 霸王茶姬',
    href: '/work/chagee',
  },
  {
    id: 'bytedance',
    slug: 'bytedance',
    name: '字节跳动',
    logo: `${base}intern/logos/bytedance.png`,
    logoAlt: '字节跳动',
    href: null,
  },
  {
    id: 'lvmh',
    slug: 'lvmh',
    name: 'LVMH',
    logo: `${base}intern/logos/lvmh.png`,
    logoAlt: 'LVMH',
    href: null,
  },
  {
    id: 'maoyan',
    slug: 'maoyan',
    name: '猫眼电影',
    logo: `${base}intern/logos/maoyan.png`,
    logoAlt: '猫眼电影',
    href: null,
  },
];
