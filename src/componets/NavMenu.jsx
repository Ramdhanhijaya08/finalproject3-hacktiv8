import {View, TouchableOpacity, StyleSheet} from 'react-native';
import HomeIcon from '../assets/svg/home.svg';
import HomeActiveIcon from '../assets/svg/home-active.svg';
import CalenderIcon from '../assets/svg/calendar.svg';
import CalenderActiveIcon from '../assets/svg/calendar-active.svg';
import BookmarkIcon from '../assets/svg/bookmark.svg';
import BookmarkActiveIcon from '../assets/svg/bookmark-active.svg';
import ProfileIcon from '../assets/svg/profile.svg';
import ProfileActiveIcon from '../assets/svg/profile-active.svg';
import {useRoute} from '@react-navigation/native';

const NavMenu = () => {
  const route = useRoute();

  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: 10,
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        },
      ]}>
      <TouchableOpacity activeOpacity={0.8}>
        {route.name === 'Home' ? (
          <HomeActiveIcon width={30} height={30} />
        ) : (
          <HomeIcon width={30} height={30} />
        )}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        {route.name === 'BookingHistory' ? (
          <CalenderActiveIcon width={30} height={30} />
        ) : (
          <CalenderIcon width={30} height={30} />
        )}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        {route.name === 'Bookmark' ? (
          <BookmarkActiveIcon width={30} height={30} />
        ) : (
          <BookmarkIcon width={30} height={30} />
        )}
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8}>
        {route.name === 'Profile' ? (
          <ProfileActiveIcon width={30} height={30} />
        ) : (
          <ProfileIcon width={30} height={30} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default NavMenu;
