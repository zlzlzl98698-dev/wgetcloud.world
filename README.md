<div align="center">

<img src="docs/public/avatar.jpg" alt="wget博客" width="110" />

# wget博客 · wgetcloud.world

**专业网络代理与跨境基础设施可观测性实测站**

[![Live Site](https://img.shields.io/badge/Website-wgetcloud.world-3b82f6?style=flat-square&logo=google-chrome&logoColor=white)](https://wgetcloud.world/)
[![VitePress](https://img.shields.io/badge/VitePress-v1.6.4-646cff?style=flat-square&logo=vitepress&logoColor=white)](https://vitepress.dev/)
[![Vue](https://img.shields.io/badge/Vue-3.5-4fc08d?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Docs Count](https://img.shields.io/badge/Markdown%20Docs-100%20Pages-0ea5e9?style=flat-square)](#内容矩阵与专栏结构)
[![Brands Database](https://img.shields.io/badge/Brands-42%20Evaluated-10b981?style=flat-square)](#核心特性)
[![License](https://img.shields.io/badge/License-ISC-f59e0b?style=flat-square)](package.json)

[在线访问](https://wgetcloud.world/) · [42 家品牌总库](https://wgetcloud.world/brands/) · [综合选型天梯榜](https://wgetcloud.world/recommend/) · [实测方法论](https://wgetcloud.world/methodology/) · [FAQ 百科](https://wgetcloud.world/faq/)

</div>

---

## 项目简介

`wgetcloud.world`（**wget博客**）是一个基于 **VitePress + Vue 3** 构建的静态技术内容站点，围绕跨境网络底层架构（IEPL / IPLC、BGP 多线调度、VLESS Reality）、全平台客户端配置（Clash Verge Rev、v2rayN、Shadowrocket、sing-box、Stash、OpenClash）、流媒体与 AI 原生 IP 解锁验证，以及 42 家服务商的标准化评测数据库，构建了 **100 篇结构化 Markdown 文档** 与面向搜索引擎/生成式引擎（SEO / GEO / AEO）的完整静态渲染体系。

---

## 核心特性

- **42 家服务商结构化数据库**：在 `docs/data/brands.ts` 中维护价格梯度、线路类型、协议栈、实测吞吐与流媒体/AI 解锁状态元数据，并配套 26 张晚高峰节点测速实测截图（`docs/public/images/`）。
- **自定义 Vue 3 评测组件体系**：主题全局注册 8 个业务组件，支持多维筛选、对比表格、拓扑展示、测速卡片与解锁矩阵呈现。
- **全静态 SSR SEO & GEO/AEO 基础设施**：
  - 统一正式主域 `https://wgetcloud.world/` 与 `cleanUrls: true` 规范化路径，全站 **100** 个可索引页面 100% 输出自引用 `canonical`。
  - 在 `transformHead` 构建阶段静态注入完整的 `Title`、`Description`、`Robots`、`Open Graph`、`Twitter Card` 与 `article:*` 元标签。
  - 按页面语义动态匹配并内联输出静态 JSON-LD Schema（`WebSite`、`Organization`、`AboutPage`、`CollectionPage`、`TechArticle`、`WebPage`、`BreadcrumbList`、`FAQPage`），拒绝纯客户端 DOM 注入与隐藏标记。
  - 自动构建符合标准的 `sitemap.xml`（自动剔除 `404` / `noindex` / `draft` 并写入真实 `lastmod`）与 `robots.txt`，404 页面严格输出 `noindex, nofollow`。
  - 预留 Google / Bing / 神马 / 百度站长平台 Meta 验证环境变量槽位。
- **商业披露与链接合规**：全站商业推荐与引流外链统一规范包裹 `rel="nofollow sponsored noopener"`，并设立独立的 [关于实验室](docs/about/index.md)、[实测方法论](docs/methodology/index.md) 与 [免责声明](docs/disclaimer/index.md) 透明度页面。
- **自动化全站质量审计**：`scripts/` 目录内置内链校验、Schema 解析、重复标题/描述扫描、外链 `rel` 属性检测、图片宽高/Alt 检查及正文字数统计脚本。

---

## 内容矩阵与专栏结构

全站共 **100** 篇结构化 Markdown 页面，按主题支柱划分如下：

| 栏目目录 | 线上路由 | 文档数量 | 内容定位 |
| :--- | :--- | :---: | :--- |
| `docs/index.md` | `/` | 1 | 首页专著概览、Direct Answer、42 家速览表与核心 FAQ |
| `docs/brands/` | `/brands/` | 48 | 42 家品牌总库索引、各品牌深度评测及 5 篇高频长尾选型对比 |
| `docs/clients/` | `/clients/` | 9 | Clash Verge Rev、v2rayN、Shadowrocket、sing-box、Stash、OpenClash 教程 |
| `docs/network/` | `/network/` | 6 | IEPL vs IPLC、VLESS Reality、BGP 动态路由、Shadowsocks vs Trojan 与 QoS 分析 |
| `docs/unlock/` | `/unlock/` | 6 | ChatGPT / Claude / Gemini 原生解锁、Netflix & Disney+ 4K 与住宅/机房 IP 鉴别 |
| `docs/security/` | `/security/` | 6 | 跑路预警雷达、同源站群检测、月付避险原则、虚假测速防骗识别 |
| `docs/solutions/` | `/solutions/` | 5 | TikTok 跨境直播、外贸独立站防关联、外服游戏低延迟 UDP 调优 |
| `docs/faq/` | `/faq/` | 5 | 科学上网 100 问百科全书与节点全红/订阅报错/倍率专项排障手册 |
| `docs/recommend/` | `/recommend/` | 4 | 综合选型推荐天梯榜及平价/AI流媒体/电竞企业细分榜单 |
| `docs/free-nodes/` | `/free-nodes/` | 3 | 免费节点与公共订阅池安全性审计及晚高峰可用率实测 |
| `docs/free-trial/` | `/free-trial/` | 2 | 免费试用与 1 元体验名录及晚高峰标准压测 SOP |
| `docs/runaway/` | `/runaway/` | 2 | 跑路预警白皮书与四大跑路前反常信号监控 |
| `docs/about/` | `/about/` | 1 | 关于 wget博客 与评测实验室介绍 |
| `docs/methodology/` | `/methodology/` | 1 | 网络可观测性与专线真伪鉴别实测方法论 |
| `docs/disclaimer/` | `/disclaimer/` | 1 | 免责声明、商业推广披露与合规使用指南 |

---

## 项目目录结构

```text
wgetcloud.world/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # VitePress 核心配置（导航/侧栏/Sitemap/SSR SEO & JSON-LD 引擎）
│   │   └── theme/
│   │       ├── index.ts        # 主题扩展与全局 Vue 组件注册
│   │       └── style.css       # 暗色极客风主题与排版样式定制
│   ├── components/             # 8 个自定义 Vue 3 组件
│   │   ├── AeoSchema.vue
│   │   ├── AffiliateButton.vue
│   │   ├── BrandCard.vue
│   │   ├── BrandFilter.vue
│   │   ├── NetworkTopology.vue
│   │   ├── PricingTable.vue
│   │   ├── SpeedtestChart.vue
│   │   └── UnlockMatrix.vue
│   ├── data/                   # TypeScript 结构化数据源
│   │   ├── aff.ts
│   │   ├── brands.ts
│   │   └── clients.ts
│   ├── public/                 # 静态资源（不经打包直接拷贝至根目录）
│   │   ├── images/             # 实测图与节点测速截图素材（26 个文件）
│   │   ├── .htaccess           # Apache HTTP->HTTPS / www->裸域 301 / 安全头规则
│   │   ├── avatar.jpg
│   │   ├── avatar.png
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── index.md                # 站点首页
│   └── <pillars>/              # 14 个主题内容目录（brands/ clients/ network/ ...）
├── scripts/                    # 全站审计、内容校验与构建辅助脚本
│   ├── seo_geo_audit.js        # HTML / Canonical / Schema / 外链 / 标题描述去重审计
│   └── audit_all.js            # Markdown 文档体量与规范统计
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 技术栈与核心组件

| 模块 | 实现 | 说明 |
| :--- | :--- | :--- |
| 静态站点框架 | VitePress `^1.6.3`（实际构建 `v1.6.4`） | SSG 静态预渲染 + 本地全文搜索索引 + Sitemap 自动生成 |
| 前端组件引擎 | Vue `^3.5.13` | 单文件组件驱动品牌数据库与图表展示 |
| 数据模型层 | TypeScript (`docs/data/*.ts`) | 强类型 `BrandDetail`、`PricingTier`、`SpeedTestResult` 定义 |
| 品牌与排行组件 | `BrandCard` / `BrandFilter` / `PricingTable` | 品牌概览卡片、多条件筛选矩阵与套餐阶梯表 |
| 实测与能力组件 | `SpeedtestChart` / `UnlockMatrix` / `NetworkTopology` | 测速报告图（内置明确宽高与懒加载）、解锁矩阵、线路拓扑 |
| 合规转介组件 | `AffiliateButton` | 统一托管外链及 `rel="nofollow sponsored noopener"` |

---

## 快速开始

### 1. 环境要求

- **Node.js** >= 18.x（建议 LTS 版本）
- **npm** >= 9.x

### 2. 安装依赖与本地开发

```bash
# 安装依赖
npm install

# 启动本地热更新开发服务器
npm run docs:dev
```

### 3. 生产构建与本地预览

```bash
# 构建静态站点至 docs/.vitepress/dist/
npm run docs:build

# 本地预览构建产物
npm run docs:preview
```

### 4. 运行 SEO 与内容审计脚本

```bash
# 执行 HTML / Canonical / JSON-LD / 外链 / 标题描述审计（需先执行 docs:build）
node scripts/seo_geo_audit.js

# 统计全站 Markdown 文档数量与内容厚度
node scripts/audit_all.js
```

---

## 部署与搜索引擎验证

### 站长平台验证环境变量

在构建命令执行前注入以下环境变量即可将对应 `<meta>` 验证标签静态输出至全站 `<head>`（未设置时不会输出空标签）：

```bash
GOOGLE_SITE_VERIFICATION="your_google_token" \
BING_SITE_VERIFICATION="your_bing_token" \
SHENMA_SITE_VERIFICATION="your_shenma_token" \
BAIDU_SITE_VERIFICATION="your_baidu_token" \
npm run docs:build
```

### 托管平台注意事项

- 构建输出目录为 `docs/.vitepress/dist/`，可直接部署至 **Cloudflare Pages**、**Vercel**、**GitHub Pages**、**Nginx** 或 **Apache**。
- `docs/public/.htaccess` 仅在 **Apache** 环境下生效；若使用 Cloudflare Pages 或 Nginx，请在边缘/服务器配置层同步开启 `www.wgetcloud.world` 到 `https://wgetcloud.world` 的 301 重定向，并确认 WAF / Bot Fight Mode 未拦截 `Googlebot`、`bingbot`、`Baiduspider`、`yisouspider`。

---

## 合规与开源协议

- **商业透明度**：站点评测数据与商业合作披露相互独立，全站所有商业推广及合作跳转链接均按规范标注 `rel="nofollow sponsored noopener"`。
- **使用声明**：本站内容仅用于网络架构研究、代理技术科普与性能可观测性评估，请严格遵守所在国家与地区的法律法规。
- **License**：本项目代码与配置遵循 [ISC License](package.json)。
