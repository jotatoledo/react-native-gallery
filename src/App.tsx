import React, { useState, useEffect } from "react";
import { StatusBar, View } from "react-native";
import { ThemeProvider } from "react-native-elements";
import { Camera } from "expo-camera";
import { Asset } from "expo-media-library";

import { CameraWidget, Gallery } from "./components";
import { usePhotoGallery } from "./hooks";

export default function App() {
  const [showGallery, setShowGallery] = useState(false);
  const [photos, setPhotos] = useState<Asset[]>([]);
  const { takePhoto, loadPhotos } = usePhotoGallery("ReactNativeGallery");

  useEffect(() => {
    loadPhotos(20)
      .then(ps => ps.assets)
      .catch(_ => [])
      .then(assets => setPhotos([...photos, ...assets]));
  }, []);

  const addPhotoToGallery = async (c: Camera) => {
    const photo = await takePhoto(c);
    setPhotos([photo, ...photos]);
  };

  return (
    <ThemeProvider>
      <View style={{ flex: 1 }}>
        <StatusBar hidden={!showGallery} />
        {!showGallery ? (
          <CameraWidget
            onCameraPress={addPhotoToGallery}
            onGalleryPress={() => setShowGallery(!showGallery)}
          />
        ) : (
          <Gallery
            onBackPress={() => setShowGallery(!showGallery)}
            photos={photos}
          />
        )}
      </View>
    </ThemeProvider>
  );
}
