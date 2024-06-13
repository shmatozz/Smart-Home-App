import React from "react";
import {Text, View, StyleSheet, Animated, ScrollView, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import Button from "@/components/buttons/Button";
import ImageCard from "@/components/cards/ImageCard";

const Home = () => {
    const cardsData = [
        {
            image: null,
            title: 'Title 1',
            subtitle: 'Subtitle 1',
        },
        {
            image: null,
            title: 'Title 2',
            subtitle: 'Subtitle 2',
        },
        {
            image: null,
            title: 'Title 3',
            subtitle: 'Subtitle 3',
        },
    ];

    return (
        <SafeAreaView style={ styles.safeArea }>
            <Header title={"Welcome, Matvey!"} firstIcon={"notifications"}/>

            <View style={ styles.contentContainer }>
                <View style={ styles.infoCards }>
                    <InfoCard icon={ "thermostat" } title={ "Inside temperature" } info={ "26" }/>
                    <InfoCard icon={ "devices-other" } title={ "Active devices" } info={ "5" }/>
                    <InfoCard icon={ "bolt" } title={ "Electricity usage" } info={ "36 kWh" }/>
                </View>

                <View style={ styles.roomsContainer }>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={ styles.roomsTitle }>{ "Your Rooms" }</Text>
                        <Button text={ "See all" } type={ "tertiary" } />
                    </View>

                    <FlatList
                        style={ styles.scrollContainer }
                        horizontal={ true }
                        data={ cardsData }
                        renderItem={({item}) => <ImageCard image={ item.image } title={ item.title }/>}
                        keyExtractor={item => item.title}
                    />
                </View>

                <View style={ styles.recentDevicesContainer }>

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
        flexDirection: "column",
        gap: 16,
        padding: 16,
    },
    infoCards: {
        height: 120,
        flexDirection: "row",
        gap: 16,
    },
    roomsContainer: {
        gap: 16,
        paddingVertical: 20,
    },
    roomsTitle: {
        flex: 3,
        fontFamily: "Inter",
        fontSize: 20,
    },
    scrollContainer: {
        flex: 1,
        height: 144,
        gap: 8,
    },
    recentDevicesContainer: {

    }
});

export default Home;
