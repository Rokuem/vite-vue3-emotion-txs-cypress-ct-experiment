import { css } from '@emotion/css';
import { computed, defineComponent, reactive, watch } from 'vue';
import { AppNavbar } from './components/navbars/AppNavbar/index';
import { storeApi } from './store';
import { RouterView } from 'vue-router';
import { useTheme } from './components/composables/style';

export default defineComponent({
  name: 'App',
  setup() {
    const theme = useTheme();

    const bodyStyle = computed(
      () => css`
        background: ${theme.value.getVar('--app-background-color')};
        color: ${theme.value.getVar('--app-font-color')};
        font-family: Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        ${theme.value.useAllVars()}
      `
    );

    const styles = reactive({
      app: css`
        padding-top: ${theme.value.getVar('--app-top-nav-height')};
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
