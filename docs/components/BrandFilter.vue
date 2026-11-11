<template>
  <div class="brand-filter-dashboard">
    <!-- 顶部数据状态栏 (Observatory Header) -->
    <div class="filter-header">
      <div class="header-status">
        <span class="live-dot"></span>
        <span class="status-title">WGET OBSERVATORY · 42 BRANDS REALTIME FILTER</span>
      </div>
      <div class="header-stats">
        <span class="stat-badge">收录总数: {{ BRANDS_LIST.length }}</span>
        <span class="stat-badge highlight">匹配结果: {{ filteredBrands.length }}</span>
      </div>
    </div>

    <!-- 交互控制面板 (Filter Controls) -->
    <div class="controls-panel">
      <!-- 搜索栏 -->
      <div class="search-row">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input 
            v-model="searchKeyword" 
            type="text" 
            placeholder="搜索机场名称、协议（如 VLESS）、线路特征（如 永久、IEPL）..."
            class="filter-search-input"
          />
          <button v-if="searchKeyword" @click="searchKeyword = ''" class="clear-btn">×</button>
        </div>
        <div class="view-switch-wrap">
          <button 
            :class="['switch-btn', { active: currentView === 'card' }]" 
            @click="currentView = 'card'"
            title="观测卡片视图"
          >
            📋 卡片模式
          </button>
          <button 
            :class="['switch-btn', { active: currentView === 'table' }]" 
            @click="currentView = 'table'"
            title="紧凑数据表视图"
          >
            📊 表格模式
          </button>
        </div>
      </div>

      <!-- 多维过滤标签矩阵 -->
      <div class="filter-groups">
        <!-- 线路类型 -->
        <div class="filter-row">
          <span class="filter-label">线路架构:</span>
          <div class="pill-group">
            <button 
              v-for="opt in lineTypeOptions" 
              :key="opt.value" 
              :class="['filter-pill', { active: selectedLineType === opt.value }]"
              @click="selectedLineType = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- 价格预算区间 -->
        <div class="filter-row">
          <span class="filter-label">月度预算:</span>
          <div class="pill-group">
            <button 
              v-for="opt in priceOptions" 
              :key="opt.value" 
              :class="['filter-pill', { active: selectedPrice === opt.value }]"
              @click="selectedPrice = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- 协议支持 -->
        <div class="filter-row">
          <span class="filter-label">协议类型:</span>
          <div class="pill-group">
            <button 
              v-for="opt in protocolOptions" 
              :key="opt.value" 
              :class="['filter-pill', { active: selectedProtocol === opt.value }]"
              @click="selectedProtocol = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- 解锁能力要求 -->
        <div class="filter-row">
          <span class="filter-label">解锁需求:</span>
          <div class="pill-group">
            <button 
              v-for="opt in unlockOptions" 
              :key="opt.value" 
              :class="['filter-pill', { active: selectedUnlock === opt.value }]"
              @click="selectedUnlock = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
      </div>

      <!-- 快速重置栏 -->
      <div class="filter-actions-bar" v-if="hasActiveFilters">
        <span class="active-hint">已启用复合筛选条件</span>
        <button @click="resetFilters" class="reset-all-btn">重置所有筛选</button>
      </div>
    </div>

    <!-- 结果展示区：卡片模式 -->
    <div v-if="currentView === 'card'" class="results-cards-grid">
      <div v-for="brand in filteredBrands" :key="brand.id">
        <BrandCard :brand="brand" />
      </div>
    </div>

    <!-- 结果展示区：表格模式 (Cloudflare Radar 紧凑数据表) -->
    <div v-else class="results-table-wrap">
      <table class="radar-table">
        <thead>
          <tr>
            <th>排名</th>
            <th>品牌名称</th>
            <th>线路与协议</th>
            <th>入门成本</th>
            <th>AI解锁</th>
            <th>流媒体</th>
            <th>评测数据状态</th>
            <th>专属优惠码</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brand in filteredBrands" :key="brand.id" :class="{ 'top-highlight': brand.priority <= 3 }">
            <td class="col-rank">#{{ brand.priority }}</td>
            <td class="col-name">
              <a :href="'/brands/' + brand.slug" class="brand-link">
                <strong>{{ brand.name }}</strong>
              </a>
              <span v-if="brand.priority === 1" class="top-tag">首选主推</span>
            </td>
            <td class="col-line">
              <div class="line-badge">{{ brand.protocols.join('/') }}</div>
              <div class="sub-line">{{ brand.lineType }}</div>
            </td>
            <td class="col-price">{{ brand.entryPrice }}</td>
            <td class="col-unlock">
              <span :class="['mini-tag', getUnlockClass(brand.unlockStatus.chatgpt)]">
                GPT: {{ brand.unlockStatus.chatgpt }}
              </span>
            </td>
            <td class="col-unlock">
              <span :class="['mini-tag', getUnlockClass(brand.unlockStatus.netflix)]">
                NF: {{ brand.unlockStatus.netflix }}
              </span>
            </td>
            <td class="col-status">
              <span :class="['status-pill', brand.dataStatus]">
                {{ brand.dataStatus === 'measured' ? '实测验证' : brand.dataStatus === 'vendor' ? '品牌资料' : '历史存档' }}
              </span>
            </td>
            <td class="col-code">
              <code v-if="brand.couponCode">{{ brand.couponCode }}</code>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="col-action">
              <a :href="'/brands/' + brand.slug" class="action-btn read-btn">评测</a>
              <a :href="brand.affUrl" target="_blank" rel="nofollow sponsored noopener" class="action-btn go-btn">官网</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 无结果状态 -->
    <div v-if="filteredBrands.length === 0" class="no-results-box">
      <div class="no-icon">🛰️</div>
      <h4>未找到匹配的机场服务商</h4>
      <p>尝试调整搜索词或重置筛选条件以浏览更多品牌。</p>
      <button @click="resetFilters" class="reset-all-btn">清空所有条件</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BRANDS_LIST, type BrandDetail } from '../data/brands'
import BrandCard from './BrandCard.vue'

// 视图模式：卡片 vs 表格
const currentView = ref<'card' | 'table'>('card')

// 筛选状态
const searchKeyword = ref('')
const selectedLineType = ref('all')
const selectedPrice = ref('all')
const selectedProtocol = ref('all')
const selectedUnlock = ref('all')

// 线路选项
const lineTypeOptions = [
  { label: '全部线路', value: 'all' },
  { label: 'IEPL 专线', value: 'iepl' },
  { label: 'IPLC 专线', value: 'iplc' },
  { label: 'BGP 智能中转', value: 'bgp' },
  { label: '不限时流量包', value: 'unlimited' }
]

// 价格选项
const priceOptions = [
  { label: '全部预算', value: 'all' },
  { label: '≤ 10元/月 (极限低价)', value: 'low' },
  { label: '10 ~ 25元/月 (主流主力)', value: 'mid' },
  { label: '> 25元/月 (高要求/商务)', value: 'high' }
]

// 协议选项
const protocolOptions = [
  { label: '全部协议', value: 'all' },
  { label: 'VLESS (现代防封)', value: 'vless' },
  { label: 'Shadowsocks (经典专线)', value: 'ss' },
  { label: 'Trojan', value: 'trojan' }
]

// 解锁选项
const unlockOptions = [
  { label: '全部场景', value: 'all' },
  { label: 'ChatGPT 稳定解锁', value: 'chatgpt' },
  { label: 'Claude 严格解锁', value: 'claude' },
  { label: 'Netflix 4K 全解锁', value: 'netflix' }
]

// 是否存在激活的筛选
const hasActiveFilters = computed(() => {
  return (
    searchKeyword.value.trim() !== '' ||
    selectedLineType.value !== 'all' ||
    selectedPrice.value !== 'all' ||
    selectedProtocol.value !== 'all' ||
    selectedUnlock.value !== 'all'
  )
})

// 重置所有筛选
const resetFilters = () => {
  searchKeyword.value = ''
  selectedLineType.value = 'all'
  selectedPrice.value = 'all'
  selectedProtocol.value = 'all'
  selectedUnlock.value = 'all'
}

// 核心计算属性：复合过滤逻辑
const filteredBrands = computed(() => {
  return BRANDS_LIST.filter(brand => {
    // 1. 关键字搜索
    if (searchKeyword.value.trim()) {
      const q = searchKeyword.value.toLowerCase().trim()
      const matchName = brand.name.toLowerCase().includes(q)
      const matchSlug = brand.slug.toLowerCase().includes(q)
      const matchLine = brand.lineType.toLowerCase().includes(q)
      const matchSummary = brand.summary.toLowerCase().includes(q)
      const matchProtocols = brand.protocols.some(p => p.toLowerCase().includes(q))
      if (!matchName && !matchSlug && !matchLine && !matchSummary && !matchProtocols) {
        return false
      }
    }

    // 2. 线路过滤
    if (selectedLineType.value !== 'all') {
      const lt = selectedLineType.value
      if (lt === 'iepl' && !brand.lineType.toLowerCase().includes('iepl')) return false
      if (lt === 'iplc' && !brand.lineType.toLowerCase().includes('iplc')) return false
      if (lt === 'bgp' && !brand.lineType.toLowerCase().includes('bgp')) return false
      if (lt === 'unlimited') {
        const hasUnlim = brand.pricingTiers.some(t => t.billing === '一次性付费' || t.name.includes('不限时') || t.period.includes('不过期'))
        if (!hasUnlim) return false
      }
    }

    // 3. 价格过滤
    if (selectedPrice.value !== 'all') {
      const p = selectedPrice.value
      const priceText = brand.entryPrice.toLowerCase()
      // 提取价格数字
      const numMatch = priceText.match(/(\d+(\.\d+)?)/)
      const num = numMatch ? parseFloat(numMatch[1]) : 20
      if (p === 'low' && num > 10) return false
      if (p === 'mid' && (num <= 10 || num > 25)) return false
      if (p === 'high' && num <= 25) return false
    }

    // 4. 协议过滤
    if (selectedProtocol.value !== 'all') {
      const proto = selectedProtocol.value
      if (proto === 'vless' && !brand.protocols.includes('VLESS')) return false
      if (proto === 'ss' && !brand.protocols.includes('Shadowsocks')) return false
      if (proto === 'trojan' && !brand.protocols.includes('Trojan')) return false
    }

    // 5. 解锁过滤
    if (selectedUnlock.value !== 'all') {
      const un = selectedUnlock.value
      if (un === 'chatgpt' && brand.unlockStatus.chatgpt !== '支持') return false
      if (un === 'claude' && brand.unlockStatus.claude !== '支持') return false
      if (un === 'netflix' && brand.unlockStatus.netflix !== '支持') return false
    }

    return true
  })
})

const getUnlockClass = (status: string) => {
  if (status === '支持') return 'tag-ok'
  if (status === '视节点而定') return 'tag-partial'
  return 'tag-na'
}
</script>

<style scoped>
.brand-filter-dashboard {
  margin: 24px 0 40px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0b1120;
  border: 1px solid #1e293b;
  border-radius: 10px 10px 0 0;
  padding: 12px 18px;
  color: #f8fafc;
}

.header-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.status-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #94a3b8;
}

.header-stats {
  display: flex;
  gap: 8px;
}

.stat-badge {
  font-size: 11px;
  font-family: monospace;
  background: #1e293b;
  padding: 2px 8px;
  border-radius: 4px;
  color: #cbd5e1;
}

.stat-badge.highlight {
  background: rgba(37, 99, 235, 0.2);
  color: #60a5fa;
  border: 1px solid #2563eb;
}

.controls-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 10px 10px;
  padding: 18px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.search-input-wrap {
  position: relative;
  flex: 1;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #94a3b8;
}

.filter-search-input {
  width: 100%;
  padding: 10px 36px 10px 34px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  background: #f8fafc;
  outline: none;
  transition: all 0.2s ease;
}

.filter-search-input:focus {
  border-color: #2563eb;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  color: #94a3b8;
  cursor: pointer;
}

.view-switch-wrap {
  display: flex;
  background: #f1f5f9;
  padding: 3px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.switch-btn {
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  background: none;
  color: #64748b;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.switch-btn.active {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.filter-groups {
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px dashed #e2e8f0;
  padding-top: 12px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
  min-width: 68px;
}

.pill-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.filter-pill {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-pill:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.filter-pill.active {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
  font-weight: 600;
}

.filter-actions-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
}

.active-hint {
  font-size: 12px;
  color: #2563eb;
  font-weight: 600;
}

.reset-all-btn {
  font-size: 12px;
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.reset-all-btn:hover {
  background: #fee2e2;
}

/* 表格视图排版 */
.results-table-wrap {
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #ffffff;
}

.radar-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.radar-table th {
  background: #f8fafc;
  color: #475569;
  padding: 12px 14px;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  white-space: nowrap;
}

.radar-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  vertical-align: middle;
}

.top-highlight {
  background: #f8faff;
}

.col-rank {
  font-family: monospace;
  font-weight: 700;
  color: #64748b;
}

.col-name .brand-link {
  color: #0f172a;
  text-decoration: none;
  font-size: 14px;
}

.col-name .brand-link:hover {
  color: #2563eb;
}

.top-tag {
  background: #2563eb;
  color: #ffffff;
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 3px;
  margin-left: 6px;
}

.line-badge {
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
}

.sub-line {
  font-size: 11px;
  color: #94a3b8;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-price {
  font-weight: 600;
  color: #0284c7;
  font-family: monospace;
  white-space: nowrap;
}

.mini-tag {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

.mini-tag.tag-ok {
  background: #f0fdf4;
  color: #166534;
}

.mini-tag.tag-partial {
  background: #fffbeb;
  color: #b45309;
}

.mini-tag.tag-na {
  background: #f1f5f9;
  color: #94a3b8;
}

.status-pill {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 12px;
}

.status-pill.measured {
  background: #ecfdf5;
  color: #059669;
}

.status-pill.vendor {
  background: #fffbeb;
  color: #d97706;
}

.status-pill.historical {
  background: #f8fafc;
  color: #64748b;
}

.col-action {
  white-space: nowrap;
}

.action-btn {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  text-decoration: none;
  margin-right: 4px;
  font-weight: 500;
}

.read-btn {
  background: #f1f5f9;
  color: #334155 !important;
  border: 1px solid #cbd5e1;
}

.go-btn {
  background: #2563eb;
  color: #ffffff !important;
}

.no-results-box {
  text-align: center;
  padding: 40px 20px;
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
}

.no-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.no-results-box h4 {
  margin: 0 0 6px 0;
  color: #1e293b;
}

.no-results-box p {
  margin: 0 0 14px 0;
  font-size: 13px;
  color: #64748b;
}
</style>
