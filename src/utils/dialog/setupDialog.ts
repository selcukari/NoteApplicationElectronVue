import { ref, computed } from 'vue';
import { DialogColors, ButtonColorsDefault } from './constants';
import stateDialog from './dialog';

const setupDialog = () => {
  const dialog = ref(stateDialog());
  const resolveDialog = ref(null);
  const message = ref(null);
  const title = ref(null);
  const options = ref({
    width: 300,
    color: DialogColors.PRIMARY,
    buttonColors: ButtonColorsDefault,
    okButtonText: 'OK',
    isCloseButtonEnabled: false,
  });

  const open = (dialogMessage) => {
    dialog.value.open();
    message.value = dialogMessage;

    return new Promise(resolve => {
      resolveDialog.value = resolve;
    });
  };

  const acceptButtonColor = computed(() => options.value.buttonColors.accept || options.value.color);

  const declineButtonColor = computed(() => options.value.buttonColors.decline || options.value.color);

  const closeDialog = () => {
    dialog.value.close();
  };

  return {
    dialog,
    message,
    options,
    open,
    closeDialog,
    acceptButtonColor,
    declineButtonColor,
    resolveDialog,
  };
};

export default setupDialog;
