import React from "react";
import {Text, View, StyleSheet, StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Header from "@/components/visual/PageHeader";
import InfoCard from "@/components/cards/InfoCard";
import Graph from "@/components/visual/Graph";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {Headers} from "@/constants/Fonts";
import {observer} from "mobx-react-lite";
import StatsViewModel from "@/utils/viewmodels/Stats/StatsViewModel";
import translate from "@/utils/localization/Localization";

const statsViewModel = new StatsViewModel();

const Stats = observer(() => {
    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={ translate("statistic") }
                    firstIcon={ "notifications" }
                    accountIcon={ false }/>

            <View style={ styles.contentContainer }>
                <View style={ styles.cardsContainer }>
                    <InfoCard title={ translate("today-electricity-used") } info={'44 kWh'}>
                        <MaterialCommunityIcons name={ "calendar-today" } size={ 32 } color={ Colors.light.blue["50"] }/>
                    </InfoCard>

                    <InfoCard title={ translate("this-month-electricity-used") } info={'770 kWh'}>
                        <MaterialCommunityIcons name={ "calendar-month" } size={ 32 } color={ Colors.light.blue["50"] }/>
                    </InfoCard>
                </View>

                <View style={ styles.graphContainer }>
                    <Text style={ Headers.H5 }>{ translate("graphics") }</Text>

                    <Graph/>
                </View>
            </View>
        </SafeAreaView>
    );
})

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
    cardsContainer: {
        height: 120,
        flexDirection: 'row',
        gap: 16,
    },
    graphContainer: {
        flex: 1,
        paddingTop: 20,
    },
    selectContainer: {
        paddingVertical: 16,
        paddingHorizontal: 4,
        gap: 16,
        flexDirection: 'row',
    },
})

export default Stats;
