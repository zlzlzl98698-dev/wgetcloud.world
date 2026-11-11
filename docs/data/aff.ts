// docs/data/aff.ts
// 集中管理42家机场品牌推广链接与合规属性
// 统一遵循 target="_blank" rel="nofollow sponsored noopener" 规范

export interface AffiliateItem {
  id: string;
  name: string;
  slug: string;
  affUrl: string;
  couponCode?: string;
  discountSummary?: string;
  isPrimary?: boolean;
  priority: number;
  highlightBadge?: string;
}

export const AFFILIATE_DISCLOSURE = 
  "含推广链接，通过链接注册可能为本站带来维护佣金，不影响用户实际支付价格与套餐权益。测评基于事实记录与实测数据，不作商业虚假承诺。";

export const AFFILIATE_DATA: Record<string, AffiliateItem> = {
  // Top 1 (第一主推核心)
  "lightspeed": {
    id: "lightspeed",
    name: "光速云",
    slug: "lightspeed-cloud",
    affUrl: "https://sahude.gsyvipaff.com/#/?code=keqgvT5Y",
    couponCode: "AMM",
    discountSummary: "最低折合约8元/月，致敬斯诺克147永久套餐247GB不过期",
    isPrimary: true,
    priority: 1,
    highlightBadge: "2020年运营 · IEPL专线 · VLESS"
  },
  // Top 2~10
  "twilight": {
    id: "twilight",
    name: "暮光加速",
    slug: "twilight-speed",
    affUrl: "https://varnexa.twilightaff.com/#/?code=D1LHglg3",
    couponCode: "muguang5555",
    discountSummary: "20元/月 120GB起，BGP智能调度多设备支持",
    priority: 2,
    highlightBadge: "BGP智能调度 · 全平台支持"
  },
  "flycat": {
    id: "flycat",
    name: "飞猫云",
    slug: "flycat-cloud",
    affUrl: "https://guangs.flycataff.com/#/?code=6uq0Xe9y",
    couponCode: "flycat888",
    discountSummary: "年付折合约7元/月，专属客户端免配订阅",
    priority: 3,
    highlightBadge: "新手专属客户端 · 免配订阅"
  },
  "breeze": {
    id: "breeze",
    name: "微风网络",
    slug: "breeze-net",
    affUrl: "https://edp01.breezenetaff.com/#/?code=t3huofyI",
    couponCode: "flat888",
    discountSummary: "7元入门档，9折优惠",
    priority: 4,
    highlightBadge: "7元入门 · 9折优惠"
  },
  "dalaoyun": {
    id: "dalaoyun",
    name: "大佬云",
    slug: "dalao-cloud",
    affUrl: "https://qwerty.dalaoyunaff.com/#/?code=jCPLmoWN",
    couponCode: "dly888",
    discountSummary: "年付约5.6元/月 60GB，IEPL专线+VLESS",
    priority: 5,
    highlightBadge: "5.6元极低门槛 · IEPL专线"
  },
  "xingdaomeng": {
    id: "xingdaomeng",
    name: "星岛梦",
    slug: "singdao-dream",
    affUrl: "https://guangs.xingdaomeng.com/#/?code=1TynBYnR",
    couponCode: "nmw888",
    discountSummary: "2020年运营老牌，含不限时流量包",
    priority: 6,
    highlightBadge: "2020老牌 · 不限时流量包"
  },
  "ermao": {
    id: "ermao",
    name: "二猫云",
    slug: "two-cats-cloud",
    affUrl: "https://guangs.2maoyunaff.cc/#/?code=7mjvgGbW",
    couponCode: "ermao5555",
    discountSummary: "20元130GB，Shadowsocks高速专线",
    priority: 7,
    highlightBadge: "20元130GB · 晚高峰实测"
  },
  "wuyou": {
    id: "wuyou",
    name: "无忧链接",
    slug: "worryfree-link",
    affUrl: "https://wep01.worryfreeaff.com/#/?code=4ZoSbLdL",
    couponCode: "wuyou666",
    discountSummary: "订阅无需转换，6元轻量入门",
    priority: 8,
    highlightBadge: "免转换订阅 · 6元轻量"
  },
  "weitu": {
    id: "weitu",
    name: "唯兔云",
    slug: "rabbit-cloud",
    affUrl: "https://guangs.v2yunvipaff.com/#/?code=xIutqOBA",
    couponCode: "weitu666",
    discountSummary: "60+节点三网优化，智能负载均衡",
    priority: 9,
    highlightBadge: "60+节点 · 三网优化调度"
  },
  "firefly": {
    id: "firefly",
    name: "Firefly",
    slug: "firefly-accelerator",
    affUrl: "https://vip02.fireflyaff.com/#/?code=2n7VURre",
    couponCode: "firefly",
    discountSummary: "IPLC全专线6档套餐，国内免翻直连官网",
    priority: 10,
    highlightBadge: "IPLC专线 · 官网免翻直连"
  },
  // Top 11~28
  "yuzhou": {
    id: "yuzhou",
    name: "宇宙云",
    slug: "yuzhou-cloud",
    affUrl: "https://wzjc.yuzoucloud.cc/#/?code=yrThwMP1",
    couponCode: "YUZHOU553",
    discountSummary: "IEPL专线 + VLESS + 自研客户端支持",
    priority: 11,
    highlightBadge: "IEPL + VLESS"
  },
  "u1s1": {
    id: "u1s1",
    name: "U1S1",
    slug: "u1s1-cloud",
    affUrl: "https://guangs.vipaff.cc/#/?code=xhX5X22f",
    couponCode: "akaka",
    discountSummary: "20元120GB标准方案，多协议支持",
    priority: 12,
    highlightBadge: "20元120GB · 经典配置"
  },
  "lingmao": {
    id: "lingmao",
    name: "灵猫网络",
    slug: "lingmao-net",
    affUrl: "https://vip01.civetnet.com/#/?code=8MIAyxak",
    couponCode: "lmao888",
    discountSummary: "19元150GB + 不限时流量包",
    priority: 13,
    highlightBadge: "19元150GB · 不限时包"
  },
  "jilian": {
    id: "jilian",
    name: "极连云",
    slug: "jilian-cloud",
    affUrl: "https://guangs.jlyvipaff.com/#/?code=VM1rKGUu",
    couponCode: "ji8888",
    discountSummary: "18元100GB，宣传覆盖主流AI工具",
    priority: 14,
    highlightBadge: "18元100GB · AI工具适配"
  },
  "guangnian": {
    id: "guangnian",
    name: "光年梯",
    slug: "guangnian-ladder",
    affUrl: "https://guangs.gntaff.com/#/?code=X1FoxjGE",
    couponCode: "gnt6666",
    discountSummary: "18元110GB高速中转线路",
    priority: 15,
    highlightBadge: "18元110GB · 高速中转"
  },
  "yifan": {
    id: "yifan",
    name: "一翻云",
    slug: "yifan-cloud",
    affUrl: "https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r",
    couponCode: "yfy6666",
    discountSummary: "20元150GB，晚高峰高带宽实测",
    priority: 16,
    highlightBadge: "20元150GB · 晚高峰实测"
  },
  "sogo": {
    id: "sogo",
    name: "SOGO 云",
    slug: "sogo-cloud",
    affUrl: "https://guangs.sogoyunaff.cc/#/?code=327Vs0w7",
    couponCode: "sss777",
    discountSummary: "2026新品牌，Shadowsocks高速专线",
    priority: 17,
    highlightBadge: "2026新品牌 · Shadowsocks"
  },
  "kexin": {
    id: "kexin",
    name: "可信云",
    slug: "kexin-cloud",
    affUrl: "https://guangs.kosingaff.com/#/register?code=UYDtNlCY",
    couponCode: "kkk333",
    discountSummary: "品牌资料诚图标注缺口，务实低价",
    priority: 18,
    highlightBadge: "诚实数据 · 务实稳定"
  },
  "sujie": {
    id: "sujie",
    name: "速界",
    slug: "sujie-speedworld",
    affUrl: "https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB",
    couponCode: "sss1111",
    discountSummary: "强调AI生产力工具解锁优化",
    priority: 19,
    highlightBadge: "AI工具优化 · 专线中转"
  },
  "shanyue": {
    id: "shanyue",
    name: "闪跃",
    slug: "shanyue-leap",
    affUrl: "https://vip02.flashleapaff.com/#/?code=3lgzm9mm",
    couponCode: "shanyue",
    discountSummary: "24元150GB，大带宽出口节点",
    priority: 20,
    highlightBadge: "24元150GB · 亚太节点"
  },
  "quanqiu": {
    id: "quanqiu",
    name: "全球云",
    slug: "quanqiu-cloud",
    affUrl: "https://guangs.gcvipaff.com/#/?code=Ov2nvU9C",
    couponCode: "qqy7777",
    discountSummary: "2026新品牌，提供多地区高速节点",
    priority: 21,
    highlightBadge: "多地区节点 · 稳定在线"
  },
  "shandianshu": {
    id: "shandianshu",
    name: "闪电鼠",
    slug: "shandianshu-mouse",
    affUrl: "https://qwerty.shandianshuaff.com/#/?code=rUE75iYh",
    couponCode: "sd88",
    discountSummary: "年付折合约5.6元/月 60GB，极高性价比",
    priority: 22,
    highlightBadge: "5.6元档 · IEPL专线"
  },
  "yunjiexian": {
    id: "yunjiexian",
    name: "云界线",
    slug: "yunjiexian-border",
    affUrl: "https://qwerty.yunjiexianaff.com/?code=HBaZ91c6",
    couponCode: "yjx888",
    discountSummary: "5.6元极简轻量，IEPL专线+VLESS",
    priority: 23,
    highlightBadge: "5.6元轻量 · VLESS"
  },
  "liulianyun": {
    id: "liulianyun",
    name: "榴莲云",
    slug: "liulian-cloud",
    affUrl: "https://qwerty.liulianyunaff.com#/?code=hS5pvbfE",
    couponCode: "ll88",
    discountSummary: "5.6元入门，季付及以上7折",
    priority: 24,
    highlightBadge: "5.6元预算友好"
  },
  "shenxing": {
    id: "shenxing",
    name: "神行加速",
    slug: "shenxing-speed",
    affUrl: "https://qwerty.shenxingaff.com/#/?code=gawDQqVE",
    couponCode: "xs0077",
    discountSummary: "年付约14元/月 120GB，新用户7折",
    priority: 25,
    highlightBadge: "14元120GB中阶推荐"
  },
  "huanqiuti": {
    id: "huanqiuti",
    name: "环球梯",
    slug: "huanqiuti-ladder",
    affUrl: "https://qwerty.huanqiutiaff.com/?code=9I4KRNPH",
    couponCode: "HQ66",
    discountSummary: "5.6元IEPL+VLESS方案，季付以上7折",
    priority: 26,
    highlightBadge: "5.6元方案 · VLESS"
  },
  "yinxingren": {
    id: "yinxingren",
    name: "隐形人",
    slug: "yinxingren-invisible",
    affUrl: "https://yinxingren1.invisibleaff.com/#/?code=kcyEeoJT",
    couponCode: "yxr888",
    discountSummary: "IPLC专线直连，自带免配客户端（不支持第三方订阅）",
    priority: 27,
    highlightBadge: "IPLC专线 · 独占客户端"
  },
  "tiziyun": {
    id: "tiziyun",
    name: "梯子云",
    slug: "tizi-cloud",
    affUrl: "https://tiziyun3.ladderaff.com/#/?code=7EmnpHs0",
    couponCode: "tiziyun",
    discountSummary: "自研客户端+通用订阅双支持，2Gbps独立带宽",
    priority: 28,
    highlightBadge: "双模式支持 · 2Gbps带宽"
  },
  // Top 29~42 (历史资料与后排梯队)
  "wgetcloud": {
    id: "wgetcloud",
    name: "WgetCloud",
    slug: "wgetcloud-proxy",
    affUrl: "https://invite.wgetcloud.ltd/auth/register?code=VLG2xb",
    discountSummary: "精品专线服务，高质量亚太节点覆盖",
    priority: 29,
    highlightBadge: "历史精品专线 · 待核实"
  },
  "baiyueguang": {
    id: "baiyueguang",
    name: "白月光",
    slug: "baiyueguang-cloud",
    affUrl: "https://sibker.com/register?invite_code=gg6puAId",
    discountSummary: "季付66元100GB，亚洲近端多节点",
    priority: 30,
    highlightBadge: "季付66元 · 历史记录"
  },
  "flyingbird": {
    id: "flyingbird",
    name: "FlyingBird",
    slug: "flyingbird-fly",
    affUrl: "https://flyingbird.run",
    couponCode: "theo",
    discountSummary: "老牌全专线IPLC，无倍率不限速",
    priority: 31,
    highlightBadge: "全专线IPLC · 历史记录"
  },
  "cyberguard": {
    id: "cyberguard",
    name: "CyberGuard",
    slug: "cyberguard-vpn",
    affUrl: "https://cyberguard.best/#/register?code=AxXNNYng",
    discountSummary: "月付32元350GB，多国节点与不限时包",
    priority: 32,
    highlightBadge: "月付32元350GB · 待核实"
  },
  "longmaoyun": {
    id: "longmaoyun",
    name: "龙猫云",
    slug: "longmao-cloud",
    affUrl: "https://longmaoyun.cc",
    discountSummary: "SS+IPLC全专线，最高2000Mbps宣称",
    priority: 33,
    highlightBadge: "SS+IPLC · 待核实"
  },
  "fatcat": {
    id: "fatcat",
    name: "FATCAT (肥猫云)",
    slug: "fatcat-cloud",
    affUrl: "https://fatcat.run",
    discountSummary: "企业级IEPL/IPLC内网专线",
    priority: 34,
    highlightBadge: "IEPL内网专线 · 待核实"
  },
  "tntcloud": {
    id: "tntcloud",
    name: "TNTCloud",
    slug: "tntcloud-speed",
    affUrl: "https://tntcloud.best",
    couponCode: "TNT85",
    discountSummary: "IPLC内网专线，季付限量包",
    priority: 35,
    highlightBadge: "IPLC专线 · 待核实"
  },
  "qingyunti": {
    id: "qingyunti",
    name: "青云梯",
    slug: "qingyunti-ladder",
    affUrl: "https://qingyunti.top",
    couponCode: "qyt85",
    discountSummary: "运营6年老牌，SS+企业级IPLC",
    priority: 36,
    highlightBadge: "6年老牌 · 待核实"
  },
  "shanshuiyun": {
    id: "shanshuiyun",
    name: "山水云",
    slug: "shanshui-cloud",
    affUrl: "https://sldm1.ssyylf.com/#/register?code=YD5iQ888",
    discountSummary: "月付15元100GB，年付88元64GB/月",
    priority: 37,
    highlightBadge: "月付15元 · 待核实"
  },
  "lingdongyun": {
    id: "lingdongyun",
    name: "灵动云",
    slug: "lingdong-cloud",
    affUrl: "https://varnexa.lingdongaff.com/#/?code=wZvEhEoI",
    discountSummary: "2025新开IEPL专线，VLESS协议",
    priority: 38,
    highlightBadge: "VLESS专线 · 待核实"
  },
  "langwang": {
    id: "langwang",
    name: "浪网",
    slug: "langwang-net",
    affUrl: "https://varnexa.wavenetaff.com/#/?code=xwAM4tTd",
    discountSummary: "IEPL专线，商业与进阶多层级",
    priority: 39,
    highlightBadge: "IEPL专线 · 待核实"
  },
  "edgenova": {
    id: "edgenova",
    name: "EdgeNova",
    slug: "edgenova-cloud",
    affUrl: "https://work.edgenovaaff.cc/#/register?code=cl3iB5YG",
    couponCode: "TH888",
    discountSummary: "高速直连/IPLC多线路自动分配",
    priority: 40,
    highlightBadge: "多线路调度 · 待核实"
  },
  "yinghuochong": {
    id: "yinghuochong",
    name: "萤火虫",
    slug: "yinghuochong-firefly",
    affUrl: "https://vip02.fireflyaff.com/#/?code=jTp9wSgZ",
    couponCode: "firefly",
    discountSummary: "IPLC + VLESS原生IP，不限速不限设备",
    priority: 41,
    highlightBadge: "IPLC + VLESS · 待核实"
  },
  "sslar": {
    id: "sslar",
    name: "sslar",
    slug: "sslar-net",
    affUrl: "https://sslar.run",
    couponCode: "ko3eTt0w",
    discountSummary: "企业级IEPL+多线BGP，自研客户端与远程协助",
    priority: 42,
    highlightBadge: "企业级BGP · 待核实"
  }
};
