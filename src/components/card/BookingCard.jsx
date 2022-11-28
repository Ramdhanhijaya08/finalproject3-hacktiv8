import React from 'react';
import {Image, Text, View} from 'react-native';

const BookingCard = ({image, name, location}) => {
  return (
    <View
      style={{
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={image}
          style={{width: 100, height: 100, borderRadius: 20}}
        />
        <View style={{marginLeft: 15}}>
          <Text
            style={{
              fontWeight: '600',
              fontSize: 20,
              color: 'black',
              maxWidth: 150,
            }}>
            {name}
          </Text>
          <Text style={{marginTop: 10, color: 'black'}}>{location}</Text>
          <View
            style={{
              backgroundColor: '#4C4DDC',
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 5,
              alignSelf: 'flex-start',
              marginTop: 10,
            }}>
            <Text style={{color: 'white'}}>Paid</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingCard;
