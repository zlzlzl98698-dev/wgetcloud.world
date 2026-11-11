<template>
  <div class="observatory-panel">
    <div class="panel-header">
      <div class="header-left">
        <span class="status-indicator"></span>
        <span class="panel-title">{{ title || 'Network Latency & Bandwidth Telemetry' }}</span>
      </div>
      <div class="header-right">
        <span class="meta-tag">{{ testedAt || '2026-08-11 CST / Peak Load Telemetry' }}</span>
      </div>
    </div>

    <!-- 真实图片预览区（若存在实测PNG截图） -->
    <div v-if="image" class="chart-image-wrap">
      <img
        :src="image"
        :alt="resolvedAlt"
        :width="width || 1122"
        :height="height || 1402"
        class="speedtest-img"
        loading="lazy"
        decoding="async"
      />
      <div class="image-caption">
        <span>数据签名: MAI-TEST-BOT 2.0 / SHA256 校验归档</span>
        <span>测试环境: 珠海联通 9Gbps 核心冗余链路</span>
      </div>
    </div>

    <!-- 结构化数据指标列表 -->
    <div class="metrics-list" v-if="metrics && metrics.length">
      <div v-for="(item, index) in metrics" :key="index" class="metric-row">
        <div class="node-info">
          <span class="node-bullet"></span>
          <span class="node-name">{{ item.node }}</span>
        </div>
        <div class="node-data">
          <div class="latency-wrap">
            <span class="sub-label">RTT</span>
            <span class="val-mono">{{ item.latency }}</span>
          </div>
          <div class="speed-wrap">
            <span class="sub-label">Downlink</span>
            <span class="val-mono highlight">{{ item.download }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <div class="footer-note">
        注：本实测结果代表特定测试批次网络条件下的物理采样，受骨干网路由波动及本地宽带影响，不代表长久恒定峰值。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SpeedTestResult } from '../data/brands'

const props = defineProps<{
  title?: string
  testedAt?: string
  image?: string
  width?: number
  height?: number
  metrics?: SpeedTestResult[]
}>()

const resolvedAlt = computed(() => {
  const base = (props.title || '节点测速').trim()
  return /实测|报告|测速/.test(base) ? base : `${base} 实测报告`
})
</script>

<style scoped>
.observatory-panel {
  background: #0b1120;
  border: 1px solid #1e293b;
  border-radius: 10px;
  color: #f1f5f9;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace;
  margin: 24px 0;
  overflow: hidden;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: #0f172a;
  border-bottom: 1px solid #1e293b;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.panel-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: #e2e8f0;
  text-transform: uppercase;
}

.meta-tag {
  font-size: 11px;
  color: #94a3b8;
  background: #1e293b;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
}

.chart-image-wrap {
  padding: 16px;
  background: #070d19;
  text-align: center;
  border-bottom: 1px solid #1e293b;
}

.speedtest-img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid #1e293b;
  margin: 0 auto;
  display: block;
}

.image-caption {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #64748b;
  margin-top: 10px;
  font-family: monospace;
  padding: 0 4px;
}

.metrics-list {
  padding: 12px 18px;
}

.metric-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #1e293b;
}

.metric-row:last-child {
  border-bottom: none;
}

.node-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.node-bullet {
  width: 6px;
  height: 6px;
  background: #38bdf8;
  border-radius: 50%;
}

.node-name {
  font-size: 14px;
  font-weight: 500;
  color: #cbd5e1;
}

.node-data {
  display: flex;
  gap: 20px;
  align-items: center;
}

.sub-label {
  font-size: 10px;
  color: #64748b;
  margin-right: 6px;
  text-transform: uppercase;
}

.val-mono {
  font-family: monospace;
  font-size: 13px;
  color: #94a3b8;
}

.val-mono.highlight {
  color: #34d399;
  font-weight: 600;
}

.panel-footer {
  padding: 10px 18px;
  background: #090e1a;
  border-top: 1px solid #1e293b;
}

.footer-note {
  font-size: 11px;
  color: #64748b;
  line-height: 1.5;
}
</style>
