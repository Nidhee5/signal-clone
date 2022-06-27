import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import firebase from "firebase/compat";

export default function RegisterScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>("");


useLayoutEffect(() => {
  navigation.setOptions({
    headerBackTitle: 'Back to Login'
  })
}, [navigation])

const register = ()=> {
    if(email && password ){

      auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
        authUser.user?.updateProfile({displayName: name, photoURL: imageUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"})
      }).catch((error)=> alert(error.message))
    }
  else {
    Alert.alert('Oops', 'Please fill all the data', [
        {
          text: "Got it",
          onPress: () => {},
        },
      ] )
  }
}


  return (
    <KeyboardAvoidingView  style={styles.container}>
      <StatusBar style="light" />
      <Text >
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
        autoFocus
        style={styles.inputField}
          placeholder="Full Name"
          onChangeText={(val) => setName(val)}
          value={name}
        />
        <TextInput
          placeholder="Email"
        style={styles.inputField}

          onChangeText={(val) => setEmail(val)}
          value={email}
        />
        <TextInput
          placeholder="Password"
        style={styles.inputField}

          onChangeText={(val) => setPassword(val)}
          value={password}
          secureTextEntry
        />
        <TextInput
        style={styles.inputField}

          placeholder="Profile picture url (optional)"
          onChangeText={(val) => setImageUrl(val)}
          value={imageUrl}
          onSubmitEditing={register}
        />
      </View>
      <Button title="Register" onPress={() => register()} color='#2c6bed'/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    padding:10
,
  },
  inputContainer: {
    width:300,
    marginVertical:20,
  },
  inputField: {
    backgroundColor:'white',

    padding:5,
    margin: 5,
borderBottomColor: '#2c6bed',
borderBottomWidth: 1
}
});
