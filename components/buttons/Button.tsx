import React, { useState } from "react";
import {Text, View, StyleSheet, Pressable, StyleProp, ViewStyle} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';

interface ButtonProps {
    leftIcon?: keyof typeof MaterialIcons.glyphMap;
    rightIcon?: keyof typeof MaterialIcons.glyphMap;
    text?: string;
    size?: 'S' | 'M';
    type?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle> | null;
}

const Button: React.FC<ButtonProps> = ({
                                           leftIcon,
                                           rightIcon,
                                           text = "",
                                           size = 'S',
                                           type = 'primary',
                                           disabled = false,
                                           onPress = () => console.log("Button pressed"),
                                           style = null,
                                       }) => {
    const [isPress, setIsPress] = useState(false);

    let buttonSize;
    let buttonText;
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
        buttonText = [buttonStyle.buttonText, { fontSize: 16 }];
        iconSize = 24;
    } else {
        buttonSize = styles.container;
        buttonText = buttonStyle.buttonText;
        iconSize = 16;
    }

    if (disabled && (type == 'secondary' || type == 'tertiary')) {
        buttonText = [buttonText, { color: Colors.light.base["20"] }]
    }

    const touchProps = {
        style: disabled ? buttonStyle.disabled : (isPress ? [buttonStyle.pressed, style] : [buttonStyle.default, style]),
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
                <Text style={ buttonText }>{text}</Text>
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
        width: 'auto',
        backgroundColor: Colors.light.blue["50"],
        borderRadius: 6,
    },
    pressed: {
        width: 'auto',
        backgroundColor: Colors.light.blue["70"],
        borderRadius: 6,
    },
    disabled: {
        width: 'auto',
        backgroundColor: Colors.light.base["40"],
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
        width: 'auto',
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.blue["50"],
        borderWidth: 2,
    },
    pressed: {
        width: 'auto',
        backgroundColor: Colors.light.blue["10"],
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.blue["50"],
        borderWidth: 2,
    },
    disabled: {
        width: 'auto',
        borderRadius: 6,
        borderStyle: "solid",
        borderColor: Colors.light.base["20"],
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
        width: 'auto',
        borderRadius: 6,
    },
    pressed: {
        width: 'auto',
        backgroundColor: Colors.light.blue["5"],
        borderRadius: 6,
    },
    disabled: {
        width: 'auto',
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
