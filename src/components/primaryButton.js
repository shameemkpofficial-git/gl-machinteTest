import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PrimaryButton = (props) => {
    const {
        onPress, btnTitle,btnColor,textColor,disabled,
    } = props;
    return (
       
        <View>
            <TouchableOpacity style={[styles.buttonContainer,{backgroundColor:btnColor}]} onPress={onPress} disabled={disabled}>
                <Text style={[styles.textStyle,{color:textColor}]}>{btnTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    buttonContainer: {
        width: '80%',
        height: 43,
        backgroundColor: '#5E72E4',
        borderRadius: 3,
        alignSelf: 'center',
        justifyContent:'center',
        marginTop:10
        
    },
    textStyle: {
        color: '#ffff',
        fontWeight: '700',
        lineHeight: 19,
        textAlign: 'center',


        //         font-family: Open Sans;
        // font-size: 14px;
        // font-weight: 700;
        // line-height: 19px;
        // letter-spacing: 0px;
        // text-align: center;

    }

})