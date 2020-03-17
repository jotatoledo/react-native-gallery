import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import {
  createAlbumAsync,
  requestPermissionsAsync,
  getAssetsAsync,
  createAssetAsync,
  getAlbumAsync,
  SortBy,
  getAssetInfoAsync,
  deleteAssetsAsync
} from 'expo-media-library';

export interface Photo {
  uri: string;
  base64: string;
  height: number;
  width: number;
}

export function usePhotoGallery(albumName: string) {
  const [cameraRollGrant, setCameraRollGrant] = useState<boolean | null>(null);
  const [cameraGrant, setCameraGrant] = useState<boolean | null>(null);

  const requestGrants = () => {
    Promise.all([
      Camera.requestPermissionsAsync()
        .then(res => res.granted)
        .then(setCameraGrant),
      requestPermissionsAsync()
        .then(res => res.granted)
        .then(setCameraRollGrant)
    ]);
  };
  useEffect(() => {
    requestGrants();
  }, []);

  const removePhoto = (id: string) => deleteAssetsAsync(id);
  const loadPhoto = (id: string) =>
    getAlbumAsync(albumName).then(album => (!album ? Promise.reject('Album not created') : getAssetInfoAsync(id)));
  const loadPhotos = (size?: number, after?: string) =>
    getAlbumAsync(albumName).then(album =>
      !album
        ? Promise.reject('Album not created')
        : getAssetsAsync({
            album,
            first: size,
            after,
            sortBy: SortBy.creationTime
          })
    );
  const takePhoto = async (camera: Camera) => {
    const { uri } = await camera.takePictureAsync({
      quality: 1
    });
    const asset = await createAssetAsync(uri)
      .then(a => createAlbumAsync(albumName, a, false))
      .then(album => getAssetsAsync({ album, first: 1, sortBy: SortBy.creationTime }))
      .then(res => res.assets[0]);
    return asset;
  };
  return {
    granted: cameraRollGrant && cameraGrant,
    requestGrants,
    loadPhotos,
    loadPhoto,
    takePhoto,
    removePhoto
  };
}
