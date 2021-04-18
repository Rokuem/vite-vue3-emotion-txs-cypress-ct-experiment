import { mount } from "@cypress/vue";
import { UITogglerPlayground } from "./TogglerPlaygorund";

describe("UIToggler", () => {
  it("renders", () => {
    mount(UITogglerPlayground);
  });
});
