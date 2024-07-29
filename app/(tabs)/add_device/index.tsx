import React, {useState, useRef} from "react";
import {Text, View, StyleSheet, ScrollView, Animated, Modal} from "react-native";
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
import AnimatedLottieView from 'lottie-react-native';

const addDeviceViewModel = new AddDeviceViewModel();

const Add_Device = observer(() => {
    const [roomsCardsHeight, setRoomsCardsHeight] = useState(0);
    const [roomsCardsWidth, setRoomsCardsWidth] = useState(0);

    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;

    const handleLayout = (event: { nativeEvent: { layout: { height: any; width: any; }; }; }) => {
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

    const handlePress = (event: { nativeEvent: { pageX: any; pageY: any; }; }) => {
        if (!addDeviceViewModel.isFilled()) {
            triggerPulseAnimation();
            return
        }

        const { pageX, pageY } = event.nativeEvent;

        addDeviceViewModel.setPressPosition(pageX, pageY);
        addDeviceViewModel.setModalVisible(true);

        addDeviceViewModel.startSearchingDeviceSignal();

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 30,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const triggerPulseAnimation = () => {
        pulseAnim.setValue(1);
        Animated.sequence([
            Animated.timing(pulseAnim, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
                toValue: 1.1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = () => {
        addDeviceViewModel.setModalVisible(false);
        scaleAnim.setValue(0);
        fadeAnim.setValue(0);
    };

    return (
        <SafeAreaView style={ styles.safeArea }>
            <Header title={ "Add new device" } accountIcon={ false } />

            <View style={ styles.contentContainer }>
                <View style={ styles.deviceFormContainer }>
                    <View style={ styles.selectRoomContainer } onLayout={ handleLayout }>
                        <Text style={ [ Headers.H5, { paddingHorizontal: 16 }] }>Select room</Text>

                        <Animated.View style={[{ flex: 1 }, (addDeviceViewModel.selectedRoom == -1) && { transform: [{ scale: pulseAnim }] } ]}>
                            <ScrollView horizontal={ true } showsHorizontalScrollIndicator={false} overScrollMode={'never'}>
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
                        </Animated.View>
                    </View>

                    <View style={ styles.deviceNameContainer }>
                        <Text style={ Headers.H5 }>Name new device</Text>

                        <Animated.View style={ addDeviceViewModel.deviceNameError && { transform: [{ scale: pulseAnim }] } }>
                            <TextInput text={ addDeviceViewModel.deviceName }
                                       onChangeText={ (name: string) => {
                                           addDeviceViewModel.setDeviceName(name);
                                           addDeviceViewModel.setDeviceNameError(false);
                                       }}
                                       placeholder={ 'Device Name' }
                                       size={ 'M' }
                                       error={ addDeviceViewModel.deviceNameError }
                            />
                        </Animated.View>

                        <Animated.View style={ addDeviceViewModel.deviceTypeError && { transform: [{ scale: pulseAnim }] } }>
                            <DropdownSelect placeholder={ 'Type' }
                                            leftIcon={ true }
                                            options={ ['Air', 'Lights', 'Audio'] }
                                            selectedOption={ addDeviceViewModel.deviceType }
                                            onOptionSelected={ (type: string) => {
                                                addDeviceViewModel.setDeviceType(type);
                                                addDeviceViewModel.setDeviceTypeError(false);
                                            }}
                                            size={ 'M' }
                                            error={ addDeviceViewModel.deviceTypeError }
                            >
                                <MaterialIcons name={ 'devices-other'} size={ 24 }
                                               color={ addDeviceViewModel.deviceTypeError ? Colors.light.red["60"] : Colors.light.blue["50"] }/>
                            </DropdownSelect>
                        </Animated.View>
                    </View>

                    <View style={ styles.confirmContainer }>
                        <Text style={ Headers.H5 }>Pair signal</Text>

                        <Button text={ "Find device signal" }
                                size={ 'M' }
                                type={ 'secondary' }
                                onPress={ handlePress }
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

            <Modal visible={ addDeviceViewModel.modalVisible } transparent={ true } animationType="fade" >
                <View style={ styles.modalContainer }>
                    <Animated.View
                        style={[
                            styles.animatedCircle,
                            {
                                top: addDeviceViewModel.pressPosition.y - 25,
                                left: addDeviceViewModel.pressPosition.x - 25,
                                transform: [{ scale: scaleAnim }],
                            }
                        ]}
                    />

                    <Animated.View style={[ styles.modalContent, { opacity: fadeAnim } ]}>
                        <Text style={ Headers.H5 }>Searching for device</Text>

                        <AnimatedLottieView
                            source={ require('../../../assets/lottie/test_animation.json') }
                            autoPlay
                            loop
                            style={ styles.lottieView }
                        />

                        <Button size={ 'M' } type={ 'tertiary' } text={ 'Stop pairing' } onPress={ closeModal }/>
                    </Animated.View>
                </View>
            </Modal>
        </SafeAreaView>
    );
});

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    animatedCircle: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.light.base["0"],
    },
    modalContent: {
        width: '80%',
        height: '40%',
        backgroundColor: Colors.light.base["0"],
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 20,
        gap: 16,
    },
    lottieView: {
        width: "100%",
        height: "100%",
    },
});

export default Add_Device;
