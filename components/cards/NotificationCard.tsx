import React from "react";
import {View, StyleSheet, Text } from "react-native";
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BodyM } from "@/constants/Fonts";
import { GestureHandlerRootView, Swipeable, TouchableOpacity } from "react-native-gesture-handler";

interface NotificationCardProps {
    type: "WARNING" | "ERROR" | "INFO",
    text: string,
    onDelete: () => void,
}

const NotificationCard: React.FC<NotificationCardProps> = ({ type, text, onDelete }) => {
    const renderRightActions = () => (
        <TouchableOpacity style={ styles.deleteButton } onPress={ onDelete }>
            <MaterialIcons name={ "delete" } size={ 32 } color={ Colors.light.base["0"] }/>
        </TouchableOpacity>
    );

    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={ renderRightActions }>
                <View style={ styles.container }>
                    <View style={ styles.iconContainer }>
                        {
                            type === "ERROR" ? (
                                <MaterialIcons name={ "error" } size={ 32 } color={ Colors.light.red["60"] } />
                            ) : type === "WARNING" ? (
                                <MaterialIcons name={ "warning" } size={ 32 } color={ Colors.light.beige["40"] } />
                            ) : (
                                <MaterialIcons name={ "info" } size={ 32 } color={ Colors.light.blue["50"] } />
                            )
                        }
                    </View>

                    <View style={ styles.textContainer }>
                        <Text style={ BodyM.Regular }>{ text }</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 80,
        backgroundColor: Colors.light.base["0"],
        borderRadius: 16,
        flexDirection: "row",
    },
    iconContainer: {
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
    },
    deleteButton: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: Colors.light.red["50"],
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    deleteText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default NotificationCard;
