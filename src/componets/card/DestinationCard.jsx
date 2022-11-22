import {TouchableOpacity, Image, Text, View} from 'react-native';

const DestinationsCard = ({image, name}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        borderRadius: 20,
        marginBottom: 5,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        marginRight: 20,
        elevation: 3,
      }}>
      <Image source={image} />
      <View style={{padding: 20}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '500',
            color: '#000',
            textAlign: 'center',
          }}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DestinationsCard;
