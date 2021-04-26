import color from "color";
import { Module } from "vuex";

export enum ThemeCssVars {
  /** 
   * Background color for the page.
  */
  BackgroundColor = '--app-background-color',
  /**
   * Generic focus color for all interactive elements.
   */
  FocusColor = '--app-focus-color',
  /**
   * Low contrast color compared to background.
   */
  UnderBackgroundColor = '--app-under-background-color',
  /**
   * High constrast color compared to background.
   */
  OverBackgroundColor = '--app-over-background-color',
  /**
   * Color of the main navigation bar.
   */
  TopNavColor = '--app-top-nav-color',
  /**
   * Main font color for all elements.
   */
  FontColor = '--app-font-color',
  /**
   * Color of the border in sectioning elements.
   */
  SectionBorderColor = '--app-section-border-color',
  /**
   * Desired height for the top navigation bar.
   */
  TopNavHeight = '--app-top-nav-height'
}

function getColorsVars(mainColor: string) {
  const main = color(mainColor);
  const darkMode = main.isDark();

  return {
    [ThemeCssVars.BackgroundColor]: main.toString(),
    [ThemeCssVars.FocusColor]: darkMode ? main.lightness(70).toString() : main.darken(0.7).toString(),
    [ThemeCssVars.UnderBackgroundColor]: darkMode ? main.lightness(30).toString() : main.darken(0.3).toString(),
    [ThemeCssVars.OverBackgroundColor]: darkMode ? main.lightness(50).toString() : main.darken(0.5).toString(),
    [ThemeCssVars.TopNavColor]: (darkMode ? main.lightness(10) : main.darken(0.1)).toString(),
    [ThemeCssVars.FontColor]: darkMode ? "#999" : "#111",
    [ThemeCssVars.SectionBorderColor]: (darkMode
      ? main.lightness(15)
      : main.darken(0.2)
    ).toString(),
  } as const;
}

function getSizes() {
  return {
    [ThemeCssVars.TopNavHeight]: '60px',
  } as const;
}

class Theme {
  constructor(public mainColor: string) {}

  public isDark = color(this.mainColor).isDark();
  public colors = getColorsVars(this.mainColor);
  public sizes = getSizes();
}

const lightTheme = new Theme("#fff");
const darkTheme = new Theme("#000");

const state = {
  themeName: localStorage.getItem("theme") || ("dark" as "dark" | "light"),
};

const defineModule = <T extends Module<typeof state, any>>(mod: T) => mod;

export const ThemeModule = defineModule({
  namespaced: true,
  state,
  getters: {
    currentTheme(state) {
      return state.themeName === "dark" ? darkTheme : lightTheme;
    },
  },
  mutations: {
    SET_THEME: (state, newTheme: typeof state["themeName"]) => {
      localStorage.setItem("theme", newTheme);
      state.themeName = newTheme;
    },
  },
});
