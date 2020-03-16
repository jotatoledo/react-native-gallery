import React, { FunctionComponent, useState } from "react";
import { Camera } from "expo-camera";
import { View, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { IconButton, Colors } from "react-native-paper";

import { usePhotoGallery } from "../hooks";
import { environment } from "@environment";

type CameraScreenNavProp = StackNavigationProp<any, "Camera">;

type CameraScreenProps = {
  navigation: CameraScreenNavProp;
};

export const CameraScreen: FunctionComponent<CameraScreenProps> = ({
  navigation
}) => {
  const { takePhoto } = usePhotoGallery(environment.mediaAlbumName);
  const [type, setType] = useState<string>(Camera.Constants.Type.back);
  const [camera, setCamera] = useState<Camera>(null);

  const toggleCamera = () =>
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  return (
    <React.Fragment>
      <StatusBar hidden />
      <View style={styles.container}>
        <Camera ref={setCamera} style={styles.camera} type={type}>
          <View style={styles.camera_buttons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Gallery")}
              style={styles.camera_button_container_end}
            >
              <Ionicons name="md-photos" style={styles.camera_button_icon} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!camera}
              onPress={() => takePhoto(camera)}
              style={styles.camera_button_container_end}
            >
              <MaterialIcons name="camera" style={styles.camera_button_icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleCamera}
              style={styles.camera_button_container_end}
            >
              <MaterialCommunityIcons
                name="camera-switch"
                style={styles.camera_button_icon}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  camera_buttons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20
  },
  camera_button_icon: {
    color: "#fff",
    fontSize: 40
  },
  camera_buton_container_start: {
    alignItems: "center",
    alignSelf: "flex-start"
  },
  camera_button_container_end: {
    alignItems: "center",
    alignSelf: "flex-end"
  }
});
