import React, { FunctionComponent } from "react";
import { ThemeProvider } from "react-native-elements";

import { Router } from "./Router";

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
