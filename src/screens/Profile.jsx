import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import photoProfile from '../assets/img/photo-profile.png';
import Profile from '../assets/svg/profile.svg';
import LogoutIcon from '../assets/svg/logout.svg';
import useUser from '../hooks/useUser';
import * as atom from '../app/store';
import {useAtom} from 'jotai';

const ProfileScreen = ({navigation}) => {
  const {user, logout} = useUser();
  const [, setIsFromDetail] = useAtom(atom.isFromDetail);

  return (
    <Layout>
      <ScrollView style={[styles.container, {flex: 1}]}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            color: 'black',
            marginTop: 10,
          }}>
          Profile
        </Text>

        <View style={{marginTop: 30}}>
          {user ? (
            <>
              <Image
                source={photoProfile}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 10,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  fontSize: 22,
                  color: 'black',
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                {user.name.firstname + ' ' + user.name.lastname}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                {user.email}
              </Text>

              <View
                style={{
                  width: '100%',
                  backgroundColor: '#eee',
                  height: 2,
                  marginVertical: 25,
                }}
              />

              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                activeOpacity={0.8}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Profile />
                <Text style={{marginLeft: 10, color: 'black', fontSize: 16}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                  marginLeft: 5,
                }}>
                <LogoutIcon />
                <Text style={{marginLeft: 10, color: '#F24E1E', fontSize: 16}}>
                  Logout
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={{alignSelf: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsFromDetail(false);
                  navigation.navigate('Login');
                }}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: '#eee',
                  alignSelf: 'flex-start',
                  borderRadius: 10,
                }}>
                <Text style={{fontSize: 20, color: 'black'}}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
  },
});

export default ProfileScreen;
