<template lang="pug">
#app.app
  .app__section
    button.app__button(@click="toggleStarterChecklist")
      | {{ $t('app.starterChecklistToggle') }}
    button.app__button(@click="imitateTextSearch")
      | {{ $t('app.imitateTextSearch') }}
    starter-checklist.app__starter-checklist(
      v-show="isStarterChecklistShown" 
      :manager="starterChecklistManager" 
      @close="hideStarterChecklist" 
    )
</template>

<script>
import StarterChecklist from '@/components/StarterChecklist/StarterChecklist'

export default {
  name: 'App',
  components: {
    StarterChecklist
  },
  data() {
    return {
      isStarterChecklistShown: true,
      starterChecklistManager: this.$starterChecklist.manager
    }
  },
  methods: {
    toggleStarterChecklist() {
      this.isStarterChecklistShown = !this.isStarterChecklistShown
    },
    hideStarterChecklist() {
      this.isStarterChecklistShown = false
    },
    imitateTextSearch() {
      this.$starterChecklist.completeItem('searchByText')
    }
  }
}
</script>

<style lang="sass">
.app
  font-family: Roboto, 'Helvetica Neue', 'Helvetica'
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  display: flex
  padding: 40px
  .app__starter-checklist-toggle
    margin-bottom: 10px
  .app__button
    display: block
    margin-bottom: 10px
</style>
