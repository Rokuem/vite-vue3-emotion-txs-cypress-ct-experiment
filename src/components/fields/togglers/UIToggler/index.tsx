import { defineComponent, PropType, computed } from 'vue';

export enum ToggleDirection {
  LEFT = 'left',
  RIGHT = 'right'
}

export const UIToggler = defineComponent({
  emits: {
    toggle: (newValue: ToggleDirection) => true
  },
  props: {
    value: {
      type: String as PropType<ToggleDirection>,
      required: true
    },
    values: {
      type: Array as any as PropType<[unknown, unknown]>,
      requred: true
    }
  } as const,
  setup(props, ctx) {
    const oppositeDirection = computed(() => props.value === ToggleDirection.LEFT ? ToggleDirection.RIGHT : ToggleDirection.LEFT);
    const emitToggle = () => ctx.emit('toggle', oppositeDirection.value);

    return () => {
      <div onClick={emitToggle}>
        TOGGLER is {props.value}
      </div>
    }
  }
});