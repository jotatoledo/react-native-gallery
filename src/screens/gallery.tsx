import React, { FunctionComponent, useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItemInfo
} from "react-native";
import { Asset } from "expo-media-library";
import { Header, Text, ListItem, Avatar } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { StackNavigationProp } from "@react-navigation/stack";

import { usePhotoGallery } from "../hooks";
import { environment } from "@environment";

const renderThumbnail = (item: Asset) => <Avatar source={{ uri: item.uri }} />;
const renderPhoto = ({ item }: ListRenderItemInfo<Asset>) => {
  return (
    <ListItem
      leftAvatar={renderThumbnail(item)}
      title={item.filename}
      subtitle={format(item.creationTime, "dd-MM-yyyy HH:mm")}
    />
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

  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" style={styles.header_icon} />
        </TouchableOpacity>
        <Text>React Native Gallery</Text>
      </Header>
      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        renderItem={renderPhoto}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header_icon: {
    fontSize: 36
  }
});
