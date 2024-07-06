import React from "react";
import {Redirect} from "expo-router";

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
        <Redirect href="/(auth)/login" />
    );
}

export default Splash;
