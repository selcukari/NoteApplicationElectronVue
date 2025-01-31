<template lang="pug">
.toast
  v-snackbar(v-model='snackbar' :timeout='props.timeout')
    | {{ text }}
    template(#actions)
      v-btn(color='blue' variant='text' @click='snackbar = false')
       | Tamam
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue';

const snackbar = ref(false);
const text = ref('');
const props = defineProps({
  timeout: {
  type: Number,
  default: 1500,
  },
});

const success = (message) => {
  snackbar.value = true;
  text.value = message;
};

const error = (message) => {
  snackbar.value = true;
  text.value = message;
};

defineExpose({ success, error });
</script>