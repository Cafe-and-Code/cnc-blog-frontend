<template>
  <input type="text" v-model="message" @input="handleInput()" />
</template>
<script setup lang="ts">
import { ref } from "vue";
const message = ref<string>("");
interface Props {
  messageProps: string;
}
// onMounted(() => {
//   message.value = props.message;
// });
const props = withDefaults(defineProps<Props>(), {
  messageProps: "",
});
const emits = defineEmits(["input"]);
const handleInput = () => {
  emits("input", message.value);
  // console.log(props.messageProps, message.value);
};
watch(message, (val) => {
  message.value = val;
  console.log(val);
});
</script>
