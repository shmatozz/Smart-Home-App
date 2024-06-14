import React from "react";
import {Text, View, StyleSheet, FlatList, ScrollView, StatusBar} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import Button from "@/components/buttons/Button";
import ImageCard from "@/components/cards/ImageCard";
import {color} from "ansi-fragments";
import DeviceWideCard from "@/components/cards/DeviceWideCard";

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

const devicesData = [
    {
        image: null,
        title: 'TV',
        subtitle: 'Living room',
    },
    {
        image: null,
        title: 'Lamp',
        subtitle: 'Bedroom',
    },
    {
        image: null,
        title: 'Aircooler',
        subtitle: 'Kitchen',
    },
]

const Home = () => {
    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={"Welcome, Matvey!"} firstIcon={"notifications"}/>

            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"}>
                <View style={ styles.contentContainer }>
                    <View style={ styles.infoCards }>
                        <InfoCard icon={ "thermostat" } title={ "Inside\ntemperature" } info={ "26" }/>
                        <InfoCard icon={ "devices-other" } title={ "Active\ndevices" } info={ "5" }/>
                        <InfoCard icon={ "bolt" } title={ "Electricity usage" } info={ "36 kWh" }/>
                    </View>

                    <View style={ styles.roomsContainer }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={ styles.roomsTitle }>{ "Your Rooms" }</Text>
                            <Button text={ "See all" } type={ "tertiary" } />
                        </View>

                        <FlatList
                            style={{ overflow: 'visible' }}
                            horizontal={ true }
                            data={ cardsData }
                            showsHorizontalScrollIndicator={ false }
                            overScrollMode={ "never" }
                            renderItem={({item}) => <ImageCard image={ item.image } title={ item.title } subtitle={ item.subtitle }/>}
                            ItemSeparatorComponent={() => <View style={{ width: 8 }}/>}
                            keyExtractor={item => item.title}
                        />
                    </View>

                    <View style={ styles.recentDevicesContainer }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={ styles.roomsTitle }>{ "Recent devices" }</Text>
                            <Button text={ "See all" } type={ "tertiary" } />
                        </View>

                        <View style={{ gap: 12 }}>
                            { devicesData.map((device, index) => (
                                <DeviceWideCard key={ index }
                                                image={ device.image }
                                                title={ device.title }
                                                subtitle={ device.subtitle }/>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
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
        overflow: 'visible',
        gap: 16,
        paddingVertical: 20,
    },
    roomsTitle: {
        flex: 3,
        fontFamily: "Inter",
        fontSize: 20,
    },
    recentDevicesContainer: {
        gap: 16,
    }
});

export default Home;
