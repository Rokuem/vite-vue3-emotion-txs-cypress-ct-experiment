import { defineComponent, reactive, computed } from 'vue';
import { AppNavbar } from '../navbars/AppNavbar/index';
import { css } from '@emotion/css';
import { useTheme } from '../composables/useTheme';

export const Playground = defineComponent({
  setup(_, { slots }) {
    const theme = useTheme();

    const styles = reactive({
      playground: computed(
        () => css`
          align-items: center;
          background: ${theme.value.colors.background};
          display: flex;
          height: 100vh;
          justify-content: center;
          left: 0;
          padding-top: ${theme.value.sizes.topNavHeight}px;
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
