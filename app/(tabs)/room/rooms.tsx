import React from "react";
import {Dimensions, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link, useLocalSearchParams, useRouter} from "expo-router";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import ImageCard from "@/components/cards/ImageCard";

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

const Rooms = () => {
    const router = useRouter();

    const params = useLocalSearchParams<{ redirect: string, room: string }>()

    if (params.redirect && params.room && params.redirect == '1') {
        console.log(params)
        router.push({ pathname: '../room/[room]', params: { room: params.room } });
    }

    const windowHeight = Dimensions.get('window').height - 52 - 16 * (cardsData.length - 1) - 56 * 2;
    const windowWidth = Dimensions.get('window').width - 32;
    let cardHeight = windowHeight / cardsData.length;
    if (cardHeight < 160) cardHeight = 160;

    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={ "Rooms" } firstIcon={"notifications"} />

            <View style={ styles.contentContainer }>
                <ScrollView style={ styles.scrollContainer }
                            showsVerticalScrollIndicator={false}
                            overScrollMode={'never'}>
                    <View style={{ height: 8 }}/>
                    <View style={{ flexDirection: 'column' }}>
                        { cardsData.map((item, index) => (
                            <Link key={item.title}
                                  style={{ marginVertical: 8, }}
                                  href={{ pathname: '../room/[room]', params: { room: item.title } }}>
                                <ImageCard image={ item.image }
                                           title={ item.title }
                                           subtitle={ item.subtitle }
                                           size={'M'}
                                           style={{ height: cardHeight, width: windowWidth }}
                                           key={ index }/>
                            </Link>
                        ))}
                    </View>
                    <View style={{ height: 8 }}/>
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
        flex: 1,
    }
});
export default Rooms;
