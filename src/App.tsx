import React, { FunctionComponent } from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import { Router } from "./Router";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f"
  }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Router />
    </PaperProvider>
  );
}
