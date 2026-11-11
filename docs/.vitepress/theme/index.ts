// docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import './style.css'

import BrandCard from '../../components/BrandCard.vue'
import SpeedtestChart from '../../components/SpeedtestChart.vue'
import UnlockMatrix from '../../components/UnlockMatrix.vue'
import AffiliateButton from '../../components/AffiliateButton.vue'
import PricingTable from '../../components/PricingTable.vue'
import NetworkTopology from '../../components/NetworkTopology.vue'
import BrandFilter from '../../components/BrandFilter.vue'
import AeoSchema from '../../components/AeoSchema.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BrandCard', BrandCard)
    app.component('SpeedtestChart', SpeedtestChart)
    app.component('UnlockMatrix', UnlockMatrix)
    app.component('AffiliateButton', AffiliateButton)
    app.component('PricingTable', PricingTable)
    app.component('NetworkTopology', NetworkTopology)
    app.component('BrandFilter', BrandFilter)
    app.component('AeoSchema', AeoSchema)
  }
}
