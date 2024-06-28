import React, {useRef} from "react";
import {StatusBar, StyleSheet, View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams, useRouter} from "expo-router";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import SegmentedSelect from "@/components/choice/SegmentedSelect";

const RoomClimate = () => {
    const router = useRouter();

    const params = useLocalSearchParams<{ room: string }>()
    let room = 'error';

    const mode = useRef(0);

    if (params.room != undefined) {
        console.log(params);
        room = params.room;
    }

    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header backIcon={ true }
                    onBackPress={ () => router.back() }
                    accountIcon={ false }
                    title={ room }
                    firstIcon={ "notifications" } />

            <View style={ styles.contentContainer }>
                <View style={ styles.infoContainer }>
                    <InfoCard icon={ "thermostat" } title={ "Room\ntemperature" } info={ "25°" }/>
                    <InfoCard icon={ "water-drop" } title={ "Humidity" } info={ "45%" }/>
                    <InfoCard icon={ "co2" } title={ "Oxygen saturation" } info={ "98%" }/>
                </View>

                <View style={ styles.settingsContainer }>
                    <Text style={ styles.title }>Temperature settings</Text>

                    <View style={ styles.circleInputContainer }>

                    </View>

                    <SegmentedSelect titles={['Cooling', 'Heating', 'Wetting']}
                                     icons={['severe-cold', 'local-fire-department', 'water']}
                                     onChangeSelected={(i) => mode.current = i } />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.base["0"],
    },
    contentContainer: {
        flex: 1,
        padding: 16,
        gap: 16,
    },
    infoContainer: {
        flexDirection: 'row',
        height: 120,
        gap: 16,
    },
    settingsContainer: {
        flex: 1,
        paddingTop: 20,
    },
    circleInputContainer: {
        flex: 1,
        alignItems: "center",
        elevation: 4,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Inter',
        color: Colors.light.base["90"]
    },
    modeSelectContainer: {
        flexDirection: 'row',
        gap: 16,
    },
});

export default RoomClimate;
