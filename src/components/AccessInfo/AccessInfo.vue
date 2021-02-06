<script>
import { mapState, mapGetters } from 'vuex'
import { diffInDays } from '@/utils/date'
import AccessInfoDescription from './components/AccessInfoDescription'

export default {
  components: {AccessInfoDescription},
  data() {
    return {
      isDescriptionShown: false
    }
  },
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['isDemo']),
    accessName() {
      return this.isDemo ? this.$t('accessInfo.freeAccess') : this.$t('accessInfo.fullAccess')
    },
    accessDesc() {
      const daysLeft = this.fullAccessDaysLeft
      if (this.isDemo) {
        return this.$t('accessInfo.limited')
      }
      if (daysLeft === 0) {
        return this.$t('accessInfo.lessThanDayLeft') 
      }
      return this.$tc('accessInfo.nDaysLeft', daysLeft, { nDays: daysLeft })
    },
    fullAccessDaysLeft() {
      if (this.isDemo) return 0
      return diffInDays(new Date(this.currentUser.licenseValidUntil), Date.now())
    },
    classes() {
      return {
        'access-info--demo': this.isDemo
      }
    }
  },
  methods: {
    goToPayment() {
      alert(this.$t('accessInfo.paymentStub'))
    },
    toggleDescription() {
      this.isDescriptionShown = !this.isDescriptionShown
    }
  }
}
</script>
<template lang="pug">
.access-info(:class="classes")
  .access-info__main(@click="toggleDescription")
    .access-info__block.access-info__access-name {{ accessName }}
    .access-info__block.access-info__access-desc {{ accessDesc }}
  access-info-description.access-info__details(v-show="isDescriptionShown" @goToPayment="goToPayment")
</template>
<style lang="sass">
$border-radius: 3px
.access-info
  position: relative
  font-size: 12px
  color: white
  .access-info__main
    display: flex
    align-items: center
    cursor: pointer
  .access-info__block
    display: flex
    align-items: center
    justify-content: center
    box-sizing: border-box
    padding: 10px 0
    min-width: 160px
  .access-info__access-name
    font-weight: 500
    background: transparentize(#00A591, .2)
    border-top-left-radius: $border-radius
    border-bottom-left-radius: $border-radius
  .access-info__access-desc
    background: #eee
    color: gray
    border-top-right-radius: $border-radius
    border-bottom-right-radius: $border-radius
  .access-info__details
    margin-top: 8px
  &.access-info--demo
    .access-info__block
      min-width: 160px
    .access-info__access-name
      background: #eee
      color: gray
    .access-info__access-desc
      background: #FB5F75
      color: white
</style>
