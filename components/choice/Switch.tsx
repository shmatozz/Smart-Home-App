import React, { useEffect, useRef } from 'react';
import {
    Text,
    StyleSheet,
    Pressable, View, Animated, StyleProp, ViewStyle,
} from 'react-native';
import Colors from "@/constants/Colors";
import {BodyM, BodyS} from "@/constants/Fonts";

interface SwitchProps {
    text?: string,
    style?: StyleProp<ViewStyle> | null,
    state: boolean;
    setState: (value: boolean) => void;
    type?: 'default' | 'lock'
}

const Switch: React.FC<SwitchProps> = ({
                                           text,
                                           style = null,
                                           state,
                                           setState,
                                           type = 'default'
                                       }) => {
    const moveAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (state) {
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
    }, [state])

    const styles = type == 'lock' ? stylesLock : stylesDefault;

    return (
        <Pressable style={ [styles.container, style] } onPress={ () => setState(!state) }>
            <Text style={ [
                type == 'lock' ? BodyM.Regular : BodyS.Regular,
                state ? styles.textColorOn : styles.textColorOff,
                style
            ]}>
                { text }
            </Text>

            <View style={ [
                styles.switchBackground,
                state ? styles.switchBackgroundOn : styles.switchBackgroundOff]
            }>
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

const stylesDefault = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    textColorOn: {
        color: Colors.light.base["90"],
    },
    textColorOff: {
        color: Colors.light.base["90"],
    },
    switchBackground: {
        borderRadius: 200,
        width: 40,
        height: 24,
        padding: 2,
    },
    switchBackgroundOn: {
        backgroundColor: Colors.light.blue["50"],
    },
    switchBackgroundOff: {
        backgroundColor: Colors.light.base["30"],
    },
    switchCircle: {
        borderRadius: 200,
        width: 20,
        height: 20,
        backgroundColor: Colors.light.base["0"],
    },
});

const stylesLock = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    textColorOn: {
        color: Colors.light.blue["50"],
    },
    textColorOff: {
        color: Colors.light.red["60"],
    },
    switchBackground: {
        borderRadius: 200,
        width: 40,
        height: 24,
        padding: 2,
    },
    switchBackgroundOn: {
        backgroundColor: Colors.light.blue["50"],
    },
    switchBackgroundOff: {
        backgroundColor: Colors.light.red["60"],
    },
    switchCircle: {
        borderRadius: 200,
        width: 20,
        height: 20,
        backgroundColor: Colors.light.base["0"],
    },
});

export default Switch;
