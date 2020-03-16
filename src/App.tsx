import React from "react";
import { ThemeProvider } from "react-native-elements";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { CameraScreen, GalleryScreen } from "./screens";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar hidden={false} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Camera"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
