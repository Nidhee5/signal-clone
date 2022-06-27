import { View, Text, Image, Button, TextInput, StyleSheet , KeyboardAvoidingView} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

export default function LoginScreen({navigation}: {navigation: any}) {
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
    
useEffect(()=> {
const unsubscribe = auth.onAuthStateChanged((authUser) => {
    if(authUser){
        navigation.replace("Home")
    }
});

return unsubscribe
}, [])

const signIn = () =>{
auth.signInWithEmailAndPassword(email, password).catch(err => alert(err))
}

  return (
    <KeyboardAvoidingView   style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://pnggrid.com/wp-content/uploads/2021/05/Signal-1024x1024.png",
        }}
        style={{ width: 80, height: 80, marginBottom:10 }}
      />
<View style={styles.inputContainer}>
<TextInput style={styles.inputField} placeholder="Email" autoFocus keyboardType="email-address" value={email}  onChangeText={(val)=> setEmail(val)}/>
<TextInput style={styles.inputField} placeholder="Password" secureTextEntry={true} value={password}  onChangeText={(val)=> setPassword(val)} onSubmitEditing={signIn}/>

<View style={{flexDirection:'column', justifyContent:'space-around', height:100,width:300, alignItems:'stretch', paddingHorizontal:30}}>

<Button title="Login" color='#2c6bed' onPress={signIn} />
<Button title="Register" color='gray' onPress={() => navigation.navigate('Register')} />
</View>
</View>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
padding: 10,
backgroundColor:'white'

    },inputContainer: {
        width: 300
    },
    inputField: {
        backgroundColor:'white',

        padding:5,
        margin: 5,
borderBottomColor: '#2c6bed',
borderBottomWidth: 1
    }
});
