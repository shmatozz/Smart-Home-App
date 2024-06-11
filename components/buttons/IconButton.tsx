import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '@/constants/Colors';

interface ButtonProps {
    icon?: keyof typeof MaterialIcons.glyphMap;
    size?: 'S' | 'M';
    type?: 'primary' | 'secondary' | 'tertiary';
    onPress?: () => void;
}

const IconButton: React.FC<ButtonProps> = ({
                                           icon,
                                           size = 'S',
                                           type = 'primary',
                                           onPress = () => console.log("Button pressed"),
                                       }) => {
    const [isPress, setIsPress] = useState(false);

    let buttonSize;
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
        buttonSize = 52;
        iconSize = 24;
    } else {
        buttonSize = 40;
        iconSize = 16;
    }

    const touchProps = {
        style: isPress ?
            ([buttonStyle.pressed, { height: buttonSize, width: buttonSize }]) :
            ([buttonStyle.default, { height: buttonSize, width: buttonSize }]),
        onPressIn: () => setIsPress(true),
        onPressOut: () => setIsPress(false),
        onPress: onPress,
    };

    return (
        <Pressable {...touchProps}>
            <View style={ styles.container }>
                <MaterialIcons name={ icon } size={ iconSize } color={ buttonStyle.iconColor.color } />
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
    iconColor: {
        color: Colors.light.blue["50"],
    },
});

export default IconButton;
