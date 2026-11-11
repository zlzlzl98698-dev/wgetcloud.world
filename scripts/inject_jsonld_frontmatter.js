const fs = require('fs');
let content = fs.readFileSync('docs/index.md', 'utf8');

const jsonLdStr = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://wgetcloud.world/#website",
      "url": "https://wgetcloud.world/",
      "name": "wget博客",
      "description": "2026 专业网络代理与跨境基础设施实测站",
      "publisher": {
        "@type": "Organization",
        "name": "wget博客实测实验室",
        "url": "https://wgetcloud.world/"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://wgetcloud.world/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "什么是 IEPL 物理专线？它为什么比普通公网中转贵？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IEPL（国际以太网专线）是通过物理光缆直接连接境内境外的二层点对点专享电路，不经公网审查，具有零丢包、超低抖动的优势，物理租用成本是公网宽带的数十倍。"
          }
        },
        {
          "@type": "Question",
          "name": "为什么我的节点在白天秒开 4K，一到晚上 8 点就频繁卡顿？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "因为节点使用的是普通公网直连中转，晚高峰国际出口容量严重超载，运营商会实施 QoS 限速与丢包惩罚。建议选用全程物理专线的机场如光速云。"
          }
        },
        {
          "@type": "Question",
          "name": "为什么使用 ChatGPT 会遇到 Error 1020 Access Denied？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "因为出口 IP 为机房托管 IP 且被万人共用，被 Cloudflare 和 OpenAI 标记为高欺诈分。解决办法是选用原生住宅出口或干净专线策略组。"
          }
        },
        {
          "@type": "Question",
          "name": "2026 年综合性价比最高的机场是哪一家？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "在全网 42 家主流机场横评中，光速云凭借 IEPL 专线+企业内网双架构、VLESS 协议支持及专属优惠码 AMM 折后约 8 元/月的价格，综合实测权重位居第一主推首位。"
          }
        }
      ]
    }
  ]
});

const frontmatterTarget = 'description: wget博客收录全网42家主流机场，基于9Gbps核心骨干网与自动化压测套件，提供晚高峰真实延迟带宽、IEPL/IPLC内网专线全景分析、AI与流媒体解锁深度实测及跨平台客户端配置SOP。';
const headSnippet = `head:
  - - script
    - type: application/ld+json
    - '${jsonLdStr.replace(/'/g, "\\'")}'`;

if (content.includes(frontmatterTarget)) {
  content = content.replace(frontmatterTarget, frontmatterTarget + '\n' + headSnippet);
  fs.writeFileSync('docs/index.md', content, 'utf8');
  console.log('Injected JSON-LD into frontmatter head!');
} else {
  console.log('Frontmatter target not found');
}
