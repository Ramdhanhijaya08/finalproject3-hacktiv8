import React from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import NotificationIcon from '../assets/svg/notification.svg';
import SearchBar from '../componets/SearchBar';
import IndonesianCiteis from '../componets/IndonesianCities';
import PopularDestinations from '../componets/PopularDestinations';
import NavMenu from '../componets/NavMenu';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
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
            Hi, Maung
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

      <NavMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default HomeScreen;
