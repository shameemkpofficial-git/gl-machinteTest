import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import InputText from '../../components/inputText';
import PrimaryButton from '../../components/primaryButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [password, setPassword] = useState('admin@123');
  const [userName, setUserName] = useState('gladmin');
  const [userDataDV, setUserDataDV] = useState([]);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (userName === 'gladmin' && password === 'admin@123') {
      navigation.navigate('ListUsers', { myPropUsername: 'gladmin' });
    } else {
      const matchingUser = userDataDV.find((user) => user.userName === userName && user.password === password);

      if (matchingUser) {
        alert('Login Success', 'You have successfully logged in!');
        navigation.navigate('ListUsers', { myPropUsername: userName });
      } else {
        alert('Login Failed', 'Invalid userName or password. Please try again.');
      }
    }
  };

  const listUsers = async () => {
    const existingUsersString = await AsyncStorage.getItem('users');
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
    setUserDataDV(existingUsers);
    console.log('Users from local DB: Login activity', existingUsers);
  };

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ height: '50%' }} />
      <View style={{ height: '50%', marginTop: 40, marginHorizontal: 30 }}>
        <InputText value={userName} onChangeText={setUserName} inputWidth="100%" placeholder="User Name" />
        <InputText value={password} onChangeText={setPassword} locked placeholder="Password" inputWidth="100%" />
        <View style={{ marginTop: 10 }}>
          <PrimaryButton btnTitle="LOGIN" btnColor="gray" onPress={handleLogin} textColor="#fff" />
        </View>
        <View style={{ marginTop: 30 }}>
          <PrimaryButton btnTitle="REGISTER" btnColor="gray" textColor="#fff" onPress={() => navigation.navigate('SignUp')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
