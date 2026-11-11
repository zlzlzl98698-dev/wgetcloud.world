<template>
  <div class="availability-matrix">
    <div class="matrix-header">
      <div class="matrix-title">
        <span class="icon">⚡</span>
        <span>Service Availability & Residential IP Matrix (流媒体与AI解锁阵列)</span>
      </div>
      <div class="matrix-badge">RegionRestrictionCheck v2.6.4</div>
    </div>

    <div class="matrix-grid">
      <!-- AI Category -->
      <div class="matrix-section">
        <div class="section-title">AI & Productivity Services</div>
        <div class="service-cards">
          <div class="service-card">
            <span class="service-name">ChatGPT (OpenAI)</span>
            <span class="badge" :class="getStatusClass(status.chatgpt)">{{ status.chatgpt }}</span>
          </div>
          <div class="service-card">
            <span class="service-name">Claude (Anthropic)</span>
            <span class="badge" :class="getStatusClass(status.claude)">{{ status.claude }}</span>
          </div>
          <div class="service-card">
            <span class="service-name">Gemini (Google)</span>
            <span class="badge" :class="getStatusClass(status.gemini)">{{ status.gemini }}</span>
          </div>
        </div>
      </div>

      <!-- Streaming Category -->
      <div class="matrix-section">
        <div class="section-title">Global Streaming 4K Services</div>
        <div class="service-cards">
          <div class="service-card">
            <span class="service-name">Netflix (4K HDR)</span>
            <span class="badge" :class="getStatusClass(status.netflix)">{{ status.netflix }}</span>
          </div>
          <div class="service-card">
            <span class="service-name">Disney+ (Star/IMAX)</span>
            <span class="badge" :class="getStatusClass(status.disney)">{{ status.disney }}</span>
          </div>
          <div class="service-card">
            <span class="service-name">YouTube Premium</span>
            <span class="badge" :class="getStatusClass(status.youtube)">{{ status.youtube }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  status: {
    chatgpt: string
    claude: string
    gemini: string
    netflix: string
    disney: string
    youtube: string
  }
}>()

const getStatusClass = (val: string) => {
  if (val === '支持') return 'operational'
  if (val === '视节点而定') return 'partial'
  if (val === '失败') return 'unavailable'
  return 'untested'
}
</script>

<style scoped>
.availability-matrix {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 18px;
  margin: 20px 0;
  color: #f8fafc;
}

.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #1e293b;
  padding-bottom: 12px;
  margin-bottom: 16px;
}

.matrix-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.matrix-badge {
  font-size: 11px;
  font-family: monospace;
  background: #1e293b;
  color: #94a3b8;
  padding: 3px 8px;
  border-radius: 4px;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.section-title {
  font-size: 12px;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.service-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.service-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #334155;
}

.service-name {
  font-size: 13px;
  font-weight: 500;
  color: #cbd5e1;
}

.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.badge.operational {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid #059669;
}

.badge.partial {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
  border: 1px solid #d97706;
}

.badge.unavailable {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid #dc2626;
}

.badge.untested {
  background: rgba(100, 116, 139, 0.2);
  color: #94a3b8;
  border: 1px solid #475569;
}
</style>
