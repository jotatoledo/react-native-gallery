import React, { FunctionComponent } from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

import { Router } from "./Router";
import { DeletedPhotoNotificationProvider } from "./components";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "blue",
    accent: "tomato"
  }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <DeletedPhotoNotificationProvider>
        <Router />
      </DeletedPhotoNotificationProvider>
    </PaperProvider>
  );
}
