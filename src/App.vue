<template lang="pug">
v-card(style="width: 1000px; margin: 0 auto;")
  v-card-title.d-flex.align-center.pe-2
    v-btn.mb-2(color='primary' @click="editNote()")
     | Yeni Not Ekle
    v-spacer
    v-text-field(v-model='search' density='compact' label='Search' prepend-inner-icon='mdi-magnify' variant='solo-filled' flat hide-details single-line)
  v-divider
  v-data-table(v-model:search='search' :filter-keys="['title']" :items='items' :headers="headers" :width="300" item-key="id")
    template(#item.createDate='{ item }')
      span
       | {{ formatDateTime(item.createDate) }}
    template(#item.actions='{ item }')
      TooltipIconButton(
        icon="mdi-pencil" 
        btnColor="blue-grey lighten-1"
        text="Düzenle"
        @onClick="editNote(item.id)"
      )
      TooltipIconButton(
        icon="mdi-delete" 
        btnColor="blue-grey lighten-1"
        text="Sil"
        @onClick="deleteNote(item.id)"
      )
  NoteDetail(ref="noteDetailRef")
  Confirm(ref="confirmDialogRef")
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import TooltipIconButton from './components/TooltipIconButton.vue'
import NoteDetail from './components/NoteDetail.vue'
import { formatDateTime, Confirm } from './utils'

const search = ref('')
const noteDetailRef = ref(null)
const confirmDialogRef = ref(null)

const items = ref([]);
const warning = () => async (message) => confirmDialogRef.value?.open(message, {
    color: "warning",
    buttonColors: {
      accept: "warning",
      decline: "gray", 
    },
  });

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Date', key: 'createDate' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const reFetch = async () => {
  const data = await window.ipcRenderer.store.get();
  console.log('data', data);
  
  const result = Object.values(data);
  console.log('result', result);

  items.value = result;
};

const editNote = async id => {
  const value = id ? await window.ipcRenderer.store.get(id.toString()) : null;
  const result = await noteDetailRef.value.edit(value);

   if (result) {
      console.log('editNote', result);

      await reFetch();
   }
};


const deleteNote = async id => {

  if (await warning()('Bu notu silmek istediğinizden emin misiniz?')) {
    await window.ipcRenderer.store.delete(id.toString());

    await reFetch();
  }
};

onMounted(async () => {
  await reFetch();
});

defineExpose({ noteDetailRef, confirmDialogRef })
</script>

<style>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
