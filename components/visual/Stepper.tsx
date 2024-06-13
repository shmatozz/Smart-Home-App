import React, { useState } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Colors from "@/constants/Colors";

interface StepperProps {
    stepsCount: number,
    currentStep: number,
}

const Stepper: React.FC<StepperProps> = ({
                                             stepsCount,
                                             currentStep
}) => {

    const stepComponents = [];
    for (let i = 1; i <= stepsCount; i++) {
        stepComponents.push(
            <View key={ i }
                  style={ [styles.stepContainer, i == currentStep ?
                                                    { backgroundColor: Colors.light.blue['50']} :
                                                    { backgroundColor: Colors.light.blue['90']} ] }
            />
        );
    }

    return (
        <View style={ styles.container }>
            { stepComponents }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    stepContainer: {
        width: 24,
        height: 4,
        borderRadius: 100,
    }
});

export default Stepper;
