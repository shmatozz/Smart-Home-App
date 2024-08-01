import React, { useRef } from "react";
import { View, StyleSheet, Text, Animated, PanResponder, Dimensions } from "react-native";
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BodyM } from "@/constants/Fonts";

interface NotificationCardProps {
    type: "WARNING" | "ERROR" | "INFO",
    text: string,
    onDelete: () => void,
}

const NotificationCard: React.FC<NotificationCardProps> = ({ type, text, onDelete }) => {
    const screenWidth = Dimensions.get("window").width;
    const translateX = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_evt, gestureState) => Math.abs(gestureState.dx) > 5,
            onPanResponderMove: Animated.event(
                [null, { dx: translateX }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (_evt, gestureState) => {
                if (gestureState.dx < -screenWidth / 3) {
                    Animated.timing(translateX, {
                        toValue: -screenWidth,
                        duration: 200,
                        useNativeDriver: true,
                    }).start(() => {
                        onDelete();
                    });
                } else {
                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateX }],
                },
            ]}
            {...panResponder.panHandlers}
        >
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
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
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
});

export default NotificationCard;
