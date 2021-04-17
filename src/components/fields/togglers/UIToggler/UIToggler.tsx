import { defineComponent, PropType, computed } from 'vue';
import { ToggleDirection } from './types';

export const UIToggler = defineComponent({
  props: {
    value: {
      type: String as PropType<ToggleDirection>,
      required: true
    },
    values: {
      type: Array as any as PropType<[unknown, unknown]>,
      requred: true
    },
    onToggle: {
      type: Function as PropType<(newValue: ToggleDirection) => void>,
      required: true
    }
  } as const,
  setup(props) {    
    const oppositeDirection = computed(() => props.value === ToggleDirection.LEFT ? ToggleDirection.RIGHT : ToggleDirection.LEFT);
    const toggleValue = () => props.onToggle(oppositeDirection.value);

    return () => (
      <div onClick={toggleValue}>
        Toggle
      </div>
    )
  }
});