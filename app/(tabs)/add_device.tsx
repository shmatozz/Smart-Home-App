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
    const [layoutMeasured, setLayoutMeasured] = useState(false);

    const handleLayout = (event: { nativeEvent: { layout: { height: any; width: any }; }; }) => {
        if (!layoutMeasured) {
            const { height, width } = event.nativeEvent.layout;
            setRoomsCardsHeight(height / roomsData.length);
            setRoomsCardsWidth(width / roomsData.length);
            setLayoutMeasured(true);
        }
    };

    const [selected, setSelected] = useState(-1);

    return (
        <SafeAreaView style={ styles.safeArea }>
            <Header title={ "Add new device" }
                    accountIcon={ false } />

            <View style={ styles.contentContainer }>
                <View style={ styles.deviceFormContainer }>
                    <View style={ styles.selectRoomContainer }>
                        <Text style={ [textStyles.title, { paddingHorizontal: 16 }] }>Select room</Text>

                        <ScrollView horizontal={ true }
                                    showsHorizontalScrollIndicator={false}
                                    overScrollMode={'never'}>
                            <View style={{ width: 16 }}/>
                            <View style={{ flexDirection: 'row', gap: 8 }}
                                  onLayout={ handleLayout }>
                                { roomsData.map((item, index) => (
                                    <ImageCard image={ item.image }
                                               title={ item.title }
                                               style={{
                                                   height: Math.max(240, roomsCardsHeight),
                                                   width: Math.max(144, roomsCardsWidth),
                                               }}
                                               key={ index }
                                               selectable={ true }
                                               selected={ selected === index }
                                               onPress={ () => setSelected(index) }
                                    />
                                ))}
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
    { image: null, title: 'Living room', },
    { image: null, title: 'Bedroom', },
    { image: null, title: 'Kitchen', },
    { image: null, title: 'Hallway', },
];

export default Add_Device;
