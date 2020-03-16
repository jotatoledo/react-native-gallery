import React, { FunctionComponent, useState, EventHandler } from "react";
import { Camera } from "expo-camera";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";

export type CameraWidgetProps = {
  onGalleryPress: EventHandler<any>;
  onCameraPress: (camera: Camera) => Promise<void>;
};

export const CameraWidget: FunctionComponent<CameraWidgetProps> = props => {
  const [type, setType] = useState<string>(Camera.Constants.Type.back);
  const [camera, setCamera] = useState<Camera>(null);

  const toggleCamera = () =>
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  return (
    <View style={styles.container}>
      <Camera ref={setCamera} style={styles.camera} type={type}>
        <View style={styles.camera_buttons}>
          <TouchableOpacity
            onPress={props.onGalleryPress}
            style={styles.camera_button_container_end}
          >
            <Ionicons name="md-photos" style={styles.camera_button_icon} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!camera}
            onPress={() => props.onCameraPress(camera)}
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
