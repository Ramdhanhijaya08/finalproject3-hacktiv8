import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import NotificationIcon from '../assets/svg/notification.svg';
import SearchBar from '../components/SearchBar';
import IndonesianCiteis from '../components/IndonesianCities';
import PopularDestinations from '../components/PopularDestinations';
import Layout from '../components/Layout';
import useUser from '../hooks/useUser';

const HomeScreen = () => {
  const {user} = useUser();

  return (
    <Layout>
      <ScrollView>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 20, color: '#000', fontWeight: '500'}}>
            {user ? `Hi ${user.name.firstname} 👋` : 'Welcome 👋'}
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 8,
              padding: 10,
              borderColor: '#EDEDED',
              borderWidth: 1,
              alignSelf: 'flex-start',
            }}>
            <NotificationIcon height={26} width={28} fill={'#000'} />
          </TouchableOpacity>
        </View>

        <SearchBar />

        <View
          style={[
            {
              marginTop: 10,
              marginVertical: 20,
            },
          ]}>
          <Text
            style={[
              {fontSize: 22, fontWeight: '700', color: '#000'},
              styles.container,
            ]}>
            Indonesian city
          </Text>

          <IndonesianCiteis />
        </View>

        <View>
          <Text
            style={[
              {fontSize: 22, fontWeight: '700', color: '#000'},
              styles.container,
            ]}>
            Popular Destinations
          </Text>

          <PopularDestinations />
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default HomeScreen;
