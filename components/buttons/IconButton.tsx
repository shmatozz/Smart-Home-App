import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Colors from '@/constants/Colors';

interface ButtonProps {
    size?: 'S' | 'M';
    type?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    onPress?: () => void;
    children: React.ReactNode;
}

const IconButton: React.FC<ButtonProps> = ({
                                           size = 'S',
                                           type = 'primary',
                                           disabled = false,
                                           onPress = () => console.log("Button pressed"),
                                           children,
                                       }) => {
    const [isPress, setIsPress] = useState(false);

    let buttonSize;
    let buttonStyle;

    switch (type) {
        case 'primary':
            buttonStyle = stylesPrimary;
            break;
        case 'secondary':
            buttonStyle = stylesSecondary;
            break;
        case 'tertiary':
            buttonStyle = stylesTertiary;
            break;
        default:
            buttonStyle = stylesPrimary;
    }

    if (size === 'M') {
        buttonSize = 52;
    } else {
        buttonSize = 40;
    }

    const touchProps = {
        style: disabled ? ([buttonStyle.disabled, { height: buttonSize, width: buttonSize }]) :
            (isPress ?
                ([buttonStyle.pressed, { height: buttonSize, width: buttonSize }]) :
                ([buttonStyle.default, { height: buttonSize, width: buttonSize }])),
        onPressIn: () => setIsPress(true),
        onPressOut: () => setIsPress(false),
        onPress: onPress,
    };

    return (
        <Pressable {...touchProps}>
            <View style={ styles.container }>
                { children }
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const stylesPrimary = StyleSheet.create({
    default: {
        backgroundColor: Colors.light.blue["50"],
        borderRadius: 6,
    },
    pressed: {
        backgroundColor: Colors.light.blue["70"],
        borderRadius: 6,
    },
    disabled: {
        backgroundColor: Colors.light.base["40"],
        borderRadius: 6,
    },
    iconColor: {
        color: Colors.light.base["0"],
    },
});

const stylesSecondary = StyleSheet.create({
    default: {
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.blue["50"],
        borderWidth: 2,
    },
    pressed: {
        backgroundColor: Colors.light.blue["10"],
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.blue["50"],
        borderWidth: 2,
    },
    disabled: {
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.base["20"],
        borderWidth: 2,
    },
    iconColor: {
        color: Colors.light.blue["50"],
    },
});

const stylesTertiary = StyleSheet.create({
    default: {
        borderRadius: 6,
    },
    pressed: {
        backgroundColor: Colors.light.blue["5"],
        borderRadius: 6,
    },
    disabled: {
        borderRadius: 6,
    },
    iconColor: {
        color: Colors.light.blue["50"],
    },
});

export default IconButton;
