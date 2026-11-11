// scripts/mega_expand_clients.js
const fs = require('fs');
const path = require('path');

const clientGuides = [
  // 1. clash-verge-rev-guide.md
  {
    path: 'docs/clients/clash-verge-rev-guide.md',
    title: 'Clash Verge Rev 核心配置与实战进阶全景指南 (Win/Mac/Linux 2026)',
    desc: '2026最具人气的开源跨平台代理客户端 Clash Verge Rev 详尽手册：Mihomo 内核优势、TUN 增强模式安装、Merge 扩展脚本编写及多策略组调优。',
    directAnswer: '<strong>Clash Verge Rev</strong> 是目前开源社区中最活跃、最推荐的桌面代理软件。它基于 Tauri 框架打造，替代了早已停止维护的 Clash for Windows。其搭载的 <strong>Mihomo (Clash Meta) 内核</strong> 完整支持 VLESS Reality、Hysteria 2 与 TUIC 等现代协议。其最大的优势是内置一键式 <strong>Wintun 虚拟网卡驱动</strong>，配合灵活的预处理扩展脚本（Script/Merge），能实现企业级细粒度流量分流与绝对防 DNS 泄漏。',
    content: `
## 一、 为什么必须彻底淘汰旧版 Clash for Windows (CFW)？

在 2026 年，继续使用历史遗留的 Clash for Windows 存在三大致命隐患：

\`\`\`
【旧版 Clash for Windows (CFW) 核心瓶颈】
 ├─ 1. 内核永久停滞在 2023 年 ────▶ 完全无法解析 VLESS Reality、Hysteria 2、TUIC 现代协议
 ├─ 2. Electron 历史安全漏洞 ────▶ 存在远程代码执行 (RCE) 风险，易遭中间人挂马
 └─ 3. 内存与 CPU 资源开销极大 ──▶ 空载内存占用高达 400MB~800MB

【现代 Clash Verge Rev 核心升级优势】
 ├─ 1. 基于 Rust + Tauri 轻量化打造 ─▶ 待机内存开销降低 70% (仅 60MB~120MB)
 ├─ 2. 内置官方维护的 Mihomo 内核 ──▶ 协议兼容性与加密吞吐能效天花板
 └─ 3. 原生集成 Wintun 虚拟网卡驱动 ─▶ 一键开启全局系统级接管，游戏联机零丢包
\`\`\`

---

## 二、 核心进阶实战：TUN 模式与系统 DNS 接管防泄漏

很多用户开启了代理后，命令行、Git、终端脚本以及部分 UWP 应用依然无法翻墙，甚至在访问海外时发生了本地运营商 DNS 污染泄漏。

### 1. 安装与激活 Wintun 服务模式
1. 打开 Clash Verge Rev，进入左侧 **「设置 (Settings)」** 页面。
2. 找到 **「服务模式 (Service Mode)」**，点击右侧的 **「安装 (Install)」**。安装成功后，服务模式左侧将亮起绿色盾牌指示灯。
3. 找到 **「TUN 模式 (TUN Mode)」** 开关并开启。
4. **内核堆栈 (Stack)** 选型：
   * **Mixed（推荐）**：兼顾极致性能与绝大多数应用程序兼容性。
   * **gVisor**：完全在用户态实现 TCP/IP 协议栈，安全性最高，适合对网络隔离要求极高的开发者。

### 2. DNS 进阶配置与 Fake-IP 防污染
在配置文件或扩展设置中，确保 DNS 配置保持以下黄金参数：

\`\`\`yaml
dns:
  enable: true
  listen: :1053
  ipv6: false
  default-nameserver:
    - 223.5.5.5
    - 119.29.29.29
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  fake-ip-filter:
    - "*.lan"
    - "localhost.ptlogin2.qq.com"
  nameserver:
    - https://dns.alidns.com/dns-query
    - https://doh.pub/dns-query
  fallback:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query
    - tls://dns.google
\`\`\`

---

## 三、 Merge 预处理扩展脚本：订阅更新时保留自定义分流

许多用户希望在每次机场订阅自动更新时，依然保留自己添加的局域网直连或特定海外工具分流规则，使用「订阅扩展配置 (Merge)」即可实现：

\`\`\`yaml
# 在 Clash Verge Rev 扩展配置中新建 Merge 脚本
prepend-rules:
  # 强制自建公司内网走直连
  - DOMAIN-SUFFIX,company.internal,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT

  # 强制特定高吞吐开发接口走低延迟专线
  - DOMAIN-SUFFIX,github.com,🚀 节点选择
  - DOMAIN-SUFFIX,huggingface.co,🚀 节点选择

  # 拦截恶意分析统计追踪
  - DOMAIN-KEYWORD,telemetry,REJECT
\`\`\`

点击保存后，每次右键更新机场订阅，Clash Verge Rev 会自动将上述规则无缝插入到配置文件的最顶部，无需反复手动修改！
`
  },

  // 2. openclash-router-guide.md
  {
    path: 'docs/clients/openclash-router-guide.md',
    title: 'OpenClash 软路由家庭与企业全屋代理接管实战手册 (2026)',
    desc: '从 x86 工控机软路由到 MT798x 路由器固件：Redir-Host 与 Fake-IP 模式选型、Dnsmasq 转发防环路、Apple TV 4K 局域网旁路分流与全屋零配置翻墙。',
    directAnswer: '<strong>OpenClash</strong> 是在 OpenWrt 软路由上实现“全屋所有设备免配置科学上网”的终极神器。核心运行逻辑：通过 iptables/nftables 将路由器局域网流量透明重定向至内部 Mihomo 内核。<strong>模式选型铁律：</strong>家庭游戏与日常多媒体设备推荐选用 <strong>Fake-IP (TUN 混合模式)</strong>，解析速度最快；若内网部署有群晖 NAS、HomeAssistant 或自建 DNS 服务器，推荐选用 <strong>Redir-Host 兼容模式</strong>，避免局域网 IP 嗅探错位。',
    content: `
## 一、 软路由在家庭网络中的两大主流拓扑

在家庭千兆宽带网络中，部署 OpenClash 主要有两种主流物理接线拓扑：

\`\`\`
【拓扑 A：主路由全局接管模式 (最省心)】
光猫 (桥接) ──▶ x86 工控机软路由 (OpenClash 拨号 + DHCP) ──▶ 局域网交换机 / AP ──▶ 全屋手机/电脑/Apple TV
[优势: 全屋所有智能设备连上 Wi-Fi 即可自动科学上网，单设备零配置]

【拓扑 B：旁路由 (旁路网关) 模式 (最安全)】
光猫/硬路由 (负责拨号与主DHCP) ──┬──▶ 普通日常设备 (网关指向硬路由，纯国内直连)
                                 │
                                 └──▶ 软路由 (运行 OpenClash，IP: 192.168.1.2)
                                        ▲
                                        └── 需要出海的设备 (手动将网关与 DNS 设为 192.168.1.2)
[优势: 软路由重启或更新时，全屋智能家居网络完全不受影响，主网永不瘫痪]
\`\`\`

---

## 二、 Fake-IP 与 Redir-Host 模式选型决断

| 评估维度 | Fake-IP 模式 (增强模式) | Redir-Host 模式 (传统兼容模式) |
| :--- | :--- | :--- |
| **DNS 解析速度** | **0-RTT (路由器直接返回假 IP 198.18.x.x，秒开网页)** | 需等待境外代理节点返回真实 IP 后才建立连接 |
| **家庭游戏联机 (Switch/PS5)** | 极佳（配合 FullCone NAT 极低延迟） | 良好 |
| **局域网 NAS / 打印机兼容** | 需配置 fake-ip-filter 过滤局域网域名 | **完美原生支持**（无任何 IP 劫持干扰）|
| **适用网络场景** | 客厅影音、日常手机电脑上网、全屋无感翻墙 | 企业自建域控网络、复杂内网运维、群晖 NAS 自动化部署 |

---

## 三、 防 DNS 环路与 Dnsmasq 优化配置

在 OpenClash「高级设置」中，有两项关键开关直接决定了网络稳定性：
1. **本地 DNS 劫持**：务必选择 **「使用 Dnsmasq 转发」**。
2. **禁止 Dnsmasq 缓存**：勾选开启，避免软路由内存中的过期 DNS 记录破坏动态分流。
3. **WAN 口 DNS 锁定**：在 OpenWrt「网络 -> 接口 -> WAN」中，关闭“使用对端分配的 DNS”，手动指定为 \`223.5.5.5\` 和 \`119.29.29.29\`。
`
  },

  // 3. v2rayn-windows-tutorial.md
  {
    path: 'docs/clients/v2rayn-windows-tutorial.md',
    title: 'v2rayN Windows 进阶排错与双内核实战指南 (2026)',
    desc: '从 Xray-core 与 Sing-box 双内核切换、自动配置系统代理、自定义路由规则到解决 TUN 虚拟网卡闪退的 Windows 必备排错教程。',
    directAnswer: '<strong>v2rayN</strong> 是 Windows 系统上生命周期最长、兼容性最强烈的经典开源代理客户端。它支持一键在 <strong>Xray-core</strong> 与 <strong>Sing-box core</strong> 之间无缝热切换。实操黄金法则：<strong>1. 优先使用 Sing-box 内核运行 VLESS Reality 与 Hysteria 2 节点；2. 遇到软件闪退或节点全红，优先以管理员身份运行并安装 .NET 8.0 运行时；3. 勾选底部「启用系统代理」并将路由设为「绕过大陆 (Whitelist)」</strong>。',
    content: `
## 一、 v2rayN 核心架构与双内核选型建议

现代 v2rayN 已经彻底摆脱了早期只能跑 Shadowsocks / VMess 的局限，通过集成两大顶级底层内核，实现了全协议支持：

\`\`\`
                    【v2rayN GUI 桌面操作界面】
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
       【Xray-core 内核】              【Sing-box core 内核】
  • 适合 VMess、VLESS XTLS 经典协议  • 适合 VLESS Reality、Hysteria 2、TUIC
  • 社区沉淀时间长，配置极其成熟     • 现代加密算法能效比极高，内存开销极小
\`\`\`

---

## 二、 常见疑难排错清单（Windows 专属）

### 1. 节点测速全显示 -1 / Timeout
* **原因 A：未安装必要系统运行库**。v2rayN 基于 WPF 打造，必须安装微软官方提供的 **.NET Desktop Runtime 8.0 (x64)**。
* **原因 B：系统时间严重偏差**。VMess 与 VLESS 握手时要求客户端系统时间与服务端误差不得超过 90 秒。进入 Windows 设置 ->「时间和语言」-> 点击「立即同步」。

### 2. 浏览器打不开网页，关闭 v2rayN 后彻底断网
* **原因**：v2rayN 退出时未能正常清理 Windows 注册表中的系统代理项。
* **修复方法**：打开 Windows 设置 ->「网络和 Internet」->「代理」-> 确保「使用代理服务器」开关为 **关 (Off)**，并将「自动检测设置」重新开启。
`
  }
];

clientGuides.forEach(art => {
  const fullPath = path.join(__dirname, '../', art.path);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileContent = `---
title: ${art.title}
description: ${art.desc}
---

# ${art.title}

<div class="geo-direct-answer">
  <div class="geo-title">
    <span>💡</span> <strong>核心结论与快速解答 (GEO / AEO Direct Answer)</strong>
  </div>
  <p>${art.directAnswer}</p>
</div>

${art.content}

---

<div class="honeycomb-links-box">
  <h4>🔗 关联技术专题与核心推荐</h4>
  <div class="honeycomb-grid">
    <a href="/brands/lightspeed-cloud" class="honeycomb-link">⭐ 主推：光速云万字评测</a>
    <a href="/brands/" class="honeycomb-link">📋 42 家机场品牌测速总库</a>
    <a href="/clients/stash-macos-ios" class="honeycomb-link">🍏 Stash Mac/iOS 策略组全解</a>
    <a href="/clients/clash-verge-rev-guide" class="honeycomb-link">💻 Clash Verge Rev 进阶手册</a>
    <a href="/clients/openclash-router-guide" class="honeycomb-link">📡 OpenClash 全屋软路由接管</a>
    <a href="/network/iepl-vs-iplc" class="honeycomb-link">⚡ 物理专线与低丢包原理</a>
  </div>
</div>
`;

  fs.writeFileSync(fullPath, fileContent, 'utf8');
  console.log(`Mega expanded client guide: ${art.path}`);
});

console.log('Client guides mega expansion completed!');
