import { computed, defineComponent, reactive } from 'vue';
import { AppNavbar } from '../navbars/AppNavbar/index';
import { css } from '@emotion/css';
import { useTheme } from '../composables/style';
import { ThemeCssVars } from '../../store/modules/theme';

export const Playground = defineComponent({
  setup(_, { slots }) {
    const theme = useTheme();

    const styles = reactive({
      playground: computed(
        () => css`
          ${theme.value.useAllVars()}

          align-items: center;
          background: ${theme.value.getVar(ThemeCssVars.BackgroundColor)};
          display: flex;
          height: 100vh;
          justify-content: center;
          left: 0;
          padding-top: ${theme.value.getVar(ThemeCssVars.TopNavHeight)};
          position: fixed;
          top: 0;
          width: 100vw;
        `
      ),
    });

    return () => (
      <main class={styles.playground}>
        <AppNavbar></AppNavbar>
        {slots.default?.()}
      </main>
    );
  },
});
