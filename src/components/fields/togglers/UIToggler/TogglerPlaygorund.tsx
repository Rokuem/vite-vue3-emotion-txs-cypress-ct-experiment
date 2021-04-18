import { defineComponent, ref } from "vue";
import { ToggleDirection } from ".";
import { UIToggler } from "./UIToggler";

export const UITogglerPlayground = defineComponent({
  setup() {
    const togglerDirection = ref(ToggleDirection.LEFT);
    const toggleDirection = () => {
      togglerDirection.value =
        togglerDirection.value === ToggleDirection.LEFT
          ? ToggleDirection.RIGHT
          : ToggleDirection.LEFT;
    };

    return () => (
      <UIToggler
        values={[0, 1]}
        value={togglerDirection.value}
        onToggle={toggleDirection}
      ></UIToggler>
    );
  },
});
