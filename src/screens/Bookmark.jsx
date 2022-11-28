import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import HotelCard from '../components/card/HotelCard';
import Layout from '../components/Layout';
import useBookmark from '../hooks/useBookmark';

const BookmarkScreen = () => {
  const {bookmarkedHotel} = useBookmark();

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
          My Bookmark
        </Text>

        <View style={{marginTop: 30}}>
          {bookmarkedHotel.length ? (
            bookmarkedHotel.map((hotel, i) => <HotelCard key={i} {...hotel} />)
          ) : (
            <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
              No bookmarked hotels
            </Text>
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

export default BookmarkScreen;
