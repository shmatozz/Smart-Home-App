import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import Switch from "@/components/choice/Switch";
import ImageCard from "@/components/cards/ImageCard";
import DropdownSelect from "@/components/choice/DropdownSelect";
import {BodyM, Headers} from "@/constants/Fonts";

const Security = () => {
    const [selectedCameras, setSelectedCameras] = useState('All');

    const [camerasContainerHeight, setCamerasContainerHeight] = useState(0);

    const handleLayout = (event: { nativeEvent: { layout: { height: any; }; }; }) => {
        const { height } = event.nativeEvent.layout;
        setCamerasContainerHeight(
            Math.max(
                160,
                (height - 158 - 4 * (doorsData.length - 1) - doorsData.length * 40 - 12 * (camerasData.length - 1)) / camerasData.length
            )
        );
    };

    const [doorStates, setDoorStates] = useState(doorsData.map(door => door.status === 'closed'));

    const setStateAtIndex = (index: number, newValue: boolean) => {
        const newStates = [...doorStates];
        newStates[index] = newValue;
        setDoorStates(newStates);
    };

    return (
        <SafeAreaView style={ styles.safeArea }
                      onLayout={ handleLayout }>
            <Header title={'Security'}
                    accountIcon={ false }
                    firstIcon={ 'notifications' }/>

            <ScrollView style={ styles.contentContainer }
                        showsVerticalScrollIndicator={ false }
                        overScrollMode={ 'never' } contentContainerStyle={{ flexGrow: 1}}>
                <View style={ styles.doorsLockContainer }>
                    {
                        doorsData.map((item, index) => (
                            <View key={ index }
                                  style={ styles.doorStatus }>
                                <Text style={[ BodyM.Regular, { flex: 1 }]}>
                                    { item.name }
                                </Text>

                                <Switch text={ doorStates[index] ? 'Closed' : 'Opened' }
                                        state={ doorStates[index] }
                                        setState={ (value) => {
                                            setStateAtIndex(index, value);
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
                            Cameras
                        </Text>

                        <DropdownSelect options={ ['All', 'Indoors', 'Outdoors'] }
                                        selectedOption={ selectedCameras }
                                        onOptionSelected={ setSelectedCameras }
                                        size={'S'}>
                        </DropdownSelect>
                    </View>

                    <View style={ styles.camerasPreviewContainer }>
                        {
                            camerasData.map((item, index) => (
                                <ImageCard image={ item.preview }
                                           title={ item.name }
                                           size={'M'}
                                           style={{ height: camerasContainerHeight }}
                                           key={ index }/>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
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

const doorsData = [
    { name: "Main door", status: "closed" },
    { name: "Gate", status: "opened" },
    { name: "Gates", status: "closed" },
]

const camerasData = [
    {
        preview: "https://hobbyka.ru/upload/iblock/d25/d2526a8aecea1be55632241ee4b0e10c.jpg",
        name: "Main courtyard",
    },
    {
        preview: "https://m-strana.ru/upload/resize_cache/sprint.editor/964/830_830_1/96427c3e7182ccbce4f074754f251bb1.jpg",
        name: "Backyard",
    },
    {
        preview: "https://bigfoto.name/photo/uploads/posts/2024-02/thumbs/1709198930_bigfoto-name-p-landshaftnii-dizain-vdol-zabora-v-chastnom-82.jpg",
        name: "Behind gate",
    },
]

export default Security;
