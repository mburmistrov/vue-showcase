<template lang="pug">
.starter-checklist-category
  .starter-checklist-category__name {{ name }}
  slot
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="sass">
@import "~/src/styles/variables"
@import "~/src/styles/elevation"
.starter-checklist-category
  border-radius: 5px
  padding: 12px
  +elevation
  .starter-checklist-category__name
    font-size: 15px
    font-weight: 500
    margin-bottom: 6px
    color: $c-primary
</style>
