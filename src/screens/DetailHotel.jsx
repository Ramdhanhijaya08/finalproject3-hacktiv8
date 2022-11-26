import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Navbar from '../componets/Navbar';
import {getDetailHotel} from '../services/hotel';
import PrimaryButton from '../componets/button/PrimaryButton';
import LocationIcon from '../assets/svg/location.svg';
import useUser from '../hooks/useUser';
import Toast from 'react-native-toast-message';

const DetailHotelScreen = ({route, navigation}) => {
  const {id, price, name, image} = route.params;
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useUser();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getDetailHotel(id);
      setLoading(false);
      setHotel(res);
    })();
  }, [id]);

  const bookHandler = () => {
    if (!user) {
      Toast.show({
        type: 'info',
        text1: 'Login first before booking a hotel',
      });
      return navigation.navigate('Login');
    } else {
      console.log('ok');
    }
  };

  return (
    <View style={{flex: 1}}>
      <Navbar />
      <ScrollView>
        <Image
          source={{uri: image.uri}}
          style={{width: '100%', height: 250, marginTop: 20}}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#4C4DDC"
            style={{marginTop: 50}}
          />
        )}
        {hotel && !loading && (
          <View style={[styles.container]}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                color: 'black',
                marginTop: 20,
              }}>
              {hotel.summary?.name}
            </Text>
            <Text style={{marginTop: 10}}>
              <LocationIcon width={12} height={12} />{' '}
              {hotel.summary?.location.address.addressLine}
            </Text>
            <View
              style={{
                backgroundColor: '#eee',
                width: '100%',
                height: 2,
                marginVertical: 20,
              }}
            />

            <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
              Gallery Photos
            </Text>

            {/* {hotels.propertyGallery.images} */}
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 15}}>
              {hotel.propertyGallery?.images.map((photo, i) => (
                <Image
                  key={i}
                  source={{uri: photo.image.url}}
                  style={{
                    width: 120,
                    height: 100,
                    marginRight: 15,
                    borderRadius: 18,
                  }}
                />
              ))}
            </ScrollView>

            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '500',
                marginTop: 30,
              }}>
              Tagline
            </Text>
            <Text style={{marginTop: 15}}>{hotel.summary?.tagline}</Text>
          </View>
        )}
      </ScrollView>
      {hotel && !loading && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            paddingVertical: 20,
            borderTopEndRadius: 12,
            borderTopStartRadius: 12,
          }}>
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
                paddingHorizontal: 20,
              },
            ]}>
            <Text style={{fontSize: 24, color: '#4C4DDC', fontWeight: '600'}}>
              {price}
              <Text style={{color: 'black', fontSize: 14, fontWeight: '400'}}>
                {' '}
                / night
              </Text>
            </Text>
            <PrimaryButton
              style={{marginLeft: 25, flex: 1}}
              onPress={bookHandler}>
              Book Now
            </PrimaryButton>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default DetailHotelScreen;
