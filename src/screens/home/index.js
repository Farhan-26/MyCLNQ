import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

const MovieDetail = React.lazy(() => import('../../component/movieDetail'));
const Header = React.lazy(() => import('../../component/header'));
const EmpthData = React.lazy(() => import('../../component/emptyData'));

import api, {allApiData} from '../../constants/api';

const Home = () => {
  const flatListRef = useRef();
  // first api call

  const {content} = api?.ListingPage1?.page?.content_items;

  const [MovieList, setMovieList] = useState(content); // movie list detail state
  const [apiNumber, setApiNumber] = useState(1); // it is for api call when user scroll dow
  const [apiCall, setApiCall] = useState(false); // check api call or not
  const [searchValue, setSearchValue] = useState(''); // this is for search value
  const [refresh, setRefresh] = useState(false); // this is for search value

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
        return item?.name.toLowerCase().startsWith(searchValue.toLowerCase());
      });

      setMovieList(newData);
      setSearchValue('');
    }
  };

  // to get a seach text
  const getSearchText = value => {
    setSearchValue(value);
    setRefresh(true);
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
          showsVerticalScrollIndicator={false}
          data={MovieList}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                if (refresh) {
                  setMovieList(allApiData);
                  setRefresh(false);
                  setSearchValue('');
                }
              }}
            />
          }
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={() => {
            if (apiNumber < 3 && searchValue.length === 0 && !refresh) {
              setApiNumber(apiNumber + 1);
              setApiCall(true);
            }
          }}
          ListEmptyComponent={() => <EmpthData />}
          onEndReachedThreshold={0.5}
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
