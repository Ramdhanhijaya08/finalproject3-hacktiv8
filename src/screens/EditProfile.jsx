import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import PrimaryButton from '../components/button/PrimaryButton';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import useUser from '../hooks/useUser';
import Toast from 'react-native-toast-message';

const EditProfileScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const {user, updateUser} = useUser();

  useEffect(() => {
    setFirstName(user.name.firstname);
    setLastName(user.name.lastname);
    setEmail(user.email);
    setPhone(user.phone);
  }, []);

  const updateHandler = () => {
    if (firstName.length && lastName.length && email.length && phone.length) {
      updateUser({firstName, lastName, email, phone});
      navigation.navigate('Profile');
    } else {
      Toast.show({
        type: 'error',
        text1: 'All fields must be filled in!',
      });
    }
  };

  return (
    <Layout>
      <Navbar title="Edit Profile" />
      <ScrollView style={[styles.container, {flex: 1}]}>
        <View style={{marginTop: 30}}>
          <TextInput
            placeholder="First Name"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#D6D6D6',
            }}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            placeholder="Last Name"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              borderWidth: 1,
              marginTop: 12,
              borderColor: '#D6D6D6',
            }}
            value={lastName}
            onChangeText={setLastName}
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
      </ScrollView>

      <View style={[styles.container, {paddingVertical: 30}]}>
        <PrimaryButton onPress={updateHandler}>Update</PrimaryButton>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default EditProfileScreen;
