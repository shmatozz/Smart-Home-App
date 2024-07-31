import React from "react";
import {Modal, View, StyleSheet} from "react-native";
import Button from "@/components/buttons/Button";
import {observer} from "mobx-react-lite";
import Colors from "@/constants/Colors";

interface NotificationsProps {
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

const Notifications: React.FC<NotificationsProps> = observer(({
                                                         visible,
                                                         setVisible,
                                                     }) => {
    return (
        <Modal visible={ visible } transparent={ true } animationType="slide">
            <View style={ styles.modalContainer }>
                <Button size={ 'S' } text={ "Close" } onPress={ () => setVisible(false) } />
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        marginTop: 100,
        backgroundColor: Colors.light.base["5"],
        padding: 16,
        gap: 16,
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
    }
})

export default Notifications;
