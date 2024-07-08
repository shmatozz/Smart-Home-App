import React from "react";
import {StatusBar, StyleSheet, View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalSearchParams, useRouter} from "expo-router";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import TemperatureConfig from "@/components/visual/TemperatureConfig";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const RoomClimate = () => {
    const router = useRouter();

    const params = useLocalSearchParams<{ room: string }>()
    let room = 'error';

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
                    <InfoCard title={ "Room\ntemperature" } info={ "25°" }>
                        <MaterialCommunityIcons name={ "thermometer" } size={ 32 } color={ Colors.light.blue["50"] }/>
                    </InfoCard>

                    <InfoCard title={ "Humidity" } info={ "45%" }>
                        <MaterialCommunityIcons name={ "water-percent" } size={ 32 } color={ Colors.light.blue["50"] }/>
                    </InfoCard>

                    <InfoCard title={ "Oxygen saturation" } info={ "98%" }>
                        <MaterialCommunityIcons name={ "molecule-co2" } size={ 32 } color={ Colors.light.blue["50"] }/>
                    </InfoCard>

                </View>

                <View style={ styles.settingsContainer }>
                    <Text style={ styles.title }>Temperature settings</Text>

                    <TemperatureConfig/>
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
