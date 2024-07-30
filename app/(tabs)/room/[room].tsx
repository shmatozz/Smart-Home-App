import {View, StyleSheet, Text, FlatList, Dimensions} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import PageHeader from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import InfoCard from "@/components/cards/InfoCard";
import React from "react";
import DeviceCard from "@/components/cards/DeviceCard";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Headers } from "@/constants/Fonts";
import {observer} from "mobx-react-lite";
import RoomViewModel from "@/utils/viewmodels/Room/RoomViewModel";
import translate from "@/utils/localization/Localization";

const roomViewModel = new RoomViewModel();

const Room = observer(() => {
    let router = useRouter();

    roomViewModel.setRoomTitle(useLocalSearchParams< { room: string }>().room!);

    const windowHeight = Dimensions.get('window').height - 350 - 16 * (roomViewModel.devices.length / 2 + roomViewModel.devices.length % 2 - 1);
    let cardHeight = windowHeight / (roomViewModel.devices.length / 2 + roomViewModel.devices.length % 2);
    if (cardHeight < 160) cardHeight = 160;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <PageHeader title={ roomViewModel.title }
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
                            <InfoCard title={ translate("room-temperature") }
                                      info={ "25°" }
                                      onPress={() => {
                                          router.push({ pathname: '../room/climate', params: { room: roomViewModel.title }})
                                      }}>
                                <MaterialCommunityIcons name={ "thermometer" } size={ 32 } color={ Colors.light.blue["50"]}/>
                            </InfoCard>

                            <InfoCard title={ translate("active-devices") } info={ "5" }>
                                <MaterialIcons name={ "devices-other" } size={ 32 } color={ Colors.light.blue["50"] }/>
                            </InfoCard>

                            <InfoCard title={ translate("electricity-usage") } info={ "36 kWh" }>
                                <MaterialIcons name={ "bolt" } size={ 32 } color={ Colors.light.blue["50"] }/>
                            </InfoCard>
                        </View>

                        <View style={ styles.devicesContainer }>
                            <Text style={ Headers.H5 }>{ translate("available-devices") }</Text>
                        </View>
                    </View>
                }
                data={ roomViewModel.devices }
                renderItem={({ item, index }) =>
                    <DeviceCard image={ item.image }
                                title={ item.title }
                                type={ 'vertical' }
                                working={ item.working }
                                setWorking={ (working) => roomViewModel.setDeviceWorking(index, working) }
                                style={{ marginHorizontal: 8, height: cardHeight, }}/>}
                keyExtractor={item => item.title}
                numColumns={ 2 }
                ItemSeparatorComponent={() => <View style={{ width: 16 }}/>}
                columnWrapperStyle={styles.row}
            />
        </SafeAreaView>
    );
})

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
})

export default Room;
