<template>
  <BaseInput :messageProps="formMessage" @input="handleInput" />
  <BaseButton @click="handleSubmit">submit</BaseButton>
  <div v-for="todoItem in todoList" :key="todoItem.id">
    {{ todoItem.title }}
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
const formMessage = ref("");
const todoList = reactive([
  {
    id: 0,
    title: "apa",
  },
  {
    id: 1,
    title: "ape",
  },
]);
const handleInput = (val: string) => {
  formMessage.value = val;
  // console.log(val);
};
const handleSubmit = () => {
  if (formMessage.value.length === 0) return;
  todoList.push({
    id: todoList.length + 1,
    title: formMessage.value,
  });
  handleInput("");
};
</script>
