import React from 'react';
import {View, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Button from "@/components/buttons/Button";
import {setItem} from "@/utils/storage/AsyncStorage";
import {useRouter} from "expo-router";

const Account = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={ styles.safeArea }>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Button size={ 'M' } text={ 'Exit account' } onPress={() => {
                    setItem("logged", false).finally(() => {
                        router.replace("../../(auth)/login")
                    });
                }}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.base["0"],
    }
})

export default Account;
