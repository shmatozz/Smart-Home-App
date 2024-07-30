import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import Switch from "@/components/choice/Switch";
import ImageCard from "@/components/cards/ImageCard";
import DropdownSelect from "@/components/choice/DropdownSelect";
import {BodyM, Headers} from "@/constants/Fonts";
import {observer} from "mobx-react-lite";
import SecurityViewModel from "@/utils/viewmodels/Security/SecurityViewModel";
import translate from "@/utils/localization/Localization";

const securityViewModel = new SecurityViewModel();

const Security = observer(() => {
    const [camerasContainerHeight, setCamerasContainerHeight] = useState(0);

    const handleLayout = (event: { nativeEvent: { layout: { height: any; }; }; }) => {
        const { height } = event.nativeEvent.layout;
        setCamerasContainerHeight(
            Math.max(
                160,
                (height - 158 - 4 * (securityViewModel.getDoorsCount() - 1) - securityViewModel.getDoorsCount() * 40 - 12 * (securityViewModel.getCamerasCount() - 1)) / securityViewModel.getCamerasCount()
            )
        );
    };

    return (
        <SafeAreaView style={ styles.safeArea }
                      onLayout={ handleLayout }>
            <Header title={ translate("security") }
                    accountIcon={ false }
                    firstIcon={ 'notifications' }/>

            <ScrollView style={ styles.contentContainer }
                        showsVerticalScrollIndicator={ false }
                        overScrollMode={ 'never' } contentContainerStyle={{ flexGrow: 1}}>
                <View style={ styles.doorsLockContainer }>
                    {
                        securityViewModel.doors.map((item, index) => (
                            <View key={ index }
                                  style={ styles.doorStatus }>
                                <Text style={[ BodyM.Regular, { flex: 1 }]}>
                                    { item.title }
                                </Text>

                                <Switch text={ securityViewModel.doors[index].closed ? translate("closed") : translate("opened") }
                                        state={ securityViewModel.doors[index].closed }
                                        setState={ (value) => {
                                            securityViewModel.setDoorState(index, value);
                                        } }
                                        type={ 'lock' }
                                />
                            </View>
                        ))
                    }
                </View>

                <View style={ styles.camerasContainer }>
                    <View style={ styles.camerasTitleContainer }>
                        <Text style={[ Headers.H5, { flex: 1 } ]}>
                            { translate("cameras") }
                        </Text>

                        <DropdownSelect options={ [translate("all"), translate("indoors"), translate("outdoors")] }
                                        selectedOption={ securityViewModel.selectedCameras }
                                        onOptionSelected={ securityViewModel.setSelectedCamera }
                                        size={ 'S' }>
                        </DropdownSelect>
                    </View>

                    <View style={ styles.camerasPreviewContainer }>
                        {
                            securityViewModel.cameras.map((item, index) => (
                                <ImageCard image={ item.image }
                                           title={ item.title }
                                           size={ 'M' }
                                           style={{ height: camerasContainerHeight }}
                                           key={ index }/>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
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
    doorsLockContainer: {
        padding: 8,
        gap: 4,
        marginBottom: 16,
    },
    doorStatus: {
        flexDirection: 'row',
        padding: 8,
        height: 40,
        justifyContent: 'center',
    },
    camerasContainer: {
        gap: 12,
        paddingBottom: 16,
    },
    camerasTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    camerasPreviewContainer: {
        flex: 1,
        gap: 12,
        backgroundColor: Colors.light.base["5"],
    }
})

export default Security;
