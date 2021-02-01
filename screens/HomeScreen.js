import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth,db } from "../firebase";
import { AntDesign,SimpleLineIcons } from '@expo/vector-icons';


//TouchableOpacity allows Avatar to be clicked

const HomeScreen = ({navigation}) => {

    //to sign out user and replace the home screen with login screen
    const signOutUser=()=>{
        auth.signOut().then(() => {
            navigation.replace("Login");
        })
    }

    //to show newly added chats to homescreen
    const [chats,setChats] = useState([]);
    useEffect(() => {
        const unsubscribe=db.collection('chats').onSnapshot(snapshot => {
            setChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })

        return unsubscribe;
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: {backgroundColor: "#fff"},
            headerTitleStyle: {color: "black"},
            headerTintStyle: "black",
            headerTitleAlign: "left",
            headerLeft: () => (
                <View style={{
                    marginLeft: 15,
                }}>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    <Avatar rounded source={{uri: auth?.currentUser?.photoURL }} />
                </TouchableOpacity>
                </View>
            ),
            headerRight: ()=> (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 60,
                    marginRight: 15,
                }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>  
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")}
                        activeOpacity={0.5} >
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        });
    },[navigation])

    const enterChat = (id,chatName) =>{
        navigation.navigate('Chat',{
            id,
            chatName,
        });
    };
    
    return (
        <SafeAreaView>
            <ScrollView style={styles.container} >
                {chats.map(({id,data: { chatName }}) => (
                    <CustomListItem key={id} 
                        id={id} chatName={chatName} 
                        enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});
