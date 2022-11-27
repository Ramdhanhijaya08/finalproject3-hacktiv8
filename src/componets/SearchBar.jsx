import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import Filter from '../assets/svg/filter.svg';
import {useAtom} from 'jotai';
import * as atom from '../app/store';
import {useMemo, useState} from 'react';
import CustomModal from './CustomModal';
import city from '../data/countries.json';
import {useNavigation} from '@react-navigation/native';
import XIcon from '../assets/svg/x.svg';

const cities = [];

city.data.forEach(c => cities.push(...c.cities));

const SearchBar = () => {
  const [search, setSearch] = useAtom(atom.search);
  const [isFocus, setIsFocus] = useState(false);
  const [isModalFilter, setModalFilter] = useState(false);
  const [isQuery, setIsQuery] = useState(false);

  const navigation = useNavigation();

  const query = useMemo(
    () => cities.filter(c => c.toLowerCase().includes(search.toLowerCase())),
    [search, cities],
  );

  return (
    <>
      <View
        style={[styles.container, {marginVertical: 26, position: 'relative'}]}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          onFocus={() => {
            setIsFocus(true);
            setIsQuery(true);
          }}
          onBlur={() => setIsFocus(false)}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: isFocus ? '#4C4DDC' : '#D6D6D6',
          }}
          placeholder="Search Hotels By City"
        />
        {search && (
          <TouchableOpacity
            onPress={() => setSearch('')}
            activeOpacity={0.8}
            style={{
              position: 'absolute',
              top: 12,
              right: 50,
              backgroundColor: '#4C4DDC',
              padding: 6,
              borderRadius: 7,
            }}>
            <XIcon height={18} width={18} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => setModalFilter(!isModalFilter)}
          style={{position: 'absolute', top: 12, right: 10}}
          activeOpacity={0.8}>
          <Filter height={28} width={28} />
        </TouchableOpacity>

        {search && isQuery && (
          <FlatList
            data={query}
            keyExtractor={(item, i) => item + i}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search', {name: item});
                  setIsQuery(false);
                }}
                style={{borderBottomWidth: 1, borderBottomColor: '#00000080'}}>
                <Text style={{color: 'black', padding: 10}}>{item}</Text>
              </TouchableOpacity>
            )}
            style={{
              position: 'absolute',
              zIndex: 20,
              maxHeight: 250,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#D6D6D6',
              width: '100%',
              top: 60,
              borderRadius: 8,
            }}
          />
        )}
      </View>

      <CustomModal
        toggle={isModalFilter}
        onClose={() => setModalFilter(false)}
        title="Filter Search">
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
        <Text>Test</Text>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default SearchBar;
