import { defineComponent, PropType, computed, Fragment } from 'vue';
import { ToggleDirection } from './types';
import { css } from '@emotion/css';
import { useTheme, useVars } from '../../../composables/style';
import { ThemeCssVars } from '../../../../store/modules/theme';

export enum UITogglerCssVars {
  /**
   * Total width of the toggler.
   */
  TogglerWidth = '--toggler-width',
  /**
   * Inner padding of the toggler. (from border to the ball).
   */
  TogglerPadding = '--toggler-padding',
  /**
   * Desired height of the toggler.
   */
  TogglerHeight = '--toggler-height',
  /**
   * Thickness of toggler border when focused
   */
  TogglerFocusBorderSize = '--toggler-focus-border-size',
  /**
   * Size of the toggler height + padding.
   */
  TogglerInnerHeight = '--toggler-inner-height',
  /**
   * Size of the toggler inner height + borders.
   */
  TogglerTotalHeight = '--toggler-total-height',
  /**
   * Width and height of the toggler ball.
   */
  BallSize = '--ball-size',
}

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
    name: {
      type: String,
      default: 'toggler',
    },
  } as const,
  setup(props, ctx) {
    const oppositeDirection = computed(() =>
      props.value === ToggleDirection.LEFT
        ? ToggleDirection.RIGHT
        : ToggleDirection.LEFT
    );

    const toggleValue = () => props.onToggle(oppositeDirection.value);

    const theme = useTheme().value;

    const { useAllVars, getVar } = useVars({
      [UITogglerCssVars.TogglerWidth]: '28px',
      [UITogglerCssVars.TogglerPadding]: '2px',
      [UITogglerCssVars.TogglerHeight]: '10px',
      [UITogglerCssVars.TogglerFocusBorderSize]: '2px',
      [UITogglerCssVars.TogglerInnerHeight]: `calc(var(${UITogglerCssVars.TogglerHeight}) + var(${UITogglerCssVars.TogglerPadding}) * 2)`,
      [UITogglerCssVars.BallSize]: 'var(--toggler-height)',
      [UITogglerCssVars.TogglerTotalHeight]: `calc(var(${UITogglerCssVars.TogglerInnerHeight}) + var(${UITogglerCssVars.TogglerFocusBorderSize}) * 2)`,
    });

    const styles = {
      toggler: css`
        ${useAllVars()}

        background: ${theme.getVar(ThemeCssVars.UnderBackgroundColor)};
        border: ${getVar(UITogglerCssVars.TogglerFocusBorderSize)} solid
          transparent;
        border-radius: calc(${getVar(UITogglerCssVars.TogglerTotalHeight)} / 2);
        box-sizing: content-box;
        cursor: pointer;
        height: ${getVar(UITogglerCssVars.TogglerHeight)};
        label: UIToggler;
        padding: ${getVar(UITogglerCssVars.TogglerPadding)};
        position: relative;
        transition: border 0.15s, opacity 0.15s, filter 0.15s;
        width: ${getVar(UITogglerCssVars.TogglerWidth)};

        &--right {
          --ball-position: calc(
            ${getVar(UITogglerCssVars.TogglerWidth)} - 100%
          );
        }

        &--left {
          --ball-position: 0;
        }

        &:focus {
          --ball-border: 2px solid ${theme.getVar(ThemeCssVars.FocusColor)};

          border-color: ${theme.getVar(ThemeCssVars.FocusColor)};
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
        background: ${theme.getVar(ThemeCssVars.OverBackgroundColor)};
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
      <Fragment>
        <button
          onClick={toggleValue}
          class={[styles.toggler, [styles.toggler + '--' + props.value]]}
          disabled={props.disabled}
          {...ctx.attrs}
        >
          <div class={styles.togglerBall}></div>
        </button>
        <input type="hidden" value={props.value} name={props.name} />
      </Fragment>
    );
  },
});
