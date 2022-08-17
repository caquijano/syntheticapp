import React, {useState} from 'react'
import { View, TouchableOpacity} from 'react-native'
import { Item, Input as InputNB, Icon } from 'native-base'
import {chatStyles} from '../../styles/General'


export default function Input(props) {
    const {sendMessage} = props
    const [message, setMessage] = useState('')


    const onSubmit = () => {
        if(message.length > 0){
            sendMessage(message);
            setMessage('');
        }
    }
    
    return (
        <View style={chatStyles.container}>
            <Item>
                <InputNB 
                style={chatStyles.chatText}
                    placeholder="Mensaje ..."
                    value={message}
                    onChange={(e) => setMessage(e.nativeEvent.text)}
                />
                <TouchableOpacity onPress={onSubmit}>
                    <Icon type="FontAwesome" name="paper-plane" style={chatStyles.iconsend}/>
                </TouchableOpacity>
            </Item>
        </View>
    )
}
