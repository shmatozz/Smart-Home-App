import {View, StyleSheet, Text, FlatList, Dimensions} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import PageHeader from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import React from "react";
import DeviceCard from "@/components/cards/DeviceCard";

const Room = () => {
    let router = useRouter();

    const room = useLocalSearchParams< { room: string }>();

    const windowHeight = Dimensions.get('window').height - 350 - 16 * (devicesData.length / 2 + devicesData.length % 2 - 1);
    let cardHeight = windowHeight / (devicesData.length / 2 + devicesData.length % 2);
    if (cardHeight < 160) cardHeight = 160;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <PageHeader title={ room.room!.toString() }
                        backIcon={ true }
                        onBackPress={() => router.back() }
                        accountIcon={ false }
                        firstIcon={'notifications'}/>

            <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode={'never'}
                contentContainerStyle={ styles.contentContainer }
                ListHeaderComponent={
                    <View style={ styles.listHeaderContainer }>
                        <View style={ styles.infoCards }>
                            <InfoCard icon={ "thermostat" }
                                      title={ "Room\ntemperature" }
                                      info={ "25°" }
                                      onPress={() => { router.push({ pathname: '../room/climate', params: { room: room.room }}) }}/>
                            <InfoCard icon={ "devices-other" } title={ "Active\ndevices" } info={ "2" }/>
                            <InfoCard icon={ "bolt" } title={ "Electricity usage" } info={ "15 kWh" }/>
                        </View>

                        <View style={ styles.devicesContainer }>
                            <Text style={ styles.title }>Available devices</Text>
                        </View>
                    </View>
                }
                data={ devicesData }
                renderItem={({ item }) =>
                    <DeviceCard image={ item.image }
                                title={ item.title }
                                type={ 'vertical' }
                                style={{ marginHorizontal: 8, height: cardHeight, }}/>}
                keyExtractor={item => item.title}
                numColumns={ 2 }
                ItemSeparatorComponent={() => <View style={{ width: 16 }}/>}
                columnWrapperStyle={styles.row}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.base["0"],
    },
    row: {
        justifyContent: 'space-between',
    },
    contentContainer: {
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 16,
    },
    listHeaderContainer: {
        paddingHorizontal: 8,
        gap: 16
    },
    infoCards: {
        flexDirection: 'row',
        height: 120,
        gap: 16,
    },
    devicesContainer: {
        paddingTop: 20,
        gap: 16,
    },
    devicesListContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontFamily: "Inter",
        color: Colors.light.base["90"]
    }
})

const devicesData = [
    {
        image: "https://cdn.mos.cms.futurecdn.net/ZW4ZjyfpcZgoDQnmcw6YLK.jpg",
        title: 'TV', subtitle: 'Living room',
    },
    {
        image: "https://www.ikea.com/us/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059592_pe849717_s5.jpg",
        title: 'Lamp', subtitle: 'Living room',
    },
    {
        image: "https://www.lamps.eu/media/product/119170/354x354/wemude-ceiling-light-h3016183-0.jpg",
        title: 'Main Lights', subtitle: 'Living room',
    },
    {
        image: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/154419-games-review-hands-on-playstation-5-hands-on-pics-image1-tbq3hzlrkw.jpg",
        title: 'Play Station', subtitle: 'Living room',
    },
    {
        image: "https://www.netrinc.com/wp-content/uploads/2023/01/Buying-a-Wall-Mounted-Air-Conditioner.jpg",
        title: 'Air cooler', subtitle: 'Living room',
    },
]

export default Room;
