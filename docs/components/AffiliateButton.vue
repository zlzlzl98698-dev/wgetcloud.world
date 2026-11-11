<template>
  <div class="affiliate-cta-box" :class="{ 'is-primary-box': isPrimary }">
    <div class="cta-inner">
      <div class="cta-info">
        <h4 class="cta-title">{{ title || '获取官方正品授权与专属优惠' }}</h4>
        <p class="cta-desc">{{ subtitle || '直达官方节点交付控制台，享有最新线路调度与售后保障' }}</p>
        <div v-if="couponCode" class="coupon-tag-wrap">
          <span class="coupon-label">专属优惠券:</span>
          <span class="coupon-val" @click="copyCode" title="点击一键复制">
            <code>{{ couponCode }}</code>
            <span class="copy-badge">{{ copied ? '已复制！' : '复制' }}</span>
          </span>
        </div>
      </div>
      <div class="cta-button-wrap">
        <a 
          :href="url" 
          target="_blank" 
          rel="nofollow sponsored noopener" 
          class="cta-btn"
        >
          {{ buttonText || '立即前往官网注册' }}
          <span class="arrow-icon">→</span>
        </a>
      </div>
    </div>
    <div class="compliance-note">
      <span class="lock-icon">🔒</span>
      <span>合规声明：本站含推广合作链接，通过链接注册可能为本站带来维护佣金，不影响您支付的最终价格与套餐权限。请按需购买并遵守当地网络法规。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  url: string
  title?: string
  subtitle?: string
  couponCode?: string
  buttonText?: string
  isPrimary?: boolean
}>()

const copied = ref(false)

const copyCode = () => {
  if (props.couponCode && navigator.clipboard) {
    navigator.clipboard.writeText(props.couponCode)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}
</script>

<style scoped>
.affiliate-cta-box {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  margin: 28px 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.affiliate-cta-box.is-primary-box {
  background: linear-gradient(135deg, #eff6ff 0%, #ffffff 100%);
  border: 2px solid #3b82f6;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.1);
}

.cta-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.cta-info {
  flex: 1;
  min-width: 260px;
}

.cta-title {
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.cta-desc {
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
}

.coupon-tag-wrap {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  background: #ffffff;
  padding: 4px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}

.coupon-label {
  color: #475569;
  font-weight: 500;
}

.coupon-val {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.coupon-val code {
  color: #2563eb;
  font-weight: 700;
  background: #eff6ff;
  padding: 2px 6px;
  border-radius: 4px;
}

.copy-badge {
  font-size: 11px;
  background: #2563eb;
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #2563eb;
  color: #ffffff !important;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

.cta-btn:hover {
  background: #1d4ed8;
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
  transform: translateY(-1px);
}

.arrow-icon {
  font-size: 16px;
}

.compliance-note {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px dashed #e2e8f0;
  font-size: 11px;
  color: #94a3b8;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  line-height: 1.5;
}
</style>
