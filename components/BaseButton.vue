<template>
  <button
    class="base-button"
    v-bind:class="className"
    v-bind:disabled="isdisabled"
    v-on:click="handleClick"
  >
    <slot />
  </button>
</template>
<script setup>
defineProps({
  isdisabled: {
    type: Boolean,
    default: false
  },
  className: {
    type: String,
    default: 'default'
  }
})
const emit = defineEmits(['submit'])

const handleClick = () => {
  emit('submit')
}
</script>
<stype scoped lang="scss">
@import url('../assets/scss/common/components/base-button.scss');
</stype>
