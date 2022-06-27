import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { db } from '../firebase'

const AddChat = ({navigation}: {navigation:any}) => {
    const [input, setInput] = useState<string>('')

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Add a New Chat",
        headerBackTitle: 'Chats',

      })
    }, [navigation])

    const createChat = async()=> {
await db.collection('chats').add({
    chatName: input
}).then(()=> {navigation.goBack()}).catch(err=> alert(err))
    }
  return (
    <View style={styles.container}>
      <TextInput placeholder='Enter a chat name' value={input} onChangeText={(text)=> setInput(text)}
    onSubmitEditing={createChat} style={styles.inputField}
      />
      <Button title='Create new chat' onPress={createChat}/>
    </View>
  )
}

export default AddChat

const styles = StyleSheet.create({
    container: {
backgroundColor:'white',
padding:30,
height:"100%"
    },
    inputField : {
        paddingVertical:10,
        marginVertical:10,
        borderBottomColor:'#2c6bed',
        borderBottomWidth:1
    }
})