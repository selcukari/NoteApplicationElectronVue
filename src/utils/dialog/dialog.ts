import { ref } from 'vue';

const stateDialog = () => {
  const isActive = ref(false);

  const open = () => {
    isActive.value = true;
  };
  const close = () => {
    isActive.value = false;
  };

  return {
    open,
    close,
    isActive,
  };
};

export default stateDialog;
