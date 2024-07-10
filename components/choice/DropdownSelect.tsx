import React, { useState } from "react";
import {View, Text, StyleSheet, Pressable, StyleProp, ViewStyle} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {BodyM, BodyS} from "@/constants/Fonts";

interface DropdownSelectProps {
    placeholder?: string;
    leftIcon?: boolean;
    options: string[];
    selectedOption: string;
    onOptionSelected: (option: string) => void;
    size?: 'S' | 'M';
    style?: StyleProp<ViewStyle> | null;
    children?: React.ReactNode;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
                                                           placeholder = 'Select',
                                                           leftIcon = false,
                                                           options,
                                                           selectedOption,
                                                           onOptionSelected,
                                                           size = 'M',
                                                           style = null,
                                                           children,
                                                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const optionsHeight = useSharedValue(0);

    let styles: { contentContainer: any; optionsContainer: any; option: any; selectedContainer: any; };
    let optionSize: number;

    if (size == 'S') {
        styles = stylesS;
        optionSize = 36;
    } else {
        styles = stylesM;
        optionSize = 48;
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        optionsHeight.value = withTiming(isOpen ? 0 : options.length * optionSize, { duration: 200 });
    };

    const handleOptionSelect = (option: string) => {
        onOptionSelected(option);
        toggleDropdown();
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: optionsHeight.value,
            opacity: withTiming(isOpen ? 1 : 0, { duration: 200 }),
        };
    });

    return (
        <View style={ [styles.contentContainer, style] }>
            <Animated.View style={ [styles.optionsContainer, animatedStyle] }>
                {
                    options.map((option, index) => (
                        <Pressable key={ index } onPress={ () => handleOptionSelect(option) } style={ styles.option }>
                            <Text style={
                                size == 'S' ?
                                    [BodyS.Regular, { color: Colors.light.blue['50'] }] :
                                    [BodyM.Regular, { color: Colors.light.blue['50'] }]
                            }>
                                { option }
                            </Text>
                        </Pressable>
                    ))
                }
            </Animated.View>

            <Pressable onPress={ toggleDropdown } style={ styles.selectedContainer }>
                { leftIcon && children }

                <Text style={
                    selectedOption === 'null' ?
                        (size == 'S' ? [ BodyS.Italic, { color: Colors.light.blue['40'], flex: 1 }] : [ BodyM.Italic, { color: Colors.light.blue['40'], flex: 1 }] ) :
                        (size == 'S' ? [ BodyS.Regular, { color: Colors.light.blue['50'], flex: 1 }] : [ BodyM.Regular, { color: Colors.light.blue['50'], flex: 1 }] )
                }>
                    { selectedOption === 'null' ? placeholder : selectedOption }
                </Text>

                <MaterialIcons name={ isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down' }
                               size={ 24 }
                               color={ Colors.light.blue["50"] }/>
            </Pressable>
        </View>
    );
};

const stylesM = StyleSheet.create({
    contentContainer: {
        borderRadius: 6,
        borderColor: Colors.light.blue["50"],
        borderWidth: 2,
    },
    optionsContainer: {
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: Colors.light.base["0"],
        zIndex: 1,
        borderColor: Colors.light.blue["50"],
        borderTopWidth: 2,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        bottom: 51,
    },
    selectedContainer: {
        height: 52,
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
        backfaceVisibility: 'hidden',
    },
    option: {
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
});

const stylesS = StyleSheet.create({
    contentContainer: {
        flex: 1,
        borderRadius: 6,
        borderColor: Colors.light.blue["50"],
        borderWidth: 1,
    },
    optionsContainer: {
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: Colors.light.base["0"],
        zIndex: 1,
        borderColor: Colors.light.blue["50"],
        borderTopWidth: 1,
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        bottom: 38,
    },
    selectedContainer: {
        height: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 8,
        alignItems: 'center',
        flexDirection: 'row',
        backfaceVisibility: 'hidden',
    },
    option: {
        height: 36,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
});

export default DropdownSelect;
