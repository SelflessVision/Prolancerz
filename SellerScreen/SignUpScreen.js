/** @format */
import React, { useState } from "react";

import {

  View,
  Text,

  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as Random from 'expo-random';
import FormInput from "../Components/FormInput";
import LoginBtn from "../Components/Loginbtn";
import Entypo from "react-native-vector-icons/Entypo";
import Loader from "./Loader";
import { auth, firestore } from "../firebase/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, setDoc ,} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
const SignUpScreen = () => {
  let navigation=useNavigation();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [username, setusername] = React.useState();
  const [phone, setphone] = React.useState();
  const [loader,setloader]=useState(false);
  const collectionRef = collection(firestore, 'user');

  const doc_id = () => {

    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
  
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
  

const CreateUser=()=>{
  const newUUID = doc_id();
  const UserDocumentRef=doc(collectionRef,newUUID);
  console.log(newUUID);
setloader(true)
  const newUser={
    user_id:newUUID,
    user_name:username,
    user_email:email,
    user_phone:phone
    
  }
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    setDoc(UserDocumentRef, newUser)
    .then((docRef) => {
      // console.log('Document written with ID:', newUUID);

      setloader(false)
      navigation.goBack();  
  })
    .catch((error) => {
      alert('Error adding document:', error);
      // setloader(false)

    });

   
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error.message);
    setloader(false)


    // ..
  });
  
}

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "17%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: "10%",
          }}
        />
        <View
          style={{
            width: "95%",
            height: 30,
          }}
        >
                    
      
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-thin-left" size={30} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 28,
            color: "#3E4A59",
            fontWeight: "800",
          }}
        >
          Get started now
        </Text>
        <View
          style={{
            height: "3%",
          }}
        />
      </View>

      <View
        style={{
          height: "74%",
          //   backgroundColor: "pink",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FormInput
          // style={styles.input}

          onChangeText={(username) => setusername(username)}
          // value={text}
          labelValue={username}
          // secureTextEntry={true}
          // keyboardType="email-address"
          placeholder="username"
          autoCapitalize="none"
          autocorrect={false}
        />
        <FormInput
          // style={styles.input}
          onChangeText={(userEmail) => setEmail(userEmail)}
          // value={text}
          labelValue={email}
          // secureTextEntry={true}
          // keyboardType="email-address"
          placeholder="Email"
          autoCapitalize="none"
          autocorrect={false}
        />
        <FormInput
          // style={styles.input}
          onChangeText={(userPassword) => setPassword(userPassword)}
          // value={text}
          labelValue={password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <FormInput
          // style={styles.input}
          onChangeText={(phone) => setphone(phone)}
          // value={text}
          labelValue={phone}
          // secureTextEntry={true}
          // keyboardType=""
          placeholder="Mobile phone number with country code "
        />

        {/* </TouchableOpacity> */}
        <View
          style={{
            height: "44%",
          }}
        />
        <TouchableOpacity
          style={{
            width: "100%",
            height: 46,
            alignItems: "center",
          }}
          onPress={() => {
CreateUser();

          }}
        >
          <LoginBtn
            color="#003399"
            textcolor="#fff"
            textfontsize={23}
            name="Signup"

          />
        </TouchableOpacity>
      </View>
      <Modal  visible={loader}  transparent>
    <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator  size={"large"} color={"black"} />

    </View>
  </Modal>
    
    </View>
  );
};

export default SignUpScreen;
