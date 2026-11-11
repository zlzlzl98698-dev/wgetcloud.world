<template>
  <div class="brand-card" :class="{ 'is-primary': brand.priority === 1 }">
    <div class="card-header">
      <div class="brand-title-wrap">
        <span class="brand-rank">#{{ brand.priority }}</span>
        <h3 class="brand-name">{{ brand.name }}</h3>
        <span v-if="brand.priority === 1" class="primary-tag">首选主推</span>
      </div>
      <div class="status-badge" :class="brand.dataStatus">
        {{ brand.dataStatus === 'measured' ? '实测验证' : brand.dataStatus === 'vendor' ? '品牌资料' : '历史存档' }}
      </div>
    </div>

    <p class="brand-summary">{{ brand.summary }}</p>

    <div class="specs-grid">
      <div class="spec-item">
        <span class="label">起步价格</span>
        <span class="value price">{{ brand.entryPrice }}</span>
      </div>
      <div class="spec-item">
        <span class="label">线路类型</span>
        <span class="value">{{ brand.lineType }}</span>
      </div>
      <div class="spec-item">
        <span class="label">支持协议</span>
        <span class="value">{{ brand.protocols.join(', ') }}</span>
      </div>
      <div class="spec-item" v-if="brand.couponCode">
        <span class="label">优惠码</span>
        <span class="value code" @click="copyCoupon(brand.couponCode)">
          {{ brand.couponCode }} <span class="copy-hint">(点击复制)</span>
        </span>
      </div>
    </div>

    <div class="unlock-mini-bar">
      <span class="unlock-item" :class="getUnlockClass(brand.unlockStatus.chatgpt)">
        AI: {{ brand.unlockStatus.chatgpt }}
      </span>
      <span class="unlock-item" :class="getUnlockClass(brand.unlockStatus.netflix)">
        Netflix: {{ brand.unlockStatus.netflix }}
      </span>
      <span class="unlock-item" :class="getUnlockClass(brand.unlockStatus.youtube)">
        YouTube: {{ brand.unlockStatus.youtube }}
      </span>
    </div>

    <div class="card-actions">
      <a :href="'/brands/' + brand.slug" class="btn btn-secondary">
        查看万字深度评测
      </a>
      <a 
        :href="brand.affUrl" 
        target="_blank" 
        rel="nofollow sponsored noopener" 
        class="btn btn-primary"
      >
        直达官网开通
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BrandDetail } from '../data/brands'

const props = defineProps<{
  brand: BrandDetail
}>()

const copyCoupon = (code: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code)
    alert(`优惠码 ${code} 已复制到剪贴板！`)
  }
}

const getUnlockClass = (status: string) => {
  if (status === '支持') return 'status-ok'
  if (status === '视节点而定') return 'status-partial'
  return 'status-na'
}
</script>

<style scoped>
.brand-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  transition: all 0.25s ease;
}

.brand-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.08);
}

.brand-card.is-primary {
  border: 2px solid #2563eb;
  background: linear-gradient(180deg, #f8faff 0%, #ffffff 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.brand-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-rank {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 6px;
}

.brand-name {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}

.primary-tag {
  background: #2563eb;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.status-badge {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
}

.status-badge.measured {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.status-badge.vendor {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}

.status-badge.historical {
  background: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.brand-summary {
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 16px;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  background: #f8fafc;
  padding: 14px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec-item .label {
  font-size: 12px;
  color: #94a3b8;
}

.spec-item .value {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.spec-item .value.price {
  color: #0284c7;
  font-size: 15px;
}

.spec-item .value.code {
  color: #d97706;
  cursor: pointer;
  background: #fef3c7;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
}

.copy-hint {
  font-size: 11px;
  font-weight: normal;
  color: #b45309;
}

.unlock-mini-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.unlock-item {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 500;
}

.unlock-item.status-ok {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.unlock-item.status-partial {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}

.unlock-item.status-na {
  background: #f1f5f9;
  color: #64748b;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff !important;
}

.btn-primary:hover {
  background: #1d4ed8;
}

.btn-secondary {
  background: #f1f5f9;
  color: #334155 !important;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background: #e2e8f0;
}
</style>
