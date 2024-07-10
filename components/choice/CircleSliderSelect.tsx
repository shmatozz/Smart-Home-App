import React from "react";
import { View, StyleSheet } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import Colors from "@/constants/Colors";
import IconButton from "@/components/buttons/IconButton";
import {MaterialCommunityIcons} from "@expo/vector-icons";

interface CircleTemperatureProps {
    value: number,
    setValue: (temperature: number) => void,
}

const CircleTemperature: React.FC<CircleTemperatureProps> = ({
    value,
    setValue,
                                                             }) => {
    return (
        <View style={ styles.container }>
            <CircularProgress value={ value }
                              duration={ 300 }
                              maxValue={ 20 }
                              radius={ 130 }
                              activeStrokeWidth={ 32 }
                              activeStrokeColor={ Colors.light.blue["40"] }
                              inActiveStrokeColor={ 'transparent' }
                              rotation={ -135 }
                              valueSuffix={ '°' }
                              title={ 'Temperature' }
                              titleStyle={ styles.title }
                              progressValueStyle={ styles.progressValue }
                              progressFormatter={(value: number) => {
                                  'worklet';
                                  return Math.round(value + 15);
                              }}
            />

            <View style={ styles.buttonsContainer }>
                <IconButton size={ 'M' }
                            type={ 'primary' }
                            disabled={ value == 1 }
                            onPress={ () => setValue(Math.max(value - 1, 1)) }>
                    <MaterialCommunityIcons name={ "minus" }
                                   size={ 28 }
                                   color={ Colors.light.base["0"] } />
                </IconButton>

                <IconButton size={ 'M' }
                            type={ 'primary' }
                            disabled={ value == 15 }
                            onPress={ () => setValue(Math.min(value + 1, 15)) }>
                    <MaterialCommunityIcons name={ "plus" }
                                   size={ 28 }
                                   color={ Colors.light.base["0"] } />
                </IconButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: "transparent"
    },
    buttonsContainer: {
        position: 'absolute',
        zIndex: 1,
        flexDirection: 'row',
        gap: 12,
        bottom: 68,
    },
    progressValue: {
        fontSize: 28,
        fontFamily: 'Inter-Medium',
        color: Colors.light.base["80"],
    },
    title: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: Colors.light.base["50"],
        top: -10,
    }
})

export default CircleTemperature;