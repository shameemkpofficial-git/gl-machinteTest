import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputText from '../../components/inputText';
import PrimaryButton from '../../components/primaryButton';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const screenHeight = Dimensions.get('window').height;

  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const navigation = useNavigation();

  const handleClearLocal = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared successfully');
    } catch (error) {
      console.error('Error clearing AsyncStorage: ', error);
    }
  };

  const handleRegister = async () => {
    const user = { userName, password, dob, email, mobile };
    const isEmptyField = Object.values(user).some(value => value === '');

    if (isEmptyField) {
      alert('Empty field is here.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      try {
        const existingUsersString = await AsyncStorage.getItem('users');
        const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
        const updatedUsers = [...existingUsers, user];

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
        storeToken('userData');
      } catch (error) {
        console.error('Error registering user: ', error);
      }
    } else {
      alert('Invalid email');
    }
  };

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('userData', token);
      console.log('Token stored successfully');
    } catch (error) {
      console.error('Error storing token: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ height: '30%' }} />
      <View style={{ height: '50%', marginTop: 40, marginHorizontal: 30 }}>
        <InputText value={userName} onChangeText={setUserName} inputWidth="100%" placeholder="User Name" />
        <InputText value={dob} onChangeText={setDob} inputWidth="100%" placeholder="DOB" keyboardType="number-pad" maxLength={8} />
        <InputText value={email} onChangeText={setEmail} inputWidth="100%" placeholder="Email" />
        <InputText value={mobile} onChangeText={setMobile} inputWidth="100%" placeholder="Mobile" keyboardType="number-pad" maxLength={10} />
        <InputText value={password} onChangeText={setPassword} locked placeholder="Password" inputWidth="100%" />
        <View style={{ marginTop: 10 }}>
          <PrimaryButton btnTitle="REGISTER" btnColor="gray" onPress={handleRegister} textColor="#fff" />
        </View>
        <View style={{ marginTop: 30 }}>
          <PrimaryButton btnTitle="LOGIN" btnColor="gray" textColor="#fff" onPress={() => navigation.navigate('Login')} />
          <PrimaryButton btnTitle="CLEAR LOCAL" btnColor="gray" onPress={handleClearLocal} textColor="#fff" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});
