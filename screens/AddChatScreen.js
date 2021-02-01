import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from "react-native-elements";
import { db } from '../firebase';

const AddChatScreen = ({navigation}) => {

    const [input,setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
           title: "Add a new Chat",//Title of screen
           headerBackTitle: "Chats",//back button text
        })
    },[navigation])

    //The purpose of async/await is to simplify the syntax necessary 
    //to consume promise-based APIs. 
    //The behavior of async/await is similar to combining generators 
    //and promises.
    const createChat= async () => {
        //inside the databse all chats will be stored as collections
        await db.collection('chats').add({
            chatName: input,
        }).then(() => {
            navigation.replace("Home");//it goes back to homescreen
        }).catch((error) => alert(error));
    };

    return (
        <View style={styles.container}>
            <Input placeholder="Enter chat name" 
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="black" />
            }/>
            <Button disabled={!input} onPress={createChat} title="Create new Chat" />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        padding: 30,
        height: "100%"
    },
})
