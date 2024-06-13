import React, {useEffect, useRef, useState} from 'react';
import {
    Text,
    StyleSheet,
    Pressable, View, Animated,
} from 'react-native';
import Colors from "@/constants/Colors";

interface SwitchProps {
    text?: string,
}

const Switch: React.FC<SwitchProps> = ({ text}) => {
    const [checked, setChecked] = useState(false);
    const moveAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (checked) {
            Animated.timing(moveAnimation, {
                toValue: 16,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(moveAnimation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [checked])

    return (
        <Pressable style={ styles.container } onPress={ () => setChecked(!checked) }>
            <Text style={ styles.text }>{ text }</Text>
            <View style={ [styles.switchBackground,
                checked ? {
                backgroundColor: Colors.light.blue["50"],
            } : {
                backgroundColor: Colors.light.base["30"],
            }] }>
                <Animated.View style={{
                    borderRadius: 200,
                    width: 20,
                    height: 20,
                    backgroundColor: Colors.light.base["0"],
                    transform: [{ translateX: moveAnimation }],
                }} />
            </View>
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
        flex: 1,
        fontFamily: "Inter",
        fontSize: 14,
    },
    switchBackground: {
        borderRadius: 200,
        width: 40,
        height: 24,
        padding: 2,
    },
    switchCircle: {
        borderRadius: 200,
        width: 20,
        height: 20,
        backgroundColor: Colors.light.base["0"],
    },
});

export default Switch;
