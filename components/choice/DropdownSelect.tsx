import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface DropdownSelectProps {
    placeholder?: string;
    leftIcon?: keyof typeof MaterialIcons.glyphMap | null;
    options: string[];
    selectedOption: string;
    onOptionSelected: (option: string) => void;
    size: 'S' | 'M';
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({
                                                           placeholder = 'Select',
                                                           leftIcon = null,
                                                           options,
                                                           selectedOption,
                                                           onOptionSelected,
                                                           size = 'M'
                                                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const optionsHeight = useSharedValue(0);

    let styles: { contentContainer: any; optionsContainer: any; option: any; optionText: any; selectedContainer: any; placeholderText: any; selectedText: any; };
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
        <View style={ styles.contentContainer }>
            <Animated.View style={ [styles.optionsContainer, animatedStyle] }>
                { options.map((option, index) => (
                    <Pressable key={ index } onPress={ () => handleOptionSelect(option) } style={ styles.option }>
                        <Text style={ styles.optionText }>{ option }</Text>
                    </Pressable>
                )) }
            </Animated.View>

            <Pressable onPress={ toggleDropdown } style={ styles.selectedContainer }>
                { leftIcon && <MaterialIcons name={ leftIcon }
                                             size={ 24 }
                                             color={ Colors.light.blue["50"] }/> }

                <Text style={ selectedOption === 'null' ? styles.placeholderText : styles.selectedText }>
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
        flex: 1,
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
    selectedText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter',
        color: Colors.light.blue['50'],
    },
    placeholderText: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Inter',
        fontStyle: 'italic',
        color: Colors.light.blue['40'],
    },
    option: {
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 16,
        fontFamily: 'Inter',
        color: Colors.light.blue['50'],
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
    selectedText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Inter',
        color: Colors.light.blue['50'],
    },
    placeholderText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Inter',
        fontStyle: 'italic',
        color: Colors.light.blue['40'],
    },
    option: {
        height: 36,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: Colors.light.blue['50'],
    },
});

export default DropdownSelect;
