import { View, Text , TextInput,StyleSheet , FlatList, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useNavigation } from '@react-navigation/native';

export default function JobList() {
  const [search, setsearch] = React.useState();
   const [allData,setallData]=useState([])
  const [data, setdata] = React.useState([]);
  const [originalData, setoriginalData] = React.useState([]);
  let navigation=useNavigation();
  const searchFilter = text => {
    console.log(text);
    if (text) {
      const newdata = Jobs.filter(item => {
        const itemdata = item.description
          ? item.description.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemdata.indexOf(textData) > -1;
      });
      SetJobs(newdata);
      setsearch(text);
    } else {
      SetJobs(allData);
      console.log(allData);
      setsearch(text);
    }
  };
  // const extractFirst20Words = (sentence) => {
  //   const words = sentence.split(' ');
  //   return words.slice(0, 20).join(' ');
  // };
  // const dataWithFirst20Words = Jobs.map((sentence) => extractFirst20Words(sentence));

  // const Jobs = [];
  const [Jobs,SetJobs]=useState([])
  useEffect(()=>{
   navigation.addListener("focus",()=>{
    GetAllDocs();
   })
  },[])
  const GetAllDocs=()=>{
   
      getDocs( collection(firestore, 'projects')).then((querySnapshot)=>{
        let temparray=[];
        
        querySnapshot.forEach((doc1) => {

         temparray.push(doc1.data())
        })
        
        SetJobs(temparray)
        setallData(temparray)
      }).catch((err)=>{
        console.log(err);
      })
  }
  return (
    <View
    style={{
      flex: 1,
    alignItems:"center",
      backgroundColor: "white",
    }}
  >
 <View
          style={{
            height: "6%",
          }}
        />
    <Text
    style=
    {{
      fontSize:20,
      fontWeight:"bold",
      alignSelf:"center",
      color:"#000000"
    }}
    >

      Job Lists
    </Text>
    <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: '100%',
            height: 44,
            backgroundColor: '#EEEEEE',
            borderRadius: 8,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
        
          <TextInput
            style={styles.input}
            onChangeText={text => searchFilter(text)}
            placeholderTextColor="#969696"
            value={search}
            placeholder="Search Jobs"
            autocorrect={false}
            autoCapitalize="none"
          />
        </View>
        
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
        marginBottom:10,
        height:"80%"
        }}>
        <FlatList
          data={Jobs}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
            onPress={() => navigation.navigate("JobDetail",{

JobDeta:item.description ,
Username:item.user_name ,
Skill:["React"],
project_id:item.doc_id,
project_email:item.user_email

})}
            >
            <View
              style={{
                width: '100%',
        marginBottom:10
             ,
                backgroundColor: '#F1F1F1',
                borderRadius: 10,
                marginTop: 10,
                padding:20,
              
               
         
              }}>
            
                <Text
                  style={{
                    fontSize: 17,
                    color: '#000000',
                    // fontWeight: 'bold',
                  }}>
                  {item.description}
                </Text>
              
                  <Text
                    style={{
                      marginTop:10,
                      fontSize: 15,
                      color: '#5B5B5B',
                      // fontWeight:"bold"
                    }}>
                    {item.user_name}
                  </Text>
                 
                
           
            
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
      
    </View>
  )
}


const styles = StyleSheet.create({
  activityIndicatorContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  input: {
    // borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 5,
    // padding: 10,
    //   margin: 10,

    // height: 53,
    height: 44,

    width: '100%',
    marginLeft: 5,
    color: '#000000',
  },
});
