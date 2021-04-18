import { defineComponent, PropType, computed, reactive } from 'vue';
import { ToggleDirection } from './types';
import { css } from '@emotion/css';
import color from 'color';
import { useTheme } from '../../../composables/useTheme';

export const UIToggler = defineComponent({
  props: {
    value: {
      type: String as PropType<ToggleDirection>,
      required: true,
    },
    values: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: (Array as any) as PropType<[unknown, unknown]>,
      requred: true,
    },
    onToggle: {
      type: Function as PropType<(newValue: ToggleDirection) => void>,
      required: true,
    },
  } as const,
  setup(props) {
    const oppositeDirection = computed(() =>
      props.value === ToggleDirection.LEFT
        ? ToggleDirection.RIGHT
        : ToggleDirection.LEFT
    );
    const toggleValue = () => props.onToggle(oppositeDirection.value);
    const ballPosition = computed(() =>
      props.value === ToggleDirection.RIGHT
        ? 'calc(var(--toggler-width) - 100%)'
        : 0
    );

    const theme = useTheme();

    const styles = reactive({
      toggler: computed(
        () => css`
          --toggler-width: 30px;
          --toggler-padding: 3px;
          --toggler-height: 12px;
          --ball-position: ${ballPosition.value};
          --ball-size: var(--toggler-height);
          width: var(--toggler-width);
          height: var(--toggler-height);
          background: black;
          border-radius: calc(
            calc(var(--toggler-height) + var(--toggler-padding) * 2) / 2
          );
          position: relative;
          cursor: pointer;
          padding: var(--toggler-padding);
        `
      ),
      togglerBall: computed(
        () => css`
          width: var(--ball-size);
          height: var(--ball-size);
          border-radius: 50%;
          background: ${color(theme.value.colors.background)
            .lightness(30)
            .toString()};
          position: absolute;
          left: 0;
          top: 50%;
          transform: translate(var(--ball-position), -50%);
          transition: transform 0.15s ease-in-out;
        `
      ),
    });

    return () => (
      <div onClick={toggleValue} class={styles.toggler}>
        <div class={styles.togglerBall}></div>
      </div>
    );
  },
});
