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
    cy.matchImageSnapshot('Default toggler state');
  });

  it('Can be toggled', () => {
    mount(UITogglerPlayground);
    const toggler = cy.get('[data-testid=toggler]');
    toggler.click();
    const togglerHiddenInput = toggler.get('input[type="hidden"]');
    togglerHiddenInput.should('have.attr', 'value', ToggleDirection.RIGHT);
    cy.matchImageSnapshot('Toggler right');
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

  it('Does not trigger hover style when hovered and disabled', () => {
    mount(UITogglerPlayground, {
      props: {
        disabled: true,
      },
    });

    const toggler = cy.get('[data-testid=toggler]');

    toggler.realHover();
    cy.matchImageSnapshot('Toggler disabled and hovered');
  });

  it('Can be hovered', () => {
    mount(UITogglerPlayground);
    const toggler = cy.get('[data-testid=toggler]');
    toggler.realHover();
    cy.matchImageSnapshot('Toggler hovered');
  });

  it('Can be focused', () => {
    mount(UITogglerPlayground);
    const toggler = cy.get('[data-testid=toggler]');
    toggler.focus();
    cy.matchImageSnapshot('Toggler focused');
  });
});
