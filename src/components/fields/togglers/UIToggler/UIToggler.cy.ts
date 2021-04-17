import { mount } from "@cypress/vue";
import { UIToggler } from './UIToggler';
import { ToggleDirection } from './types';

describe('UIToggler', () => {
  it('renders', () => {
    mount(UIToggler, {
      props: {
        onToggle: () => console.log('Toggle!'),
        value: ToggleDirection.LEFT,
        values: [0, 1]
      }
    });
  })
})