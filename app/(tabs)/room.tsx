import React from "react";
import {Dimensions, ScrollView, StatusBar, StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
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

const Room = () => {
    const windowHeight = Dimensions.get('window').height - 52 - 16 * (cardsData.length - 1) - 56 * 2;
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
                            <ImageCard image={ item.image }
                                       title={ item.title }
                                       subtitle={ item.subtitle }
                                       size={'M'}
                                       style={{ height: cardHeight, marginVertical: 8 }}
                                       key={ index }/>
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
export default Room;
