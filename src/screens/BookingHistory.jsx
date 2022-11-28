import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Layout from '../components/Layout';
import * as atom from '../app/store';
import {useAtom} from 'jotai';
import BookingCard from '../components/card/BookingCard';

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
