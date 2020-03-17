import React, { FunctionComponent, useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { usePhotoGallery } from '../hooks';
import { environment } from '@environment';
import { useDeletedPhotoNotification } from '../components';
import { RootStackParamList } from '../Router';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  buttons: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  iconButton: {
    color: '#fff',
    fontSize: 40
  },
  buttonContainerStart: {
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  buttonContainerEnd: {
    alignItems: 'center',
    alignSelf: 'flex-end'
  }
});

type CameraScreenNavProp = StackNavigationProp<RootStackParamList, 'Camera'>;

type CameraScreenProps = {
  navigation: CameraScreenNavProp;
};

export const CameraScreen: FunctionComponent<CameraScreenProps> = ({ navigation }) => {
  const { dismiss } = useDeletedPhotoNotification();
  const { takePhoto } = usePhotoGallery(environment.mediaAlbumName);
  const [type, setType] = useState<string>(Camera.Constants.Type.back);
  const [camera, setCamera] = useState<Camera>(null);

  const toggleCamera = () =>
    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  useEffect(() => navigation.addListener('focus', dismiss), [navigation]);

  return (
    <React.Fragment>
      <StatusBar hidden />
      <View style={styles.container}>
        <Camera ref={setCamera} style={styles.camera} type={type}>
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => navigation.navigate('Gallery')} style={styles.buttonContainerEnd}>
              <Ionicons name="md-photos" style={styles.iconButton} />
            </TouchableOpacity>
            <TouchableOpacity disabled={!camera} onPress={() => takePhoto(camera)} style={styles.buttonContainerEnd}>
              <MaterialIcons name="camera" style={styles.iconButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCamera} style={styles.buttonContainerEnd}>
              <MaterialCommunityIcons name="camera-switch" style={styles.iconButton} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </React.Fragment>
  );
};
