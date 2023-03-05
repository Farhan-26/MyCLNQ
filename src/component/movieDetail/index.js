import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import images from '../../constants/images';

const {height, width} = Dimensions.get('window');

const MovieDetail = ({item}) => {
  return (
    <View style={styles.mainContainer}>
      <FastImage
        style={styles.image}
        source={images[item?.poster_image]}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.movieName}>{item?.name.substring(0, 15)}</Text>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  mainContainer: {marginBottom: 25},
  image: {
    height: height * 0.2,
    width: width / 3 - 15,
    marginHorizontal: 5,
    marginBottom: 4,
  },
  movieName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
    color: '#fff',
  },
});
