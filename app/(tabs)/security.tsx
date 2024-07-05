import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/visual/PageHeader";
import Colors from "@/constants/Colors";
import Switch from "@/components/choice/Switch";
import ImageCard from "@/components/cards/ImageCard";
import DropdownSelect from "@/components/choice/DropdownSelect";

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
                                <Text style={ styles.textM }>{ item.name }</Text>
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
                        <Text style={ styles.camerasTitle }>Cameras</Text>
                        <DropdownSelect options={ ['All', 'Indoors', 'Outdoors'] }
                                        selectedOption={ selectedCameras }
                                        onOptionSelected={ setSelectedCameras }
                                        size={'S'} />
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
        backgroundColor: Colors.light.base["5"],
    },
    doorsLockContainer: {
        padding: 8,
        gap: 4,
        marginBottom: 16,
    },
    textM: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Inter",
        color: Colors.light.base["90"],
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
    camerasTitle: {
        flex: 1,
        fontSize: 20,
        fontFamily: "Inter",
        color: Colors.light.base["90"],
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
    { name: "Main courtyard", preview: null },
    { name: "Backyard", preview: null },
    { name: "Behind gate", preview: null },
]

export default Security;
