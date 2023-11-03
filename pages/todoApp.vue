<template>
  <div>
    <div v-for="todoItem in userStore.userData.data" v-bind:key="todoItem.product_id">
      <h1>{{ todoItem.product_id }}</h1>
      <h2>{{ todoItem.name }}</h2>
    </div>
  </div>
</template>
<script setup>
import { useUsers } from '~/store/table/getTable'
const userStore = useUsers()

onMounted(async () => {
  await userStore.registerUser()
})
</script>
