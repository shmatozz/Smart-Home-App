import React from "react";
import { useState } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Stepper from "@/components/visual/Stepper";
import Colors from "@/constants/Colors";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Login from "@/app/(auth)/login";
import { setItem } from "@/utils/storage/AsyncStorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {BodyS, Headers} from "@/constants/Fonts";

const onboardingText = [
    {
        title: "Seamless Automation",
        description: "Control lights, thermostats, and more with a tap. Enjoy the convenience of automation tailored to your preferences."
    },
    {
        title: "Enhanced Security",
        description: "Keep your home secure with our advanced security features. Receive real-time alerts on your phone for any unexpected activity."
    },
    {
        title: "Energy Efficiency",
        description: "Take control of your energy consumption and contribute to a greener future.\n"
    },
]

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [watched, setWatched] = useState(false)

    return (
        <ImageBackground source={ require("../../assets/images/background.png")}
                         style={ styles.imageBackground } >
            {
                !watched &&
                <SafeAreaView style={ styles.safeArea }>
                    <BlurView style={ styles.blurContainer } intensity={16.4}>
                        <View style={ styles.stepperContainer }>
                            <Stepper stepsCount={ 3 } currentStep={ step }/>
                        </View>

                        <View style={ styles.textContainer }>
                            <Text style={[ Headers.H4, { color: Colors.light.base["0"], textAlign: 'center' } ]}>
                                { onboardingText[step - 1].title }
                            </Text>

                            <Text style={[ BodyS.Regular, { color: Colors.light.base["10"], textAlign: 'center' } ]}>
                                { onboardingText[step - 1].description }
                            </Text>
                        </View>

                        <View style={ styles.buttonsContainer }>
                            {
                                step <= 2 &&
                                <Button text={"Skip"} type={'tertiary'} size={'M'} onPress={ () => {
                                    setWatched(true);
                                    setItem("firstLaunch", false).then();
                                }}/>
                            }
                            {
                                step <= 2 &&
                                <IconButton size={'M'} onPress={() => {
                                    setStep(step + 1);
                                }}>
                                    <MaterialIcons name={ 'arrow-forward' } size={ 24 } color={ Colors.light.base['0'] }/>
                                </IconButton>
                            }
                            {
                                step == 3 &&
                                <Button text={"Let's go"} type={'primary'} size={'M'} rightIcon={ true } onPress={() => {
                                    setWatched(true);
                                    setItem("firstLaunch", false).then();
                                }} style={{ flex: 1 }}>
                                    <MaterialIcons name={ 'arrow-forward' } size={ 24 } color={ Colors.light.base['0'] }/>
                                </Button>
                            }
                        </View>
                    </BlurView>
                </SafeAreaView>
            }
            {
                watched &&
                <Login/>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
    blurContainer: {
        height: 360,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 22,
        overflow: 'hidden',
        padding: 16,
        paddingTop: 24,
    },
    stepperContainer: {
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        gap: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20
    }
})

export default Onboarding;
