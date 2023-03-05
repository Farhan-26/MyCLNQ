import React, {useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import EmpthData from '../../component/emptyData';
import Header from '../../component/header';
import MovieDetail from '../../component/movieDetail';

import api, {allApiData} from '../../constants/api';

const Home = () => {
  const flatListRef = useRef();
  // first api call

  const {content} = api?.ListingPage1?.page?.content_items;

  const [MovieList, setMovieList] = useState(content); // movie list detail state
  const [apiNumber, setApiNumber] = useState(1); // it is for api call when user scroll dow
  const [apiCall, setApiCall] = useState(false); // check api call or not
  const [searchValue, setSearchValue] = useState(''); // this is for search value

  // this use effect for api call on pagination

  useEffect(() => {
    if (apiNumber <= 3 && apiCall) {
      let ListingPage = api[`ListingPage${apiNumber}`];

      let {content} = ListingPage?.page?.content_items;

      setMovieList(MovieList => [...MovieList, ...content]);
    }
  }, [apiNumber]);

  // this function for find search value is all that tree api

  const searchItem = () => {
    if (searchValue !== '') {
      const newData = allApiData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = searchValue.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setMovieList(newData);
      setSearchValue('');
    }
  };

  // to get a seach text
  const getSearchText = value => {
    setSearchValue(value);
  };

  // this for back button

  const onBack = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  return (
    // main view
    <View style={styles.container}>
      {/* safe area view for ios */}
      <SafeAreaView style={styles.safeArea}>
        {/* hearder */}
        <Header
          searchText={getSearchText}
          onSearchClick={searchItem}
          onBack={onBack}
        />
        {/* render list items  */}
        <FlatList
          ref={flatListRef}
          data={MovieList}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (apiNumber < 3 && searchValue.length === 0) {
              setApiNumber(apiNumber + 1);
              setApiCall(true);
            }
          }}
          ListEmptyComponent={() => <EmpthData />}
          onEndReachedThreshold={0.9}
          numColumns={3}
          renderItem={({item}) => <MovieDetail item={item} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#202020'},
  safeArea: {alignItems: 'center'},
  flatListContainer: {
    paddingTop: 15,
    paddingBottom: 35,
  },
});
