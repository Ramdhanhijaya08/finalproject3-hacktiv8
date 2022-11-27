import {View, Text, StyleSheet, TextInput} from 'react-native';
import BackButton from '../componets/button/BackButton';
import LockIcon from '../assets/svg/lock.svg';
import EmailIcon from '../assets/svg/email.svg';
import {useState} from 'react';
import PrimaryButton from '../componets/button/PrimaryButton';
import Toast from 'react-native-toast-message';
import useUser from '../hooks/useUser';
import * as atom from '../app/store.js';
import {useAtom} from 'jotai';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isFocusEmail, setIsFocusEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isFocusPassword, setIsFocusPassword] = useState(false);
  const {login} = useUser();

  const [isFromDetail, setIsFromDetail] = useAtom(atom.isFromDetail);

  const loginHandler = async () => {
    if (email && password) {
      const res = await login(email, password);
      if (res) {
        !isFromDetail
          ? navigation.navigate('Home')
          : navigation.navigate('SelectDate');
        setIsFromDetail(false);
      } else {
        setPassword('');
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Fill in email and password correctly',
      });
    }
  };

  return (
    <View style={[{flex: 1, marginTop: 15}, styles.container]}>
      <BackButton />

      <Text
        style={{
          fontSize: 50,
          fontWeight: '700',
          color: 'black',
          marginTop: 50,
        }}>
        Login to your Account
      </Text>

      <View style={{position: 'relative', marginTop: 40}}>
        <View style={{position: 'absolute', top: 14, left: 10}}>
          <EmailIcon
            height={20}
            width={20}
            fill={email.length ? '#000' : '#A09E9E'}
          />
        </View>
        <TextInput
          value={email}
          onFocus={() => setIsFocusEmail(true)}
          onBlur={() => setIsFocusEmail(false)}
          onChangeText={setEmail}
          textContentType="emailAddress"
          placeholder="Email"
          style={{
            paddingVertical: 10,
            paddingHorizontal: 45,
            borderWidth: 1,
            borderColor: isFocusEmail ? '#4C4DDC' : '#fff',
            borderRadius: 10,
          }}
        />
      </View>

      <View style={{position: 'relative', marginTop: 30}}>
        <View style={{position: 'absolute', top: 14, left: 10}}>
          <LockIcon
            height={20}
            width={20}
            fill={password.length ? '#000' : '#A09E9E'}
          />
        </View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          textContentType="password"
          onFocus={() => setIsFocusPassword(true)}
          onBlur={() => setIsFocusPassword(false)}
          secureTextEntry={true}
          placeholder="Password"
          style={{
            paddingVertical: 10,
            paddingHorizontal: 45,
            borderWidth: 1,
            borderColor: isFocusPassword ? '#4C4DDC' : '#fff',
            borderRadius: 10,
          }}
        />
      </View>
      <PrimaryButton style={{marginTop: 50}} onPress={loginHandler}>
        Sign In
      </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default LoginScreen;
