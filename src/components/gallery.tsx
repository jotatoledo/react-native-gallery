import React, { FunctionComponent } from "react";
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header_icon: {
    fontSize: 36
  }
});

type GalleryProps = {
  photos: Asset[];
  onBackPress: () => void;
};

export const Gallery: FunctionComponent<GalleryProps> = ({
  onBackPress,
  photos
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header>
        <TouchableOpacity onPress={onBackPress}>
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
