import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import PrimaryButton from './button/PrimaryButton';
import Filter from '../assets/svg/filter.svg';
import {useAtom} from 'jotai';
import * as atom from '../app/store';
import {useEffect, useMemo, useState} from 'react';
import CustomModal from './CustomModal';
import city from '../data/countries.json';
import {useNavigation} from '@react-navigation/native';
import XIcon from '../assets/svg/x.svg';
import Toast from 'react-native-toast-message';
import DatePicker from 'react-native-date-picker';

const cities = [];

city.data.forEach(c => cities.push(...c.cities));

const SearchBar = () => {
  const [search, setSearch] = useAtom(atom.search);
  const [isFocus, setIsFocus] = useState(false);
  const [isModalFilter, setModalFilter] = useState(false);
  const [isQuery, setIsQuery] = useState(false);

  const [filterSearch, setFilterSearch] = useAtom(atom.filterSearch);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [dateIn, setDateIn] = useState(new Date());
  const [openIn, setOpenIn] = useState(false);

  const [dateOut, setDateOut] = useState(new Date());
  const [openOut, setOpenOut] = useState(false);

  const navigation = useNavigation();

  const query = useMemo(
    () => cities.filter(c => c.toLowerCase().includes(search.toLowerCase())),
    [search, cities],
  );

  const applyFilterHandler = () => {
    if (minPrice.length == 0 || maxPrice.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Min price and Max price must be filled!',
      });
      return;
    }

    if (dateIn.toDateString() === dateOut.toDateString()) {
      Toast.show({
        type: 'error',
        text1: 'Checkin date cannot be the same as checkout date',
      });
      return;
    }

    if (Number(minPrice) < Number(maxPrice)) {
      setFilterSearch({
        minPrice,
        maxPrice,
        dateIn,
        dateOut,
      });
      setModalFilter(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'The min price must be smaller than the max price',
      });
    }
  };

  useEffect(() => {
    setMaxPrice(filterSearch.maxPrice);
    setMinPrice(filterSearch.minPrice);
    setDateIn(filterSearch.dateIn);
    setDateOut(filterSearch.dateOut);
  }, []);

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
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: '#000',
            marginBottom: 15,
          }}>
          Price Range (USD)
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <TextInput
            value={minPrice}
            onChangeText={value => setMinPrice(value.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#D6D6D6',
              marginLeft: 15,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#000',
              marginLeft: 15,
            }}>
            -
          </Text>
          <TextInput
            value={maxPrice}
            onChangeText={value => setMaxPrice(value.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#D6D6D6',
              marginLeft: 15,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
              Check in Date
            </Text>
            <TouchableOpacity
              onPress={() => setOpenIn(true)}
              style={{
                backgroundColor: '#eee',
                paddingHorizontal: 15,
                alignSelf: 'flex-start',
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 10,
              }}>
              <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>
                {dateIn.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <DatePicker
            mode="date"
            modal
            open={openIn}
            date={dateIn}
            onConfirm={date => {
              setOpenIn(false);
              setDateIn(date);
            }}
            onCancel={() => {
              setOpenIn(false);
            }}
          />

          <View>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
              Check out Date
            </Text>
            <TouchableOpacity
              onPress={() => setOpenOut(true)}
              style={{
                backgroundColor: '#eee',
                paddingHorizontal: 15,
                alignSelf: 'flex-start',
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 10,
              }}>
              <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>
                {dateOut.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <DatePicker
          mode="date"
          modal
          open={openOut}
          date={dateOut}
          onConfirm={date => {
            setOpenOut(false);
            setDateOut(date);
          }}
          onCancel={() => {
            setOpenOut(false);
          }}
        />

        <PrimaryButton onPress={applyFilterHandler} style={{marginTop: 30}}>
          Apply
        </PrimaryButton>
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
