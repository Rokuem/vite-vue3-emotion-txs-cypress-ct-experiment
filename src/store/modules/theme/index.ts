import color from "color";
import { Module } from "vuex";

function getColors(mainColor: string) {
  const main = color(mainColor);
  const darkMode = main.isDark();

  return {
    background: main.toString(),
    focusColor: darkMode ? main.lightness(70).toString() : main.darken(0.7).toString(),
    underBackground: darkMode ? main.lightness(30).toString() : main.darken(0.3).toString(),
    overBackground: darkMode ? main.lightness(50).toString() : main.darken(0.5).toString(),
    topNav: (darkMode ? main.lightness(10) : main.darken(0.1)).toString(),
    fontColor: darkMode ? "#999" : "#111",
    sectionBorderColor: (darkMode
      ? main.lightness(15)
      : main.darken(0.2)
    ).toString(),
  } as const;
}

function getSizes() {
  return {
    topNavHeight: 60,
  } as const;
}

class Theme {
  constructor(public mainColor: string) {}

  public isDark = color(this.mainColor).isDark();
  public colors = getColors(this.mainColor);
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
