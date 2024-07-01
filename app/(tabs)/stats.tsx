import React from "react";
import {Text, View, StyleSheet, StatusBar} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import Header from "@/components/visual/PageHeader";
import InfoCard from "@/components/cards/InfoCard";
import Graph from "@/components/visual/Graph";

const Stats = () => {
    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={"Statistics"}
                    firstIcon={"notifications"}
                    accountIcon={ false }/>

            <View style={ styles.contentContainer }>
                <View style={ styles.cardsContainer }>
                    <InfoCard icon={'calendar-today'} title={'Today\nelectricity used'} info={'44 kWh'}/>
                    <InfoCard icon={'calendar-month'} title={'This month\nelectricity used'} info={'770 kWh'}/>
                </View>

                <View style={ styles.graphContainer }>
                    <Text style={ styles.title }>Graphics</Text>

                    <Graph/>
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
    cardsContainer: {
        height: 120,
        flexDirection: 'row',
        gap: 16,
    },
    graphContainer: {
        flex: 1,
        paddingTop: 20,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Inter',
        color: Colors.light.base["90"],
    },
    selectContainer: {
        paddingVertical: 16,
        paddingHorizontal: 4,
        gap: 16,
        flexDirection: 'row',
    },
})

export default Stats;
