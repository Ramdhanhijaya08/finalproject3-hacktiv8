import {TouchableOpacity} from 'react-native';
import ArrowLeftIcon from '../../assets/svg/arrow-left.svg';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({to}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{alignSelf: 'flex-start'}}
      onPress={to ? to : () => navigation.goBack()}>
      <ArrowLeftIcon width={24} height={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
