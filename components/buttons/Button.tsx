import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';

interface ButtonProps {
    leftIcon?: keyof typeof MaterialIcons.glyphMap;
    rightIcon?: keyof typeof MaterialIcons.glyphMap;
    text?: string;
    size?: 'S' | 'M';
    type?: 'primary' | 'secondary' | 'tertiary';
    onPress?: () => void;
}

const Button: React.FC<ButtonProps> = ({
                                           leftIcon,
                                           rightIcon,
                                           text = "",
                                           size = 'S',
                                           type = 'primary',
                                           onPress = () => console.log("Button pressed"),
                                       }) => {
    const [isPress, setIsPress] = useState(false);

    let buttonSize;
    let buttonTextSize;
    let buttonStyle;
    let iconSize;

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
        buttonSize = [styles.container, { height: 52 }];
        buttonTextSize = [buttonStyle.buttonText, { fontSize: 16 }];
        iconSize = 24;
    } else {
        buttonSize = styles.container;
        buttonTextSize = buttonStyle.buttonText;
        iconSize = 16;
    }

    const touchProps = {
        style: isPress ? buttonStyle.pressed : buttonStyle.default,
        onPressIn: () => setIsPress(true),
        onPressOut: () => setIsPress(false),
        onPress: onPress,
    };

    return (
        <Pressable {...touchProps}>
            <View style={buttonSize}>
                {leftIcon && (
                    <MaterialIcons name={leftIcon} size={iconSize} color={buttonStyle.iconColor.color} />
                )}
                <Text style={buttonTextSize}>{text}</Text>
                {rightIcon && (
                    <MaterialIcons name={rightIcon} size={iconSize} color={buttonStyle.iconColor.color} />
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderRadius: 6,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Inter",
        color: Colors.light.base["0"],
    },
});

const stylesPrimary = StyleSheet.create({
    default: {
        width: '100%',
        backgroundColor: Colors.light.blue["50"],
        borderRadius: 6,
    },
    pressed: {
        width: '100%',
        backgroundColor: Colors.light.blue["70"],
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Inter",
        color: Colors.light.base["0"],
    },
    iconColor: {
        color: Colors.light.base["0"],
    },
});

const stylesSecondary = StyleSheet.create({
    default: {
        width: '100%',
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.blue["50"],
        borderWidth: 2,
    },
    pressed: {
        width: '100%',
        backgroundColor: Colors.light.blue["10"],
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.blue["50"],
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Inter",
        color: Colors.light.blue["50"],
    },
    iconColor: {
        color: Colors.light.blue["50"],
    },
});

const stylesTertiary = StyleSheet.create({
    default: {
        width: '100%',
        borderRadius: 6,
    },
    pressed: {
        width: '100%',
        backgroundColor: Colors.light.blue["5"],
        borderRadius: 6,
    },
    buttonText: {
        fontSize: 14,
        fontFamily: "Inter",
        color: Colors.light.blue["50"],
    },
    iconColor: {
        color: Colors.light.blue["50"],
    },
});

export default Button;
