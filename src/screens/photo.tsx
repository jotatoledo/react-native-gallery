import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { AssetInfo } from 'expo-media-library';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Portal, Dialog, Paragraph, Button } from 'react-native-paper';
import * as Sharing from 'expo-sharing';

import { RootStackParamList } from '../Router';
import { usePhotoGallery } from '../hooks';
import { environment } from '@environment';
import { useDeletedPhotoNotification } from '../components';

const style = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },
  iconButton: {
    fontSize: 28
  },
  imageContainer: {
    padding: 16,
    flex: 1
  },
  image: {
    height: '100%',
    width: '100%'
  }
});

type PhotoScreenNavProp = NavigationProp<RootStackParamList, 'Photo'>;
type PhotoScreenRouteProp = RouteProp<RootStackParamList, 'Photo'>;

type PhotoScreenProps = {
  navigation: PhotoScreenNavProp;
  route: PhotoScreenRouteProp;
};

export function PhotoScreen({ route, navigation }: PhotoScreenProps) {
  const { loadPhoto, removePhoto } = usePhotoGallery(environment.mediaAlbumName);
  const [photo, setPhoto] = useState<AssetInfo>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { notify, dismiss } = useDeletedPhotoNotification();

  const { photoId } = route.params;
  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert('Sharing is not available');
    } else {
      await Sharing.shareAsync(photo.uri);
    }
  };
  const confirmdelete = () => setIsDeleteDialogOpen(true);
  const cancelDelete = () => setIsDeleteDialogOpen(false);
  const deletePhoto = () =>
    removePhoto(photo.id).then(_ => {
      notify(photo);
      navigation.goBack();
    });

  useEffect(() => {
    if (photoId) {
      loadPhoto(photoId).then(setPhoto);
    }
  }, [photoId, route]);
  useEffect(() => navigation.addListener('focus', dismiss), [navigation]);

  return (
    <SafeAreaView style={style.wrapper}>
      <View style={style.imageContainer}>
        <Image source={{ uri: photo?.uri }} style={style.image} />
      </View>
      <View style={style.footer}>
        <TouchableOpacity onPress={openShareDialog}>
          <MaterialIcons name="share" style={style.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="favorite-border" style={style.iconButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={confirmdelete}>
          <MaterialCommunityIcons name="delete-outline" style={style.iconButton} />
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={isDeleteDialogOpen} onDismiss={cancelDelete}>
          <Dialog.Content>
            <Paragraph>Delete the picture &apos;{photo?.filename}&apos;?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelDelete}>Cancel</Button>
            <Button onPress={deletePhoto}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}
