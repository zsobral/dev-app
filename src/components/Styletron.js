import React, { createContext } from "react";
import { Provider, DebugEngine, createStyled } from "styletron-react";
import { Client } from "styletron-engine-atomic";
import { driver, getInitialStyle } from "styletron-standard";

const debug = process.env.NODE_ENV === "development" && new DebugEngine();

const client = new Client();

const THEME = {
  colors: {
    primary: "#000000",
    body: "#FAFAFA",
    headerBackground: "#FFFFFF",
    cardBackground: "#ffffff",
    buttonText: "#FFFFFF",
  },
  shadows: {
    header: "0px 1px 1px rgba(0, 0, 0, 0.1)",
    card: "rgba(0, 0, 0, 0.1) 1px 1px 3px",
  },
  sizings: {
    scale1: "8px",
    scale2: "16px",
    container: "1000px",
  },
  radius: {
    button: "4px",
    card: "4px",
  },
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={THEME}>{children}</ThemeContext.Provider>
  );
};

export const styled = createStyled({
  wrapper: (StyleComponent) => (props) => {
    return (
      <ThemeContext.Consumer>
        {(theme) => <StyleComponent {...props} $theme={theme} />}
      </ThemeContext.Consumer>
    );
  },
  driver,
  getInitialStyle,
});

export const StyletronProvider = ({ children }) => (
  <Provider value={client} debug={debug} debugAfterHydration>
    <ThemeProvider>{children}</ThemeProvider>
  </Provider>
);
