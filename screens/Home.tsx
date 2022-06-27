import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomListItems from '../components/CustomListItems'
import { auth, db } from '../firebase'
import {SimpleLineIcons, AntDesign} from '@expo/vector-icons'
export default function Home({navigation}: {navigation: any}) {


const [chats, setChats] = useState<{id: string, data: any}[]>([])


  const signOutUser = ()=> {
    auth.signOut().then(()=> {
      navigation.replace("Login");
    })
  }

  useEffect(() => {
  const unsubscribe = db.collection('chats').onSnapshot(snapShot => {
    setChats(snapShot.docs.map(doc=> ({
      id: doc.id,
      data: doc.data()
    })))
  })
  return unsubscribe
  }, [])
  

useLayoutEffect(()=> {
    console.log(auth.currentUser?.photoURL)
navigation.setOptions({
    title: 'Signal',
    headerStyle :{backgroundColor: '#fff'},
    headerTitleStyle: {
        color: 'black'
    },
    headerTintColor: 'black',
    headerLeft: ()=> <View style={{marginLeft: 20}}>
      <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
        <Image source={{uri: auth.currentUser?.photoURL || ""}} style={{width:50, height:50, borderRadius:60}} resizeMode='cover'/>
      </TouchableOpacity>
    </View>
,
headerRight: ()=> 
  <View style={{flexDirection:'row', justifyContent:'space-between', width:80, marginRight:20}}>
<TouchableOpacity activeOpacity={0.5}>

<AntDesign name='camerao' size={24} color='black'/>
</TouchableOpacity>
<TouchableOpacity activeOpacity={0.5}>

  <SimpleLineIcons onPress={()=> navigation.navigate('AddChat')} name='pencil' size={24} color='black'/>
</TouchableOpacity>
  </View>

})
}, [navigation])

const enterChat = (id: string, chatName: string)=> {
navigation.navigate('Chat', {
  id, chatName
})
}

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <FlatList data={chats} keyExtractor={(item) => item.id} renderItem={({index,item}) => (
            <CustomListItems id={item.id} chatName={item.data.chatName} enterChat={enterChat}/>
        )}/>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({container: {
  height: '100%'
}

})