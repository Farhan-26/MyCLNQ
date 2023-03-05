import React, {Suspense} from 'react';
import {StyleSheet, Text, View} from 'react-native';
const Home = React.lazy(() => import('./src/screens/home'));

//  this is api file link :    https://we.tl/t-LX1cSq1iu0

const App = () => {
  return (
    <Suspense
      fallback={
        <View style={styles.loader}>
          <Text style={styles.text}>Loading</Text>
        </View>
      }>
      <Home />
    </Suspense>
  );
};

export default App;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202020',
  },
  text: {fontSize: 20, color: '#fff'},
});
