import { defineComponent } from 'vue';
import { AppNavbar } from '../navbars/AppNavbar/index';
import { css } from '@emotion/css';
import { useTheme } from '../composables/style';

export const Playground = defineComponent({
  setup(_, { slots }) {
    const theme = useTheme().value;

    const styles = {
      playground: css`
        align-items: center;
        background: ${theme.getVar('--app-background-color')};
        display: flex;
        height: 100vh;
        justify-content: center;
        left: 0;
        padding-top: ${theme.getVar('--app-top-nav-height')}px;
        position: fixed;
        top: 0;
        width: 100vw;
      `,
    };

    return () => (
      <main class={styles.playground}>
        <AppNavbar></AppNavbar>
        {slots.default?.()}
      </main>
    );
  },
});
