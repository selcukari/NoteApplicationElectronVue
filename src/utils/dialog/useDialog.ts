import { ref } from 'vue';

/**
 * This function enables dialog to be opened and closed.
 * @returns {object}
 * @example{
 *   const dialog = useDialog();
 *
 *   dialog.open(); //Dialog open
 *
 *   dialog.close() //Dialog close
 * }
 */
const useDialog = () => {
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

export default useDialog;
