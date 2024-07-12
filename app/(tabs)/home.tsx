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
import HomeViewModel from "@/utils/viewmodels/HomeViewModel";

const homeViewModel = new HomeViewModel();

const Home = () => {
    const router = useRouter()

    const windowWidth = Dimensions.get('window').width - 32 - 8 * (homeViewModel.getRoomsCount() - 1);
    let cardWidth = windowWidth / homeViewModel.getRoomsCount();
    if (cardWidth < 144) cardWidth = 144;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={"Welcome, Matvey!"} firstIcon={"notifications"} onAccountPress={ () => {
                setItem("logged", false).then();
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
                                homeViewModel.rooms.map((item, index) => (
                                    <View key={item.title}
                                          style={{ marginHorizontal: 4 }}>
                                        <ImageCard image={ item.image }
                                                   title={ item.title }
                                                   subtitle={ item.devices + ' devices' }
                                                   style={{ height: 144, width: cardWidth, }}
                                                   key={ index }
                                                   onPress={ () => {
                                                       router.navigate({ pathname: "room/rooms", params: { redirect: 1, room: item.title }})
                                                   }}
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
                                homeViewModel.recentDevices.map((device, index) => (
                                    <DeviceCard key={ index }
                                                image={ device.image }
                                                title={ device.title }
                                                subtitle={ device.room }
                                                working={ device.working }
                                                setWorking={ (working) => homeViewModel.setDeviceWorking(index, working) }
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

export default Home;
