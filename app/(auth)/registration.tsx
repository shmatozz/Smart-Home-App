import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import Button from "@/components/buttons/Button";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Headers } from "@/constants/Fonts";
import {Entypo, FontAwesome5} from "@expo/vector-icons";

const Registration = () => {
    const router = useRouter();

    return (
        <ImageBackground source={ require("../../assets/images/background.png")}
                         style={ styles.imageBackground } >
            <SafeAreaView style={ styles.safeArea }>
                <BlurView style={ styles.blurContainer } intensity={16.4}>
                    <Text style={[ Headers.H5, { color: Colors.light.base["0"], textAlign: 'center' } ]}>
                        No registration in design yet(
                    </Text>

                    <Text style={[ Headers.H5, { color: Colors.light.base["0"], textAlign: 'center' } ]}>
                        You still can connect socials
                    </Text>

                    <View style={ styles.loginViaButtonsContainer }>
                        <Button text={ "VK ID" }
                                size={ 'M' }
                                type={ 'tertiary' }
                                leftIcon={ true }
                                style={{ flex: 1 }}
                                onPress={ () => { alert("Not supported yet(") } }>
                            <Entypo name={ 'vk' } size={ 24 } color={ Colors.light.blue["50"] }/>
                        </Button>

                        <Button text={ "Yandex ID" }
                                size={ 'M' }
                                type={ 'tertiary' }
                                leftIcon={ true }
                                style={{ flex: 1  }}
                                onPress={ () => { alert("Not supported yet(") } }>
                            <FontAwesome5 name={ 'yandex-international' } size={ 24 } color={ Colors.light.blue["50"] }/>
                        </Button>
                    </View>

                    <Button text={ "Back" }
                            size={ 'M' }
                            type={ 'primary' }
                            leftIcon={ true }
                            style={{ width: '100%' }}
                            onPress={ () => { router.back() }}>
                        <MaterialIcons name={ 'arrow-back' } size={ 24 } color={ Colors.light.base["0"] }/>
                    </Button>
                </BlurView>
            </SafeAreaView>
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
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    loginViaButtonsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
})

export default Registration;
