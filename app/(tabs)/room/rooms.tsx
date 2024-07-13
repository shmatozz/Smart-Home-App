import React from "react";
import {Dimensions, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import ImageCard from "@/components/cards/ImageCard";
import RoomsViewModel from "@/utils/viewmodels/Room/RoomsViewModel";
import {observer} from "mobx-react-lite";

const roomsViewModel = new RoomsViewModel();

const Rooms = observer(() => {
    const router = useRouter();

    const params = useLocalSearchParams<{ redirect: string, room: string }>()

    if (params.redirect && params.room && params.redirect == '1') {
        console.log(params)
        router.push({ pathname: '../room/[room]', params: { room: params.room } });
    }

    const windowHeight = Dimensions.get('window').height - 16 * (roomsViewModel.getRoomsCount() + 1) - 68 * 2;
    let cardHeight = windowHeight / roomsViewModel.getRoomsCount();
    if (cardHeight < 160) cardHeight = 160;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={ "Rooms" } firstIcon={"notifications"} />

            <View style={ styles.contentContainer }>
                <ScrollView style={ styles.scrollContainer }
                            showsVerticalScrollIndicator={false}
                            overScrollMode={'never'}>
                    <View style={ styles.scrollView }>
                        {
                            roomsViewModel.rooms.map((item, index) => (
                                <View key={ item.title }>
                                    <ImageCard image={ item.image }
                                               title={ item.title }
                                               subtitle={ item.devices + ' devices' }
                                               size={'M'}
                                               style={{ height: cardHeight, }}
                                               key={ index }
                                               onPress={ () => router.navigate({ pathname: '../room/[room]', params: { room: item.title } })}
                                    />
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
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
        paddingHorizontal: 16,
    },
    scrollContainer: {
    },
    scrollView: {
        flex: 1,
        gap: 16,
        paddingVertical: 16,
    }
});

export default Rooms;
