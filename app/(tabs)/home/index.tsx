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
import Notifications from "@/components/visual/Notifications"
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Headers} from "@/constants/Fonts";
import HomeViewModel from "@/utils/viewmodels/Home/HomeViewModel";
import translate from "@/utils/localization/Localization";
import {observer} from "mobx-react-lite";

const homeVM = new HomeViewModel();

const Home = observer(() => {
    const router = useRouter();

    const windowWidth = Dimensions.get('window').width - 32 - 8 * (homeVM.getRoomsCount() - 1);
    let cardWidth = windowWidth / homeVM.getRoomsCount();
    if (cardWidth < 144) cardWidth = 144;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={ translate("welcome") + ", Matvey!" }
                    firstIcon={"notifications"}
                    onFirstPress={ () => homeVM.setNotificationVisible(true) }
                    onAccountPress={ () => router.push('../home/account') }
            />

            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"}>
                <View style={ styles.contentContainer }>
                    <View style={ styles.infoCards }>
                        <InfoCard title={ translate("inside-temperature") } info={ "26°" }>
                            <MaterialCommunityIcons name={ "thermometer" } size={ 32 } color={ Colors.light.blue["50"] }/>
                        </InfoCard>

                        <InfoCard title={ translate("active-devices") } info={ "5" }>
                            <MaterialIcons name={ "devices-other" } size={ 32 } color={ Colors.light.blue["50"] }/>
                        </InfoCard>

                        <InfoCard title={ translate("electricity-usage") } info={ "36 kWh" }>
                            <MaterialIcons name={ "bolt" } size={ 32 } color={ Colors.light.blue["50"] }/>
                        </InfoCard>
                    </View>

                    <View style={ styles.roomsContainer }>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={[ Headers.H5, { flex: 3 } ]}>
                                { translate("your-rooms") }
                            </Text>

                            <Button text={ translate("see-all") } type={ "tertiary" }
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
                                homeVM.rooms.map((item, index) => (
                                    <View key={item.title}
                                          style={{ marginHorizontal: 4 }}>
                                        <ImageCard image={ item.image }
                                                   title={ item.title }
                                                   subtitle={ item.devices + ' ' + (item.devices == 1 ? translate("device") : translate("devices")) }
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
                                { translate("recent-devices") }
                            </Text>

                            <Button text={ translate("see-all") } type={ "tertiary" } />
                        </View>

                        <View style={{ gap: 12 }}>
                            {
                                homeVM.recentDevices.map((device, index) => (
                                    <DeviceCard key={ index }
                                                image={ device.image }
                                                title={ device.title }
                                                subtitle={ device.room }
                                                working={ device.working }
                                                setWorking={ (working) => homeVM.setDeviceWorking(index, working) }
                                                type={ 'horizontal' }/>
                                ))
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Notifications visible={ homeVM.notificationVisible }
                           setVisible={ homeVM.setNotificationVisible }/>
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
