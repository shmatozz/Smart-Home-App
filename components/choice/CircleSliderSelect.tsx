import React from "react";
import { View } from "react-native";
import CircleSlider from 'react-native-circle-slider';
import Colors from "@/constants/Colors";

const CircleSliderSelect = () => {
    return (
        <View>
            <CircleSlider
                btnRadius={ 15 }
                dialRadius={ 130 }
                dialWidth={ 30 }
                meterColor={ Colors.light.base["5"] }
                fillColor={ Colors.light.base["0"] }
                onValueChange={ (x) => x }
                textColor="#fff"
                textSize={ 10 }
                strokeColor="#fff"
                strokeWidth={ 10 }
                value={ 70 }
                min={ 30 }
                max={ 100 }
            />
        </View>
    );
}

export default CircleSliderSelect;
