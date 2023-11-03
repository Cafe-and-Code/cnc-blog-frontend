<template>
  <va-input v-model="inputText" v-bind:placeholder="placeholder" />
</template>
<script setup>
const props = defineProps({
  message: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
const emits = defineEmits(['input'])
const inputText = computed({
  get() {
    return props.message
  },
  set(value) {
    emits('input', value)
  }
})
</script>
