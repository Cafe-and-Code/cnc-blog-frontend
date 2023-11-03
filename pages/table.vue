<template>
  <div class="table-page">
    <div class="search-area">
      <span>Search Name</span>
      <BaseInput v-bind:message="searchText" placeholder="search" v-on:input="handleSearch" />
    </div>
    <div class="table-area">
      <BaseTable
        v-bind:table-headers="tableHeaders"
        v-bind:table-items="dataItems"
        v-on:edit-item="handleEdit"
        v-on:delete-item="handleDelete"
      />
    </div>
    <div class="table-pagging">
      <div class="pagging">
        <div class="pagging-btn">
          <BasePagging v-bind:current-page="currentPage" v-bind:total-page="totalPage" />
        </div>
        <div class="pagging-btn">
          <BaseButton v-on:click="handleCreate">New Create</BaseButton>
        </div>
      </div>
    </div>
    <va-modal
      v-model="showModalEdit"
      class="modal-crud"
      title="Edit item"
      size="small"
      v-on:ok="editItem"
      v-on:cancel="resetEditedItem"
    >
      <va-input
        v-for="key in Object.keys(newEditValue)"
        v-bind:key="key"
        v-model="newEditValue[key]"
        v-bind:label="key"
        class="va-gutter-2"
      />
    </va-modal>
    <va-modal
      v-model="showModalCreate"
      class="modal-crud"
      title="create item"
      size="small"
      v-on:ok="createItem"
      v-on:cancel="resetCreateItem"
    >
      <va-input
        v-for="key in Object.keys(newCreateValue)"
        v-bind:key="key"
        v-model="newCreateValue[key]"
        v-bind:label="key"
        class="va-gutter-2"
      />
    </va-modal>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useTableData } from '@/store/common/table'
const tableHeaders = reactive([
  {
    label: '#',
    value: 'product_id',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'name',
    value: 'name',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'size',
    value: 'size',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'price',
    value: 'price',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'beerId',
    value: 'beer_id',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'imageUrl',
    value: 'image_url',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'category',
    value: 'category',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'abv',
    value: 'abv',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'style',
    value: 'style',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'attributes',
    value: 'attributes',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'type',
    value: 'type',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'brewer',
    value: 'brewer',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'country',
    value: 'country',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'on sale',
    value: 'on_sale',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'dir',
    value: 'dir',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'path',
    value: 'path',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'slug',
    value: 'slug',
    width: 80,
    minWidth: 60,
    align: 'left'
  },
  {
    label: 'updatedAt',
    value: 'updatedAt',
    width: 80,
    minWidth: 60,
    align: 'left'
  }
])
const oldEditValue = ref({})
const newEditValue = ref({})
// const dataItems = computed(() => {
//   return !searchText.value
//     ? tableItems.tableData?.data
//     : tableItems.tableData?.data.filter((item) => item.name.includes(searchText.value))
// })
const showModalEdit = ref(false)
const dataItems = ref([])
const tableItems = useTableData()
onMounted(async () => {
  await tableItems.getTableItems()
  dataItems.value = tableItems.tableData?.data
})
const handleEdit = (index) => {
  showModalEdit.value = true
  const editedItem = dataItems.value.find((item, i) => {
    if (i === index) return item
  })
  oldEditValue.value = editedItem
  newEditValue.value = editedItem
}
const handleDelete = (index) => {
  dataItems.value.splice(index, 1)
}
const editItem = () => {
  showModalEdit.value = false
}
const resetEditedItem = () => {
  showModalEdit.value = false
}

const newCreateValue = ref({})
const showModalCreate = ref(false)
const handleCreate = () => {
  showModalCreate.value = true
  const obj = {}
  Object.keys(dataItems.value[0]).forEach((key) => {
    obj[key] = ''
  })
  newCreateValue.value = obj
}
const createItem = () => {
  dataItems.value.push(newCreateValue.value)
  showModalCreate.value = false
}
const resetCreateItem = () => {
  showModalCreate.value = false
}
const searchText = ref('')
const handleSearch = (val) => {
  searchText.value = val
  dataItems.value = tableItems.tableData?.data.filter((item) =>
    item.name.includes(searchText.value)
  )
}

const currentPage = ref(1)
const totalPage = ref(1)
</script>
<style scoped lang="scss">
@import url('../assets/scss/common/pages/table.scss');
</style>
