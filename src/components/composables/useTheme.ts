import { computed } from 'vue';
import { storeApi } from '../../store/index';

export const useTheme = () =>
  computed(() => storeApi.theme.getters.currentTheme);
