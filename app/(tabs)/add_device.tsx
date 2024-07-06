import React, {useState} from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import ImageCard from "@/components/cards/ImageCard";
import TextInput from "@/components/text/TextInput";
import DropdownSelect from "@/components/choice/DropdownSelect";
import Button from "@/components/buttons/Button";

const Add_Device = () => {
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("null");

    const [roomsCardsHeight, setRoomsCardsHeight] = useState(0);
    const [roomsCardsWidth, setRoomsCardsWidth] = useState(0);

    const handleLayout = (event: { nativeEvent: { layout: { height: any; width: any }; }; }) => {
        const { height, width } = event.nativeEvent.layout;
        setRoomsCardsHeight(Math.max(
            240,
            (height - 28) / roomsData.length
        ));
        setRoomsCardsWidth(Math.max(
            144,
            (width - 32 - 8 * (roomsData.length - 1)) / roomsData.length
        ));
    };

    const [selected, setSelected] = useState(-1);

    return (
        <SafeAreaView style={ styles.safeArea }>
            <Header title={ "Add new device" }
                    accountIcon={ false } />

            <View style={ styles.contentContainer }>
                <View style={ styles.deviceFormContainer }>
                    <View style={ styles.selectRoomContainer }
                          onLayout={ handleLayout }>
                        <Text style={ [textStyles.title, { paddingHorizontal: 16 }] }>Select room</Text>

                        <ScrollView horizontal={ true }
                                    showsHorizontalScrollIndicator={false}
                                    overScrollMode={'never'}>
                            <View style={{ width: 16 }}/>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                {
                                    roomsData.map((item, index) => (
                                        <ImageCard image={ item.image }
                                                   title={ item.title }
                                                   subtitle={ item.subtitle }
                                                   style={{
                                                       height: roomsCardsHeight,
                                                       width: roomsCardsWidth,
                                                   }}
                                                   key={ index }
                                                   selectable={ true }
                                                   selected={ selected === index }
                                                   onPress={ () => setSelected(index) }
                                        />
                                    ))
                                }
                            </View>
                            <View style={{ width: 16 }}/>
                        </ScrollView>
                    </View>

                    <View style={ styles.deviceNameContainer }>
                        <Text style={ textStyles.title }>Name new device</Text>
                        
                        <TextInput text={ deviceName }
                                   onChangeText={ setDeviceName }
                                   placeholder={ 'Device Name' }
                                   size={ 'M' }/>

                        <DropdownSelect placeholder={ 'Type' }
                                        leftIcon={ 'devices-other' }
                                        options={ ['Air', 'Lights', 'Audio'] }
                                        selectedOption={ deviceType }
                                        onOptionSelected={ setDeviceType }
                                        size={ 'M' }/>
                    </View>

                    <View style={ styles.confirmContainer }>
                        <Text style={ textStyles.title }>Pair signal</Text>

                        <Button text={ "Find device signal" }
                                size={ 'M' }
                                type={ 'secondary' }/>
                    </View>
                </View>

                <View style={ styles.smartPairContainer }>
                    <View style={ styles.splitterContainer }>
                        <View style={{ flex: 1, height: 2, backgroundColor: Colors.light.base["90"] }}/>
                        <Text style={ textStyles.subtitle }>or connect via</Text>
                        <View style={{ flex: 1, height: 2, backgroundColor: Colors.light.base["90"]  }}/>
                    </View>

                    <Button text={ 'Smart connect using WIFI' } size={ 'M' } type={ 'primary' } leftIcon={ 'wifi' }/>
                </View>
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
        paddingVertical: 12,
        gap: 4,
    },
    deviceFormContainer: {
        flex: 1,
        gap: 16,
    },
    selectRoomContainer: {
        flex: 1,
        gap: 8,
    },
    deviceNameContainer: {
        gap: 8,
        paddingHorizontal: 16,
    },
    confirmContainer: {
        paddingTop: 8,
        gap: 8,
        paddingHorizontal: 16,
    },
    smartPairContainer: {
        paddingHorizontal: 16,
        gap: 4,
    },
    splitterContainer: {
        height: 35,
        gap: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
})

const textStyles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontFamily: 'Inter',
        color: Colors.light.base["90"],
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter',
        color: Colors.light.base["90"],
    },
})

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


export default Add_Device;
