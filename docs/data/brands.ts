// docs/data/brands.ts
// 42家机场品牌完整结构化元数据（含测速、价格表、解锁矩阵与评测状态）

export interface PricingTier {
  name: string;
  billing: "月付" | "季付" | "半年付" | "年付" | "一次性付费" | "两年付" | "三年付";
  price: string;
  traffic: string;
  period: string;
}

export interface SpeedTestResult {
  node: string;
  latency: string;
  download: string;
  date?: string;
}

export interface BrandDetail {
  id: string;
  name: string;
  slug: string;
  established: string;
  priority: number;
  entryPrice: string;
  couponCode?: string;
  affUrl: string;
  lineType: string;
  protocols: string[];
  clientSupport: string;
  dataStatus: "measured" | "vendor" | "historical";
  speedtestImage?: string;
  additionalImages?: string[];
  testedAt?: string;
  pricingTiers: PricingTier[];
  speedtests: SpeedTestResult[];
  unlockStatus: {
    chatgpt: "支持" | "视节点而定" | "未测试" | "失败";
    claude: "支持" | "视节点而定" | "未测试" | "失败";
    gemini: "支持" | "视节点而定" | "未测试" | "失败";
    netflix: "支持" | "视节点而定" | "未测试" | "失败";
    disney: "支持" | "视节点而定" | "未测试" | "失败";
    youtube: "支持" | "视节点而定" | "未测试" | "失败";
  };
  suitableFor: string[];
  limitations: string[];
  riskAlert: string;
  summary: string;
}

export const BRANDS_LIST: BrandDetail[] = [
  // 1. 光速云 (主推第一)
  {
    id: "lightspeed",
    name: "光速云",
    slug: "lightspeed-cloud",
    established: "2020 年",
    priority: 1,
    entryPrice: "年付折合约 ¥8/月 (69GB)",
    couponCode: "AMM",
    affUrl: "https://sahude.gsyvipaff.com/#/?code=keqgvT5Y",
    lineType: "IEPL专线 + 企业级内网专线（双线路架构，单节点最高2.5Gbps）",
    protocols: ["VLESS", "Shadowsocks"],
    clientSupport: "提供自研专属客户端，同时全面支持 Clash、Shadowrocket 等第三方客户端订阅导入",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/光速云-节点测速实测.png",
    additionalImages: [
      "/images/speedtests/photo_2026-08-19_12-18-40.jpg",
      "/images/speedtests/photo_2026-08-19_12-13-58.jpg",
      "/images/speedtests/photo_2026-08-19_12-13-50.jpg"
    ],
    testedAt: "2026-08-11 14:32:56 CST 实测（晚高峰冗余架构）",
    pricingTiers: [
      { name: "光速云·致敬斯诺克147永久套餐", billing: "一次性付费", price: "¥147", traffic: "247GB不过期", period: "一次性永久" },
      { name: "光速云·轻量版", billing: "年付", price: "¥99", traffic: "69GB", period: "每月" },
      { name: "光速云·极速版", billing: "月付", price: "¥25", traffic: "168GB", period: "每月" },
      { name: "光速云·流光版", billing: "月付", price: "¥34", traffic: "268GB", period: "每月" },
      { name: "光速云·量子版", billing: "月付", price: "¥68", traffic: "568GB", period: "每月" },
      { name: "光速云·无界版", billing: "月付", price: "¥138", traffic: "900GB", period: "每月" },
      { name: "光速云·定制套餐", billing: "月付", price: "¥680", traffic: "500GB", period: "独享原生IP" }
    ],
    speedtests: [
      { node: "香港 IEPL 01", latency: "22ms", download: "529Mbps", date: "2026-10-19" },
      { node: "新加坡 专线 02", latency: "46ms", download: "387Mbps", date: "2026-10-19" },
      { node: "日本 东京 01", latency: "57ms", download: "135Mbps", date: "2026-10-19" },
      { node: "台湾 优化 01", latency: "41ms", download: "114Mbps", date: "2026-10-19" },
      { node: "美国 洛杉矶 01", latency: "143ms", download: "18Mbps", date: "2026-10-19" }
    ],
    unlockStatus: {
      chatgpt: "视节点而定",
      claude: "支持",
      gemini: "视节点而定",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: [
      "跨境电商与 TikTok 直播团队（原生 IP 与高并发稳定）",
      "追求晚高峰 4K 极速不卡顿与长久稳定在线的用户",
      "想购买长效防失联永久流量包（斯诺克 147）的备用党",
      "注重自研多端客户端与第三方 Clash/小火箭多配置导入的进阶用户"
    ],
    limitations: [
      "极低价格为年付折算价（¥99/年），月付入门档为 ¥25/月",
      "部分特定 AI 工具（如 Gemini）需手动挑选匹配原生节点",
      "特殊促销套餐不支持无理由退款，建议先以短期套餐测试本地网络"
    ],
    riskAlert: "2020年起稳定运营，线路成熟度高；特殊特价商品不支持退款，建议先月付实测晚高峰表现。",
    summary: "光速云在老牌专线机场中具有明显的综合性价比优势，主打 IEPL 与企业内网专线双架构，VLESS 协议加持，节点覆盖港台新日美英德巴等多国。自研客户端大幅降低新手上手难度，同时开放第三方订阅导入，是 2026 综合测评综合权重最高推荐方案。"
  },

  // 2. 暮光加速
  {
    id: "twilight",
    name: "暮光加速",
    slug: "twilight-speed",
    established: "2023 年",
    priority: 2,
    entryPrice: "¥20/月 (120GB)",
    couponCode: "muguang5555",
    affUrl: "https://varnexa.twilightaff.com/#/?code=D1LHglg3",
    lineType: "BGP 智能调度专线级出口",
    protocols: ["Shadowsocks", "VLESS"],
    clientSupport: "覆盖 Windows、macOS、iOS、Android、Linux 全平台客户端",
    dataStatus: "measured",
    pricingTiers: [
      { name: "暮光·基础版", billing: "月付", price: "¥20", traffic: "120GB", period: "每月" },
      { name: "暮光·标准版", billing: "月付", price: "¥40", traffic: "240GB", period: "每月" },
      { name: "暮光·旗舰版", billing: "月付", price: "¥100", traffic: "700GB", period: "每月" },
      { name: "暮光·至尊版", billing: "月付", price: "¥180", traffic: "1500GB", period: "每月" },
      { name: "暮光·年付轻量版", billing: "年付", price: "¥109", traffic: "70GB", period: "每月" }
    ],
    speedtests: [
      { node: "香港 BGP", latency: "26ms", download: "509Mbps", date: "2026-10-19" },
      { node: "新加坡 专线", latency: "43ms", download: "419Mbps", date: "2026-10-19" },
      { node: "日本 专线", latency: "53ms", download: "150Mbps", date: "2026-10-19" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "支持",
      gemini: "视节点而定",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["多设备跨平台协同用户", "需要 7×24 小时在线客服支持的团队"],
    limitations: ["低价档流量包较紧凑", "节点峰值带宽在极高峰偶有波动"],
    riskAlert: "2023年开业，BGP调度灵活，建议优先选择月付或年付轻量套餐。",
    summary: "暮光加速面向跨平台多设备同时在线用户，BGP 智能调度机制能根据本地宽带自适应优选出口，多端协同体验出色。"
  },

  // 3. 飞猫云
  {
    id: "flycat",
    name: "飞猫云",
    slug: "flycat-cloud",
    established: "2023 年",
    priority: 3,
    entryPrice: "年付折合约 ¥7/月 (50GB)",
    couponCode: "flycat888",
    affUrl: "https://guangs.flycataff.com/#/?code=6uq0Xe9y",
    lineType: "隧道高速中转专线",
    protocols: ["Shadowsocks"],
    clientSupport: "专属定制客户端登录即用，免配置订阅；同时兼容第三方配置",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/飞猫云-节点测速实测.png",
    testedAt: "2026-08-11 08:52:30 CST 实测",
    pricingTiers: [
      { name: "飞猫·学生版", billing: "年付", price: "¥84", traffic: "50GB", period: "每月" },
      { name: "飞猫·星耀版", billing: "月付", price: "¥25", traffic: "150GB", period: "每月" }
    ],
    speedtests: [
      { node: "香港 IEPL 01", latency: "45ms", download: "480Mbps", date: "2026-08-11" },
      { node: "日本 专线", latency: "88ms", download: "360Mbps", date: "2026-08-11" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "支持",
      gemini: "视节点而定",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["不想折腾配置与订阅的新手用户", "轻度网页、学术查资料与日常追剧"],
    limitations: ["学生版年付流量相对较小（50GB/月）", "深度定制化分流功能较少"],
    riskAlert: "专属客户端对小白极为友好，但重度技术玩家更建议导入第三方 Clash。",
    summary: "飞猫云主打零门槛新手体验，专属客户端免除复杂的节点导入步骤，适合首次接触科学上网的用户。"
  },

  // 4. 微风网络
  {
    id: "breeze",
    name: "微风网络",
    slug: "breeze-net",
    established: "2023 年",
    priority: 4,
    entryPrice: "年付折合约 ¥7/月",
    couponCode: "flat888",
    affUrl: "https://edp01.breezenetaff.com/#/?code=t3huofyI",
    lineType: "IEPL专线高速隧道",
    protocols: ["Shadowsocks", "VLESS"],
    clientSupport: "第三方通用客户端订阅导入",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/微风-节点测速实测.png",
    testedAt: "2026-08-11 实测",
    pricingTiers: [
      { name: "微风·入门版", billing: "年付", price: "¥84", traffic: "60GB", period: "每月" },
      { name: "微风·标准版", billing: "月付", price: "¥22", traffic: "150GB", period: "每月" }
    ],
    speedtests: [
      { node: "香港 专线", latency: "38ms", download: "410Mbps", date: "2026-08-11" },
      { node: "新加坡 专线", latency: "52ms", download: "320Mbps", date: "2026-08-11" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "支持",
      gemini: "支持",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["预算敏感型学生与上班族", "追求轻量稳定与低延迟的日常用户"],
    limitations: ["入门套餐不支持高并发多设备", "大文件下载需升级大流量套餐"],
    riskAlert: "性价比较高，促销期折扣大，建议先核实可用优惠码。",
    summary: "微风网络属于 7 元性价比档位中的代表，专线节点延迟控制良好，日常社交、网页浏览与主流 AI 解锁平稳。"
  },

  // 5. 大佬云
  {
    id: "dalaoyun",
    name: "大佬云",
    slug: "dalao-cloud",
    established: "2024 年",
    priority: 5,
    entryPrice: "年付折合约 ¥5.6/月 (60GB)",
    couponCode: "dly888",
    affUrl: "https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN",
    lineType: "IEPL 专线接入",
    protocols: ["VLESS"],
    clientSupport: "自研客户端 + 第三方订阅导入",
    dataStatus: "measured",
    pricingTiers: [
      { name: "大佬·入门年付包", billing: "年付", price: "¥67.2", traffic: "60GB", period: "每月" },
      { name: "大佬·月付标准版", billing: "月付", price: "¥18", traffic: "120GB", period: "每月" }
    ],
    speedtests: [
      { node: "香港 IEPL", latency: "32ms", download: "350Mbps", date: "2026-10-19" },
      { node: "日本 专线", latency: "65ms", download: "210Mbps", date: "2026-10-19" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "视节点而定",
      gemini: "视节点而定",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["超低预算刚需用户", "轻度学术检索与即时通讯"],
    limitations: ["低价档带宽上限有所限制", "晚高峰大流量下载需避开拥挤节点"],
    riskAlert: "5.6元极低价格档位，季付以上支持7折，适合作为备用主力。",
    summary: "大佬云以 5.6 元极低价格杀入 IEPL 专线市场，配备 VLESS 协议，兼顾了成本控制与基础连接可用性。"
  },

  // 6. 星岛梦
  {
    id: "xingdaomeng",
    name: "星岛梦",
    slug: "singdao-dream",
    established: "2020 年",
    priority: 6,
    entryPrice: "¥18/月 或 不限时套餐",
    couponCode: "nmw888",
    affUrl: "https://guangs.xingdaomeng.com/#/?code=1TynBYnR",
    lineType: "企业级 IPLC / IEPL 专线",
    protocols: ["Shadowsocks"],
    clientSupport: "第三方全平台订阅导入",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/星岛梦-节点测速实测.png",
    testedAt: "2026-08-11 01:48:13 CST 实测",
    pricingTiers: [
      { name: "星岛·标准月付", billing: "月付", price: "¥20", traffic: "120GB", period: "每月" },
      { name: "星岛·不限时流量包", billing: "一次性付费", price: "¥158", traffic: "300GB不过期", period: "永久" }
    ],
    speedtests: [
      { node: "香港 专线", latency: "29ms", download: "430Mbps", date: "2026-08-11" },
      { node: "日本 专线", latency: "58ms", download: "280Mbps", date: "2026-08-11" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "支持",
      gemini: "支持",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["用量不固定、偏好不限时不过期流量包的用户", "注重老牌平稳运行时间的用户"],
    limitations: ["月付套餐相比低价小机场略贵", "无自研客户端，需自行下载第三方软件"],
    riskAlert: "2020年至今稳定运维，不限时套餐性价比较高，适合备用兜底。",
    summary: "星岛梦是运营时间超过 4 年的老牌机场，专线网络架构稳定，其不限时不过期流量包在非重度用户中极具口碑。"
  },

  // 7. 二猫云
  {
    id: "ermao",
    name: "二猫云",
    slug: "two-cats-cloud",
    established: "2022 年",
    priority: 7,
    entryPrice: "¥20/月 (130GB)",
    couponCode: "ermao5555",
    affUrl: "https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW",
    lineType: "高带宽 Shadowsocks 专线",
    protocols: ["Shadowsocks"],
    clientSupport: "支持 Clash、v2rayN、小火箭等通用订阅",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/二猫云-节点测速实测.png",
    testedAt: "2026-08-11 10:45:27 CST 实测",
    pricingTiers: [
      { name: "二猫·进阶月付", billing: "月付", price: "¥20", traffic: "130GB", period: "每月" },
      { name: "二猫·大流量旗舰", billing: "月付", price: "¥45", traffic: "350GB", period: "每月" }
    ],
    speedtests: [
      { node: "香港 高速", latency: "31ms", download: "460Mbps", date: "2026-08-11" },
      { node: "新加坡 高速", latency: "49ms", download: "390Mbps", date: "2026-08-11" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "支持",
      gemini: "视节点而定",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["流媒体 4K 追剧党", "日常大流量需求用户"],
    limitations: ["价格无极低年付档，以月付/季付为主"],
    riskAlert: "节点测速结果优异，20元给到130GB流量，属于实打实的均衡选手。",
    summary: "二猫云在 20 元档位中表现抢眼，节点带宽充沛，实测晚高峰香港与新加坡节点能够跑满 400Mbps+。"
  },

  // 8. 无忧链接
  {
    id: "wuyou",
    name: "无忧链接",
    slug: "worryfree-link",
    established: "2023 年",
    priority: 8,
    entryPrice: "¥6/月 轻量套餐",
    couponCode: "wuyou666",
    affUrl: "https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL",
    lineType: "高速中转 + 免转换订阅服务",
    protocols: ["Shadowsocks", "VLESS"],
    clientSupport: "一键订阅转换与全通用客户端支持",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/无忧链接.jpg",
    additionalImages: ["/images/speedtests/无忧链接2.jpg"],
    pricingTiers: [
      { name: "无忧·轻量入门", billing: "月付", price: "¥6", traffic: "50GB", period: "每月" },
      { name: "无忧·畅享版", billing: "月付", price: "¥18", traffic: "150GB", period: "每月" }
    ],
    speedtests: [
      { node: "香港 专线", latency: "35ms", download: "320Mbps", date: "2026-09-07" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "视节点而定",
      gemini: "支持",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["多客户端经常切换的用户", "超轻量省钱需求"],
    limitations: ["6元套餐流量较小，仅适合文字办公与聊天"],
    riskAlert: "后台自带原生订阅聚合，减少第三方转换工具泄露风险。",
    summary: "无忧链接核心特点是“免转换订阅”，原生输出多种客户端格式，6 元入门门槛低，省心且不易出错。"
  },

  // 9. 唯兔云
  {
    id: "weitu",
    name: "唯兔云",
    slug: "rabbit-cloud",
    established: "2023 年",
    priority: 9,
    entryPrice: "¥20/月 (120GB)",
    couponCode: "weitu666",
    affUrl: "https://guangs.v2yunvipaff.com/#/?code=xIutqOBA",
    lineType: "三网优化智能调度专线",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端与专属配置导入",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/唯兔云-节点测速实测.png",
    testedAt: "2026-08-11 13:55:08 CST 实测",
    pricingTiers: [
      { name: "唯兔·标准版", billing: "月付", price: "¥20", traffic: "120GB", period: "每月" },
      { name: "唯兔·年付优惠版", billing: "年付", price: "¥168", traffic: "100GB", period: "每月" }
    ],
    speedtests: [
      { node: "香港 IEPL", latency: "28ms", download: "490Mbps", date: "2026-08-11" },
      { node: "日本 专线", latency: "62ms", download: "310Mbps", date: "2026-08-11" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "支持",
      gemini: "支持",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["国内移动/联通/电信不同宽带经常遭遇互联瓶颈的用户", "流媒体多区解锁"],
    limitations: ["活动折扣需关注群组公告"],
    riskAlert: "60+ 节点分布，三网 BGP 入口冗余充足，容灾能力较强。",
    summary: "唯兔云拥有 60+ 节点集群与三网优化 BGP 入口，能较好解决移动网络穿透差的痛点，流媒体解锁表现亮眼。"
  },

  // 10. Firefly
  {
    id: "firefly",
    name: "Firefly",
    slug: "firefly-accelerator",
    established: "2022 年",
    priority: 10,
    entryPrice: "年付折合约 ¥8/月 (60GB)",
    couponCode: "firefly",
    affUrl: "https://vip02.fireflyaff.com/#/?code=2n7VURre",
    lineType: "全专线 IPLC + 原生 IP",
    protocols: ["VLESS", "IPLC"],
    clientSupport: "免翻墙直连官网，全平台第三方客户端导入",
    dataStatus: "measured",
    pricingTiers: [
      { name: "Firefly年付版", billing: "年付", price: "¥96", traffic: "60GB/月", period: "每月" },
      { name: "Firefly Lite", billing: "月付", price: "¥25", traffic: "150GB/月", period: "每月" },
      { name: "Firefly Plus", billing: "月付", price: "¥45", traffic: "300GB/月", period: "每月" },
      { name: "Firefly不限时", billing: "一次性付费", price: "¥100", traffic: "100GB", period: "永久不过期" }
    ],
    speedtests: [
      { node: "香港 IPLC", latency: "24ms", download: "480Mbps", date: "2026-10-19" },
      { node: "新加坡 IPLC", latency: "48ms", download: "390Mbps", date: "2026-10-19" }
    ],
    unlockStatus: {
      chatgpt: "支持",
      claude: "支持",
      gemini: "支持",
      netflix: "支持",
      disney: "支持",
      youtube: "支持"
    },
    suitableFor: ["需要随时在国内免翻墙登录官网管理订阅的用户", "AI 生产力重度从业者"],
    limitations: ["不限时套餐单价相对普通月付稍高"],
    riskAlert: "官网具备多重抗封锁域名，即使断网也能直接访问官网续费。",
    summary: "Firefly 主打 IPLC 全专线与免翻墙官网直连，提供 6 档详尽套餐与永久流量包，适合需要高可靠防失联的商务人群。"
  },

  // 11. 宇宙云
  {
    id: "yuzhou",
    name: "宇宙云",
    slug: "yuzhou-cloud",
    established: "2024 年",
    priority: 11,
    entryPrice: "¥20/月",
    couponCode: "YUZHOU553",
    affUrl: "https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1",
    lineType: "IEPL专线 + VLESS 协议",
    protocols: ["VLESS"],
    clientSupport: "自研客户端 + 第三方通用订阅",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/宇宙云-节点测速实测.png",
    testedAt: "2026-08-11 21:04:24 CST 实测",
    pricingTiers: [{ name: "宇宙·标准版", billing: "月付", price: "¥20", traffic: "120GB", period: "每月" }],
    speedtests: [{ node: "香港 IEPL", latency: "25ms", download: "450Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["注重现代 VLESS 协议安全性的用户"],
    limitations: ["新品牌知名度需积累"],
    riskAlert: "实测带宽良好，建议优先月付体验。",
    summary: "宇宙云采用现代 VLESS 协议架构，IEPL 专线保障，自研客户端与第三方订阅双向适配。"
  },

  // 12. U1S1
  {
    id: "u1s1",
    name: "U1S1",
    slug: "u1s1-cloud",
    established: "2023 年",
    priority: 12,
    entryPrice: "¥20/月 (120GB)",
    couponCode: "akaka",
    affUrl: "https://guangs.vipaff.cc/#/?code=xhX5X22f",
    lineType: "多线中转高速节点",
    protocols: ["Shadowsocks"],
    clientSupport: "通用第三方客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/U1S1-节点测速实测.png",
    testedAt: "2026-08-11 22:33:29 CST 实测",
    pricingTiers: [{ name: "U1S1·经典版", billing: "月付", price: "¥20", traffic: "120GB", period: "每月" }],
    speedtests: [{ node: "香港 高速", latency: "29ms", download: "410Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["日常主力看视频与浏览网页"],
    limitations: ["套餐分类较少，主要以单一规格为主"],
    riskAlert: "测速数据透明，晚高峰抗压能力尚可。",
    summary: "U1S1 如其名字一样直爽，20元120GB定价标准透明，节点带宽实打实，适合厌烦套路的用户。"
  },

  // 13. 灵猫网络
  {
    id: "lingmao",
    name: "灵猫网络",
    slug: "lingmao-net",
    established: "2023 年",
    priority: 13,
    entryPrice: "¥19/月 (150GB)",
    couponCode: "lmao888",
    affUrl: "https://vip01.civetnet.com/#/?code=8MIAyxak",
    lineType: "Shadowsocks 高速中转",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/灵猫网络-节点测速实测.png",
    testedAt: "2026-08-11 18:45:40 CST 实测",
    pricingTiers: [
      { name: "灵猫·畅享版", billing: "月付", price: "¥19", traffic: "150GB", period: "每月" },
      { name: "灵猫·不限时包", billing: "一次性付费", price: "¥128", traffic: "200GB", period: "永久" }
    ],
    speedtests: [{ node: "香港 中转", latency: "33ms", download: "380Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["用量偏大且追求高性价的用户"],
    limitations: ["节假日高峰建议手动优选延迟最低的节点"],
    riskAlert: "19元给到150GB，性价比在同级中非常突出。",
    summary: "灵猫网络在 20 元以内给到了 150GB 的充沛流量，并提供不限时套餐，性价比表现稳健。"
  },

  // 14. 极连云
  {
    id: "jilian",
    name: "极连云",
    slug: "jilian-cloud",
    established: "2023 年",
    priority: 14,
    entryPrice: "¥18/月 (100GB)",
    couponCode: "ji8888",
    affUrl: "https://guangs.jlyvipaff.com/#/?code=VM1rKGUu",
    lineType: "高速中转",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/极连云-节点测速实测.png",
    testedAt: "2026-08-11 22:46:50 CST 实测",
    pricingTiers: [{ name: "极连·月享版", billing: "月付", price: "¥18", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "香港 中转", latency: "36ms", download: "360Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["日常科研、代码检索与 AI 提问"],
    limitations: ["节点地区主要集中在亚太地区"],
    riskAlert: "晚高峰测速表现平稳，丢包率低。",
    summary: "极连云主打稳定连通与 AI 场景覆盖，在 2026 晚高峰实测中展现出极低的丢包率表现。"
  },

  // 15. 光年梯
  {
    id: "guangnian",
    name: "光年梯",
    slug: "guangnian-ladder",
    established: "2023 年",
    priority: 15,
    entryPrice: "¥18/月 (110GB)",
    couponCode: "gnt6666",
    affUrl: "https://guangs.gntaff.com/#/?code=X1FoxjGE",
    lineType: "高速专线中转",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/光年梯-节点测速实测.png",
    testedAt: "2026-08-11 14:38:04 CST 实测",
    pricingTiers: [{ name: "光年·标准版", billing: "月付", price: "¥18", traffic: "110GB", period: "每月" }],
    speedtests: [{ node: "香港 专线", latency: "34ms", download: "420Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["日常多任务、在线网课与流媒体播放"],
    limitations: ["小众冷门节点较少"],
    riskAlert: "带宽冗余足，白天测速可跑出 400Mbps+。",
    summary: "光年梯兼具实惠月付价格与高质量专线出口，对 YouTube 4K 秒开支持良好。"
  },

  // 16. 一翻云
  {
    id: "yifan",
    name: "一翻云",
    slug: "yifan-cloud",
    established: "2023 年",
    priority: 16,
    entryPrice: "¥20/月 (150GB)",
    couponCode: "yfy6666",
    affUrl: "https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r",
    lineType: "全专线 Shadowsocks",
    protocols: ["Shadowsocks"],
    clientSupport: "全平台通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/一翻云-节点测速实测.png",
    testedAt: "2026-08-11 00:21:30 CST 实测",
    pricingTiers: [{ name: "一翻·大流量版", billing: "月付", price: "¥20", traffic: "150GB", period: "每月" }],
    speedtests: [{ node: "香港 专线", latency: "27ms", download: "510Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["大流量下载与超清视频追剧"],
    limitations: ["客服响应有时差"],
    riskAlert: "实测中香港节点峰值超过 500Mbps，适合对峰值下行有要求的用户。",
    summary: "一翻云在专线测速中展现了优异的下行速度，20 元提供 150GB 大流量，性价比较高。"
  },

  // 17. SOGO 云
  {
    id: "sogo",
    name: "SOGO 云",
    slug: "sogo-cloud",
    established: "2026 年",
    priority: 17,
    entryPrice: "¥18/月",
    couponCode: "sss777",
    affUrl: "https://guangs.sogoyunaff.cc/#/?code=327Vs0w7",
    lineType: "2026新专线中转",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/SOGO云-节点测速实测.png",
    testedAt: "2026-08-11 18:57:59 CST 实测",
    pricingTiers: [{ name: "SOGO·新锐版", billing: "月付", price: "¥18", traffic: "120GB", period: "每月" }],
    speedtests: [{ node: "香港 新线", latency: "31ms", download: "440Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["喜欢尝试新开线路低拥挤红利的用户"],
    limitations: ["2026新品牌，建议先月付观察"],
    riskAlert: "新品牌用户基数小，晚高峰不拥挤，体验流畅，务必遵守月付原则。",
    summary: "SOGO 云作为 2026 年新开品牌，拥有节点负载低的显著优势，晚高峰延迟稳定性优秀。"
  },

  // 18. 可信云
  {
    id: "kexin",
    name: "可信云",
    slug: "kexin-cloud",
    established: "2023 年",
    priority: 18,
    entryPrice: "¥16/月",
    couponCode: "kkk333",
    affUrl: "https://guangs.kosingaff.com/#/register?code=UYDtNlCY",
    lineType: "务实中转优化线路",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/可信云-节点测速实测.png",
    testedAt: "2026-08-11 15:32:35 CST 实测",
    pricingTiers: [{ name: "可信·基础版", billing: "月付", price: "¥16", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "香港 节点", latency: "35ms", download: "360Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["追求务实透明、反感虚标夸大的用户"],
    limitations: ["节点总数相比超大机场较少"],
    riskAlert: "官方明确标出数据缺口，态度客观踏实。",
    summary: "可信云正如其名，不夸张宣传，如实展示测速表现，在基础网页与科研查阅上表现稳定。"
  },

  // 19. 速界
  {
    id: "sujie",
    name: "速界",
    slug: "sujie-speedworld",
    established: "2024 年",
    priority: 19,
    entryPrice: "¥20/月",
    couponCode: "sss1111",
    affUrl: "https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB",
    lineType: "AI生产力优化专线",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/速界-节点测速实测.png",
    testedAt: "2026-08-11 15:39:36 CST 实测",
    pricingTiers: [{ name: "速界·AI加速版", billing: "月付", price: "¥20", traffic: "130GB", period: "每月" }],
    speedtests: [{ node: "香港 AI专线", latency: "26ms", download: "430Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["ChatGPT、Claude、Midjourney 重度从业者"],
    limitations: ["部分欧美冷门节点速度一般"],
    riskAlert: "亚太专线对 AI 接口响应优化明显，延迟抖动低。",
    summary: "速界针对 AI 接口访问进行了路由策略调优，节点干净度高，减少被 OpenAI 误封风险。"
  },

  // 20. 闪跃
  {
    id: "shanyue",
    name: "闪跃",
    slug: "shanyue-leap",
    established: "2023 年",
    priority: 20,
    entryPrice: "¥24/月 (150GB)",
    couponCode: "shanyue",
    affUrl: "https://vip02.flashleapaff.com/#/?code=3lgzm9mm",
    lineType: "高速大带宽专线出口",
    protocols: ["Shadowsocks"],
    clientSupport: "全平台客户端",
    dataStatus: "measured",
    pricingTiers: [{ name: "闪跃·精英版", billing: "月付", price: "¥24", traffic: "150GB", period: "每月" }],
    speedtests: [{ node: "香港 专线", latency: "25ms", download: "470Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["对网络延迟与单线程速度要求极高者"],
    limitations: ["入门价格相对平价梯队略高"],
    riskAlert: "大带宽专线表现良好，适合预算适中的中高要求用户。",
    summary: "闪跃主打大带宽与低抖动，在 24 元档位中能够提供非常充裕的出口速率。"
  },

  // 21. 全球云
  {
    id: "quanqiu",
    name: "全球云",
    slug: "quanqiu-cloud",
    established: "2026 年",
    priority: 21,
    entryPrice: "¥18/月",
    couponCode: "qqy7777",
    affUrl: "https://guangs.gcvipaff.com/#/?code=Ov2nvU9C",
    lineType: "多国节点覆盖专线",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "measured",
    speedtestImage: "/images/speedtests/全球云-节点测速实测.png",
    testedAt: "2026-08-11 15:50:43 CST 实测",
    pricingTiers: [{ name: "全球·环球版", billing: "月付", price: "¥18", traffic: "120GB", period: "每月" }],
    speedtests: [{ node: "香港 节点", latency: "30ms", download: "410Mbps", date: "2026-08-11" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["需要经常切换不同国家 IP 的外贸人员"],
    limitations: ["2026年新开，建议月付方式跟进"],
    riskAlert: "2026新开专线，节点地区覆盖面广，适合外贸出海。",
    summary: "全球云提供丰富的跨国节点出口，对于跨境电商选品、多国社媒账户运营适配度较高。"
  },

  // 22. 闪电鼠
  {
    id: "shandianshu",
    name: "闪电鼠",
    slug: "shandianshu-mouse",
    established: "2024 年",
    priority: 22,
    entryPrice: "年付折合约 ¥5.6/月 (60GB)",
    couponCode: "sd88",
    affUrl: "https://qwerty.shandianshuaff.com/#/?code=rUE75iYh",
    lineType: "IEPL 专线 + VLESS",
    protocols: ["VLESS"],
    clientSupport: "自研客户端 + 第三方订阅",
    dataStatus: "measured",
    pricingTiers: [{ name: "闪电·年付轻量", billing: "年付", price: "¥67.2", traffic: "60GB", period: "每月" }],
    speedtests: [{ node: "香港 IEPL", latency: "34ms", download: "310Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["追求极限性价比的轻量用户"],
    limitations: ["年付套餐流量固定，无大流量随意挥霍空间"],
    riskAlert: "5.6元档代表之一，季付以上7折，适合作为长期应急低成本方案。",
    summary: "闪电鼠以极低的门槛提供 IEPL 专线连接，适合日常备用或轻量文字查询使用。"
  },

  // 23. 云界线
  {
    id: "yunjiexian",
    name: "云界线",
    slug: "yunjiexian-border",
    established: "2024 年",
    priority: 23,
    entryPrice: "年付折合约 ¥5.6/月 (60GB)",
    couponCode: "yjx888",
    affUrl: "https://qwerty.yunjiexianaff.com/?code=HBaZ91c6",
    lineType: "IEPL 专线",
    protocols: ["VLESS"],
    clientSupport: "自研客户端 + 通用导入",
    dataStatus: "measured",
    pricingTiers: [{ name: "云界·极简版", billing: "年付", price: "¥67.2", traffic: "60GB", period: "每月" }],
    speedtests: [{ node: "香港 专线", latency: "35ms", download: "290Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["预算极低学生党与日常基础翻阅资料"],
    limitations: ["推广链接格式与其他站点略有不同，缺少井号"],
    riskAlert: "注册时请确保官网推广链接能够完整解析。",
    summary: "云界线规格与闪电鼠类似，同样聚焦 5.6 元极低价格区间，提供基础 IEPL 专线保障。"
  },

  // 24. 榴莲云
  {
    id: "liulianyun",
    name: "榴莲云",
    slug: "liulian-cloud",
    established: "2024 年",
    priority: 24,
    entryPrice: "年付折合约 ¥5.6/月 (60GB)",
    couponCode: "ll88",
    affUrl: "https://qwerty.liulianyunaff.com#/?code=hS5pvbfE",
    lineType: "IEPL 专线",
    protocols: ["待核实"],
    clientSupport: "自研客户端 + 第三方订阅",
    dataStatus: "vendor",
    pricingTiers: [{ name: "榴莲·尝鲜版", billing: "年付", price: "¥67.2", traffic: "60GB", period: "每月" }],
    speedtests: [{ node: "香港 节点", latency: "38ms", download: "260Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "视节点而定", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["只需要最低预算且不在意具体协议细节的用户"],
    limitations: ["协议类型品牌资料未统一标注明确"],
    riskAlert: "若对明确 VLESS 协议有强诉求，建议优先选光速云或闪电鼠。",
    summary: "榴莲云是 5.6 元档位中协议未明确统一的一款，但实际基础连接功能可用，适合兜底备用。"
  },

  // 25. 神行加速
  {
    id: "shenxing",
    name: "神行加速",
    slug: "shenxing-speed",
    established: "2024 年",
    priority: 25,
    entryPrice: "年付折合约 ¥14/月 (120GB)",
    couponCode: "xs0077",
    affUrl: "https://qwerty.shenxingaff.com/#/?code=gawDQqVE",
    lineType: "IEPL专线 + VLESS 协议",
    protocols: ["VLESS"],
    clientSupport: "自研客户端 + 第三方导入",
    dataStatus: "measured",
    pricingTiers: [{ name: "神行·中阶版", billing: "年付", price: "¥168", traffic: "120GB", period: "每月" }],
    speedtests: [{ node: "香港 IEPL", latency: "28ms", download: "380Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["觉得 5.6 元档流量不够用，又不想买 20 元档的用户"],
    limitations: ["年付才能享受最大优惠"],
    riskAlert: "提供新用户 7 折优惠码，性价比在中间档位非常平衡。",
    summary: "神行加速定位于 14 元折算价，给到 120GB 流量（比 5.6 元档多一倍），是折中的性价比之选。"
  },

  // 26. 环球梯
  {
    id: "huanqiuti",
    name: "环球梯",
    slug: "huanqiuti-ladder",
    established: "2024 年",
    priority: 26,
    entryPrice: "年付折合约 ¥5.6/月 (60GB)",
    couponCode: "HQ66",
    affUrl: "https://qwerty.huanqiutiaff.com/?code=9I4KRNPH",
    lineType: "IEPL 专线 + VLESS",
    protocols: ["VLESS"],
    clientSupport: "自研客户端 + 第三方导入",
    dataStatus: "vendor",
    pricingTiers: [{ name: "环球·入门包", billing: "年付", price: "¥67.2", traffic: "60GB", period: "每月" }],
    speedtests: [{ node: "香港 节点", latency: "36ms", download: "280Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["极简预算备用网络"],
    limitations: ["联盟链接缺少 #，注册需留意"],
    riskAlert: "联盟链接格式异常，如遇无法打开请检查浏览器重定向。",
    summary: "环球梯提供 5.6 元档的 IEPL+VLESS 方案，适合超轻度备用。"
  },

  // 27. 隐形人
  {
    id: "yinxingren",
    name: "隐形人",
    slug: "yinxingren-invisible",
    established: "2024 年",
    priority: 27,
    entryPrice: "¥24/月 起 (144GB)",
    couponCode: "yxr888",
    affUrl: "https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT",
    lineType: "企业级 IPLC 专线直连",
    protocols: ["专属私有加密"],
    clientSupport: "仅支持自带专属客户端，不提供第三方通用订阅链接",
    dataStatus: "vendor",
    pricingTiers: [
      { name: "隐形人 白银纪元", billing: "月付", price: "¥24", traffic: "144GB", period: "每月" },
      { name: "隐形人 黄金序列", billing: "月付", price: "¥48", traffic: "360GB", period: "每月" },
      { name: "王者定制版", billing: "月付", price: "¥680", traffic: "500GB", period: "独享" }
    ],
    speedtests: [{ node: "香港 IPLC", latency: "25ms", download: "460Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["不想折腾配置、习惯下载官方 App 登录即用的新手"],
    limitations: ["不支持 Clash、小火箭等第三方工具导入，无法与个人配置合并"],
    riskAlert: "官方宣传 1 小时修复承诺与零卡顿，属于品牌宣称；且不支持第三方订阅，购买前务必认准。",
    summary: "隐形人采用封闭自研客户端生态，虽然丧失了第三方导入的灵活性，但给纯小白用户提供了傻瓜式的连接体验。"
  },

  // 28. 梯子云
  {
    id: "tiziyun",
    name: "梯子云",
    slug: "tizi-cloud",
    established: "2025 年",
    priority: 28,
    entryPrice: "年付折合约 ¥7.4/月 (60GB)",
    couponCode: "tiziyun",
    affUrl: "https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0",
    lineType: "IEPL专线 + 2Gbps独立带宽",
    protocols: ["VLESS"],
    clientSupport: "自研全平台客户端 + 通用订阅双支持",
    dataStatus: "vendor",
    pricingTiers: [
      { name: "梯子云·年付轻量", billing: "年付", price: "¥88.8", traffic: "60GB", period: "每月" },
      { name: "梯子云·月付标准", billing: "月付", price: "¥22", traffic: "130GB", period: "每月" }
    ],
    speedtests: [{ node: "香港 IEPL", latency: "27ms", download: "420Mbps", date: "2026-10-19" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["既想要一键登录又想兼顾 Clash 的进阶与新手双面用户"],
    limitations: ["2025年新开业，需持续观察长期续约情况"],
    riskAlert: "官方宣称 500Mbps 晚高峰冗余，品牌宣称值已标注。",
    summary: "梯子云最大的亮点是同时兼顾“自研客户端一键登录”与“通用订阅导入”，比隐形人更加自由灵活。"
  },

  // 29. WgetCloud (后排梯队)
  {
    id: "wgetcloud",
    name: "WgetCloud",
    slug: "wgetcloud-proxy",
    established: "2021 年",
    priority: 29,
    entryPrice: "季付 ¥297 起",
    affUrl: "https://invite.wgetcloud.ltd/auth/register?code=VLG2xb",
    lineType: "精品专线网络",
    protocols: ["Trojan"],
    clientSupport: "通用客户端导入",
    dataStatus: "historical",
    pricingTiers: [
      { name: "基础专线服务", billing: "季付", price: "¥297", traffic: "230GB", period: "每月" },
      { name: "优质专线服务", billing: "季付", price: "¥327", traffic: "250GB", period: "每月" }
    ],
    speedtests: [{ node: "香港 专线", latency: "25.9ms", download: "431Mbps", date: "2026-05-02" }],
    unlockStatus: { chatgpt: "视节点而定", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["高预算企业商务办公"],
    limitations: ["无直接月付套餐，季付起步价格较高"],
    riskAlert: "历史保留测速数据优异，但门槛高，定位高端精品。",
    summary: "WgetCloud 长期主打高端专线服务，节点延迟低，但计费门槛相对较高，适合预算充足的企业或个人。"
  },

  // 30. 白月光
  {
    id: "baiyueguang",
    name: "白月光",
    slug: "baiyueguang-cloud",
    established: "2022 年",
    priority: 30,
    entryPrice: "季付 ¥66 起 (100GB/月)",
    affUrl: "https://sibker.com/register?invite_code=gg6puAId",
    lineType: "Shadowsocks 亚洲近端专线",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "historical",
    pricingTiers: [{ name: "小包", billing: "季付", price: "¥66", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "香港 节点", latency: "160.7ms", download: "114Mbps", date: "2026-07-17" }],
    unlockStatus: { chatgpt: "视节点而定", claude: "未测试", gemini: "未测试", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["偏好多节点覆盖的探索型用户"],
    limitations: ["当前缺少直接月付选项"],
    riskAlert: "历史记录显示节点涵盖近80个地区，需在官网核实最新线路。",
    summary: "白月光在历史测速中覆盖了极广泛的亚洲与全球边缘地区，季付门槛适中。"
  },

  // 31. FlyingBird
  {
    id: "flyingbird",
    name: "FlyingBird",
    slug: "flyingbird-fly",
    established: "老牌融合站群",
    priority: 31,
    entryPrice: "¥15/月 (100GB)",
    couponCode: "theo",
    affUrl: "https://flyingbird.run",
    lineType: "全专线 IPLC 无倍率不限速",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "historical",
    pricingTiers: [{ name: "青铜套餐", billing: "月付", price: "¥15", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "香港 IPLC", latency: "30ms", download: "350Mbps", date: "历史记录" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["追求全节点 1 倍率的用户"],
    limitations: ["无微信支付（仅支持支付宝与 USDT）"],
    riskAlert: "属于一云梯同源站群核心品牌，线路规格统一。",
    summary: "FlyingBird 主打无倍率不限速 IPLC 专线，支持按月续费与优惠码折上折。"
  },

  // 32. CyberGuard
  {
    id: "cyberguard",
    name: "CyberGuard",
    slug: "cyberguard-vpn",
    established: "2023 年",
    priority: 32,
    entryPrice: "¥32/月 (350GB)",
    affUrl: "https://cyberguard.best/#/register?code=AxXNNYng",
    lineType: "Trojan / VLESS 专线",
    protocols: ["Trojan", "VLESS"],
    clientSupport: "通用客户端",
    dataStatus: "historical",
    pricingTiers: [
      { name: "350G｜标准套餐", billing: "月付", price: "¥32", traffic: "350GB", period: "每月" },
      { name: "220G流量包｜不限时", billing: "一次性付费", price: "¥79", traffic: "220GB", period: "一次性" }
    ],
    speedtests: [{ node: "日本 节点", latency: "123.8ms", download: "488Mbps", date: "2025-06-21" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["大流量高频跨国访问"],
    limitations: ["起步月付 32 元相对平民小机场略高"],
    riskAlert: "历史测速覆盖 12 个国家地区，支持一次性不限时流量包。",
    summary: "CyberGuard 拥有 350GB 充沛基础月付流量和不限时流量包，协议采用现代 Trojan 与 VLESS。"
  },

  // 33. 龙猫云
  {
    id: "longmaoyun",
    name: "龙猫云",
    slug: "longmao-cloud",
    established: "老牌站群",
    priority: 33,
    entryPrice: "¥15/月 (100GB)",
    affUrl: "https://longmaoyun.cc",
    lineType: "SS + IPLC 全专线",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "vendor",
    pricingTiers: [{ name: "VIP1", billing: "月付", price: "¥15", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "香港 IPLC", latency: "28ms", download: "340Mbps", date: "历史记录" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["追求全专线且预算控制在 15 元的用户"],
    limitations: ["同源站群特征明显"],
    riskAlert: "已核实为同源站群成员，教程完善但需理性看待宣传速率。",
    summary: "龙猫云提供标准的 15 元 100GB 入门专线服务，教程详细，适合新手起步。"
  },

  // 34. FATCAT (肥猫云)
  {
    id: "fatcat",
    name: "FATCAT (肥猫云)",
    slug: "fatcat-cloud",
    established: "2023 年",
    priority: 34,
    entryPrice: "¥20/月 (120GB) / 年付 ¥96 (60GB/月)",
    affUrl: "https://fatcat.run",
    lineType: "企业级 IEPL / IPLC 内网专线",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "vendor",
    pricingTiers: [{ name: "基础套餐", billing: "月付", price: "¥20", traffic: "120GB", period: "每月" }],
    speedtests: [{ node: "香港 专线", latency: "29ms", download: "360Mbps", date: "历史记录" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["跨境内网协同与稳定在线"],
    limitations: ["未提供详细单节点测速公开看板"],
    riskAlert: "主打内网专线抗干扰，建议先月付实测稳定性。",
    summary: "FATCAT 强调内网专线的抗干扰能力，提供多档流量和年付加强版选择。"
  },

  // 35. TNTCloud
  {
    id: "tntcloud",
    name: "TNTCloud",
    slug: "tntcloud-speed",
    established: "老牌分站团队",
    priority: 35,
    entryPrice: "季付 ¥30 (60GB/月) / 月付 ¥20 (110GB)",
    couponCode: "TNT85",
    affUrl: "https://tntcloud.best",
    lineType: "IPLC 内网专线",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "vendor",
    pricingTiers: [{ name: "VIP1", billing: "月付", price: "¥20", traffic: "110GB", period: "每月" }],
    speedtests: [{ node: "香港 IPLC", latency: "31ms", download: "350Mbps", date: "历史记录" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["跨境电商、TikTok 直播定制需求"],
    limitations: ["部分限量包不支持优惠码叠加"],
    riskAlert: "曾用名 3A 加速器，历史团队经验较足。",
    summary: "TNTCloud 提供季付轻量包与常规月付档，同时支持跨境电商与海外直播专项定制线路。"
  },

  // 36. 青云梯
  {
    id: "qingyunti",
    name: "青云梯",
    slug: "qingyunti-ladder",
    established: "运营 6 年以上",
    priority: 36,
    entryPrice: "¥25/月 (150GB) / 年付 ¥96 (60GB/月)",
    couponCode: "qyt85",
    affUrl: "https://qingyunti.top",
    lineType: "SS + 企业级 IPLC 三网优化",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "vendor",
    pricingTiers: [{ name: "VIP1", billing: "月付", price: "¥25", traffic: "150GB", period: "每月" }],
    speedtests: [{ node: "香港 IPLC", latency: "26ms", download: "420Mbps", date: "历史记录" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["看重老牌运营年限和多节点负载的用户"],
    limitations: ["月付价格略高于入门平价小店"],
    riskAlert: "曾用名 V4Speed，资历较老，支持企业级定制。",
    summary: "青云梯运营年限超过 6 年，三网智能负载均衡与专线抗封锁经验深厚。"
  },

  // 37. 山水云
  {
    id: "shanshuiyun",
    name: "山水云",
    slug: "shanshui-cloud",
    established: "2023 年",
    priority: 37,
    entryPrice: "¥15/月 (100GB) / 年付 ¥88 (64GB/月)",
    affUrl: "https://sldm1.ssyylf.com/#/register?code=YD5iQ888",
    lineType: "高速中转",
    protocols: ["待核实"],
    clientSupport: "通用客户端",
    dataStatus: "historical",
    pricingTiers: [{ name: "100G/月-琴", billing: "月付", price: "¥15", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "美国 节点", latency: "349ms", download: "180Mbps", date: "2026-06-29" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["偏好中国风命名与极低年付预算的用户"],
    limitations: ["部分协议字段尚未核实"],
    riskAlert: "历史测速中欧美节点表现良好，注意核实协议细节。",
    summary: "山水云以琴棋书画为套餐命名，长周期单价低，适合普通日常浏览与视频播放。"
  },

  // 38. 灵动云
  {
    id: "lingdongyun",
    name: "灵动云",
    slug: "lingdong-cloud",
    established: "2025 年",
    priority: 38,
    entryPrice: "¥20/月 (100GB)",
    affUrl: "https://varnexa.lingdongaff.com/#/?code=wZvEhEoI",
    lineType: "IEPL 专线 + VLESS",
    protocols: ["VLESS"],
    clientSupport: "通用客户端",
    dataStatus: "historical",
    pricingTiers: [{ name: "灵动·拂风", billing: "月付", price: "¥20", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "香港 专线", latency: "42ms", download: "310Mbps", date: "2026-07-20" }],
    unlockStatus: { chatgpt: "支持", claude: "视节点而定", gemini: "视节点而定", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["追求大流量和 AI 全解锁的用户"],
    limitations: ["新开业品牌，建议按月体验"],
    riskAlert: "2025年新开业，OpenAI 解锁表现较好，按需选购。",
    summary: "灵动云采用 IEPL 与 VLESS 专线，提供多档大流量周期套餐与私人定制。"
  },

  // 39. 浪网
  {
    id: "langwang",
    name: "浪网",
    slug: "langwang-net",
    established: "2024 年",
    priority: 39,
    entryPrice: "¥30/月 (150GB) / 年付 ¥119 (80GB/月)",
    affUrl: "https://varnexa.wavenetaff.com/#/?code=xwAM4tTd",
    lineType: "IEPL 专线",
    protocols: ["待核实"],
    clientSupport: "通用客户端",
    dataStatus: "vendor",
    pricingTiers: [{ name: "浪网 入门", billing: "月付", price: "¥30", traffic: "150GB", period: "每月" }],
    speedtests: [{ node: "香港 专线", latency: "35ms", download: "280Mbps", date: "待实测" }],
    unlockStatus: { chatgpt: "未测试", claude: "未测试", gemini: "未测试", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["进阶与商业团队网络定制"],
    limitations: ["部分字段需客服一对一确认"],
    riskAlert: "未实测逐地区晚高峰，数据待进一步核验。",
    summary: "浪网提供入门、进阶、高端、商业周期档，专线网络适合不同规模团队。"
  },

  // 40. EdgeNova
  {
    id: "edgenova",
    name: "EdgeNova",
    slug: "edgenova-cloud",
    established: "2024 年",
    priority: 40,
    entryPrice: "¥15/月 (72GB) / 年付 ¥108 (45GB/月)",
    couponCode: "TH888",
    affUrl: "https://work.edgenovaaff.cc/#/register?code=cl3iB5YG",
    lineType: "高速直连 / IPLC 多线路自动分配",
    protocols: ["Shadowsocks"],
    clientSupport: "通用客户端",
    dataStatus: "vendor",
    pricingTiers: [{ name: "极界·标准", billing: "月付", price: "¥25", traffic: "120GB", period: "每月" }],
    speedtests: [{ node: "香港 直连", latency: "32ms", download: "300Mbps", date: "待实测" }],
    unlockStatus: { chatgpt: "未测试", claude: "未测试", gemini: "未测试", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["多线路自适应调度需求"],
    limitations: ["未提供逐项流媒体实测结果"],
    riskAlert: "多线路自动分配，提供新用户 8 折优惠码。",
    summary: "EdgeNova 以直连与 IPLC 动态分配为主要特性，支持国内支付与加密货币付款。"
  },

  // 41. 萤火虫
  {
    id: "yinghuochong",
    name: "萤火虫",
    slug: "yinghuochong-firefly",
    established: "8 年团队背景",
    priority: 41,
    entryPrice: "年付 ¥96 (60GB/月) / 月付 ¥25 (150GB)",
    couponCode: "firefly",
    affUrl: "https://vip02.fireflyaff.com/#/?code=jTp9wSgZ",
    lineType: "IPLC + VLESS 原生 IP",
    protocols: ["VLESS", "IPLC"],
    clientSupport: "通用客户端",
    dataStatus: "vendor",
    pricingTiers: [{ name: "Firefly Lite", billing: "月付", price: "¥25", traffic: "150GB", period: "每月" }],
    speedtests: [{ node: "香港 IPLC", latency: "26ms", download: "380Mbps", date: "待实测" }],
    unlockStatus: { chatgpt: "支持", claude: "支持", gemini: "支持", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["AI 生产力工具原生 IP 访问"],
    limitations: ["无微信支付（支持支付宝与 USDT）"],
    riskAlert: "同系微风与飞鸟站群，原生 IP 特征明显。",
    summary: "萤火虫突出原生 IP 与 IPLC+VLESS 架构，对 ChatGPT/Gemini 支持度较好。"
  },

  // 42. sslar
  {
    id: "sslar",
    name: "sslar",
    slug: "sslar-net",
    established: "2023 年",
    priority: 42,
    entryPrice: "¥17/月 (100GB)",
    couponCode: "ko3eTt0w",
    affUrl: "https://sslar.run",
    lineType: "企业级 IEPL + 多线 BGP",
    protocols: ["Shadowsocks", "VLESS"],
    clientSupport: "自研客户端（Win/Mac/Android）并支持远程桌面协助",
    dataStatus: "vendor",
    pricingTiers: [{ name: "Basic", billing: "月付", price: "¥17", traffic: "100GB", period: "每月" }],
    speedtests: [{ node: "香港 IEPL", latency: "30ms", download: "340Mbps", date: "待实测" }],
    unlockStatus: { chatgpt: "未测试", claude: "未测试", gemini: "未测试", netflix: "支持", disney: "支持", youtube: "支持" },
    suitableFor: ["需要一对一远程桌面装机协助的商务小白"],
    limitations: ["暂未提供 USDT 结算"],
    riskAlert: "提供人工远程支持是其显著特色，适合商务小白省心维护。",
    summary: "sslar 不仅提供 IEPL 专线与自研跨平台客户端，更提供远程桌面协助服务，降低企业上手成本。"
  }
];
