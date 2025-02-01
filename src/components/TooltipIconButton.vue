<template lang="pug">
v-tooltip(location='top')
  template(#activator='{ props }')
    v-btn(
      icon v-bind='props' variant="outlined" :color="btnColor" 
      border :disabled="disabled" @click="onClick"
    )
      v-icon(color='grey-lighten-1')
        | {{ icon }}
  span {{ text }}
</template>
    
<script>
import { computed } from 'vue';

export default {
  name: 'TooltipIconButton',
  props: {
    btnColor: {
      type: String,
      required: false,
      default: null,
    },
    icon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['onClick'],
  setup(props, { emit }) {
    const baseClassName = 'tooltip-icon-button';

    const onClick = $event => {
      emit('onClick', $event);
    };

    const disabledClass = computed(() => {
      let className;

      if (props.disabled) {
        className = `${baseClassName}--disabled`;
      }

      return className;
    });

    return {
      onClick,
      disabledClass,
    };
  },
};
</script>
    