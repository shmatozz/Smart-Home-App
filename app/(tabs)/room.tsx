import React from "react";
import {FlatList, ScrollView, StatusBar, StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import ImageCard from "@/components/cards/ImageCard";

const cardsData = [
    {
        image: null,
        title: 'Title 1',
        subtitle: 'Subtitle 1',
    },
    {
        image: null,
        title: 'Title 2',
        subtitle: 'Subtitle 2',
    },
    {
        image: null,
        title: 'Title 3',
        subtitle: 'Subtitle 3',
    },
];

const Room = () => {
    return (
        <SafeAreaView style={ styles.safeArea }>
            <StatusBar barStyle='dark-content' />
            <Header title={ "Rooms" } firstIcon={"notifications"} />

            <View style={ styles.contentContainer }>
                <FlatList style={ styles.scrollContainer }
                          data={ cardsData }
                          keyExtractor={ (item, index) => index.toString()}
                          renderItem={({item}) => <ImageCard  image={item.image} title={item.title} subtitle={item.subtitle}/>}
                          ItemSeparatorComponent={() => <View style={{ width: 8 }}/>}
                />
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
        backgroundColor: Colors.light.base["5"],
    }
});
export default Room;
