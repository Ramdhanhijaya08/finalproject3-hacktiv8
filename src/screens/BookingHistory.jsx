import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Layout from '../componets/Layout';
import bali from '../assets/img/indonesia/bali.png';
import * as atom from '../app/store';
import {useAtom} from 'jotai';
import BookingCard from '../componets/card/BookingCard';

const BookingHistoryScreen = () => {
  const [bookingHistory] = useAtom(atom.bookingHistory);

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
          My Booking
        </Text>

        <View style={{marginTop: 30}}>
          {bookingHistory.length ? (
            bookingHistory.map((book, i) => (
              <BookingCard
                key={i}
                location={book.hotelInfo.location}
                image={{uri: book.hotelInfo.image.uri}}
                name={book.hotelInfo.name}
              />
            ))
          ) : (
            <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
              No hotel bookings yet
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

export default BookingHistoryScreen;
