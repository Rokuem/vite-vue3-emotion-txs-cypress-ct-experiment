import { computed, defineComponent } from 'vue';
import { css } from '@emotion/css';
import { storeApi } from '../../../store';
import { useTheme } from '../../composables/style';
import {
  ToggleDirection,
  UIToggler as Toggler,
} from '../../fields/togglers/UIToggler';

export const AppNavbar = defineComponent({
  setup(_, ctx) {
    const theme = useTheme().value;

    const navStyle = css`
      align-items: center;
      background-color: ${theme.getVar('--app-top-nav-color')};
      border: 1px solid ${theme.getVar('--app-section-border-color')};
      box-sizing: border-box;
      display: flex;
      height: ${theme.getVar('--app-top-nav-height')};
      justify-content: center;
      left: 0;
      padding: 16px;
      position: fixed;
      top: 0;
      width: 100%;
    `;

    const otherTheme = computed(() =>
      storeApi.theme.state.themeName === 'dark' ? 'light' : 'dark'
    );
    const toggleTheme = () =>
      storeApi.theme.mutations.SET_THEME(otherTheme.value);

    const togglerDirection = computed(() =>
      storeApi.theme.state.themeName === 'dark'
        ? ToggleDirection.RIGHT
        : ToggleDirection.LEFT
    );

    return () => (
      <nav class={navStyle} aria-label="Domain navigation">
        <Toggler
          {...ctx.attrs}
          values={['light', 'dark']}
          value={togglerDirection.value}
          onToggle={toggleTheme}
        ></Toggler>
      </nav>
    );
  },
});
