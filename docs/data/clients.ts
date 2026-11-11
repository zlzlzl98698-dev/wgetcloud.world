// docs/data/clients.ts
// 2026 跨平台机场代理客户端知识库

export interface ClientItem {
  name: string;
  platform: "Windows" | "Android" | "iOS" | "macOS" | "Linux" | "OpenWrt";
  coreKernel: string;
  features: string;
  downloadUrl: string;
  isRecommended: boolean;
  notes?: string;
}

export const CLIENTS_DATA: ClientItem[] = [
  // Windows
  {
    name: "Clash Verge Rev",
    platform: "Windows",
    coreKernel: "Mihomo (Clash Meta)",
    features: "订阅管理、高级规则分流、TUN 虚拟网卡模式、极简现代界面，当前 Windows 主流推荐",
    downloadUrl: "https://github.com/clash-verge-rev/clash-verge-rev/releases",
    isRecommended: true
  },
  {
    name: "v2rayN",
    platform: "Windows",
    coreKernel: "Xray / sing-box",
    features: "经典多协议管理器，支持 VLESS、Trojan、Shadowsocks 等，节点参数高度可控",
    downloadUrl: "https://github.com/2dust/v2rayN/releases",
    isRecommended: true
  },
  {
    name: "FlClash",
    platform: "Windows",
    coreKernel: "Mihomo",
    features: "基于 Flutter 构建的现代化跨平台客户端，简洁流畅",
    downloadUrl: "https://github.com/chen08209/FlClash/releases",
    isRecommended: false
  },
  {
    name: "Hiddify",
    platform: "Windows",
    coreKernel: "sing-box",
    features: "全协议自动智能优选、一键连接、远程配置，适合新手",
    downloadUrl: "https://github.com/hiddify/hiddify-next/releases",
    isRecommended: false
  },

  // Android
  {
    name: "v2rayNG",
    platform: "Android",
    coreKernel: "Xray",
    features: "安卓端老牌轻量级神器，直接扫码导入订阅与单节点，稳定省电",
    downloadUrl: "https://github.com/2dust/v2rayNG/releases",
    isRecommended: true
  },
  {
    name: "Clash Meta for Android (CMFA)",
    platform: "Android",
    coreKernel: "Mihomo",
    features: "规则分流、UI 现代，支持复杂策略组与分应用代理",
    downloadUrl: "https://github.com/MetaCubeX/ClashMetaForAndroid/releases",
    isRecommended: true
  },
  {
    name: "FlClash",
    platform: "Android",
    coreKernel: "Mihomo",
    features: "全平台一致的操作体验，支持快速切换节点",
    downloadUrl: "https://github.com/chen08209/FlClash/releases",
    isRecommended: false
  },
  {
    name: "Karing",
    platform: "Android",
    coreKernel: "sing-box",
    features: "跨平台轻量配置，针对新手优化了规则导入",
    downloadUrl: "https://github.com/KaringX/karing/releases",
    isRecommended: false
  },

  // iOS
  {
    name: "Shadowrocket (小火箭)",
    platform: "iOS",
    coreKernel: "自研多协议引擎",
    features: "性价比最高（美区 $2.99），功能全面，支持规则覆写、抓包与自动化节点测试",
    downloadUrl: "https://apps.apple.com/us/app/shadowrocket/id932747118",
    isRecommended: true,
    notes: "需非中国大陆 Apple ID 登录 App Store 下载"
  },
  {
    name: "Stash",
    platform: "iOS",
    coreKernel: "Clash 兼容引擎",
    features: "iOS 上的 Clash 最佳替代品，完美解析 Clash YAML 配置文件，支持策略组切换",
    downloadUrl: "https://apps.apple.com/us/app/stash/id1596063349",
    isRecommended: true,
    notes: "付费应用，约 $3.99"
  },
  {
    name: "Quantumult X (圈 X)",
    platform: "iOS",
    coreKernel: "自研引擎",
    features: "高阶玩家首选，支持强大的 JavaScript 脚本重写、MitM 证书解密与细粒度分流",
    downloadUrl: "https://apps.apple.com/us/app/quantumult-x/id1453996533",
    isRecommended: false
  },
  {
    name: "Surge 5",
    platform: "iOS",
    coreKernel: "专业网络调试引擎",
    features: "网络协议栈分析与高端网络调试器，企业与高阶技术人员标配",
    downloadUrl: "https://apps.apple.com/us/app/surge-5/id1442620678",
    isRecommended: false
  },

  // macOS
  {
    name: "Clash Verge Rev (Mac)",
    platform: "macOS",
    coreKernel: "Mihomo",
    features: "完美原生适配 Apple Silicon (M1/M2/M3/M4) 与 Intel 架构，开启增强模式接管系统全局流量",
    downloadUrl: "https://github.com/clash-verge-rev/clash-verge-rev/releases",
    isRecommended: true
  },
  {
    name: "Surge for Mac",
    platform: "macOS",
    coreKernel: "Surge 核心",
    features: "Mac 平台网络调试终极利器，支持网关模式与高级路由器接管",
    downloadUrl: "https://nssurge.com/",
    isRecommended: false
  },

  // Linux
  {
    name: "Clash Verge Rev (Linux)",
    platform: "Linux",
    coreKernel: "Mihomo",
    features: "提供 AppImage / Deb / RPM 完整安装包，带图形化界面，操作与 Win/Mac 完全一致",
    downloadUrl: "https://github.com/clash-verge-rev/clash-verge-rev/releases",
    isRecommended: true
  },
  {
    name: "v2rayA",
    platform: "Linux",
    coreKernel: "Xray",
    features: "基于 Web UI 的 Linux 透明代理客户端，极适合服务器或无图形界面的工控机",
    downloadUrl: "https://github.com/v2rayA/v2rayA/releases",
    isRecommended: true
  },

  // OpenWrt / 软路由
  {
    name: "OpenClash",
    platform: "OpenWrt",
    coreKernel: "Mihomo",
    features: "家庭网络网关级透明代理，全屋所有设备（手机/电脑/电视盒子/游戏机）免配置自动翻墙",
    downloadUrl: "https://github.com/vernesong/OpenClash/releases",
    isRecommended: true
  }
];
