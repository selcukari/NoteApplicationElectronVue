<template lang="pug">
.confirm
  template(v-for="dialog in dialogs")
    v-dialog(v-model='dialog.dialog.isActive' width='500px')
      v-card
        v-card-title.text-h5.wrap-text {{dialog.message}}
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

    const warning = () => async (message) => open(message, {
    color: "warning",
    buttonColors: {
      accept: "warning",
      decline: "gray", 
    },
  });

    return {
      dialogs,
      warning,
      open,
      accept,
      decline,
      closeDialogs,
    };
  },
};
</script>
<style scoped>
.wrap-text {
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
</style>
  