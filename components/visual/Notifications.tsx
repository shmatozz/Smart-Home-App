import React, { useRef, useEffect } from "react";
import {Modal, StyleSheet, Animated, PanResponder, Dimensions, View, Pressable, FlatList} from "react-native";
import { observer } from "mobx-react-lite";
import Colors from "@/constants/Colors";
import NotificationsViewModel from "@/utils/viewmodels/Notifications/NotificationsViewModel";
import NotificationCard from "@/components/cards/NotificationCard";

interface NotificationsProps {
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

const notificationVM = new NotificationsViewModel();

const Notifications: React.FC<NotificationsProps> = observer(({ visible, setVisible }) => {
    const screenHeight = Dimensions.get("window").height;
    const modalHeight = 200;
    const modalAnim = useRef(new Animated.Value(screenHeight)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(modalAnim, {
                toValue: modalHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(modalAnim, {
                toValue: screenHeight,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    const closeModal = () => {
        Animated.timing(modalAnim, {
            toValue: screenHeight,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setVisible(false);
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dy > 0) {
                    modalAnim.setValue(modalHeight + gestureState.dy);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dy > 150) {
                    closeModal();
                } else {
                    Animated.timing(modalAnim, {
                        toValue: modalHeight,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <Modal visible={ visible } transparent={true} animationType="none">
            <Animated.View
                style={[
                    styles.modalContainer,
                    {
                        transform: [{ translateY: modalAnim }],
                        height: modalHeight,
                    }
                ]}
                {...panResponder.panHandlers}
            >
                <Pressable style={ styles.swiperContainer } onPress={ closeModal }>
                    <View style={ styles.swiper }/>
                </Pressable>

                <FlatList data={ notificationVM.notifications }
                          renderItem={ ({item, index }) => <NotificationCard type={ item.type }
                                                                     text={ item.text }
                                                                     onDelete={ () => notificationVM.deleteNotification(index) }
                          /> }
                          keyExtractor={ item => item.text }
                          ItemSeparatorComponent={ () => <View style={{ height: 16 }}/> }
                />
            </Animated.View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: Colors.light.base["5"],
        padding: 16,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    },
    swiperContainer: {
        height: 24,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    swiper: {
        width: 100,
        height: 4,
        color: Colors.light.base["0"],
        backgroundColor: Colors.light.base["0"],
        borderRadius: 100,
    }
});

export default Notifications;
