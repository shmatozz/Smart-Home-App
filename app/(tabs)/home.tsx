import React from "react";
import { Text, View, StyleSheet, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import Button from "@/components/buttons/Button";
import ImageCard from "@/components/cards/ImageCard";
import DeviceCard from "@/components/cards/DeviceCard";

const cardsData = [
    {
        image: null,
        title: 'Living room',
        subtitle: '6 Devices',
    },
    {
        image: null,
        title: 'Bedroom',
        subtitle: '7 Devices',
    },
    {
        image: null,
        title: 'Kitchen',
        subtitle: '9 Devices',
    },
    {
        image: null,
        title: 'Hallway',
        subtitle: '3 Devices',
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
        title: 'Air cooler',
        subtitle: 'Kitchen',
    }
]

const Home = () => {
    const windowWidth = Dimensions.get('window').width - 32 - 8 * (cardsData.length - 1);
    let cardWidth = windowWidth / cardsData.length;
    if (cardWidth < 144) cardWidth = 144;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={"Welcome, Matvey!"} firstIcon={"notifications"}/>

            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"}>
                <View style={ styles.contentContainer }>
                    <View style={ styles.infoCards }>
                        <InfoCard icon={ "thermostat" } title={ "Inside\ntemperature" } info={ "26°" }/>
                        <InfoCard icon={ "devices-other" } title={ "Active\ndevices" } info={ "5" }/>
                        <InfoCard icon={ "bolt" } title={ "Electricity usage" } info={ "36 kWh" }/>
                    </View>

                    <View style={ styles.roomsContainer }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={ styles.roomsTitle }>{ "Your Rooms" }</Text>
                            <Button text={ "See all" } type={ "tertiary" } />
                        </View>
                    </View>

                    <ScrollView style={ styles.scrollContainer }
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                overScrollMode={'never'}>
                        <View style={{ width: 12 }}/>
                        <View style={{ flexDirection: 'row' }}>
                            { cardsData.map((item, index) => (
                                <Link key={item.title}
                                      style={{ marginHorizontal: 4 }}
                                      href={{ pathname: "room/[room]", params: { room: item.title } }}>
                                    <ImageCard image={ item.image }
                                               title={ item.title }
                                               subtitle={ item.subtitle }
                                               style={{ height: 144, width: cardWidth, }}
                                               key={ index }/>
                                </Link>
                            ))}
                        </View>
                        <View style={{ width: 12 }}/>
                    </ScrollView>

                    <View style={ styles.recentDevicesContainer }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={ styles.roomsTitle }>{ "Recent devices" }</Text>
                            <Button text={ "See all" } type={ "tertiary" } />
                        </View>

                        <View style={{ gap: 12 }}>
                            { devicesData.map((device, index) => (
                                <DeviceCard key={ index }
                                            image={ device.image }
                                            title={ device.title }
                                            subtitle={ device.subtitle }
                                            type={ 'horizontal' }/>
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
        paddingVertical: 16,
        gap: 16,
    },
    infoCards: {
        paddingHorizontal: 16,
        height: 120,
        flexDirection: "row",
        gap: 16,
    },
    roomsContainer: {
        paddingHorizontal: 16,
        gap: 16,
        paddingTop: 20,
    },
    roomsTitle: {
        flex: 3,
        fontFamily: "Inter",
        fontSize: 20,
    },
    scrollContainer: {
        flex: 1,
        paddingBottom: 20,
    },
    recentDevicesContainer: {
        paddingHorizontal: 16,
        gap: 16,
    }
});

export default Home;
