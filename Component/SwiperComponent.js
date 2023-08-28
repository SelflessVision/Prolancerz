import React from 'react';
import { View, Text,Image,} from 'react-native';
const SwiperComponent = (props) => {
    const {IMAGE,text1,text2,text3,first}=props;
    return (
        <View style={{flex:1,alignItems:'center',backgroundColor:'#fff',marginTop:20}}>
            <Image 
            //    style={{marginTop:10}}
                source={IMAGE}
                style={{width:300,height:420}}
            />

            <View style={{height:'20%',width:'100%',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:24}}>{text1}</Text>
                <Text style={{top:'20%',fontSize:14,color:'#003399'}}>{text2}</Text>
                <Text style={{top:'20%',fontSize:14,color:'#003399'}}>{text3}</Text>
            </View>

        </View>
    );
};
export default SwiperComponent;