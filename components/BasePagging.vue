<template>
  <va-pagination
    v-bind:model-value="pageValue"
    class="base-pagging"
    v-bind:pages="totalPage"
    input
  />
</template>
<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  totalPage: {
    type: Number,
    default: 1
  }
})
const emits = defineEmits(['input'])
const pageValue = computed({
  get() {
    return props.currentPage
  },
  set(value) {
    emits('input', value)
  }
})
</script>
<style lang="scss" scoped>
@import url(../assets/scss/common/components/base-pagging.scss);
</style>
