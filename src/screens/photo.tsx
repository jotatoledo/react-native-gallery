import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Image } from "react-native-elements";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { AssetInfo } from "expo-media-library";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";

import { RootStackParamList } from "../Router";
import { usePhotoGallery } from "../hooks";
import { environment } from "@environment";

type PhotoScreenNavProp = NavigationProp<RootStackParamList, "Photo">;
type PhotoScreenRouteProp = RouteProp<RootStackParamList, "Photo">;

type PhotoScreenProps = {
  navigation: PhotoScreenNavProp;
  route: PhotoScreenRouteProp;
};

export function PhotoScreen({ route }: PhotoScreenProps) {
  const { loadPhoto } = usePhotoGallery(environment.mediaAlbumName);
  const [photo, setPhoto] = useState<AssetInfo>(null);
  const { photoId } = route.params;
  const openShareDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing is not available");
    } else {
      await Sharing.shareAsync(photo.uri);
    }
  };

  useEffect(() => {
    if (photoId) {
      loadPhoto(photoId).then(setPhoto);
    }
  }, [photoId, route]);
  return (
    <SafeAreaView style={style.wrapper}>
      <View style={style.image_container}>
        <Image
          source={{ uri: photo?.uri }}
          style={style.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={style.footer}>
        <TouchableOpacity onPress={openShareDialog}>
          <MaterialIcons name="share" style={style.button_icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="favorite-border" style={style.button_icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="delete-outline"
            style={style.button_icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  footer: {
    backgroundColor: "#fff",
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },
  button_icon: {
    fontSize: 28
  },
  image_container: {
    padding: 16,
    flex: 1
  },
  image: {
    height: "100%",
    width: "100%"
  }
});
