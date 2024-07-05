import React from "react";
import {Dimensions, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import ImageCard from "@/components/cards/ImageCard";

const Rooms = () => {
    const router = useRouter();

    const params = useLocalSearchParams<{ redirect: string, room: string }>()

    if (params.redirect && params.room && params.redirect == '1') {
        console.log(params)
        router.push({ pathname: '../room/[room]', params: { room: params.room } });
    }

    const windowHeight = Dimensions.get('window').height - 16 * (roomsData.length + 1) - 68 * 2;
    let cardHeight = windowHeight / roomsData.length;
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
                            roomsData.map((item, index) => (
                                <View key={ item.title }>
                                    <ImageCard image={ item.image }
                                               title={ item.title }
                                               subtitle={ item.subtitle }
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
}

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

export default Rooms;
