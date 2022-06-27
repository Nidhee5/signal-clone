import { StyleSheet, Text, View , FlatList, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

const CustomListItems = ({id, chatName, enterChat}: {id: string, chatName: string, enterChat: Function}) => {
 const [chatMessages, setChatMessages] = useState<any[]>([]);
 
useEffect(() => {
  const unsubscribe = db.collection('chats').doc(id).collection('messages').orderBy('timeStamp', 'desc').onSnapshot(snapShot => setChatMessages(snapShot.docs.map((doc)=> doc.data())))
return unsubscribe
}, [])

  return (
    <TouchableOpacity  key={id} onPress={() => enterChat(id, chatName)}>

    <View style={styles.listItem} >
      <Image source={{uri: chatMessages?.[0]?.photoUrl  || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
}} style={styles.avatar}/>
    <View>
    <Text style={styles.title}>{chatName}</Text>
    <Text >
      {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
      </Text>
    </View>
    </View>
</TouchableOpacity>
  )
}

export default CustomListItems

const styles = StyleSheet.create({
    listItem: {
        padding:8,
        backgroundColor:'white',
        borderBottomColor: 'gray',
        borderBottomWidth:1,
        flexDirection: 'row',
        alignItems:'center'
    },
    avatar: {
        margin:8,
        height:50,
        width: 50,
        borderRadius:60
    },
    title: {
        fontWeight:'bold',
        fontSize:18
    },
   
})