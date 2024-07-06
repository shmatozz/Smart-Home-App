import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import CircleSliderSelect from "@/components/choice/CircleSliderSelect";
import SegmentedSelect from "@/components/choice/SegmentedSelect";
import Colors from "@/constants/Colors";
import CircularProgress from "react-native-circular-progress-indicator";

interface TemperatureConfigProps {
}

const TemperatureConfig: React.FC<TemperatureConfigProps> = ({}) => {
    const [temperature, setTemperature] = useState(1);
    const mode = useRef(0);

    return (
        <View style={ styles.container }>
            <View style={ styles.circleInputContainer }>
                <View style={ styles.backgroundCircle }/>

                <CircleSliderSelect value={ temperature }
                                    setValue={ setTemperature }/>

                <View style={ styles.unfilledCircle }>
                    <CircularProgress value={ 15 }
                                      maxValue={ 20 }
                                      radius={ 130 }
                                      duration={ 0 }
                                      activeStrokeWidth={ 32 }
                                      activeStrokeColor={ Colors.light.base["5"] }
                                      inActiveStrokeColor={ 'transparent' }
                                      rotation={ -135 }
                                      showProgressValue={ false }
                    />
                </View>
            </View>

            <SegmentedSelect titles={['Cooling', 'Heating', 'Wetting']}
                             icons={['severe-cold', 'local-fire-department', 'water']}
                             onChangeSelected={(i) => mode.current = i } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    circleInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
    },
    backgroundCircle: {
        flex: 1,
        width: 238,
        height: 238,
        borderRadius: 200,
        position: 'absolute',
        zIndex: -1,
        elevation: 2,
        backgroundColor: Colors.light.base["0"]
    },
    unfilledCircle: {
        position: "absolute",
        zIndex: -1,
    }
})

export default TemperatureConfig;