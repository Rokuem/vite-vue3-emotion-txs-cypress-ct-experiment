import { css } from '@emotion/css';
import { computed, defineComponent, reactive, watch } from 'vue';
import { AppNavbar } from './components/navbars/AppNavbar/index';
import { storeApi } from './store';
import { RouterView } from 'vue-router';
import { useTheme } from './components/composables/style';
import { ThemeCssVars } from './store/modules/theme';

export default defineComponent({
  name: 'App',
  setup() {
    const theme = useTheme();

    const bodyStyle = computed(
      () => css`
        background: ${theme.value.getVar(ThemeCssVars.BackgroundColor)};
        color: ${theme.value.getVar(ThemeCssVars.FontColor)};
        font-family: Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        ${theme.value.useAllVars()}
      `
    );

    const styles = reactive({
      app: css`
        padding-top: ${theme.value.getVar(ThemeCssVars.TopNavHeight)};
      `,
    });

    watch(
      bodyStyle,
      (newClassName, oldClassName) => {
        if (oldClassName) {
          document.body.classList.remove(oldClassName);
        }

        document.body.classList.add(newClassName);
      },
      {
        immediate: true,
      }
    );

    return () => (
      <main
        class={[
          styles.app,
          storeApi.theme.state.themeName === 'dark'
            ? 'dark-mode'
            : 'light-mode',
        ]}
      >
        <AppNavbar></AppNavbar>
        <RouterView></RouterView>
      </main>
    );
  },
});
