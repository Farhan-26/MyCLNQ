import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../constants/images';
import api from '../../constants/api';

const {height, width} = Dimensions.get('window');

const Header = ({searchText, onSearchClick, onBack}) => {
  const [search, setSearch] = useState(false); // this is check user want to search
  return (
    <ImageBackground source={images.nav_bar} style={styles.backgroundImage}>
      <View style={styles.hearderItem}>
        <TouchableOpacity onPress={onBack}>
          <Image source={images.back} style={styles.backIcon} />
        </TouchableOpacity>
        {search ? (
          <View style={styles.search}>
            <TextInput
              style={styles.textInput}
              autoFocus={true}
              placeholder="search"
              onChangeText={text => searchText(text)}
              placeholderTextColor={'#000'}
              onBlur={() => setSearch(false)}
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
          onSearchClick();
        }}>
        <Image source={images.search} style={styles.searchIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
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
    color: '#000',
  },
  headerText: {fontSize: 18, fontWeight: '500', color: '#fff'},
  searchIcon: {
    height: height * 0.03,
    width: width * 0.06,
    marginRight: 15,
  },
});
