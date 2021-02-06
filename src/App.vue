<template lang="pug">
#app.app
  .app__section
    button.app__button(
      v-for="type in exampleUserTypes" 
      :key="type" 
      @click="setExampleUser(type)"
    )
      | {{ $t('app.setFakeUserOfType', { type }) }}
    access-info
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
import AccessInfo from '@/components/AccessInfo/AccessInfo'
import { addDays } from '@/utils/date'

const exampleUserTypes = {
  EXPIRED: 'EXPIRED',
  VALID: 'VALID',
  LAST_DAY_VALID: 'LAST_DAY_VALID'
}

const exampleUser = Object.freeze({
  country: 'US',
  createdAt: '2018-07-12T18:44:58.880Z',
  email: 'example@example.com',
  id: 33,
  licenseValidUntil: null,
  locale: 'ru',
  name: 'John Doe'
})

const exampleUserByType = {
  [exampleUserTypes.EXPIRED]: { ...exampleUser, licenseValidUntil: null },
  [exampleUserTypes.VALID]: { ...exampleUser, licenseValidUntil: addDays(new Date(), 10) },
  [exampleUserTypes.LAST_DAY_VALID]: { ...exampleUser, licenseValidUntil: addDays(new Date(), 1) }
}

export default {
  name: 'App',
  components: {
    StarterChecklist,
    AccessInfo
  },
  data() {
    return {
      isStarterChecklistShown: true,
      starterChecklistManager: this.$starterChecklist.manager
    }
  },
  computed: {
    exampleUserTypes() {
      return exampleUserTypes
    }
  },
  methods: {
    toggleStarterChecklist() {
      this.isStarterChecklistShown = !this.isStarterChecklistShown
    },
    hideStarterChecklist() {
      this.isStarterChecklistShown = false
    },
    setExampleUser(type = exampleUserByType.VALID) {
      this.$store.commit('setCurrentUser', exampleUserByType[type])
    },
    imitateTextSearch() {
      this.$starterChecklist.completeItem('searchByText')
    }
  },
  mounted() {
    this.setExampleUser()
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
  .app__section
    border-right: 5px gray solid
    padding-right: 60px
    margin-right: 60px
    &:last-child
      margin-right: 0
      padding-right: 0
      border-right: none
  .app__starter-checklist-toggle
    margin-bottom: 10px
  .app__button
    display: block
    margin-bottom: 10px
</style>
