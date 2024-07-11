import React from "react";
import { Text, View, StyleSheet, ScrollView, StatusBar, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import Button from "@/components/buttons/Button";
import ImageCard from "@/components/cards/ImageCard";
import DeviceCard from "@/components/cards/DeviceCard";
import {setItem} from "@/utils/storage/AsyncStorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Headers} from "@/constants/Fonts";

const Home = () => {
    const router = useRouter()

    const windowWidth = Dimensions.get('window').width - 32 - 8 * (roomsData.length - 1);
    let cardWidth = windowWidth / roomsData.length;
    if (cardWidth < 144) cardWidth = 144;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={"Welcome, Matvey!"} firstIcon={"notifications"} onAccountPress={ () => {
                setItem("logged", false);
            }}/>

            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"}>
                <View style={ styles.contentContainer }>
                    <View style={ styles.infoCards }>
                        <InfoCard title={ "Inside\ntemperature" } info={ "26°" }>
                            <MaterialCommunityIcons name={ "thermometer" } size={ 32 } color={ Colors.light.blue["50"] }/>
                        </InfoCard>

                        <InfoCard title={ "Active\ndevices" } info={ "5" }>
                            <MaterialIcons name={ "devices-other" } size={ 32 } color={ Colors.light.blue["50"] }/>
                        </InfoCard>

                        <InfoCard title={ "Electricity usage" } info={ "36 kWh" }>
                            <MaterialIcons name={ "bolt" } size={ 32 } color={ Colors.light.blue["50"] }/>
                        </InfoCard>
                    </View>

                    <View style={ styles.roomsContainer }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={[ Headers.H5, { flex: 3 } ]}>
                                { "Your Rooms" }
                            </Text>

                            <Button text={ "See all" } type={ "tertiary" }
                                    onPress={() => router.navigate('room/rooms') }>
                            </Button>
                        </View>
                    </View>

                    <ScrollView style={ styles.scrollContainer }
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                overScrollMode={'never'}>
                        <View style={{ width: 12 }}/>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                roomsData.map((item, index) => (
                                    <View key={item.title}
                                          style={{ marginHorizontal: 4 }}>
                                        <ImageCard image={ item.image }
                                                   title={ item.title }
                                                   subtitle={ item.subtitle }
                                                   style={{ height: 144, width: cardWidth, }}
                                                   key={ index }
                                                   onPress={ () => router.navigate({ pathname: "room/rooms", params: { redirect: 1, room: item.title }})}
                                        />
                                    </View>
                                ))
                            }
                        </View>
                        <View style={{ width: 12 }}/>
                    </ScrollView>

                    <View style={ styles.recentDevicesContainer }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={[ Headers.H5, { flex: 3 } ]}>
                                { "Recent devices" }
                            </Text>

                            <Button text={ "See all" } type={ "tertiary" } />
                        </View>

                        <View style={{ gap: 12 }}>
                            {
                                devicesData.map((device, index) => (
                                    <DeviceCard key={ index }
                                                image={ device.image }
                                                title={ device.title }
                                                subtitle={ device.subtitle }
                                                type={ 'horizontal' }/>
                                ))
                            }
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
    scrollContainer: {
        flex: 1,
        paddingBottom: 20,
    },
    recentDevicesContainer: {
        paddingHorizontal: 16,
        gap: 16,
    }
});

const roomsData = [
    {
        image: "https://www.mebelkaliningrada.ru/wp-content/uploads/2018/12/2750880675.jpg",
        title: 'Living room', subtitle: '6 devices'
    },
    {
        image: "https://colodu.club/uploads/posts/2022-10/1666684356_21-colodu-club-p-master-spalnya-planirovka-krasivo-21.jpg",
        title: 'Bedroom', subtitle: '7 devices'
    },
    {
        image: "https://www.service-general.gr/media/widgetkit/kitchen5-c512f9d4d63cc58aa6469df0fd830991.jpg",
        title: 'Kitchen', subtitle: '9 devices'
    },
    {
        image: "https://gagaru.club/uploads/posts/2023-02/thumbs/1676687091_gagaru-club-p-krasivaya-prikhozhaya-v-dome-vkontakte-8.jpg",
        title: 'Hallway', subtitle: '3 devices'
    },
];

const devicesData = [
    {
        image: "https://cdn.mos.cms.futurecdn.net/ZW4ZjyfpcZgoDQnmcw6YLK.jpg",
        title: 'TV', subtitle: 'Living room',
    },
    {
        image: "https://www.ikea.com/us/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059592_pe849717_s5.jpg",
        title: 'Lamp', subtitle: 'Bedroom',
    },
    {
        image: "https://www.netrinc.com/wp-content/uploads/2023/01/Buying-a-Wall-Mounted-Air-Conditioner.jpg",
        title: 'Air cooler', subtitle: 'Kitchen',
    }
]

export default Home;
