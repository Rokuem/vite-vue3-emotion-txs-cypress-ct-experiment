import { defineComponent, PropType, computed, reactive } from 'vue';
import { ToggleDirection } from './types';
import { css } from '@emotion/css';
import { useTheme } from '../../../composables/style';

export const UIToggler = defineComponent({
  props: {
    onToggle: {
      required: true,
      type: Function as PropType<(newValue: ToggleDirection) => void>,
    },
    value: {
      required: true,
      type: String as PropType<ToggleDirection>,
    },
    values: {
      requred: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: (Array as any) as PropType<[unknown, unknown]>,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  } as const,
  setup(props) {
    const oppositeDirection = computed(() =>
      props.value === ToggleDirection.LEFT
        ? ToggleDirection.RIGHT
        : ToggleDirection.LEFT
    );

    const toggleValue = () => props.onToggle(oppositeDirection.value);

    const theme = useTheme().value;

    const styles = {
      toggler: css`
        --toggler-width: 28px;
        --toggler-padding: 2px;
        --toggler-height: 10px;
        --toggler-border-size: 2px;
        --ball-size: var(--toggler-height);

        background: ${theme.getVar('--app-under-background-color')};
        border: var(--toggler-border-size) solid transparent;
        border-radius: calc(
          calc(
              var(--toggler-height) + var(--toggler-padding) * 2 +
                var(--toggler-border-size) * 2
            ) / 2
        );
        box-sizing: content-box;
        cursor: pointer;
        height: var(--toggler-height);
        label: UIToggler;
        padding: var(--toggler-padding);
        position: relative;
        transition: border 0.15s, opacity 0.15s, filter 0.15s;
        width: var(--toggler-width);

        &--right {
          --ball-position: calc(var(--toggler-width) - 100%);
        }

        &--left {
          --ball-position: 0;
        }

        &:focus {
          --ball-border: 2px solid ${theme.getVar('--app-focus-color')};

          border-color: ${theme.getVar('--app-focus-color')};
          outline: none;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        &:hover:not(:disabled) {
          filter: brightness(1.1);
        }
      `,
      togglerBall: css`
        background: ${theme.getVar('--app-over-background-color')};
        border: var(--ball-border, none);
        border-radius: 50%;
        box-sizing: border-box;
        height: var(--ball-size);
        label: UIToggler__ball;
        left: var(--toggler-padding);
        position: absolute;
        top: 50%;
        transform: translate(var(--ball-position), -50%);
        transition: transform 0.15s ease-out, border 0.15s;
        width: var(--ball-size);
      `,
    };

    return () => (
      <button
        data-value={props.value}
        onClick={toggleValue}
        class={[styles.toggler, [styles.toggler + '--' + props.value]]}
        disabled={props.disabled}
      >
        <div class={styles.togglerBall}></div>
      </button>
    );
  },
});
