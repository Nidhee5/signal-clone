import {
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db, auth } from "../firebase";
import firebase from "firebase/compat";

const Chat = ({ navigation, route }: { navigation: any; route: any }) => {
  const { id, chatName } = route.params;
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerBackTitleVisible: false,
      headerTitlelAlign: "Left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{
            uri:  messages[0]?.data.photoUrl  }}
            style={{ width: 50, height: 50, borderRadius: 60 }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => [
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity onPress={navigation.goBack}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>,
      ],
    });
  }, [navigation, messages]);

  const sendInputMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(id).collection("messages").add({
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: inputMessage,
      displayName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      photoUrl: auth.currentUser?.photoURL,
    });
    setInputMessage("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapShot) =>  setMessages(
          snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView style={{paddingTop:15}}  >
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser?.email ? (
                  <View key={id} style={styles.receiver}>
                    <Image
                      source={{ uri: data.photoUrl  }}
                      style={{ width: 30, height: 30, borderRadius: 60, bottom:-15, right:-5 , position:'absolute'}}
                    />
                    <Text style={styles.receiverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Image
                      source={{ uri: data.photoUrl  }}
                      style={{ width: 30, height: 30, borderRadius: 60, bottom:-15, left:-5 , position:'absolute'}}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text  style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                style={styles.textInput}
                placeholder="Signal Message"
                value={inputMessage}
                onSubmitEditing={sendInputMessage}
                onChangeText={(text) => setInputMessage(text)}
              />
              <TouchableOpacity activeOpacity={0.5} onPress={sendInputMessage}>
                <Ionicons name="send" size={24} color="#2c6bed" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    marginRight: 15,
    backgroundColor: "#ececec",
    padding: 10,
    flex: 1,
    color: "grey",
    borderRadius: 30,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ececec",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2b6be6",
    alignSelf: "flex-start",
    borderRadius: 20,
    marginLeft: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    fontWeight:'500',
    marginRight:10,
    marginBottom:15
  },
  senderText: {
    color:'white',
    fontWeight:'500',
    marginLeft:10,
    marginBottom:15
  },
  senderName:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:'white'
  }
});
