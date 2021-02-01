import React, { useEffect, useState } from 'react'
import {  StyleSheet, Text, View,KeyboardAvoidingView } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from '../firebase';

//navigation is a prop by stack navigator which allows us to open different pages
const LoginScreen = ({navigation}) => {
    //hooks
    const [email,setEmail] =useState('');
    const [password,setPassword] =useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){//if user is authenticated then push to home page
                navigation.replace("Home")
            }
        });
        
        return unsubscribe;
    },[])

    const signIn=()=>{
        auth.signInWithEmailAndPassword(email,password)
        .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "data:image/jpeg;base64,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",
            }}
            style={{width: 200,height: 200}}/>

            <View style={styles.inputConatiner}>
                <Input placeholder="Email" autoFocus type="email"
                    value={email} 
                    onChangeText={(text) => setEmail(text)} />
                <Input placeholder="password" secureTextEntry
                    type="password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}/>
            </View>

            <Button containerStyle={styles.button} onPress={signIn}
                title="Login" />
            <Button containerStyle={styles.button} type="outline"
                title="Register" 
                onPress={() => navigation.navigate("Register")}/>
            
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "white",
    },
    inputConatiner:{
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});