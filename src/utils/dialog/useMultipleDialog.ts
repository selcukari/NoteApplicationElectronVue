import { ref } from 'vue';
import setupDialog from './setupDialog';

const useMultipleDialog = () => {
  const dialogs = ref([]);

  const open = (message, options) => {
    const dialog = setupDialog();
    dialogs.value.unshift(dialog);

    return dialog.open(message, options);
  };

  const removeDialog = dialog => {
    dialogs.value.splice(dialogs.value.indexOf(dialog), 1);
  };

  const close = dialog => {
    dialog.closeDialog();
    removeDialog(dialog);
  };

  const accept = dialog => {
    dialog.resolveDialog(true);
    dialog.closeDialog();
    removeDialog(dialog);
  };

  const decline = dialog => {
    dialog.resolveDialog(false);
    dialog.closeDialog();
    removeDialog(dialog);
  };

  return {
    dialogs,
    open,
    close,
    accept,
    decline,
  };
};

export default useMultipleDialog;
