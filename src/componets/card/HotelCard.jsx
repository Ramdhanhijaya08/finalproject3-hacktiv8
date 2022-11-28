import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import BookmarkIcon from '../../assets/svg/bookmark-hotel.svg';
import BookmarkActive from '../../assets/svg/bookmarked-hotel.svg';
import useBookmark from '../../hooks/useBookmark';

const HotelCard = props => {
  const navigation = useNavigation();
  const {bookmarkedHotel, bookmarkHandler} = useBookmark();

  return (
    <View
      style={{
        padding: 15,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={() => navigation.navigate('DetailHotel', {detail: props})}>
        <Image
          source={props.image}
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
            {props.name}
          </Text>
          <Text style={{marginTop: 10, color: 'black'}}>{props.location}</Text>
          <Text
            style={{
              fontWeight: '600',
              color: '#4C4DDC',
              fontSize: 16,
              marginTop: 10,
            }}>
            {props.rate}
            {'  '}
            <Text
              style={{
                fontWeight: '400',
                color: '#000',
                fontSize: 14,
              }}>
              ({props.review}) reviews
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 20, fontWeight: '600', color: '#4C4DDC'}}>
          {props.price}
        </Text>
        <Text>/ night</Text>
        <TouchableOpacity
          onPress={() => bookmarkHandler(props)}
          style={{
            marginTop: 20,
            alignSelf: 'flex-end',
          }}>
          {bookmarkedHotel.find(hotel => hotel.id === props.id) ? (
            <BookmarkActive height={22} width={22} />
          ) : (
            <BookmarkIcon height={22} width={22} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HotelCard;
