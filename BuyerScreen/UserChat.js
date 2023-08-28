import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { doc_id } from '../SellerScreen/UUID';
import { addDoc, collection, doc, getDocs, onSnapshot, query, setDoc, where, serverTimestamp, orderBy } from 'firebase/firestore';
import { firestore, firebase } from '../firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserChat() {
  const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  const [Data, SetData] = useState([])
  const [loader, setloader] = useState(false)
  const [Mainloader, SetMainloader] = useState(false)
  let route = useRoute();
  let navigation = useNavigation()
  const collectionRef = collection(firestore, 'Chat');
  const { username, user_id, reciver_id } = route.params;
  const Store=async(myArray)=>{
    try {
      const arrayAsString = JSON.stringify(myArray);
      await AsyncStorage.setItem('myArrayKey', arrayAsString);
      console.log('Array stored successfully.');
    } catch (error) {
      console.error('Error storing array:', error);
    }
  }
  const GetUserArray = async (val) => {
    console.log(val);
    try {
      const storedArrayAsString = await AsyncStorage.getItem('myArrayKey');
      const storedArray = JSON.parse(storedArrayAsString);
      if(storedArray==null){
        let temp=[]
        temp.push(val)
        Store(temp)
      }else{
        if (!storedArray.includes(val)) {
          // If not present, add the value to the array
          storedArray.push(val);
        Store(storedArray)

          // Store the updated array back to AsyncStorage
          
          console.log('Value added to array:', val);
        } else {
          console.log('Value already exists in array:', val);
        }
      }
      console.log('Retrieved array:', storedArray);
    } catch (error) {
      console.error('Error retrieving array:', error);
    }

  }
  const UploadPost = async (message) => {
    const document_id = doc_id()
    const document_id2 = doc_id()
    const userdocumentref = doc(collectionRef, document_id)
    const userdocumentref2 = doc(collectionRef, document_id2)
    try {
      setloader(true)
      const Data = {
        "sender_id": user_id,
        "reciver_id": reciver_id,
        "message": message,
        "doc_id": document_id,
        "conversation_id": user_id + reciver_id,
        "createdAt": new Date
      }
      const Data1 = {
        "sender_id": user_id,
        "reciver_id": reciver_id,
        "message": message,
        "doc_id": document_id2,
        "conversation_id": reciver_id + user_id,
        "createdAt": new Date
      }
      // setloader(true)
      await setDoc(userdocumentref, Data);
      await setDoc(userdocumentref2, Data1);
      // const _send = { id: Date.now(), text: message, fromMe: true }
      // SetData(Data => [...Data, _send])
      // SetData([...Data, { id: document_id, text: message, fromMe: true }]);
      const User_Data = {
        username: username, user_id: user_id, reciver_id: reciver_id
      }
      GetUserArray(User_Data);
      setloader(false)

      setMessage('');
    } catch (error) {
      setloader(false)
      console.log(error);
      Alert.alert("Error", "Something went Wrong")

    }


  }
  const sendMessage = () => {
    // console.log(new Date);
    if (message.trim() !== '') {
      UploadPost(message)


    }
  };
  // useEffect(()=>{
  // GetChat();
  // },[]);
  // const GetChat = () => {
  //   SetMainloader(true)

  //   const usersRef = collection(firestore, 'Chat');
  //   const q = query(usersRef,
  //     where('conversation_id', '==', user_id+reciver_id)
  //   );
  //   getDocs(q).then((querySnapshot) => {
  //     // console.log(querySnapshot.docs.length);
  //     let temp = []
  //     querySnapshot.forEach((data) => {
  //     if(user_id===data.data()["sender_id"]){
  //       const Data={ id:Date.now(), text: data.data()["message"], fromMe: true }
  //       // setMessages([...messages, { id:Date.now(), text: data.data()["message"], fromMe: true }]);
  //       // console.log(user_id);
  //       temp.push(Data)

  //     }else{

  //     const Data={ id:Date.now(), text: data.data()["message"], fromMe: false }

  //       temp.push(Data)


  //     }
  //       // temp.push(data.data())

  //     })
  //     // setJobs(temp)
  //     // settempJobs(temp)
  //     // console.log(temp);
  //     SetData(temp)
  //     // setMessage(temp)
  //     // SetMainloader(false)
  //   SetMainloader(false)


  //   }).catch(() => {
  //     // SetMainloader(false)
  //     Alert.alert("Opps", "Something went wrong")

  //   })

  // }
  useEffect(() => {
    const usersRef = collection(firestore, 'Chat');
    const q = query(usersRef, where('conversation_id', '==', user_id + reciver_id),

    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let temp = [];

      querySnapshot.forEach((data) => {
        if (user_id === data.data()["sender_id"]) {
          const Data = { id: Date.now(), text: data.data()["message"], fromMe: true }
          // setMessages([...messages, { id:Date.now(), text: data.data()["message"], fromMe: true }]);
          // console.log(user_id);
          temp.push(Data)

        } else {

          const Data = { id: Date.now(), text: data.data()["message"], fromMe: false }

          temp.push(Data)


        }

        // temp.push(data.data());
      });
      // console.log(temp);
      SetData(temp);
    }, (error) => {
      console.error("Error fetching chat:", error);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <View style={styles.container}>
      {Mainloader ?
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
        :
        <>
          <View style={{
            //  margin: 20,
            backgroundColor: 'white',
            //  borderRadius: 20,
            padding: 15,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            flexDirection: "row"

          }}>

            <AntDesign onPress={() => {
              navigation.goBack();
            }} name="arrowleft" size={24} color="black" />
            <View style={{ width: 5 }} />

            <Ionicons name="person" size={19} color="black" />
            <View style={{ width: 5 }} />
            <Text>{username}</Text>
          </View>

          <FlatList
            data={Data}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={item.fromMe ? styles.myMessageContainer : styles.otherMessageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity disabled={loader} style={styles.sendButton} onPress={sendMessage}>
              {loader ?
                <ActivityIndicator size={"large"} color={"#fff"} />
                : <Text style={styles.sendButtonText}>Send</Text>

              }
            </TouchableOpacity>
          </View>
        </>

      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '70%',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '70%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
  },
  sendButton: {
    marginLeft: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});