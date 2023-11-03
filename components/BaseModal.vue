<template>
  <Teleport to="body">
    <div v-if="visible" class="base-modal">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
</script>
