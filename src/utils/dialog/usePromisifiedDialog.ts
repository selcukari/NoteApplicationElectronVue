import { ref, inject } from 'vue';
import { clone } from 'ramda';
import useDialog from './useDialog';
import isEquals from '../isEquals';

const usePromisifiedDialog = (defaultValue = null, checkDirty = true) => {
  const confirmDialogRef = inject('confirmDialogRef');
  const initialLazyValue = ref(defaultValue);
  const lazyValue = ref(defaultValue);
  const lazyResolve = ref(null);
  const dialog = useDialog();

  const edit = newValue => {
    initialLazyValue.value = clone(newValue);
    lazyValue.value = clone(newValue);
    dialog.open();
    return new Promise(resolve => {
      lazyResolve.value = resolve;
    });
  };

  const clear = () => {
    lazyValue.value = clone(defaultValue);
    initialLazyValue.value = clone(defaultValue);
  };

  const close = () => {
    dialog.close();
  };

  const save = () => {
    lazyResolve.value(lazyValue.value);
    clear();
    close();
  };

  const cancel = async () => {
    if (
      (!checkDirty || !isEquals((lazyValue.value), (initialLazyValue.value)))
      && !(await confirmDialogRef.value.warning()('Yapmış olduğunuz değişiklikler iptal olacaktır. Devam etmek istiyor musunuz?'))) {
      return false;
    }

    lazyResolve.value(initialLazyValue.value);
    close();

    return true;
  };

  return {
    lazyValue,
    initialLazyValue,
    dialog,
    edit,
    save,
    close,
    cancel,
    clear,
  };
};

export default usePromisifiedDialog;
