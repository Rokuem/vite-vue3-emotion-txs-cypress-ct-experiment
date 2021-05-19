import { computed } from 'vue';
import { storeApi } from '../../store/index';

export const useVars = <T extends Record<`--${string}`, string | number>>(vars: T) => {
  const useVar = (name: keyof T) => `${name}: ${vars[name]};`;

  return {
    useVar,
    useAllVars: () => {
      const varList = [];
      for (const name in vars) {
        varList.push(useVar(name));
      }

      return varList.join('\n');
    },
    getVar: (name: keyof T, fallback?: string | number) => `var(${name}${fallback ? ', ' + fallback : ''})`,
    setVar: (name: keyof T, value: string | number) => `${name}: ${value};`
  }
}

export const useTheme = () =>
  computed(() => {
    const theme = storeApi.theme.getters.currentTheme;

    const vars = useVars({
      ...theme.colors,
      ...theme.sizes
    });

    return {
      ...theme,
      ...vars,
      currentThemeName: computed(() => storeApi.theme.state.themeName),
    }
  });