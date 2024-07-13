import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Stepper from "@/components/visual/Stepper";
import Colors from "@/constants/Colors";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Login from "@/app/(auth)/login";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {BodyS, Headers} from "@/constants/Fonts";
import OnboardingViewModel from "@/utils/viewmodels/Onboarding/OnboardingViewModel";
import { observer } from "mobx-react-lite";

const onboardingViewModel = new OnboardingViewModel();

const Onboarding = observer(() => {
    return (
        <ImageBackground source={ require("../../assets/images/background.png")}
                         style={ styles.imageBackground } >
            {
                !onboardingViewModel.watched &&
                <SafeAreaView style={ styles.safeArea }>
                    <BlurView style={ styles.blurContainer } intensity={16.4}>
                        <View style={ styles.stepperContainer }>
                            <Stepper stepsCount={ 3 } currentStep={ onboardingViewModel.step }/>
                        </View>

                        <View style={ styles.textContainer }>
                            <Text style={[ Headers.H4, { color: Colors.light.base["0"], textAlign: 'center' } ]}>
                                { onboardingViewModel.getTitle() }
                            </Text>

                            <Text style={[ BodyS.Regular, { color: Colors.light.base["10"], textAlign: 'center' } ]}>
                                { onboardingViewModel.getDescription() }
                            </Text>
                        </View>

                        <View style={ styles.buttonsContainer }>
                            {
                                onboardingViewModel.step <= 2 &&
                                <Button text={"Skip"} type={'tertiary'} size={'M'} onPress={ () => {
                                    onboardingViewModel.setWatched(true);
                                }}/>
                            }
                            {
                                onboardingViewModel.step <= 2 &&
                                <IconButton size={'M'} onPress={() => {
                                    onboardingViewModel.incStep();
                                }}>
                                    <MaterialIcons name={ 'arrow-forward' } size={ 24 } color={ Colors.light.base['0'] }/>
                                </IconButton>
                            }
                            {
                                onboardingViewModel.step == 3 &&
                                <Button text={"Let's go"} type={'primary'} size={'M'} rightIcon={ true } onPress={() => {
                                    onboardingViewModel.setWatched(true);
                                }} style={{ flex: 1 }}>
                                    <MaterialIcons name={ 'arrow-forward' } size={ 24 } color={ Colors.light.base['0'] }/>
                                </Button>
                            }
                        </View>
                    </BlurView>
                </SafeAreaView>
            }
            {
                onboardingViewModel.watched &&
                <Login/>
            }
        </ImageBackground>
    )
})

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
