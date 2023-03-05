import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const EmpthData = () => {
  return (
    <View>
      <Text style={styles.noData}>No Data Found</Text>
    </View>
  );
};

export default EmpthData;

const styles = StyleSheet.create({
  noData: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginTop: 90,
    textAlign: 'center',
  },
});
