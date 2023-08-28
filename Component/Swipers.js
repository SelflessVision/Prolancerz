import React,{useState, useRef} from 'react';
import { View, Text,TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import SwiperComponent from "../Component/SwiperComponent";
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
const Swipers = () => {
    const naviagtion=useNavigation();
    const [index, setIndex] = useState(0);
    const swiperRef = useRef(null);

    return (
        <View style={{flex:1,backgroundColor:'#fff',}}>
            <Swiper
                ref={swiperRef}
                activeDotStyle={{width:'10%',height:'50%',backgroundColor:'#003399'}}
                // paginationStyle={{bottom:'8%'}}
                loop={false}
                nextButton={true}
                onIndexChanged={(index)=>{
                    // console.log(index)
                    setIndex(index);
                }}
            >
                <View style={{flex:1,marginTop:20}}>
                    <SwiperComponent 
                        IMAGE={require("../assets/first.jpeg")}
                        text1="Welcome"
                        text2='Welcome to Prolancerz, '
                        text3='your gateway to freelance success!'
                    />

                </View>

                <View style={{flex:1,}}>
                    <SwiperComponent 

                        IMAGE={require("../assets/second.jpeg")}

                        text1="Discover Opportunities"
                        text2='Explore a world of freelance projects '
                        text3='tailored to your skills and interests.'
                    />

                </View>
                <View style={{flex:1,}}>
                    <SwiperComponent 

                        IMAGE={require("../assets/third.jpeg")}

                        text1="Build Your Profile"
                        text2='Craft an impressive profile '
                        text3='to stand out and showcase your expertise.'
                    />

                </View>
                

            </Swiper>
            <View style={{height:'6%',width:'80%',justifyContent:'center',alignSelf:'center'}}>
            <Button 
                text="Next" 
                type="primary" 
                onPress={() => {
                    index === 0
                    ? swiperRef.current.scrollBy(1, true)
                    : naviagtion.navigate("LoginScreen");
                }}/>
            </View>
            <View style={{flex:0.1,width:'95%',alignItems:'flex-end',justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>naviagtion.navigate("LoginScreen")}>
                    <Text style={{fontSize:20,color:'#003399'}}>SKIP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Swipers;