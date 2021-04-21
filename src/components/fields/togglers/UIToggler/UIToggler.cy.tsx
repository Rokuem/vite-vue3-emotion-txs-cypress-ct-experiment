import { mount } from '@cypress/vue';
import { sheet } from '@emotion/css';
import { defineComponent, ref } from 'vue';
import { ToggleDirection } from '.';
import { Playground } from '../../../cy/Playground';
import { UIToggler } from './UIToggler';

const UITogglerPlayground = defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const togglerDirection = ref(ToggleDirection.LEFT);
    const toggleDirection = () => {
      togglerDirection.value =
        togglerDirection.value === ToggleDirection.LEFT
          ? ToggleDirection.RIGHT
          : ToggleDirection.LEFT;
    };

    return () => (
      <Playground>
        <UIToggler
          data-testid="toggler"
          values={[0, 1]}
          disabled={props.disabled}
          value={togglerDirection.value}
          onToggle={toggleDirection}
        ></UIToggler>
      </Playground>
    );
  },
});

describe('UIToggler', () => {
  beforeEach(() => {
    sheet.tags.forEach((tag) => {
      document.body.appendChild(tag);
    });
  });
  it('Renders', () => {
    mount(UITogglerPlayground);
    cy.get('[data-testid=toggler]').should('exist');
  });

  it('Can be toggled', () => {
    mount(UITogglerPlayground);
    const toggler = cy.get('[data-testid=toggler]');
    toggler.click();
    toggler.should('have.attr', 'data-value', ToggleDirection.RIGHT);
    toggler.click();
    toggler.should('have.attr', 'data-value', ToggleDirection.LEFT);
  });

  it('Can be disabled', (done) => {
    mount(UITogglerPlayground, {
      props: {
        disabled: true,
      },
    });

    const toggler = cy.get('[data-testid=toggler]');

    toggler.click({ timeout: 100 });
    cy.once('fail', (err) => {
      expect(err.message).to.include('disabled');
      done();
    });
  });
});
