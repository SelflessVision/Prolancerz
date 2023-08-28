import React from 'react';
import { Text, TouchableOpacity} from 'react-native';

const Button = (props) => {
    const {type,text,onPress,backgroundColor,color}=props;
    const BackgroundColor= type === 'primary' ? '#003399' : '#DBF5DB';
    const Color= type === 'primary' ? '#DBF5DB' : '#0A7900';
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{backgroundColor:type?BackgroundColor:backgroundColor,justifyContent:'center',alignItems:'center',borderRadius:40,padding:'4%'}}
        >
            <Text style={{color:type?Color:color}}>{text}</Text>
        </TouchableOpacity>
        
    );
};
export default Button;