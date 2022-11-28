import {TouchableOpacity, Image, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as atom from '../../app/store';
import {useAtom} from 'jotai';

const DestinationsCard = ({image, name}) => {
  const navigation = useNavigation();
  const [, setSearch] = useAtom(atom.search);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('Search', {name});
        setSearch(name);
      }}
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
