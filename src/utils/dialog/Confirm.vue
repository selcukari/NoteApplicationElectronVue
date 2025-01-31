<template lang="pug">
.confirm
  template(v-for="dialog in dialogs")
    v-dialog(v-model='dialog.dialog.isActive' max-width='500px')
      v-card
        v-card-title.text-h5 {{dialog.message}}
        v-card-actions
          v-spacer
          v-btn(color='blue-darken-1' variant='text' @click.native="accept(dialog)") EVET
          v-btn(color='blue-darken-1' variant='text' @click.native="decline(dialog)") HAYIR
          v-spacer
</template>

<script>
import useMultipleDialog from './useMultipleDialog';

export default {
  setup() {
    const {
      dialogs, open, close, accept, decline,
    } = useMultipleDialog();

    const closeDialogs = () => {
      dialogs.value.forEach(dialog => {
        close(dialog);
      });
    };

    return {
      dialogs,
      open,
      accept,
      decline,
      closeDialogs,
    };
  },
};
</script>
  