import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';
const BuyChat = ({  route }) => {
  // Placeholder array for chat data
  const placeholderChats = [
    { id: '1', username: 'User1' },
    { id: '2', username: 'User2' },
    { id: '3', username: 'User3' },
    // Add more data as needed
  ];

  // const users = placeholderChats.map(chat => chat.username);
  const [users,setusers]=useState([])
  let navigation=useNavigation();
useEffect(()=>{
  navigation.addListener("focus",()=>{

    fetchUserList();
  })
},[])
const fetchUserList = async () => {
  try {
    const userListString = await AsyncStorage.getItem('myArrayKey');
    if (userListString) {
      const storedArray = JSON.parse(userListString);

      // Create an object to store unique users based on username
      const uniqueUsersObj = {};

      // Iterate through the storedArray and populate the uniqueUsersObj
      storedArray.forEach(user => {
        uniqueUsersObj[user.username] = user;
      });

      // Convert the object values back to an array
      const uniqueUsers = Object.values(uniqueUsersObj);
      
      setusers(uniqueUsers);
    }
  } catch (error) {
    console.error('Error fetching user list:', error);
  }
};
  return (
    <View style={styles.container}>
  
    <Text
    style=
    {{
      fontSize:20,
      fontWeight:"bold",
      alignSelf:"center",
      color:"#000000"
    }}
    >

Chat
    </Text> 
      <FlatList
        data={users}
        // keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
          // key={index}.c
          style={styles.userItem}
          // onPress={() => navigation.navigate('UserChat', { username: item })}
          onPress={() => navigation.navigate('UserChat',{
            // status:  status,
            // owner_email:"admin@gmail",
            // project_id:project_id,
            user_id:item.user_id,
            username:item.username,
            reciver_id:item.reciver_id

        
          })}
        >
          <Image
            source={{ uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAAAe1BMVEX///8wMzgAAAD6+vorLjMvMTUpLDIuMTfQ0NDz8/MbHyYjJizIyMje3t7s7Oz39/e1tbaTlJWEhYbm5uYDDBYUGSGtrq+6u7t6e3yio6QYGRwgISNzdHWMjY5eYGI+QEQoKSsQExlrbG1PUFEAAA9GSUw4OjxXWFkAAAh4Ex5+AAAHWUlEQVR4nO2b6ZaquhKABZIQEkBBwxBkCIj2+z/hBbV7O6UYbPusdRffr71b0KJSc8JqtbCwsLCwsLCwsPAWlrOlcRqESZKEQRrTrWP9vRB+nNelUkoy3sGY6P5ZFnns/6EMazfApuIEVVUm1a5HyaxChHBh2oG7/hMpvKDlGba5QOVpn0exSyl14yjfFyVi3Lazqg28j0tBa8YQysws2dDHNfBpnFRmpyfGavpRKeLWrDAXRbrVXrJNC8ExOrTxx6SghSQGO4Ye7BdrLzwyg7DiMzqxQsmxUOkYj/BTKTER4QccOc64LYx09PXRkXW2/NuLYyXMrnDoTLhlHaLOlpJfVcm2YTYrp643baXNGr1JT2YjOl8MZtwYZIjIza+JoWxeurNudUuOZfQ7YqQ7Iyvn5g2/ZLaao8onQoVF8sb9icIyfF+MVNkyf8forVwYcry/a9h0T/OONnpCaag3bWQjDZG/KcZqlQv8ntdsBc5+IRL1UVC9EUeshvDybSl6Wl4188ujJCOzHfYev6uRZptZnGE2EL4cmoZ1XYcpHUg9LjPYzKRnZbaAIxANyy/BSVeXsq9jCKefQCIxT46QV6Bx0MLk2PjGJiZc+LSEz1oZKm0MfXFQVcY9HEHqowjLORVawRkUjpOdbTyCFfTEISPFdDFiiQ297VmFeJKiRxb6aOOU9gxTbYkAksKevRTDMLK9/qZIwAb3CmraSv/p5qARwzAOQABX+DDVQuqK6dXh8Wfb+Get+mYuYqSeJobH8VEfSROuF8MA4mYXVeW0ljNgXO8sngGow7CR/qdClk2qzZwWKf23BTojvSpEXyh4ArVT0h3lqNBff0SgHOiovdMqEJ9ScAcZoD/HBMUwDFMfd1I2qf/A2NSXLa4akEPpH3lr2ny8GL5pZ/pPI9g8ulgGFKPENsdXNLGAUmM6JAcQeTqXn9B751wAUTGAokcPB0wglkBAeMCqCQLi76A+MkAfFBEgFd7jlAgqSwftA2po/Rb87ju2sjoBH3v6JHfhC4rdBRFjOwiqKiB7r1aD8QO6eU/U2Jwbywzs4U6PBeE9BFJm7wNjHSaVAmxHYwnKwcAWMhKQW98RMAWK3GVBQAzUgq1MrPjYhjnkOzgZpTtAjh38uO5udABJ+A42JetEAOuAwwPdkbFtzKAcK0/pKiEM1C1XOUa3U8NyrCKlkWNw4DJBjpAN2MfqPEN8qY3BccsE+xjylzMxf7YRwkfcJ0b7SyrGjDy909e9+6LDaUQxPiF+xAqOpz/XNSrDZ1lsjLhqRlWeAVhT3DGUX35Y07A1OGOMH9uQjivE92TQCb7ZSjS6Mbc86sYuHdgauqEgcmy+dcrfGos948O1zR1WAdZjDxevHcdZj1bHlHqsy83jBhVrNw3rU9M0RR2m7qjHnFKfDtTrV2hwNBUjBPUQwnbmMRjWYpJNmCx3/QsauCI6cfaY/RHjTTSgla5Dm2B6CMFXR4ZCLzMdUUcwBPqT+rmuv4WCXoyFfvCAFQZsK+XANOAZNyPaft8PJdzvE5bolNl54qR+f90iockVXvt6UngLa3U3S7ucsveqnwfFJqyMC8h8vTZhNmlZOsEZejEfs1abbIQUZ5W88s5+12HafMyqEXth+BuGh0U4Y78SpJ8XTtxVogdDPv9xqJO7FcR8NkiGhwu9R0ryVAx5eKw2zoLgxyWIBJm+u7URuLx3Xes0NPi4p3roINbly8UaomvM7207HHbYex4murmcs9+wcsX9/ot3gKa3LzncrgzFWMw6IZPwqr35b63v4XTceUdD+Lhq85G1wjf74e7XZDEM4+tfOEsFljN3TjfMzr41CbW0etDPKMTlOJu9pb3P0Hc6oNN85Rt+fQ6nJWzilscN65bwq4nUM+W4/niTkUkD/gc8hdnl8JWEZ1E6yGVTK2SDcwAIaxXJ62kWWs2xD1Kd1yVQBjzpGiZSWJwrAP8ET8VekZ3OObsLgO+e/+j3w7E8a8Tas2mBDGd7q1PpKhB4YH9+FIk0dpeaKFJT1oZcdRBK463zRT8EXTxrzu7r1GpMNdaDRH25pWHG75yXWvXGyttL4eA2YowkdtZcIiktM/yuid4IohC6bmZYUTW4Okix6BIsUo7I+yb6D6/ttNteY2N8EsA+ss3F6ZpVaNOFH13pPo915ywE5ZentLywzNgrrSDGfgYy6xwTnNWT2oQRbBTHrPzWseMG5deB8a7Lxj1dp83Z4asM3O/fjVqJ+fD4cDpWIokt2L9G2vLSfF805REbZVPs89T7ySB+xAQiYv+ZE+S0YAix8u588trxOxzn5hctLy8ZRp86n9yzKXcEMQmd1/bTQmY22ZUfWJIb3O5XEGEmSeKX59fx5fx6Me+46gQ6rbec24hLVBY35/mD/jy/7A/68zIfPz58B8fNuSm65yacC3F+v0EIxjufqaTJc/e3XRXCj8OiVDt1ft2jf+NDKFnW4eYv3/e4Yvn9+y95mOyTME83dOv/B++/LCwsLCwsLCws/H/xP1hGeLWzjGjmAAAAAElFTkSuQmCC" }} // Replace with the appropriate avatar URL
            style={styles.avatar}
          />
          <Text style={styles.username}>{item.username}</Text>
        </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  username: {
    fontSize: 16,
  },
 
    userItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    username: {
      fontSize: 16,
    },

});

export default BuyChat;