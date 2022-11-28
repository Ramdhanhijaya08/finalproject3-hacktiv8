import * as atom from '../app/store';
import {useAtom} from 'jotai';
import Toast from 'react-native-toast-message';

const useBookmark = () => {
  const [bookmarkedHotel, setBookmarkedHotel] = useAtom(atom.bookmarkedHotel);

  const bookmarkHandler = selectedHotel => {
    const findHotel = bookmarkedHotel.find(
      hotel => hotel.id === selectedHotel.id,
    );
    if (!findHotel) {
      setBookmarkedHotel([
        {
          ...selectedHotel,
        },
        ...bookmarkedHotel,
      ]);

      Toast.show({
        type: 'success',
        text1: 'Successfully added to bookmarks',
      });
    } else {
      const filterHotel = bookmarkedHotel.filter(
        hotel => hotel.id !== selectedHotel.id,
      );
      setBookmarkedHotel(filterHotel);

      Toast.show({
        type: 'success',
        text1: 'Successfully remove from bookmarks',
      });
    }
  };

  return {
    bookmarkedHotel,
    bookmarkHandler,
  };
};

export default useBookmark;
