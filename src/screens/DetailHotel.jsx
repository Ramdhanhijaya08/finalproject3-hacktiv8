import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../componets/Navbar';
import {getDetailHotel} from '../services/hotel';
import PrimaryButton from '../componets/button/PrimaryButton';
import LocationIcon from '../assets/svg/location.svg';
import useUser from '../hooks/useUser';
import Toast from 'react-native-toast-message';
import BookmarkIcon from '../assets/svg/bookmark-hotel.svg';
import * as atom from '../app/store';
import {useAtom} from 'jotai';

const DetailHotelScreen = ({route, navigation}) => {
  const {detail} = route.params;
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useUser();

  const [, setHotelTemp] = useAtom(atom.hotelTemp);
  const [, setIsFromDetail] = useAtom(atom.isFromDetail);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await getDetailHotel(detail.id);
      setLoading(false);
      setHotel(res);
    })();
  }, [detail.id]);

  const bookHandler = () => {
    setHotelTemp(detail);
    if (!user) {
      Toast.show({
        type: 'info',
        text1: 'Login first before booking a hotel',
      });
      setIsFromDetail(true);
      return navigation.navigate('Login');
    } else {
      navigation.navigate('SelectDate');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={[
          styles.container,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <Navbar title="Hotel Detail" />
        <TouchableOpacity activeOpacity={0.8}>
          <BookmarkIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image
          source={{uri: detail.image.uri}}
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
              {detail.price}
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
