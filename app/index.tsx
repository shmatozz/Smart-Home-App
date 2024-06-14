import React from "react";
import {Redirect} from "expo-router";

const Splash = () => {
    return (
        <Redirect href="/(tabs)/home" />
        // <View style={ { gap: 10 } }>
        //     <Button text={"Splash"} size={"M"} leftIcon={"android"}/>
        // </View>
    );
}

export default Splash;
