import { computed, defineComponent } from 'vue';
import { css } from '@emotion/css';
import { storeApi } from '../../../store';
import { ToggleDirection, UIToggler as Toggler } from '../../fields/togglers/UIToggler';

export const AppNavbar = defineComponent({
  setup() {
    const theme = computed(() => storeApi.theme.getters.currentTheme);

    const navStyle = computed(() => {
      return css({
        position: 'fixed',
        width: '100%',
        height: theme.value.sizes.topNavHeight,
        backgroundColor: theme.value.colors.topNav,
        border: `1px solid ${theme.value.colors.sectionBorderColor}`,
        top: 0,
        left: 0,
        boxSizing: 'border-box',
        padding: '16px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      })
    });

    const otherTheme = computed(() => storeApi.theme.state.themeName === 'dark' ? 'light' : 'dark');
    const toggleTheme = () => storeApi.theme.mutations.SET_THEME(otherTheme.value);

    const togglerDirection = computed(() => storeApi.theme.state.themeName === 'dark' ? ToggleDirection.RIGHT : ToggleDirection.LEFT);

    return () => (
      <nav class={navStyle.value} aria-label="Domain navigation">
        <Toggler values={['light', 'dark']} value={togglerDirection.value} onToggle={toggleTheme}></Toggler>
      </nav>
    );
  }
});