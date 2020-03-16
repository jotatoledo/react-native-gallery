import React, { FunctionComponent, useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ListRenderItemInfo
} from "react-native";
import { Asset } from "expo-media-library";
import { ListItem, Avatar } from "react-native-elements";
import { format } from "date-fns";
import { StackNavigationProp } from "@react-navigation/stack";

import { usePhotoGallery } from "../hooks";
import { environment } from "@environment";
import { TouchableOpacity } from "react-native-gesture-handler";

const renderThumbnail = (item: Asset) => <Avatar source={{ uri: item.uri }} />;
const renderPhoto = (nav: GalleryScreenNavProp) => ({
  item
}: ListRenderItemInfo<Asset>) => {
  return (
    <TouchableOpacity
      onPress={() => nav.navigate("Photo", { photoId: item.id })}
    >
      <ListItem
        leftAvatar={renderThumbnail(item)}
        title={item.filename}
        subtitle={format(item.creationTime, "dd-MM-yyyy HH:mm")}
        bottomDivider
      />
    </TouchableOpacity>
  );
};

type GalleryScreenNavProp = StackNavigationProp<any, "Gallery">;

type GalleryScreenProps = {
  navigation: GalleryScreenNavProp;
};

export const GalleryScreen: FunctionComponent<GalleryScreenProps> = ({
  navigation
}) => {
  const { loadPhotos } = usePhotoGallery(environment.mediaAlbumName);
  const [photos, setPhotos] = useState<Asset[]>([]);

  useEffect(() => {
    loadPhotos(20)
      .then(res => res.assets)
      .catch(_ => [])
      .then(setPhotos);
  }, []);
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
