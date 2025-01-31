import { ref } from 'vue';

const stateDialog = () => {
  const isActive = ref(false);

  const open = () => {
    isActive.value = true;
    console.log('Dialog is open');
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
