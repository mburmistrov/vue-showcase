<script>
import { mapState, mapGetters } from 'vuex'
import { format } from '@/utils/date'

export default {
  computed: {
    ...mapState(['currentUser']),
    ...mapGetters(['isDemo', 'licenseValidUntil']),
    text() {
      return this.isDemo
        ? this.$t('accessInfo.desc.demoText')
        : this.$t('accessInfo.desc.text', { licenseUntil: format(this.licenseValidUntil) })
    },
    actionText() {
      return this.isDemo ? this.$t('accessInfo.desc.demoActionText') : this.$t('accessInfo.desc.actionText')
    }
  },
  methods: {
    goToPayment() {
      this.$emit('goToPayment')
    }
  }
}
</script>
<template lang="pug">
.access-info-description
  .access-info-description__text(v-html="text")
  .access-info-description__action(ref="goToPayment" @click="goToPayment") {{ actionText }}
</template>
<style lang="sass">
@import "~/src/styles/variables"
@import "~/src/styles/elevation"
.access-info-description
  position: absolute
  color: black
  padding: 10px
  border-radius: 3px
  +elevation
  .access-info-description__text
    font-size: 12px
    line-height: 1.6
  .access-info-description__action
    background-color: $c-primary
    color: white
    box-sizing: border-box
    border-radius: 3px
    padding: 5px
    margin-top: 10px
    text-align: center
    cursor: pointer
</style>
