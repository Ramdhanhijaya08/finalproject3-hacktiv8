import {View} from 'react-native';
import NavMenu from './NavMenu';

const Layout = ({children}) => {
  return (
    <View style={{flex: 1}}>
      {children}
      <NavMenu />
    </View>
  );
};

export default Layout;
