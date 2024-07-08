import React, { useState } from "react";
import { StyleProp, View, ViewStyle, StyleSheet, Text, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface SegmentedSelectProps {
    titles: string[];
    icons?: (keyof typeof MaterialIcons.glyphMap)[] | null;
    onChangeSelected: (index: number) => void;
    style?: StyleProp<ViewStyle> | null;
}

const SegmentedSelect : React.FC<SegmentedSelectProps> = ({
                                                              titles,
                                                              icons = null,
                                                              onChangeSelected,
                                                              style = null
                                                          }) => {
    const [selected, setSelected] = useState(0);
    const [optionWidth, setOptionWidth] = useState(0);
    const translateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        };
    });

    const handlePress = (index: number) => {
        setSelected(index);
        onChangeSelected(index);
        translateX.value = withTiming(index * optionWidth);
    };

    return (
        <View style={ [styles.container, style] }>
            <Animated.View style={ [styles.animatedBackground, animatedStyle, { width: `${100 / titles.length}%` }] } />
            {
                titles.map((title, i) => (
                    <Pressable key={ i }
                               style={ styles.optionContainer }
                               onPress={ () => handlePress(i) }
                               onLayout={ (event) => {
                                   if (optionWidth === 0) {
                                       const { width } = event.nativeEvent.layout;
                                       setOptionWidth(width);
                                   }
                               } }
                    >
                        {
                            icons &&
                            <MaterialIcons name={ icons[i] }
                                           size={ 20 }
                                           color={ i === selected ? selectedOption.optionIcon.color : styles.optionIcon.color }
                            />
                        }
                        <Text style={ i === selected ? selectedOption.optionText : styles.optionText }>{ title }</Text>
                    </Pressable>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: Colors.light.blue['50'],
        borderWidth: 2,
        backgroundColor: Colors.light.base["0"],
        overflow: 'hidden',
        position: 'relative',
    },
    animatedBackground: {
        position: 'absolute',
        height: '102%',
        backgroundColor: Colors.light.blue['50'],
        zIndex: -1,
    },
    optionContainer: {
        flex: 1,
        height: 52,
        gap: 8,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 15,
        fontFamily: 'Inter',
        color: Colors.light.blue['50'],
    },
    optionIcon: {
        color: Colors.light.blue['50'],
    }
});

const selectedOption = StyleSheet.create({
    optionContainer: {
        flex: 1,
        height: 52,
        gap: 8,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 15,
        fontFamily: 'Inter',
        color: Colors.light.base['0'],
    },
    optionIcon: {
        color: Colors.light.base['0'],
    }
});

export default SegmentedSelect;
