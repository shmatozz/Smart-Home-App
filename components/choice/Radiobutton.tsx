import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface RadiobuttonProps {
    text?: string,
}

const Radiobutton: React.FC<RadiobuttonProps> = ({ text}) => {
    const [checked, setChecked] = useState(false);

    return (
        <Pressable style={ styles.container } onPress={ () => setChecked(!checked) }>
            <MaterialIcons name={checked ? "radio-button-checked" : "radio-button-unchecked"}
                           size={ 24 }
                           color={ checked ? Colors.light.blue["50"] : Colors.light.base["50"] } />
            <Text style={ styles.text }>{ text }</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    text: {
        fontSize: 14,
    }
});

export default Radiobutton;
