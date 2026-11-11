<template>
  <div class="network-topology-container">
    <div class="topology-header">
      <span class="pulse-dot"></span>
      <span class="topo-title">Enterprise Infrastructure Path Architecture (专线架构拓扑)</span>
      <span class="sec-level">IEPL Private Relay</span>
    </div>
    <div class="topology-canvas">
      <div class="topo-step user-step">
        <div class="step-icon">💻</div>
        <div class="step-title">终端接入设备</div>
        <div class="step-desc">Windows / Mac / iOS / 软路由</div>
        <div class="step-badge">本地加密 (VLESS/SS)</div>
      </div>

      <div class="flow-arrow">
        <span class="arrow-line"></span>
        <span class="arrow-text">国内入口链路</span>
      </div>

      <div class="topo-step bgp-step">
        <div class="step-icon">🏢</div>
        <div class="step-title">国内多线 BGP 中转</div>
        <div class="step-desc">广州 / 上海 / 深圳 / 杭州</div>
        <div class="step-badge bgp">隐藏真实IP · 智能分流</div>
      </div>

      <div class="flow-arrow special-wire">
        <span class="arrow-line thick"></span>
        <span class="arrow-text highlight">IEPL / IPLC 跨境物理专线</span>
      </div>

      <div class="topo-step egress-step">
        <div class="step-icon">🌐</div>
        <div class="step-title">海外落地枢纽出口</div>
        <div class="step-desc">香港 / 日本 / 新加坡 / 美国</div>
        <div class="step-badge clean">原生住宅/BGP IP · 解锁流媒体</div>
      </div>

      <div class="flow-arrow">
        <span class="arrow-line"></span>
        <span class="arrow-text">直接访问</span>
      </div>

      <div class="topo-step target-step">
        <div class="step-icon">🎯</div>
        <div class="step-title">目标受限服务</div>
        <div class="step-desc">ChatGPT / Claude / Netflix 4K</div>
        <div class="step-badge target">0% 丢包 · 秒级握手</div>
      </div>
    </div>
    <div class="topology-footer">
      <span>线路特性：全程内网专线隧道传输，规避公网 QoS 波动与高丢包，保障高峰期 4K 持续流媒体码率。</span>
    </div>
  </div>
</template>

<style scoped>
.network-topology-container {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  color: #f8fafc;
  margin: 24px 0;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.topology-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #070d19;
  border-bottom: 1px solid #1e293b;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  display: inline-block;
  margin-right: 8px;
}

.topo-title {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
  text-transform: uppercase;
  flex: 1;
}

.sec-level {
  font-size: 11px;
  font-family: monospace;
  background: #1e293b;
  color: #38bdf8;
  padding: 2px 8px;
  border-radius: 4px;
}

.topology-canvas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 18px;
  overflow-x: auto;
  gap: 12px;
}

.topo-step {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 14px 12px;
  text-align: center;
  min-width: 140px;
  flex: 1;
}

.step-icon {
  font-size: 24px;
  margin-bottom: 6px;
}

.step-title {
  font-size: 13px;
  font-weight: 600;
  color: #f1f5f9;
  margin-bottom: 4px;
}

.step-desc {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.step-badge {
  font-size: 10px;
  background: #0f172a;
  color: #cbd5e1;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #334155;
}

.step-badge.bgp {
  color: #38bdf8;
  border-color: #0284c7;
}

.step-badge.clean {
  color: #34d399;
  border-color: #059669;
}

.step-badge.target {
  color: #a78bfa;
  border-color: #7c3aed;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.arrow-line {
  height: 2px;
  width: 100%;
  background: #475569;
  position: relative;
}

.arrow-line.thick {
  height: 4px;
  background: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
}

.arrow-text {
  font-size: 10px;
  color: #64748b;
  margin-top: 4px;
  white-space: nowrap;
}

.arrow-text.highlight {
  color: #60a5fa;
  font-weight: 600;
}

.topology-footer {
  padding: 10px 18px;
  background: #070d19;
  border-top: 1px solid #1e293b;
  font-size: 11px;
  color: #64748b;
}
</style>
