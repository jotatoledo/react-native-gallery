import React, { FunctionComponent, useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ListRenderItemInfo
} from "react-native";
import { Asset } from "expo-media-library";
import { List, Avatar, Divider, TouchableRipple } from "react-native-paper";
import { format } from "date-fns";
import { StackNavigationProp } from "@react-navigation/stack";

import { usePhotoGallery } from "../hooks";
import { environment } from "@environment";
import { RootStackParamList } from "../Router";

const renderThumbnail = (item: Asset) => (
  <Avatar.Image source={{ uri: item.uri }} />
);
const renderPhoto = (nav: GalleryScreenNavProp) => ({
  item
}: ListRenderItemInfo<Asset>) => {
  return (
    <React.Fragment>
      <TouchableRipple
        onPress={() => nav.navigate("Photo", { photoId: item.id })}
      >
        <List.Item
          left={() => renderThumbnail(item)}
          title={item.filename}
          description={format(item.creationTime, "dd-MM-yyyy HH:mm")}
        />
      </TouchableRipple>
      <Divider inset />
    </React.Fragment>
  );
};

type GalleryScreenNavProp = StackNavigationProp<RootStackParamList, "Gallery">;

type GalleryScreenProps = {
  navigation: GalleryScreenNavProp;
};

export const GalleryScreen: FunctionComponent<GalleryScreenProps> = ({
  navigation
}) => {
  const { loadPhotos } = usePhotoGallery(environment.mediaAlbumName);
  const [photos, setPhotos] = useState<Asset[]>([]);

  useEffect(
    () =>
      navigation.addListener("focus", () => {
        loadPhotos(20)
          .then(res => res.assets)
          .catch(_ => [])
          .then(setPhotos);
      }),
    [navigation]
  );

  const renderPhotoNav = renderPhoto(navigation);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        renderItem={renderPhotoNav}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
