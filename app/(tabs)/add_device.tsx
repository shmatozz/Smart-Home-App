import React, {useState} from "react";
import {Text, View, StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import ImageCard from "@/components/cards/ImageCard";
import TextInput from "@/components/text/TextInput";
import DropdownSelect from "@/components/choice/DropdownSelect";
import Button from "@/components/buttons/Button";
import {BodyM, Headers} from "@/constants/Fonts";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {observer} from "mobx-react-lite";
import AddDeviceViewModel from "@/utils/viewmodels/AddDevice/AddDeviceViewModel";

const addDeviceViewModel = new AddDeviceViewModel();

const Add_Device = observer(() => {
    const [roomsCardsHeight, setRoomsCardsHeight] = useState(0);
    const [roomsCardsWidth, setRoomsCardsWidth] = useState(0);

    const handleLayout = (event: { nativeEvent: { layout: { height: any; width: any }; }; }) => {
        const { height, width } = event.nativeEvent.layout;
        setRoomsCardsHeight(Math.max(
            240,
            (height - 28) / addDeviceViewModel.getRoomsCount()
        ));
        setRoomsCardsWidth(Math.max(
            144,
            (width - 32 - 8 * (addDeviceViewModel.getRoomsCount() - 1)) / addDeviceViewModel.getRoomsCount()
        ));
    };

    return (
        <SafeAreaView style={ styles.safeArea }>
            <Header title={ "Add new device" }
                    accountIcon={ false } />

            <View style={ styles.contentContainer }>
                <View style={ styles.deviceFormContainer }>
                    <View style={ styles.selectRoomContainer }
                          onLayout={ handleLayout }>
                        <Text style={ [ Headers.H5, { paddingHorizontal: 16 }] }>
                            Select room
                        </Text>

                        <ScrollView horizontal={ true }
                                    showsHorizontalScrollIndicator={false}
                                    overScrollMode={'never'}>
                            <View style={{ width: 16 }}/>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                {
                                    addDeviceViewModel.rooms.map((item, index) => (
                                        <ImageCard image={ item.image }
                                                   title={ item.title }
                                                   subtitle={ item.devices + " devices" }
                                                   style={{
                                                       height: roomsCardsHeight,
                                                       width: roomsCardsWidth,
                                                   }}
                                                   key={ index }
                                                   selectable={ true }
                                                   selected={ addDeviceViewModel.selectedRoom === index }
                                                   onPress={ () => addDeviceViewModel.setSelectedRoom(index) }
                                        />
                                    ))
                                }
                            </View>
                            <View style={{ width: 16 }}/>
                        </ScrollView>
                    </View>

                    <View style={ styles.deviceNameContainer }>
                        <Text style={ Headers.H5 }>Name new device</Text>
                        
                        <TextInput text={ addDeviceViewModel.deviceName }
                                   onChangeText={ addDeviceViewModel.setDeviceName }
                                   placeholder={ 'Device Name' }
                                   size={ 'M' }/>

                        <DropdownSelect placeholder={ 'Type' }
                                        leftIcon={ true }
                                        options={ ['Air', 'Lights', 'Audio'] }
                                        selectedOption={ addDeviceViewModel.deviceType }
                                        onOptionSelected={ addDeviceViewModel.setDeviceType }
                                        size={ 'M' }>
                            <MaterialIcons name={ 'devices-other'} size={ 24 } color={ Colors.light.blue["50"] }/>
                        </DropdownSelect>
                    </View>

                    <View style={ styles.confirmContainer }>
                        <Text style={ Headers.H5 }>Pair signal</Text>

                        <Button text={ "Find device signal" }
                                size={ 'M' }
                                type={ 'secondary' }
                                onPress={ addDeviceViewModel.startSearchingDeviceSignal }
                        />
                    </View>
                </View>

                <View style={ styles.smartPairContainer }>
                    <View style={ styles.splitterContainer }>
                        <View style={{ flex: 1, height: 2, backgroundColor: Colors.light.base["90"] }}/>
                        <Text style={ BodyM.Regular }>or connect via</Text>
                        <View style={{ flex: 1, height: 2, backgroundColor: Colors.light.base["90"]  }}/>
                    </View>

                    <Button text={ 'Smart connect using WIFI' }
                            size={ 'M' }
                            type={ 'primary' }
                            leftIcon={ true }
                            onPress={ addDeviceViewModel.startSmartWIFIConnect }>
                        <MaterialIcons name={ 'wifi' } size={ 24 } color={ Colors.light.base["0"] }/>
                    </Button>
                </View>
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

export default Add_Device;
