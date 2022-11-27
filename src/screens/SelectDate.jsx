import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PrimaryButton from '../componets/button/PrimaryButton';
import Navbar from '../componets/Navbar';
import Toast from 'react-native-toast-message';
import * as atom from '../app/store';
import {useAtom} from 'jotai';
import {daysBetween} from '../utils/daysBetween';

const SelectDateScreen = ({navigation}) => {
  const [dateIn, setDateIn] = useState(new Date());
  const [openIn, setOpenIn] = useState(false);

  const [dateOut, setDateOut] = useState(new Date());
  const [openOut, setOpenOut] = useState(false);

  const [guest, setGuest] = useState(2);

  const [, setReservationInfo] = useAtom(atom.reservationInfo);
  const [hotelTemp] = useAtom(atom.hotelTemp);

  const continueHandler = () => {
    if (dateIn.toDateString() !== dateOut.toDateString()) {
      setReservationInfo({
        checkin: dateIn.toDateString(),
        checkout: dateOut.toDateString(),
        guest,
        night: daysBetween(dateOut, dateIn),
        totalPrice:
          daysBetween(dateOut, dateIn) *
          Number(hotelTemp.price.replace('$', '')),
      });
      navigation.navigate('ContactReservation');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Checkin date cannot be the same as checkout date',
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Navbar
        title="Select Date"
        to={() => navigation.navigate('DetailHotel', {detail: hotelTemp})}
      />

      <View style={[styles.container, {marginTop: 30, flex: 1}]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
              Check in
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
              Check out
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

        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            color: 'black',
            marginTop: 50,
          }}>
          Guest
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <PrimaryButton
            style={{width: 50}}
            onPress={() => setGuest(guest - 1 === 0 ? 1 : guest - 1)}>
            -
          </PrimaryButton>
          <Text style={{marginLeft: 20, fontSize: 20, fontWeight: '700'}}>
            {guest}
          </Text>
          <PrimaryButton
            style={{width: 50, marginLeft: 20}}
            onPress={() => setGuest(guest + 1)}>
            +
          </PrimaryButton>
        </View>
      </View>

      <View style={[styles.container, {paddingVertical: 30}]}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
            fontWeight: '600',
            marginBottom: 20,
          }}>
          Total: $
          {daysBetween(dateOut, dateIn) *
            Number(hotelTemp.price.replace('$', ''))}
        </Text>
        <PrimaryButton onPress={continueHandler}>Continue</PrimaryButton>
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

export default SelectDateScreen;
