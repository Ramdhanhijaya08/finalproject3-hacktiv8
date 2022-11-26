import axios from 'axios';
import Toast from 'react-native-toast-message';
import * as atom from '../app/store';
import {useAtom} from 'jotai';

const useUser = () => {
  const [user, setUser] = useAtom(atom.user);

  const login = async (email, password) => {
    const {data} = await axios('https://fakestoreapi.com/users');

    const findUser = data.find(user => user.email === email);
    if (findUser && findUser.password === password) {
      Toast.show({
        type: 'success',
        text1: 'Login successful',
      });

      setUser(findUser);
      return true;
    } else {
      Toast.show({
        type: 'error',
        text1: 'Incorrect email or password',
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return {user, login, logout};
};

export default useUser;
