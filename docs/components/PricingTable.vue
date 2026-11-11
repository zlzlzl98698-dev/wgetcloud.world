<template>
  <div class="pricing-table-container">
    <table class="pricing-table">
      <thead>
        <tr>
          <th>套餐名称</th>
          <th>计费周期</th>
          <th>价格</th>
          <th>流量配额</th>
          <th>说明</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tier, idx) in tiers" :key="idx" :class="{ 'highlight-row': tier.billing === '年付' || tier.billing === '一次性付费' }">
          <td class="tier-name">{{ tier.name }}</td>
          <td><span class="billing-tag">{{ tier.billing }}</span></td>
          <td class="tier-price">{{ tier.price }}</td>
          <td class="tier-traffic">{{ tier.traffic }}</td>
          <td class="tier-period">{{ tier.period }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { PricingTier } from '../data/brands'

defineProps<{
  tiers: PricingTier[]
}>()
</script>

<style scoped>
.pricing-table-container {
  overflow-x: auto;
  margin: 20px 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
}

.pricing-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 14px;
}

.pricing-table th {
  background: #f8fafc;
  color: #475569;
  font-weight: 600;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.pricing-table td {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
}

.pricing-table tr:last-child td {
  border-bottom: none;
}

.highlight-row {
  background: #fafcff;
}

.tier-name {
  font-weight: 600;
  color: #0f172a;
}

.tier-price {
  font-weight: 700;
  color: #0284c7;
  font-family: monospace;
}

.billing-tag {
  font-size: 11px;
  background: #f1f5f9;
  color: #475569;
  padding: 2px 6px;
  border-radius: 4px;
}

.tier-traffic {
  font-weight: 500;
}

.tier-period {
  font-size: 12px;
  color: #64748b;
}
</style>
