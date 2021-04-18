import { css } from "@emotion/css";
import { defineComponent, watch, computed } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { AppNavbar } from "./components/navbars/AppNavbar/index";
import { storeApi } from "./store";
import { RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  setup() {
    const theme = computed(() => storeApi.theme.getters.currentTheme);

    const bodyStyle = computed(() =>
      css({
        fontFamily: "Roboto, sans-serif",
        webkitFontSmoothing: "antialiased",
        mozOsxFontSmoothing: "grayscale",
        textAlign: "center",
        color: theme.value.colors.fontColor,
        background: theme.value.colors.background,
      })
    );

    watch(
      bodyStyle,
      (newValue, oldValue) => {
        document.body.classList.add(newValue);
        if (oldValue) document.body.classList.remove(oldValue);
      },
      {
        immediate: true,
      }
    );

    const appStype = computed(() =>
      css({
        paddingTop: theme.value.sizes.topNavHeight,
      })
    );
    return () => (
      <main
        class={[
          appStype.value,
          storeApi.theme.state.themeName === "dark"
            ? "dark-mode"
            : "light-mode",
        ]}
      >
        <AppNavbar></AppNavbar>
        <RouterView></RouterView>
      </main>
    );
  },
});
