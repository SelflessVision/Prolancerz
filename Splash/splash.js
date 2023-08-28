import { View, Text,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
    let navigation=useNavigation()
    setTimeout(() => {
        navigation.navigate("Swipers")
    }, 3000);
  return (
    <View  style={{flex:1,alignItems:"center",justifyContent:"center"}}>
    <Image  style={{width:"90%",height:60}}  source={require("../assets/Logo.png")} />
    </View>
  )
}
// import * as React from 'react';
// import { ProgressBar, Colors } from 'react-native-paper';

// const MyComponent = () => (
//   <ProgressBar style={{marginTop: 300}}progress={1} color="#49B5F2"
  
//   />
// );

// export default MyComponent;
