import React, { useState } from "react";
import {StyleProp, View, ViewStyle, StyleSheet, Text, Pressable} from "react-native";
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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

    return (
        <View style={ [styles.container, style] }>
            {
                titles.map((title, i) =>
                    <Pressable key={ i }
                               style={ i == selected ? selectedOption.optionContainer : styles.optionContainer }
                               onPress={ () => {
                                   setSelected(i);
                                   onChangeSelected(i);
                               } }>
                        { icons && <MaterialIcons name={ icons[i] }
                                                  size={ 20 }
                                                  color={ i == selected ? selectedOption.optionIcon.color : styles.optionIcon.color } /> }
                        <Text style={ i == selected ? selectedOption.optionText : styles.optionText }>{ title }</Text>
                    </Pressable>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 6,
        borderStyle: 'solid',
        borderColor: Colors.light.blue['50'],
        borderWidth: 2,
        backgroundColor: Colors.light.base["0"],
        overflow: 'hidden',
    },
    optionContainer: {
        flex: 1,
        height: 52,
        gap: 8,
        backgroundColor: Colors.light.base['0'],
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
})

const selectedOption = StyleSheet.create({
    optionContainer: {
        flex: 1,
        height: 52,
        gap: 8,
        flexDirection: 'row',
        backgroundColor: Colors.light.blue['50'],
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
})

export default SegmentedSelect;
