import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import Search from '../assets/svg/search.svg';
import Filter from '../assets/svg/filter.svg';

const SearchBar = () => {
  return (
    <View
      style={[styles.container, {marginVertical: 26, position: 'relative'}]}>
      <View style={{position: 'absolute', top: 15, left: 10}}>
        <Search height={20} width={20} />
      </View>
      <TextInput
        style={{
          borderColor: '#D6D6D6',
          paddingVertical: 10,
          paddingHorizontal: 40,
          borderRadius: 8,
          borderWidth: 1,
        }}
        placeholder="Search Hotel"
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 12, right: 10}}
        activeOpacity={0.8}>
        <Filter height={28} width={28} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default SearchBar;
