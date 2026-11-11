// docs/.vitepress/config.mts
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type HeadConfig } from 'vitepress'

const SITE_URL = 'https://wgetcloud.world'

/**
 * 站长平台静态 HTML 验证配置（保持为空字符串时不会生成无效占位 Meta）
 * 部署前填入平台分配的验证码，或通过环境变量注入，构建时将直接输出至静态 <head> 源码
 */
const SITE_VERIFICATION = {
  google: process.env.GOOGLE_SITE_VERIFICATION || '',
  bing: process.env.BING_SITE_VERIFICATION || '',
  shenma: process.env.SHENMA_SITE_VERIFICATION || '',
  baidu: process.env.BAIDU_SITE_VERIFICATION || ''
}

const verificationHeadTags: HeadConfig[] = []
if (SITE_VERIFICATION.google) {
  verificationHeadTags.push(['meta', { name: 'google-site-verification', content: SITE_VERIFICATION.google }])
}
if (SITE_VERIFICATION.bing) {
  verificationHeadTags.push(['meta', { name: 'msvalidate.01', content: SITE_VERIFICATION.bing }])
}
if (SITE_VERIFICATION.shenma) {
  verificationHeadTags.push(['meta', { name: 'shenma-site-verification', content: SITE_VERIFICATION.shenma }])
}
if (SITE_VERIFICATION.baidu) {
  verificationHeadTags.push(['meta', { name: 'baidu-site-verification', content: SITE_VERIFICATION.baidu }])
}

function toIsoWithTz(dateInput: unknown, fallbackFile?: string): string {
  if (typeof dateInput === 'string' && dateInput.trim()) {
    const parsed = new Date(dateInput.trim())
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString()
    }
  }
  if (typeof dateInput === 'number' && !Number.isNaN(dateInput)) {
    return new Date(dateInput).toISOString()
  }
  if (fallbackFile) {
    try {
      const full = path.resolve(process.cwd(), 'docs', fallbackFile)
      if (fs.existsSync(full)) {
        return fs.statSync(full).mtime.toISOString()
      }
    } catch {
      // ignore fs read errors
    }
  }
  return '2026-08-11T00:00:00.000Z'
}

export default defineConfig({
  title: "wget博客",
  description: "wget博客 (wgetcloud.world) - 专业网络代理与基础设施评测站。收录42家机场品牌，提供晚高峰实测数据、IEPL/IPLC专线深度评测、AI与流媒体解锁指南及客户端配置。",
  lang: "zh-CN",
  cleanUrls: true,
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  sitemap: {
    hostname: SITE_URL,
    transformItems(items) {
      const docsRoot = path.resolve(process.cwd(), 'docs')
      return items
        .filter((item) => {
          const u = item.url.replace(/^\/+/, '')
          if (!u && item.url !== '') return true
          if (u === '404' || u === '404.html') return false

          const candidates = [
            path.join(docsRoot, `${u || 'index'}.md`),
            path.join(docsRoot, u, 'index.md')
          ]
          for (const mdPath of candidates) {
            if (fs.existsSync(mdPath)) {
              const raw = fs.readFileSync(mdPath, 'utf8')
              const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
              if (fm && (/^(?:noindex|draft)\s*:\s*true/m.test(fm[1]) || /^robots\s*:[^\n]*noindex/mi.test(fm[1]))) {
                return false
              }
              break
            }
          }
          return true
        })
        .map((item) => {
          const u = item.url.replace(/^\/+/, '')
          const candidates = [
            path.join(docsRoot, `${u || 'index'}.md`),
            path.join(docsRoot, u, 'index.md')
          ]
          let lastmod = item.lastmod
          for (const mdPath of candidates) {
            if (fs.existsSync(mdPath)) {
              lastmod = fs.statSync(mdPath).mtime.toISOString()
              break
            }
          }
          return {
            ...item,
            lastmod
          }
        })
    }
  },
  head: [
    ...verificationHeadTags,
    ['link', { rel: 'icon', href: '/avatar.jpg' }],
    ['link', { rel: 'apple-touch-icon', href: '/avatar.jpg' }],
    ['meta', { name: 'author', content: 'wget博客 实验室' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { property: 'og:site_name', content: 'wget博客' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'wget博客 实测实验室标志' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": "wget博客",
        "url": `${SITE_URL}/`,
        "inLanguage": "zh-CN",
        "description": "专业网络代理与基础设施评测站",
        "publisher": {
          "@id": `${SITE_URL}/#organization`
        }
      })
    ]
  ],
  transformHead({ pageData }) {
    const fm = pageData.frontmatter || {}
    if (pageData.relativePath === '404.md' || fm.noindex === true || fm.draft === true || (typeof fm.robots === 'string' && fm.robots.includes('noindex'))) {
      return [['meta', { name: 'robots', content: 'noindex, nofollow' }]]
    }

    let clean = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    if (clean.startsWith('/')) clean = clean.slice(1)
    const canonicalUrl = clean ? `${SITE_URL}/${clean}` : `${SITE_URL}/`

    const pageTitle = fm.title || pageData.title || 'wget博客'
    const pageDesc = fm.description || 'wget博客 (wgetcloud.world) - 专业网络代理与基础设施评测站'
    const rawCover = typeof fm.cover === 'string' && fm.cover.trim() ? fm.cover.trim() : '/avatar.jpg'
    const imageUrl = /^https?:\/\//i.test(rawCover) ? rawCover : `${SITE_URL}${rawCover.startsWith('/') ? rawCover : `/${rawCover}`}`

    const publishedTime = toIsoWithTz(fm.publishedTime || fm.date || '2026-08-11T00:00:00+08:00')
    const modifiedTime = toIsoWithTz(fm.modifiedTime || fm.updatedDate || fm.lastUpdated || pageData.lastUpdated, pageData.relativePath)

    const isHome = clean === ''
    const trustPages = new Set(['about/', 'methodology/', 'disclaimer/', 'faq/'])
    const isSectionIndex = clean !== '' && clean.endsWith('/') && !trustPages.has(clean)
    const isArticle = !isHome && !isSectionIndex && clean !== 'about/' && clean !== 'disclaimer/' && clean !== 'faq/'

    const parts = clean ? clean.split('/').filter(Boolean) : []
    const sectionNames: Record<string, string> = {
      'brands': '42家深度评测',
      'recommend': '42家机场推荐',
      'free-nodes': '免费节点专题',
      'free-trial': '免费试用专题',
      'runaway': '跑路预警专题',
      'faq': '机场FAQ',
      'network': '网络与协议',
      'clients': '客户端教程',
      'unlock': 'AI与流媒体',
      'solutions': '出海商业方案',
      'security': '安全审计',
      'about': '关于实验室',
      'methodology': '评测方法论',
      'disclaimer': '合规与免责声明'
    }
    const sectionLabel = parts.length > 0 ? (fm.category || sectionNames[parts[0]] || parts[0]) : '首页'
    const authorName = fm.author || 'wget博客实测实验室'

    const heads: HeadConfig[] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:type', content: isArticle ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:image', content: imageUrl }],
      ['meta', { property: 'og:updated_time', content: modifiedTime }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:url', content: canonicalUrl }],
      ['meta', { name: 'twitter:image', content: imageUrl }]
    ]

    if (isArticle) {
      heads.push(
        ['meta', { property: 'article:published_time', content: publishedTime }],
        ['meta', { property: 'article:modified_time', content: modifiedTime }],
        ['meta', { property: 'article:author', content: authorName }],
        ['meta', { property: 'article:section', content: sectionLabel }]
      )
      if (Array.isArray(fm.tags)) {
        for (const tag of fm.tags) {
          if (typeof tag === 'string' && tag.trim()) {
            heads.push(['meta', { property: 'article:tag', content: tag.trim() }])
          }
        }
      }
    }

    if (clean) {
      const itemList: Record<string, any>[] = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "首页",
          "item": `${SITE_URL}/`
        }
      ]

      if (parts.length === 1) {
        itemList.push({
          "@type": "ListItem",
          "position": 2,
          "name": sectionNames[parts[0]] || pageTitle,
          "item": canonicalUrl
        })
      } else if (parts.length >= 2) {
        itemList.push({
          "@type": "ListItem",
          "position": 2,
          "name": sectionNames[parts[0]] || parts[0],
          "item": `${SITE_URL}/${parts[0]}/`
        })
        itemList.push({
          "@type": "ListItem",
          "position": 3,
          "name": pageTitle,
          "item": canonicalUrl
        })
      }

      const graph: Record<string, any>[] = [
        {
          "@type": "BreadcrumbList",
          "itemListElement": itemList
        }
      ]

      if (clean === 'about/') {
        graph.push({
          "@type": "AboutPage",
          "name": pageTitle,
          "description": pageDesc,
          "url": canonicalUrl,
          "inLanguage": "zh-CN",
          "isPartOf": { "@id": `${SITE_URL}/#website` }
        })
      } else if (clean === 'disclaimer/') {
        graph.push({
          "@type": "WebPage",
          "name": pageTitle,
          "description": pageDesc,
          "url": canonicalUrl,
          "inLanguage": "zh-CN",
          "isPartOf": { "@id": `${SITE_URL}/#website` }
        })
      } else if (isSectionIndex || clean === 'faq/') {
        graph.push({
          "@type": "CollectionPage",
          "name": pageTitle,
          "description": pageDesc,
          "url": canonicalUrl,
          "inLanguage": "zh-CN",
          "isPartOf": { "@id": `${SITE_URL}/#website` }
        })
      } else {
        graph.push({
          "@type": "TechArticle",
          "headline": pageTitle,
          "description": pageDesc,
          "image": imageUrl,
          "inLanguage": "zh-CN",
          "datePublished": publishedTime,
          "dateModified": modifiedTime,
          "articleSection": sectionLabel,
          "author": {
            "@type": "Organization",
            "name": authorName,
            "url": `${SITE_URL}/about/`
          },
          "publisher": {
            "@type": "Organization",
            "name": "wget博客",
            "url": `${SITE_URL}/`,
            "logo": {
              "@type": "ImageObject",
              "url": `${SITE_URL}/avatar.jpg`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl
          }
        })
      }

      if (Array.isArray(fm.faqs) && fm.faqs.length > 0) {
        const validFaqs = fm.faqs.filter(
          (f: any) => f && typeof f.question === 'string' && typeof f.answer === 'string'
        )
        if (validFaqs.length > 0) {
          graph.push({
            "@type": "FAQPage",
            "mainEntity": validFaqs.map((f: { question: string; answer: string }) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
              }
            }))
          })
        }
      }

      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph
        })
      ])
    }

    return heads
  },
  themeConfig: {
    logo: { src: '/avatar.jpg', alt: 'wget博客', width: 32, height: 32 },
    siteTitle: "wget博客",
    notFound: {
      code: '404',
      title: '页面不存在或已迁移',
      quote: '您访问的页面可能已更改路径、下线或网址输入有误。请返回首页或使用站内搜索查阅 42 家机场实测报告与配置教程。',
      linkLabel: '返回 wget博客首页',
      linkText: '返回首页'
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "42家机场推荐", link: "/recommend/" },
      { text: "42家深度评测", link: "/brands/" },
      { text: "免费节点专题", link: "/free-nodes/" },
      { text: "免费试用专题", link: "/free-trial/" },
      { text: "跑路预警专题", link: "/runaway/" },
      { text: "机场FAQ", link: "/faq/" },
      { 
        text: "技术专栏",
        items: [
          { text: "网络与协议", link: "/network/" },
          { text: "客户端教程", link: "/clients/" },
          { text: "AI与流媒体", link: "/unlock/" },
          { text: "出海商业方案", link: "/solutions/" },
          { text: "安全审计", link: "/security/" },
          { text: "关于实验室", link: "/about/" },
          { text: "评测方法论", link: "/methodology/" },
          { text: "免责与合规声明", link: "/disclaimer/" }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索评测、机场与教程...',
                buttonAriaLabel: '搜索评测、机场与教程...'
              },
              modal: {
                noResultsText: '无法找到相关评测或技术文章',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    sidebar: {
      '/brands/': [
        {
          text: "42家机场评测矩阵",
          collapsed: false,
          items: [
            { text: "品牌库总览与天梯榜", link: "/brands/" },
            { text: "⭐ 光速云 (第一主推·万字深度)", link: "/brands/lightspeed-cloud" },
            { text: "暮光加速 (BGP智能调度)", link: "/brands/twilight-speed" },
            { text: "飞猫云 (新手免配客户端)", link: "/brands/flycat-cloud" },
            { text: "微风网络 (7元高性价比)", link: "/brands/breeze-net" },
            { text: "大佬云 (5.6元IEPL专线)", link: "/brands/dalao-cloud" },
            { text: "星岛梦 (2020老牌·不限时)", link: "/brands/singdao-dream" },
            { text: "二猫云 (20元130GB实测)", link: "/brands/two-cats-cloud" },
            { text: "无忧链接 (免转换订阅)", link: "/brands/worryfree-link" },
            { text: "唯兔云 (60+节点三网优化)", link: "/brands/rabbit-cloud" },
            { text: "Firefly (IPLC全专线)", link: "/brands/firefly-accelerator" },
            { text: "宇宙云 (IEPL+VLESS)", link: "/brands/yuzhou-cloud" },
            { text: "U1S1 (经典实测)", link: "/brands/u1s1-cloud" },
            { text: "灵猫网络 (19元150GB)", link: "/brands/lingmao-net" },
            { text: "极连云 (AI工具适配)", link: "/brands/jilian-cloud" },
            { text: "光年梯 (高速专线中转)", link: "/brands/guangnian-ladder" },
            { text: "一翻云 (500M+晚高峰实测)", link: "/brands/yifan-cloud" },
            { text: "SOGO 云 (2026新锐专线)", link: "/brands/sogo-cloud" },
            { text: "可信云 (务实透明之选)", link: "/brands/kexin-cloud" },
            { text: "速界 (AI高并发优化)", link: "/brands/sujie-speedworld" },
            { text: "闪跃 (大带宽低抖动)", link: "/brands/shanyue-leap" },
            { text: "全球云 (多国节点覆盖)", link: "/brands/quanqiu-cloud" },
            { text: "闪电鼠 (5.6元轻量IEPL)", link: "/brands/shandianshu-mouse" },
            { text: "云界线 (极简IEPL)", link: "/brands/yunjiexian-border" },
            { text: "榴莲云 (预算友好)", link: "/brands/liulian-cloud" },
            { text: "神行加速 (14元120GB)", link: "/brands/shenxing-speed" },
            { text: "环球梯 (VLESS入门)", link: "/brands/huanqiuti-ladder" },
            { text: "隐形人 (独占一键App)", link: "/brands/yinxingren-invisible" },
            { text: "梯子云 (双模式支持)", link: "/brands/tizi-cloud" },
            { text: "WgetCloud (历史精品专线)", link: "/brands/wgetcloud-proxy" },
            { text: "白月光 (历史多节点)", link: "/brands/baiyueguang-cloud" },
            { text: "FlyingBird (历史IPLC)", link: "/brands/flyingbird-fly" },
            { text: "CyberGuard (350GB大容量)", link: "/brands/cyberguard-vpn" },
            { text: "龙猫云 (SS+IPLC)", link: "/brands/longmao-cloud" },
            { text: "FATCAT 肥猫云 (内网专线)", link: "/brands/fatcat-cloud" },
            { text: "TNTCloud (专线限量包)", link: "/brands/tntcloud-speed" },
            { text: "青云梯 (6年老牌IPLC)", link: "/brands/qingyunti-ladder" },
            { text: "山水云 (古风月付方案)", link: "/brands/shanshui-cloud" },
            { text: "灵动云 (2025新开VLESS)", link: "/brands/lingdong-cloud" },
            { text: "浪网 (IEPL商业多档)", link: "/brands/langwang-net" },
            { text: "EdgeNova (动态多线调度)", link: "/brands/edgenova-cloud" },
            { text: "萤火虫 (IPLC+原生IP)", link: "/brands/yinghuochong-firefly" },
            { text: "sslar (远程技术协助)", link: "/brands/sslar-net" }
          ]
        },
        {
          text: "高频长尾选型与避坑专题",
          items: [
            { text: "2026 预算 10 元内 IEPL 专线横评", link: "/brands/budget-iepl-airports-under-10" },
            { text: "不限时不过期流量包大盘点", link: "/brands/lifetime-traffic-package-airports" },
            { text: "Claude 3.5 纯净专线机场推荐", link: "/brands/best-airports-for-claude-3-5" },
            { text: "TikTok 跨境直播专线与独占 IP", link: "/brands/best-airports-for-tiktok-livestream" },
            { text: "买机场还是自己买 VPS 搭梯子？", link: "/brands/airport-vs-self-built-vps" }
          ]
        }
      ],
      '/network/': [
        {
          text: "专线网络与协议底层解析",
          items: [
            { text: "网络协议全景支柱", link: "/network/" },
            { text: "IEPL 与 IPLC 物理专线对比", link: "/network/iepl-vs-iplc" },
            { text: "VLESS Reality 协议原理与握手机制", link: "/network/vless-reality-handshake" },
            { text: "BGP 动态路由与多线入口容灾", link: "/network/bgp-dynamic-routing" },
            { text: "Shadowsocks vs Trojan 协议横评", link: "/network/shadowsocks-vs-trojan" },
            { text: "QoS 绕过机制与晚高峰稳定性剖析", link: "/network/qos-bypass-stability" }
          ]
        }
      ],
      '/clients/': [
        {
          text: "跨平台代理客户端全景指南",
          items: [
            { text: "客户端全景支柱", link: "/clients/" },
            { text: "Clash Verge Rev 核心配置与实战", link: "/clients/clash-verge-rev-guide" },
            { text: "v2rayN Windows 进阶排错手册", link: "/clients/v2rayn-windows-tutorial" },
            { text: "Shadowrocket 小火箭 iOS 配置指南", link: "/clients/shadowrocket-ios-setup" },
            { text: "sing-box 通用多协议内核详解", link: "/clients/sing-box-universal" },
            { text: "Stash (Mac/iOS) 策略组实战", link: "/clients/stash-macos-ios" },
            { text: "OpenClash 软路由家庭全局接管", link: "/clients/openclash-router-guide" },
            { text: "Clash Verge 连不上 ChatGPT 报错 1020", link: "/clients/clash-verge-chatgpt-error-1020" },
            { text: "小火箭与 Clash 订阅转换避坑", link: "/clients/shadowrocket-clash-subscription-convert" }
          ]
        }
      ],
      '/unlock/': [
        {
          text: "流媒体与 AI 高阶原生解锁",
          items: [
            { text: "解锁全景支柱", link: "/unlock/" },
            { text: "ChatGPT (OpenAI) 原生 IP 解锁实操", link: "/unlock/chatgpt-native-ip-unlock" },
            { text: "Claude 3.5 防封号与节点防污策略", link: "/unlock/claude-anti-ban-strategy" },
            { text: "Netflix 与 Disney+ 4K 原生解锁原理", link: "/unlock/netflix-disney-4k-streaming" },
            { text: "住宅家宽 IP 与机房原生 IP 鉴别指南", link: "/unlock/residential-vs-datacenter-ip" },
            { text: "Claude 提示所在地区不可用根治方案", link: "/unlock/claude-app-not-available-in-your-region" }
          ]
        }
      ],
      '/solutions/': [
        {
          text: "出海商业与跨境低延时方案",
          items: [
            { text: "出海实战全景支柱", link: "/solutions/" },
            { text: "TikTok 跨境带货直播低丢包配置", link: "/solutions/tiktok-crossborder-livestream" },
            { text: "外贸独立站防关联与多环境隔离", link: "/solutions/overseas-ecommerce-anti-association" },
            { text: "外服游戏加速与 UDP 转发调优", link: "/solutions/foreign-gaming-latency-optimization" },
            { text: "外服游戏超低延迟专线高阶调优", link: "/solutions/steam-apex-low-latency-vpn-setup" }
          ]
        }
      ],
      '/security/': [
        {
          text: "机场安全审计与防跑路避坑",
          items: [
            { text: "安全审计全景支柱", link: "/security/" },
            { text: "机场跑路征兆识别与预警雷达", link: "/security/runaway-airport-early-warning" },
            { text: "同源站群风险扫描与辨别方法", link: "/security/syndicate-cluster-detection" },
            { text: "月付避险与充值防御原则", link: "/security/monthly-payment-hedge-rule" },
            { text: "虚假测速防骗与数据造假辨识", link: "/security/fake-speedtest-fraud-identification" },
            { text: "手把手识破机场虚假跑分做假手法", link: "/security/how-to-spot-fake-speedtest" }
          ]
        }
      ],
      '/recommend/': [
        {
          text: "42家机场推荐矩阵",
          items: [
            { text: "🏆 42家机场选型推荐天梯榜", link: "/recommend/" },
            { text: "💰 10元内平价专线推荐分类", link: "/recommend/budget-airports" },
            { text: "🤖 AI与4K流媒体专用分类", link: "/recommend/ai-streaming" },
            { text: "💼 跨境电商与电竞专线分类", link: "/recommend/enterprise-gaming" }
          ]
        }
      ],
      '/free-nodes/': [
        {
          text: "免费节点专题矩阵",
          items: [
            { text: "🛡️ 免费节点安全真相白皮书", link: "/free-nodes/" },
            { text: "⚠️ 免费节点五大安全陷阱", link: "/free-nodes/security-risks" },
            { text: "📊 免费节点晚高峰可用率实测", link: "/free-nodes/daily-test-truth" }
          ]
        }
      ],
      '/faq/': [
        {
          text: "机场FAQ百科全书",
          items: [
            { text: "❓ 科学上网全生命周期FAQ", link: "/faq/" },
            { text: "🔴 节点全部超时全红排查SOP", link: "/faq/airport-timeout-all-red-fix" },
            { text: "🔄 Clash 订阅更新失败报 500/网络错误", link: "/faq/clash-subscription-update-failed-error" },
            { text: "📉 为什么白天飞快晚上卡顿转圈？", link: "/faq/airport-node-speed-drops-at-night" },
            { text: "🔢 机场节点倍率深度解析", link: "/faq/what-is-airport-traffic-multiplier" }
          ]
        }
      ],
      '/runaway/': [
        {
          text: "机场跑路预警雷达",
          items: [
            { text: "🚨 跑路预警与庞氏模型白皮书", link: "/runaway/" },
            { text: "⚠️ 跑路前四大反常信号监控", link: "/runaway/early-signals" }
          ]
        }
      ],
      '/free-trial/': [
        {
          text: "免费试用与1元体验",
          items: [
            { text: "⚡ 免费试用与1元体验名录", link: "/free-trial/" },
            { text: "🧪 1元全面压测晚高峰SOP", link: "/free-trial/how-to-test-airport-with-1-yuan" }
          ]
        }
      ]
    },
    footer: {
      message: 'wget博客 (wgetcloud.world) | 网络可观测性与代理基础设施实测实验室 · <a href="/about/">关于实验室</a> · <a href="/methodology/">评测方法论</a> · <a href="/disclaimer/">免责与合规声明</a>',
      copyright: 'Copyright © 2026 wget博客. All Rights Reserved. 全站商用推广合作链接均已依规标注 rel="nofollow sponsored noopener"，请遵守当地法律法规。'
    }
  }
})
