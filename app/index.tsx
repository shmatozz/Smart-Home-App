import React from "react";
import { Redirect } from "expo-router";
import { firstLaunch, logged } from "@/app/_layout";

const Splash = () => {
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
