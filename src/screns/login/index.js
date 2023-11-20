import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import InputText from '../../components/inputText.js';
import PrimaryButton from '../../components/primaryButton.js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RocketSvg from '../../assets/svg/rocket.js'

const Login = () => {
  const [password, setPassword] = useState('admin@123');
  const [userName, setUserName] = useState('gladmin');
  const [userDataDV, setUserDataDV] = useState([]);
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

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
       
            <View style={{height:'50%', marginTop:20}}>
            <ImageBackground source={require('../../assets/images/png/wave-bg.png')} style={[styles.imageContainer,{top:-screenHeight/7}]}>
                <View style={{padding:30, marginTop:88}}>
                <Text style={styles.mainTitle}>{"GodLand"}</Text>
                <Text style={styles.descriptionTitle}>{"React Native Machine Test at lorem ipsum \nTest at lorem ipsum"}</Text>
                </View>
                <View style={{ padding: screenWidth / 10, marginLeft:screenWidth/1.7}}>
                    <RocketSvg />
                </View>
            </ImageBackground>
            </View>
            <View style={{height:'50%', marginTop:40}}>
            <InputText value={userName} onChangeText={setUserName} inputWidth="80%" placeholder="User Name" />
            <InputText value={password} onChangeText={setPassword} locked placeholder="Password" inputWidth="80%" />
            <PrimaryButton btnTitle={"LOGIN"} btnColor={'#5E72E4'} textColor={'#FFFFFF'} onPress={()=> handleLogin()} />
            <PrimaryButton btnTitle={"SIGN UP"} btnColor={'#5E72E4'} textColor={'#FFFFFF'}  onPress={() => navigation.navigate('SignUp')} />
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
