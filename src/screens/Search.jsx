import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Navbar from '../components/Navbar';
import {getHotelList} from '../services/hotel';
import HotelCard from '../components/card/HotelCard';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import SortIcon from '../assets/svg/sort.svg';
import {useAtom} from 'jotai';
import * as atom from '../app/store';

const SearchScreen = ({route, navigation}) => {
  const {name} = route.params;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10);
  const [filterSearch] = useAtom(atom.filterSearch);

  useEffect(() => {
    (async () => {
      if (hotels.length % 10 === 0) {
        setLoading(true);
        const res = await getHotelList(
          name,
          count,
          filterSearch.minPrice,
          filterSearch.maxPrice,
        );

        if (res) setHotels(res);
        setLoading(false);
      }
    })();
  }, [name, count]);

  const sortByPrice = () => {
    const copyHotels = [...hotels];
    copyHotels.reverse();
    setHotels(copyHotels);
  };

  return (
    <Layout>
      <View style={[{marginTop: 15, flex: 1}]}>
        <Navbar title="Search Hotel" />
        <SearchBar />
        <View style={[{marginVertical: 20}, styles.container]}>
          {!hotels.length && !loading && (
            <Text style={{fontSize: 24, color: 'black', fontWeight: '500'}}>
              Hotel does not exist
            </Text>
          )}
          {hotels.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#000',
                  fontWeight: '500',
                  marginBottom: 10,
                }}>
                Count ({hotels.length})
              </Text>

              <TouchableOpacity
                style={{position: 'relative', top: -3}}
                onPress={sortByPrice}>
                <SortIcon width={18} height={18} />
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={hotels}
            onEndReached={() => setCount(prev => prev + 10)}
            keyExtractor={item => item.id}
            renderItem={({item: hotel}) => (
              <HotelCard
                id={hotel.id}
                key={hotel.id}
                image={{uri: hotel.propertyImage.image.url}}
                name={hotel.name.split(' ').slice(0, 2).join(' ')}
                location={
                  hotel.neighborhood !== null
                    ? hotel.neighborhood?.name + ', ' + name
                    : name
                }
                rate={hotel.reviews.score}
                review={hotel.reviews.total}
                price={hotel.price.lead.formatted}
              />
            )}
          />
        </View>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#4C4DDC"
          style={{marginVertical: 40}}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default SearchScreen;
