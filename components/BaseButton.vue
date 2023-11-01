<template>
  <button @click="handleClick">
    <slot />
  </button>
</template>
<script setup lang="ts">
const emits = defineEmits(["click"]);
const handleClick = () => {
  emits("click");
};
</script>
