import { TypedVuexStore } from "typed-vuex-store";
import { ThemeModule } from "./modules/theme/index";
import { reactive } from "vue";

export const storeApi = reactive(
  new TypedVuexStore({
    modules: {
      theme: ThemeModule,
    },
  })
);
