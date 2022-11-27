import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import PrimaryButton from '../componets/button/PrimaryButton';
import Navbar from '../componets/Navbar';
import useUser from '../hooks/useUser';
import * as atom from '../app/store';
import Toast from 'react-native-toast-message';

const ContactReservationScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const {user} = useUser();
  const [reservationInfo, setReservationInfo] = useAtom(atom.reservationInfo);

  const continueHandler = () => {
    if (name.length && email.length && phone.length) {
      setReservationInfo({
        ...reservationInfo,
        name,
        email,
        phone,
      });

      navigation.navigate('Payment');
    } else {
      Toast.show({
        type: 'error',
        text1: 'All fields must be filled',
      });
    }
  };

  useEffect(() => {
    setName(user.name.firstname + ' ' + user.name.lastname);
    setEmail(user.email);
    setPhone(user.phone);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Navbar title="Contact of Reservation" />

      <View style={[styles.container, {marginTop: 30, flex: 1}]}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: 'black',
            marginBottom: 15,
          }}>
          Contact Informations
        </Text>

        <TextInput
          placeholder="Name"
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#D6D6D6',
          }}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#D6D6D6',
            marginTop: 12,
          }}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Phone Number"
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#D6D6D6',
            marginTop: 12,
          }}
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={[styles.container, {paddingVertical: 30}]}>
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

export default ContactReservationScreen;
