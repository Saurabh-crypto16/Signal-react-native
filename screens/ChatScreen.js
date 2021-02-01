import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, 
    SafeAreaView, ScrollView, StyleSheet,
    Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../firebase";
import * as firebase from "firebase";


const ChatScreen = ({navigation,route}) => {
    //route is used to access props passed from home screen

    const [input,setInput]=useState("");
    const [messages,setMessages]= useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <Avatar rounded 
                    source={{
                        uri: messages[0]?.data.photoURL || 
                            "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    }}
                    />
                    <Text 
                    style={{color: "white", marginLeft: 10, fontWeight: "700"}}>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{marginLeft: 10}}
                    onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 70,
                    marginRight: 15,
                }}>
                    <TouchableOpacity>
                    <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation, messages]);

    const sendMessage=()=>{
        Keyboard.dismiss();//forces keyboard to hide when message is sent

        db.collection('chats').doc(route.params.id).collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURl: auth.currentUser.photoURL,
        })

        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe=db.collection("chats")
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return unsubscribe;
    },[route])

    return (
        <SafeAreaView style={{flex: 1,backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS==='ios' ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}>  
                
                <TouchableWithoutFeedback >
                <>
                    <ScrollView 
                        contentContainerStyle={{paddingTop: 15}}>
                        {messages.map(({id, data}) => 
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar  rounded
                                        position="absolute"
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5,
                                        }}
                                        size= {30}
                                        bottom={-15}
                                        right={-5}
                                        source={{
                                        uri: data.photoURL,
                                    }}/>
                                    <Text style={styles.recieverText}>
                                        {data.message}
                                    </Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar rounded
                                        position="absolute"
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5,
                                        }}
                                        size= {30}
                                        bottom={-15}
                                        right={-5}
                                        source={{
                                        uri: data.photoURL,
                                    }}/>
                                    <Text style={styles.senderText}>
                                        {data.message}
                                    </Text>
                                    <Text style={styles.senderName}>
                                        {data.displayName}
                                    </Text>
                                </View>
                            )
                        )}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput placeholder="type a message" 
                            style={styles.textInput}
                            value={input}
                            onChangeText={(text) => setInput(text)} 
                            onSubmitEditing={sendMessage} />

                        <TouchableOpacity activeOpacity={0.5}
                            onPress={sendMessage}>
                            <Ionicons name="send" size={24} color="#2B68E6" />
                        </TouchableOpacity>
                    </View>
                </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    reciever: {
        padding:15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    sender: {
        padding:15,
        backgroundColor: "#2B68B6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    sendertext: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },  
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
    },
    footer: {
        flexDirection:"row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput:{
        //styling the bottom text input
        bottom: 0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor: "#ECECEC",
        padding:10,
        color:"grey",
        borderRadius: 30,
    },
})
