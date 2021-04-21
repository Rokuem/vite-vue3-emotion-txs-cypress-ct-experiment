import { computed, defineComponent } from 'vue';
import { css } from '@emotion/css';
import { storeApi } from '../../../store';
import { useTheme } from '../../composables/useTheme';
import {
  ToggleDirection,
  UIToggler as Toggler,
} from '../../fields/togglers/UIToggler';

export const AppNavbar = defineComponent({
  setup(_, ctx) {
    const theme = useTheme();

    const navStyle = computed(() => {
      return css`
        align-items: center;
        background-color: ${theme.value.colors.topNav};
        border: 1px solid ${theme.value.colors.sectionBorderColor};
        box-sizing: border-box;
        display: flex;
        height: ${theme.value.sizes.topNavHeight};
        justify-content: center;
        left: 0;
        padding: 16px;
        position: fixed;
        top: 0;
        width: 100%;
      `;
    });

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
      <nav class={navStyle.value} aria-label="Domain navigation">
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
