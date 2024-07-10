import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from "@/constants/Colors";
import {BodyS, Caption} from "@/constants/Fonts";


interface ReadOnlyTextProps {
    label?: string | null,
    text: string,
}

const ReadOnlyText: React.FC<ReadOnlyTextProps> = ({
                                                 label = null,
                                                 text,
                                             }) => {
    return (
        <View style={ styles.container }>
            <Text style={[ Caption.Regular, { color: Colors.light.base["40"] } ]}>{ label }</Text>
            <Text style={[ BodyS.Regular ]}>{ text }</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 2,
    },
    label: {
        fontSize: 12,
        fontFamily: "Inter",
        color: Colors.light.base['40'],
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter",
        color: Colors.light.base['90'],
    }
});

export default ReadOnlyText;
