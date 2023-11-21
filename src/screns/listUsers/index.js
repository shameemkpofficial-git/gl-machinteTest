import { FlatList, StyleSheet, Text, ToastAndroid, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputText from '../../components/inputText';
import PrimaryButton from '../../components/primaryButton';
import { useRoute } from '@react-navigation/native';


const ListUsers = () => {
  const [userList, setUserList] = useState("")
  const [editUserName, setEditUserName] = useState('')
  const [editDob, setEditDob] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editMobile, setEditMobile] = useState("")
  const [myDob, setmyDob] = useState("")
  const [myUsername, setMyUsername] = useState("")
  const [myEmail, setMyEmail] = useState("")
  const [myMobile, setMyMobile] = useState("")
  const route = useRoute();
  const additionalData = route.params?.myPropUsername;
  const [refresh, setRefresh] = useState(false);



  const renderItem = ({ item }) => (
    <View style={{ padding: 20, backgroundColor:'#F1F3FF', marginHorizontal:20, borderRadius:20, marginTop:10 }}>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>Username</Text>
      </View>
      <InputText placeholder={item.userName} value={editUserName} onChangeText={setEditUserName}  locked={additionalData === 'gladmin'?false:false}    inputWidth={"70%"} />
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>DOB</Text>
      </View>
      <InputText placeholder={item.dob} value={editDob} onChangeText={(text)=>setEditDob(text)} locked={additionalData === 'gladmin'?true:false}  inputWidth={"70%"} />
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>Email</Text>
      </View>
      <InputText placeholder={item.email} value={editEmail} onChangeText={(text)=>setEditEmail(text)} locked={additionalData === 'gladmin'?true:false}  inputWidth={"70%"} />
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>Mobile</Text>
      </View>
      <InputText placeholder={item.mobile} value={editMobile} onChangeText={(text)=>setEditMobile(text)} locked={additionalData === 'gladmin'?true:false}  inputWidth={"70%"} />
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <PrimaryButton btnTitle={"SUBMIT"} btnColor={'#5E72E4'} textColor={'#FFFFFF'} onPress={()=>editUsersProfileDB(item.userName)} />
      </View>
      <View style={{width:'50%'}}>
      <PrimaryButton btnTitle={"DELETE USER"} btnColor={'#5E72E4'} textColor={'#FFFFFF'} onPress={()=>deleteUserFromStorage(item.userName)} />
      </View>
      {/* <TouchableOpacity style={{backgroundColor:'gray', width:'30%'}} onPress={()=>editUsersProfileDB(item.userName)}>
        
        <Text style={{textAlign:'center', alignSelf:'center'}}>Submit my edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'gray', width:'30%',marginLeft:10}} onPress={()=>deleteUserFromStorage(item.userName)}>
        <Text style={{textAlign:'center', alignSelf:'center'}}>Delete</Text>
      </TouchableOpacity> */}
      </View>
    </View>
  );
  const searchMyDataLoca = async()=>{
    const existingUsersString = await AsyncStorage.getItem('users');
    const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
    const foundUser = existingUsers.find(user => user.userName === route.params.myPropUsername);
    if (foundUser) {
      setmyDob(foundUser.dob)
      setMyEmail(foundUser.email)
      setMyMobile(foundUser.mobile)
      setMyUsername(foundUser.userName)
    } else if(additionalData==='gladmin'){
      alert('admin found');
    }else{
      alert('404 user not found')
    }
  }

  const editMyProfileDB= async()=>{
    // const existingUsersString = await AsyncStorage.getItem('users');
    // const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
    
    try {
      // Get the existing user data from AsyncStorage
      const existingUsersString = await AsyncStorage.getItem('users');
      
      if (existingUsersString) {
        // Parse the existing data
        const existingUsers = JSON.parse(existingUsersString);
  
        // Find the user with the specified username
        const userToUpdateIndex = existingUsers.findIndex(user => user.userName === myUsername);
  
        if (userToUpdateIndex !== -1) {
          // Update the user's dob
          existingUsers[userToUpdateIndex].email = myEmail;
  
          // Save the updated data back to AsyncStorage
          await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
  
          alert(`User ${myUsername}'s updated successfully.`);
        } else {
          alert(`User with username ${myUsername} not found.`);
        }
      } else {
        alert('No user data found in AsyncStorage.');
      }
    } catch (error) {
      alert('Error updating user dob:', error);
    }
  }
 

  const deleteUserFromStorage = async (usernameToDelete) => {
  try {
    // Get the existing user data from AsyncStorage
    const existingUsersString = await AsyncStorage.getItem('users');

    if (existingUsersString) {
      // Parse the existing data
      let existingUsers = JSON.parse(existingUsersString);

      // Find the index of the user to delete
      const userToDeleteIndex = existingUsers.findIndex(user => user.userName === usernameToDelete);

      if (userToDeleteIndex !== -1) {
        // Remove the user from the array
        existingUsers.splice(userToDeleteIndex, 1);

        // Save the updated data back to AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify(existingUsers));

        alert(`User ${usernameToDelete} deleted successfully.`);
        setRefresh(prevState => !prevState);
      } else {
        console.log(`User with username ${usernameToDelete} not found.`);
      }
    } else {
      console.log('No user data found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

const editUsersProfileDB = async (thisUser) => {
  try {
    // Log the current value of editDob
    console.log('Current editDob:', editDob);

    // Get the existing user data from AsyncStorage
    const existingUsersString = await AsyncStorage.getItem('users');

    if (existingUsersString) {
      // Parse the existing data
      const existingUsers = JSON.parse(existingUsersString);

      // Find the user with the specified username
      const userToUpdateIndex = existingUsers.findIndex(user => user.userName === thisUser);

      if (userToUpdateIndex !== -1) {
        // Update the user's DOB
        existingUsers[userToUpdateIndex].dob = editDob;
        existingUsers[userToUpdateIndex].email = editEmail;
        existingUsers[userToUpdateIndex].mobile = editMobile;

        // Save the updated data back to AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify(existingUsers));

        console.log(`User ${thisUser}'s DOB updated successfully.`);
      } else {
        console.log(`User with username ${thisUser} not found.`);
      }
    } else {
      console.log('No user data found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error updating user DOB:', error);
  }
};


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const existingUsersString = await AsyncStorage.getItem('users');
        const existingUsers = existingUsersString ? JSON.parse(existingUsersString) : [];
        setUserList(existingUsers);
        console.log("Users from local DB: Login activity", existingUsers);
        searchMyDataLoca();

      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, [refresh]);
  

  const myProfile=()=>{
    return(
      <View>
      <Text style={{fontSize:22, color:'black', textAlign:'center', marginTop:10, fontWeight:'600'}}>Edit My Details</Text>

  <View style={{backgroundColor:'#F1F3FF', marginHorizontal:20}}>
     <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>Username</Text>
      </View>
      <InputText  value={myUsername} pl onChangeText={setMyUsername} locked={false} inputWidth={"70%"} />
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>DOB</Text>
      </View>
      <InputText value={myDob} onChangeText={setmyDob} locked={false}  inputWidth={"70%"} />
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>Email</Text>
      </View>
      <InputText value={myEmail} onChangeText={setMyEmail} locked={true}  inputWidth={"70%"} />
      </View>
      <View style={{flexDirection:'row'}}>
        <View style={{width:'50%'}}>
      <Text style={{fontSize:18, color:'black', textAlign:'center', marginTop:10, fontWeight:'600', width:'40$'}}>Mobile</Text>
      </View>
      <InputText value={myMobile} onChangeText={setMyMobile} locked={true}  inputWidth={"70%"} />
      </View>
      <View style={{margin:20, paddingBottom:40}}>
      <PrimaryButton btnTitle={"SUBMIT"} btnColor={'#5E72E4'} textColor={'#FFFFFF'} onPress={()=>editMyProfileDB()} />
      
      </View>
      </View>
      </View>

    )
  }
  return (
    <View style={{backgroundColor:'#fff'}}>
      <Text style={{fontSize:22, color:'black', textAlign:'center', marginTop:10, fontWeight:'600'}}>Users List</Text>
      <FlatList
      data={userList}
      renderItem={renderItem}
      // keyExtractor={item => item.key}
      ListFooterComponent={additionalData === 'gladmin'? null : myProfile()}
    />
    </View>
  )
}

export default ListUsers

const styles = StyleSheet.create({})