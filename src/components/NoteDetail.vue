<template lang="pug">
.note-detail
  v-dialog(v-model='dialog.dialog.isActive.value' width='600px')
    v-card
      v-card-title
        span.text-h5 Note Detail
      v-card-text
        v-container
          v-row
            v-col(cols='12' md='10' sm='10')
              v-text-field(v-model='dialog.lazyValue.value.title' label='Note başlığı')
          v-row  
            v-col(cols='12' md='10' sm='10')
              v-textarea(v-model='dialog.lazyValue.value.description'
              label='Acıklama' clear-icon="mdi-close-circle" variant="outlined")
      v-card-actions
        v-spacer
        v-btn(color='blue-darken-1' variant='text' @click='close')
          | İptal
        v-btn(color='blue-darken-1' variant='text' @click='save')
          | Kaydet
  Toast(ref="toastDialogRef")
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { clone } from 'ramda';
import { isEquals, Toast, isNullOrEmpty, usePromisifiedDialog } from '../utils';

const toastDialogRef = ref(null)

const defaultItem = () => ({
  title: '',
  description: '',
});

const dialog = usePromisifiedDialog(defaultItem());
const edit = async newValue => { 
    dialog.clear();
    let isNew = false;

  const noteToSave = await dialog.edit(clone(newValue) || defaultItem());

  if (!isEquals(clone(newValue) || defaultItem(), noteToSave)) {
    isNew = isNullOrEmpty(noteToSave?.id);

    const newData = {
        id: isNew ? Date.now() : noteToSave.id,
        title: noteToSave.title,
        description: noteToSave.description,
        ...(isNew ? { createDate: new Date().toISOString() }:
        {updateDate: new Date().toISOString(), createDate: noteToSave.createDate}),
    }

    window.ipcRenderer.store.set({[newData.id]: newData});

    const result = await window.ipcRenderer.store.get(newData.id);


     if (!isNullOrEmpty(result)) {
         toastDialogRef.value?.success("Kayıt başarılı");

       return true;
     }
    toastDialogRef.value?.error("Kayıt başarısız");
  }
  return false;
};
const save = async () => {
  dialog.save();
  dialog.clear();
  dialog.close();
};

const close = async () => {
  await dialog.cancel()
};

defineExpose({ toastDialogRef, edit })
</script>