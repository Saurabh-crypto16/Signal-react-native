import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StatusBar, StyleSheet,  View } from 'react-native'
import { Text,Button, Input } from "react-native-elements";
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [imageUrl,setImageUrl] = useState('');

    //used when we navigate
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "LogIn",
        });
    },[navigation]);
    
    //this function is called when we submit enter to last input of register screen
    const register=() => {
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://images.pexels.com/photos/102061/pexels-photo-102061.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            });
        })
        .catch((error) => alert(error.message));
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{marginBottom: 50}}>
                Create a Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autoFocus type="name"
                    value={name}
                    onChangeText={(text) => setName(text)}/>
                <Input placeholder="Email" autoFocus type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}/>
                <Input placeholder="Password" autoFocus type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}/>
                <Input placeholder="Profile Picture Url(Optional)" autoFocus type="imageUrl"
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={register}/>            
            </View>

            <Button onPress={register} raised
                containerStyle={styles.button}
                title="Register" />
            
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

//styling the components
//for styling buttons we use containerStyle
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "white",
    },
    button:{
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width:300,
    },
})
