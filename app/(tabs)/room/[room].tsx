import { Text, View } from "react-native";
import {Stack, useLocalSearchParams} from "expo-router";
import { useEffect, useState } from "react";

export default function Room() {
    const [contact, setContact] = useState('')
    const room = useLocalSearchParams();
    console.log(room.room);
    return (
        <View>
            <Text>{ room.toString() }</Text>
        </View>
    );
}
