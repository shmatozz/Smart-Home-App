import React, { useState } from "react";
import { StyleProp, View, ViewStyle, StyleSheet, Text, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import {BodyM} from "@/constants/Fonts";

interface SegmentedSelectProps {
    titles: string[];
    onChangeSelected: (index: number) => void;
    style?: StyleProp<ViewStyle> | null;
    children?: React.ReactNode;
}

const SegmentedSelect: React.FC<SegmentedSelectProps> = ({
                                                             titles,
                                                             onChangeSelected,
                                                             style = null,
                                                             children
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

    const renderChildren = (index: number) => {
        if (!children) return null;
        return React.Children.map(children, (child, childIndex) => {
            if (childIndex === index) {
                return React.cloneElement(child as React.ReactElement, {
                    color: selected === index ? selectedOption.optionIcon.color : styles.optionIcon.color
                });
            }
            return null;
        });
    };

    return (
        <View style={[styles.container, style]}>
            <Animated.View style={[styles.animatedBackground, animatedStyle, { width: `${100 / titles.length}%` }]} />
            {
                titles.map((title, i) => (
                    <Pressable
                        key={i}
                        style={styles.optionContainer}
                        onPress={() => handlePress(i)}
                        onLayout={(event) => {
                            if (optionWidth === 0) {
                                const { width } = event.nativeEvent.layout;
                                setOptionWidth(width);
                            }
                        }}
                    >
                        { renderChildren(i) }
                        <Text style={
                            i === selected ?
                            [BodyM.Regular, { color: Colors.light.base['0'] }] :
                            [BodyM.Regular, { color: Colors.light.blue['50'] }]
                        }>
                            { title }
                        </Text>
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
    optionIcon: {
        color: Colors.light.base['0'],
    }
});

export default SegmentedSelect;
