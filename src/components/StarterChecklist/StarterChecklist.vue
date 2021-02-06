<template lang="pug">
.starter-checklist
  .starter-checklist__header
    | {{ $t('starterChecklist.header') }}
    .starter-checklist__congrats(v-if="showCongrats" ref="congrats") {{ $t('starterChecklist.congrats') }}
    .starter-checklist__close(ref="close" @click="close")
  .starter-checklist__body
    starter-checklist-category.starter-checklist__category(
      v-for="category in categories"
      :key="category"
      :name="$t(`starterChecklist.categories.${category}`)"
    )
      starter-checklist-item.starter-checklist__item(
        v-for="key in itemKeysForCategory(category)"
        :key="key"
        :itemKey="key"
        :isCompleted="isCompleted(key)"
      )
</template>
<script>
import StarterChecklistItem from './components/StarterChecklistItem'
import StarterChecklistCategory from './components/StarterChecklistCategory'

export default {
  components: {
    StarterChecklistItem,
    StarterChecklistCategory
  },
  props: {
    manager: {
      type: Object,
      required: true
    }
  },
  computed: {
    categories() {
      return this.manager.categories
    },
    showCongrats() {
      return this.manager.allCompleted
    }
  },
  methods: {
    isCompleted(key) {
      return this.manager.isCompleted(key)
    },
    itemKeysForCategory(category) {
      return this.manager.keysForCategory(category)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="sass">
@import "~/src/styles/icons/mixins"
@import "~/src/styles/variables"
@import "~/src/styles/elevation"
.starter-checklist
  border-radius: 10px
  max-width: 450px
  height: 620px
  overflow: scroll
  transition: opacity .1s
  +elevation
  .starter-checklist__header
    position: relative
    padding: 24px 30px
    color: white
    font-size: 24px
    font-weight: 400
    background: linear-gradient(135deg, rgb(96, 76, 141) 0%, rgb(51, 40, 75) 100%)
    cursor: default
    user-select: none
  .starter-checklist__congrats
    font-size: 14px
    color: #d4dbde
  .starter-checklist__close
    $size: 40px
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    top: 10px
    right: 10px
    width: $size
    height: $size
    border-radius: 4px
    cursor: pointer
    &:before
      +md-icon(close)
    &:hover
      background-color: transparentize(black, .6)
  .starter-checklist__body
    color: #4d5055
    background: white
    padding: 20px
  .starter-checklist__category
    margin-bottom: 10px
    border-left-width: 3px
    border-left-style: solid
    border-left-color: $c-primary
    &:last-child
      margin-bottom: 0
</style>
