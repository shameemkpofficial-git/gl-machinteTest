import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'



const InputText = (props) => {
    const {value, onChangeText,locked,placeholder,inputWidth,search,editable,keyboardType,maxLength} = props;
  return (
    <View style={{marginTop:10, flexDirection:'row', alignSelf:'center'}}>
      <TextInput style={[styles.textInputStyle,{width:inputWidth}]} placeholder={placeholder} value={value} onChangeText={onChangeText} editable={locked} placeholderTextColor={'black'} keyboardType={keyboardType} maxLength={maxLength} ></TextInput>
  
     
       
    </View>
  )
}

export default InputText

const styles = StyleSheet.create({

    textInputStyle:{
        width:'100%',
        height:43,
        backgroundColor:'#fff',
        alignSelf:'center',
        borderColor:'gray',
        borderWidth:2,
        borderRadius:3,
        paddingLeft:16,


    }


})