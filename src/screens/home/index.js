import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import api, {allApiData} from '../../constants/api';

import images from '../../constants/images';

const {height, width} = Dimensions.get('window');

const Home = () => {
  // first api call

  const {content} = api?.ListingPage1?.page?.content_items;

  const [MovieList, setMovieList] = useState(content); // movie list detail state
  const [apiNumber, setApiNumber] = useState(1); // it is for api call when user scroll dow
  const [apiCall, setApiCall] = useState(false); // check api call or not
  const [search, setSearch] = useState(false); // this is check user want to search
  const [searchValue, setSearchValue] = useState(''); // this is for search value

  // if there is no search value then this useEffect run and set movie value
  useEffect(() => {
    if (searchValue.length <= 0) {
      setMovieList(content);
      setApiNumber(1);
    }
  }, [searchValue]);

  // this use effect for api call on pagination

  useEffect(() => {
    if (apiNumber <= 3 && apiCall) {
      let ListingPage = api[`ListingPage${apiNumber}`];

      let {content} = ListingPage?.page?.content_items;

      setMovieList(MovieList => [...MovieList, ...content]);
    }
  }, [apiNumber]);

  // this function for find search value is all that tree api

  const searchItem = text => {
    if (text) {
      const newData = allApiData.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setMovieList(newData);
    }
  };

  return (
    // main view
    <View style={styles.container}>
      {/* safe area view for ios */}
      <SafeAreaView style={styles.safeArea}>
        {/* hearder */}
        <ImageBackground source={images.nav_bar} style={styles.backgroundImage}>
          <View style={styles.hearderItem}>
            <Image source={images.back} style={styles.backIcon} />
            {search ? (
              <View style={styles.search}>
                <TextInput
                  style={styles.textInput}
                  value={searchValue}
                  autoFocus={true}
                  placeholder="search"
                  onChangeText={text => setSearchValue(text)}
                />
              </View>
            ) : (
              <Text style={styles.headerText}>
                {api?.ListingPage1?.page?.title}
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              setSearch(!search);
              searchItem(searchValue);
            }}>
            <Image source={images.search} style={styles.movieImage} />
          </TouchableOpacity>
        </ImageBackground>
        {/* render list items  */}
        <FlatList
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
          ListEmptyComponent={() => {
            return <Text style={styles.noData}>No Data Found</Text>;
          }}
          onEndReachedThreshold={0.9}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <View style={styles.mainContainer}>
                <FastImage
                  style={styles.image}
                  source={images[item?.poster_image]}
                  resizeMode={FastImage.resizeMode.contain}
                />

                <Text style={styles.movieName}>
                  {item?.name.substring(0, 15)}
                </Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#202020'},
  safeArea: {alignItems: 'center'},
  backgroundImage: {
    height: 52,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hearderItem: {flexDirection: 'row', alignItems: 'center'},
  backIcon: {
    height: height * 0.03,
    width: width * 0.07,
    marginHorizontal: 15,
    marginRight: 18,
  },
  search: {width: '75%'},
  textInput: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  headerText: {fontSize: 18, fontWeight: '500', color: '#fff'},
  movieImage: {
    height: height * 0.03,
    width: width * 0.06,
    marginRight: 15,
  },
  flatListContainer: {
    paddingTop: 15,
    paddingBottom: 35,
  },
  noData: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    marginTop: 90,
  },
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
