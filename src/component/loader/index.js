import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.loader}>
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  text: {fontSize: 20, color: '#fff'},
});
