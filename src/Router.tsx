import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { CameraScreen, GalleryScreen, PhotoScreen } from './screens';

export type RootStackParamList = {
  Camera: undefined;
  Gallery: undefined;
  Photo: { photoId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const Router = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Camera">
      <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Gallery" component={GalleryScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
