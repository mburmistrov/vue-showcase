<template lang="pug">
.starter-checklist-item(:class="classes")
  .starter-checklist-item__content(v-html="$t(`starterChecklist.items.${itemKey}`)")
</template>
<script>
export default {
  props: {
    itemKey: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    classes() {
      return {
        'starter-checklist-item--completed': this.isCompleted
      }
    }
  }
}
</script>
<style lang="sass">
@import "~/src/styles/icons/mixins"
=item-icon($name)
  +md-icon($name)
  font-size: 25px
  margin-right: 10px
  position: relative
  top: -3px
.starter-checklist-item
  $text-color: #737376
  display: flex
  padding: 6px 0
  font-size: 16px
  font-weight: 400
  &:before
    +item-icon(circle-o)
    color: #ccc
  .starter-checklist-item__content
    color: $text-color
  &.starter-checklist-item--completed
    &:before
      +item-icon(check-circle)
      color: #00A591
    .starter-checklist-item__content
      color: transparentize($text-color, .55)
      text-decoration: line-through
</style>
