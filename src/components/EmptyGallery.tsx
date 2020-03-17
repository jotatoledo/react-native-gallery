import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Paragraph, Headline, Button, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const style = StyleSheet.create({
  wrapper: {
    padding: 16,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    marginBottom: 16
  },
  button: {
    marginTop: 12
  }
});

export function EmptyGallery() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={style.wrapper}>
      <Avatar.Icon style={style.image} size={128} icon="folder" />
      <Headline>Your gallery is empty</Headline>
      <Paragraph>Take pictures with your phone and they will show up here.</Paragraph>
      <Button icon="camera" mode="contained" style={style.button} onPress={() => navigation.navigate('Camera')}>
        Open camera
      </Button>
    </SafeAreaView>
  );
}
