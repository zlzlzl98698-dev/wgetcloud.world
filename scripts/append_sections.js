const fs = require('fs');
let content = fs.readFileSync('docs/index.md', 'utf8');

const additionalSection = `
---

## 🛠️ 跨境网络代理五步极速排障 SOP（工程级排错指南）

在实际使用科学上网客户端的过程中，即使选用了优质专线机场，本地系统环境的突发异常也可能导致“无法联网”、“连接超时”或“DNS 解析失败”。评测实验室总结了以下五步标准化排障路径，助您在 2 分钟内精准定位并解决问题：

### 步骤一：系统时间同步校验（90 秒偏差红线）
- **故障现象**：客户端日志疯狂报错 \`certificate has expired\` 或 \`handshake failed\`，所有节点全部显示 Timeout 超时。
- **底层原理**：现代加密协议（包括 VMess、Trojan 及 TLS 1.3）要求客户端与服务端时间误差必须严格保持在 90 秒以内。一旦由于主板 CMOS 电池没电或时区切换导致时间偏差，TLS 握手校验将直接被服务端强制阻断。
- **排障操作**：在 Windows 设置中进入“时间和语言” -> 点击“立即同步”；macOS 执行 \`sudo sntp -sS time.apple.com\` 立即校准本地硬件时间。

### 步骤二：端口冲突与系统代理清理（7890 端口占用）
- **故障现象**：启动 Clash 或 Sing-box 时提示 \`bind: address already in use\` 或浏览器无论打开任何网页均报错 \`ERR_PROXY_CONNECTION_FAILED\`。
- **底层原理**：上一次非正常关机或第三方软件（如其他旧版代理软件、抓包工具 Fiddler）崩溃，导致系统代理残留指向了已经关闭的本地端口，或者本地 7890 端口被残留进程霸占。
- **排障操作**：
  1. Windows 按下 Win + R 输入 \`inetcpl.cpl\`，进入“连接” -> “局域网设置”，取消勾选“为 LAN 使用代理服务器”；
  2. 打开 PowerShell 执行 \`netstat -ano | findstr 7890\`，查出占用端口的 PID，并执行 \`taskkill /F /PID <PID>\` 释放端口。

### 步骤三：本地 DNS 污染与 Fake-IP 缓存清除
- **故障现象**：国内网站秒开，但海外网站无法解析；或者在切换机场订阅后，访问特定海外域名一直转圈。
- **底层原理**：系统或浏览器的 DNS 缓存依然记录着旧节点解析失败的脏数据；或 Clash 的 Fake-IP 映射池（198.18.0.0/16）未及时刷新。
- **排障操作**：
  - Windows 执行：\`ipconfig /flushdns\` 刷新系统 DNS 解析缓存；
  - 浏览器地址栏访问：\`chrome://net-internals/#dns\` 点击 \`Clear host cache\`；
  - 在 Clash 控制台首页点击“重启内核”或切换策略组为 Direct 再切回 Proxy。

### 步骤四：TUN 模式虚拟网卡路由优先级修复
- **故障现象**：开启 TUN 模式后电脑彻底断网，连国内局域网路由器管理后台（192.168.1.1）都无法打开。
- **底层原理**：TUN 虚拟网卡安装时，未能正确获取网卡接口跃点数（Metric），导致默认网关发生死循环或流量死锁。
- **排障操作**：
  1. 在 Clash Verge Rev 的“通用设置”中，重新安装 \`Service Mode (服务模式)\` 并授予系统管理员最高权限；
  2. 启用“严格路由（Strict Route）”开关，防止流量环路；
  3. 确认已开启 \`Bypass Direct Domains\`，确保局域网与国内直连流量不经由 TUN 网卡中转。

### 步骤五：策略组兜底与节点分流测试
- **故障现象**：部分网站（如 Google Scholar 或特定跨国小众站点）打不开，而 YouTube 播放正常。
- **底层原理**：机场订阅自带的分流规则集（Rule-Set）未能及时涵盖该网站的新增子域名，流量默认跌入了被屏蔽的 DIRECT（直连）分支。
- **排障操作**：
  - 打开 Clash 规则页面，检查 \`MATCH\` 或 \`FINAL\` 兜底规则绑定的策略组是否为 PROXY；
  - 在“连接”页面实时查看该网站发起的域名请求，手动将其添加到自定义用户分流规则中：\`DOMAIN-SUFFIX,domain.com,PROXY\`。

---

## ⚖️ 科学上网技术自律与出海合规边界

技术本身中立，但使用必须恪守底线。作为专注于网络代理基础设施与网络技术评测的专业平台，wget博客郑重倡议：

1. **坚持学术科研与跨境商业合法用途**：科学上网技术应当严格限定用于合法查阅海外科技文献（arXiv、IEEE、Google Scholar）、开源代码仓库（GitHub、GitLab）、跨境合规电商运营（Amazon、Shopify）及海外合规营销等正当生产力领域。
2. **严禁用于任何违法违规有害行为**：坚决反对利用跨境代理通道从事任何危害国家安全、侵犯他人隐私、金融诈骗、暗网交易、恶意网络攻击或传播违法虚假信息的非正当行径。
3. **强化端到端信息安全与隐私意识**：避免在未受信任的公共节点或低端机场中传输重要敏感凭证；重要商业数据应始终在应用层叠加端到端高强度加密（如 SSH 密钥、GPG 加密、企业级专有 VPN 隧道）。
`;

const targetIndex = content.indexOf('## 🌐 六大核心技术专题：蜂巢式全景知识图谱');
if (targetIndex !== -1) {
  content = content.slice(0, targetIndex) + additionalSection + '\n' + content.slice(targetIndex);
  fs.writeFileSync('docs/index.md', content, 'utf8');
  console.log('Successfully injected additional sections!');
} else {
  console.log('Target heading not found');
}
