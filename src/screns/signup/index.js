import React, { useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputText from '../../components/inputText';
import PrimaryButton from '../../components/primaryButton';
import { useNavigation } from '@react-navigation/native';
import RocketSvg from '../../assets/svg/rocket.js'


const SignUp = () => {
  const screenWidth = Dimensions.get('window').width;
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
      alert('AsyncStorage cleared successfully');
    } catch (error) {
      alert('Error clearing AsyncStorage: ', error);
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
        alert('Error registering user: ', error);
      }
    } else {
      alert('Invalid email');
    }
  };

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('userData', token);
      alert('stored successfully');
    } catch (error) {
      alert('Error storing token: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
       
    <View style={{height:'50%', marginTop:20}}>
    <ImageBackground source={require('../../assets/images/png/wave-bg.png')} style={[styles.imageContainer,{top:-screenHeight/7}]}>
        <View style={{padding:30, marginTop:88}}>
        <Text style={styles.mainTitle}>{"Register"}</Text>
        <Text style={styles.descriptionTitle}>{"Register and Navigate to login"}</Text>
        </View>
        <View style={{ padding: screenWidth / 10, marginLeft:screenWidth/1.7}}>
            <RocketSvg />
        </View>
    </ImageBackground>
    </View>
    <View style={{height:'50%', bottom:40}}>
        <InputText value={userName} onChangeText={setUserName} inputWidth="80%" placeholder="User Name" />
         <InputText value={dob} onChangeText={setDob} inputWidth="80%" placeholder="DOB" keyboardType="number-pad" maxLength={8} />
         <InputText value={email} onChangeText={setEmail} inputWidth="80%" placeholder="Email" />
        <InputText value={mobile} onChangeText={setMobile} inputWidth="80%" placeholder="Mobile" keyboardType="number-pad" maxLength={10} />
         <InputText value={password} onChangeText={setPassword} locked placeholder="Password" inputWidth="80%" />
    <PrimaryButton btnTitle={"LOGIN"} btnColor={'#5E72E4'} textColor={'#FFFFFF'} onPress={() => navigation.navigate('Login')} />
    <PrimaryButton btnTitle={"SIGN UP"} btnColor={'#5E72E4'} textColor={'#FFFFFF'}  onPress={handleRegister} />
</View>
</SafeAreaView>
    // <SafeAreaView style={styles.mainContainer}>
    //   <View style={{ height: '30%' }} />
    //   <View style={{ height: '50%', marginTop: 40, marginHorizontal: 0 }}>
    //     <InputText value={userName} onChangeText={setUserName} inputWidth="100%" placeholder="User Name" />
    //     <InputText value={dob} onChangeText={setDob} inputWidth="100%" placeholder="DOB" keyboardType="number-pad" maxLength={8} />
    //     <InputText value={email} onChangeText={setEmail} inputWidth="100%" placeholder="Email" />
    //     <InputText value={mobile} onChangeText={setMobile} inputWidth="100%" placeholder="Mobile" keyboardType="number-pad" maxLength={10} />
    //     <InputText value={password} onChangeText={setPassword} locked placeholder="Password" inputWidth="100%" />
    //     <View style={{ marginTop: 10 }}>
    //       <PrimaryButton btnTitle="REGISTER"  btnColor={'#5E72E4'} textColor={'#FFFFFF'}  onPress={handleRegister} />
    //     </View>
    //     <View style={{ marginTop: 30 }}>
    //       <PrimaryButton btnTitle="LOGIN"  btnColor={'#5E72E4'} textColor={'#FFFFFF'}  onPress={() => navigation.navigate('Login')} />
    //       <PrimaryButton btnTitle="CLEAR LOCAL" btnColor={'#5E72E4'} textColor={'#FFFFFF'}  onPress={handleClearLocal}  />
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  imageContainer: {
    height: 500,
    width: '100%',
    
},
mainTitle: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    textAlign: 'left',
    // color:'red'
    color: '#fafafa',
    
},
descriptionTitle: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 23,
    textAlign: 'left',
    // color:'red'
    color: '#fafafa',
    marginTop: 16
}
});
