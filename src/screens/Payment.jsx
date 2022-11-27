import {useAtom} from 'jotai';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Navbar from '../componets/Navbar';
import * as atom from '../app/store';
import HotelCard from '../componets/card/HotelCard';
import PrimaryButton from '../componets/button/PrimaryButton';
import Toast from 'react-native-toast-message';

const PaymentSceen = ({navigation}) => {
  const [hotelTemp] = useAtom(atom.hotelTemp);
  const [reservationInfo] = useAtom(atom.reservationInfo);
  const [bookingHistory, setBookingHistory] = useAtom(atom.bookingHistory);

  const paymentHandler = () => {
    setBookingHistory([
      {
        hotelInfo: hotelTemp,
        reservationInfo,
      },
      ...bookingHistory,
    ]);

    Toast.show({
      type: 'success',
      text1: 'Successful booking',
    });

    navigation.navigate('BookingHistory');
  };

  return (
    <View style={{flex: 1}}>
      <Navbar title="Payment" />

      <View style={[styles.container, {flex: 1, marginTop: 30}]}>
        <HotelCard {...hotelTemp} />

        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>Check in</Text>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
              {reservationInfo.checkin}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>Check out</Text>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
              {reservationInfo.checkout}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>Guest</Text>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
              {reservationInfo.guest}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>Night</Text>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
              {reservationInfo.night}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 35,
            }}>
            <Text style={{fontSize: 18, color: 'black'}}>Total Price</Text>
            <Text style={{fontSize: 18, color: 'black', fontWeight: '500'}}>
              ${reservationInfo.totalPrice}
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.container, {paddingVertical: 30}]}>
        <PrimaryButton onPress={paymentHandler}>Confirm Payment</PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default PaymentSceen;
