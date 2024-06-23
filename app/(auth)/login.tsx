import React, {useEffect} from "react";
import { useState } from "react";
import {View, Text, ImageBackground, StyleSheet, Pressable} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {BlurView} from "expo-blur";
import Colors from "@/constants/Colors";
import Button from "@/components/buttons/Button";
import {useRouter} from "expo-router";
import TextInput from "@/components/text/TextInput";

const Login = () => {
    const router = useRouter();

    const [filled, setFilled] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setFilled(login.length > 0 && password.length > 0);
    }, [login, password]);

    return (
        <ImageBackground source={ require("../../assets/images/background.png")}
                         style={ styles.imageBackground } >
            <SafeAreaView style={ styles.safeArea }>
                <BlurView style={ styles.blurContainer } intensity={16.4}>
                    <View style={ styles.textFieldsContainer }>
                        <TextInput placeholder={ "E-mail" }
                                   size={ 'M' }
                                   text={ login }
                                   onChangeText={ setLogin }/>

                        <TextInput placeholder={ "Password" }
                                   size={ 'M' }
                                   password={ true }
                                   text={ password }
                                   onChangeText={ setPassword }/>

                        <Pressable onPress={ () => console.log("Forget password") }>
                            <Text style={ styles.forgotPasswordText }>Forgot password?</Text>
                        </Pressable>
                    </View>

                    <View style={ styles.buttonsContainer }>
                        <Button text={ "Login" }
                                size={ 'M' }
                                type={ 'primary' }
                                style={{ width: '100%' }}
                                disabled={ !filled }
                                onPress={ () => { filled ? router.navigate("../(tabs)/home") : console.log("Not filled") } }/>

                        <Button text={ "I don't have an account" }
                                size={ 'M' }
                                type={ 'secondary' }
                                style={{ width: '100%' }}
                                onPress={ () => { router.navigate("registration") } }/>
                    </View>

                    <View style={ styles.splitterContainer }>
                        <View style={{ flex: 1, height: 2, backgroundColor: "white" }}/>
                        <Text style={ styles.loginViaText }>or login via</Text>
                        <View style={{ flex: 1, height: 2, backgroundColor: "white" }}/>
                    </View>

                    <View style={ styles.loginViaButtonsContainer }>
                        <Button text={ "VK ID" }
                                size={ 'M' }
                                type={ 'tertiary' }
                                style={{ flex: 1 }}
                                onPress={ () => { alert("Not supported yet(") } }/>

                        <Button text={ "Yandex ID" }
                                size={ 'M' }
                                type={ 'tertiary' }
                                style={{ flex: 1  }}
                                onPress={ () => { alert("Not supported yet(") } }/>
                    </View>
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
        height: 452,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 22,
        overflow: 'hidden',
        padding: 16,
        paddingTop: 24,
        gap: 8,
    },
    textFieldsContainer: {
        gap: 8,
        alignItems: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: Colors.light.base["40"],
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'flex-end',
    },
    splitterContainer: {
        gap: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginViaText: {
        fontSize: 14,
        fontFamily: 'Inter',
        color: Colors.light.base["0"],
    },
    loginViaButtonsContainer: {
        flexDirection: 'row',
        gap: 8,
    }
})

export default Login;
