import React from "react";
import {Redirect} from "expo-router";
import {View} from "react-native";
import Button from "@/components/buttons/Button";

const Splash = () => {
    const logged = false
    const firstLaunch = true

    if (logged) {
        return ( <Redirect href="/(tabs)/home" /> );
    }

    if (firstLaunch) {
        return ( <Redirect href="/(onboarding)" /> );
    }

    return (
        <View style={ { gap: 10 } }>
            <Button text={"Splash"} size={"M"} leftIcon={"android"}/>
        </View>
    );
}

export default Splash;
