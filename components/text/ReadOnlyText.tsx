import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Colors from "@/constants/Colors";


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
            <Text style={ styles.label }>{ label }</Text>
            <Text style={ styles.text }>{ text }</Text>
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
        color: Colors.light.base['40'],
    },
    text: {
        fontSize: 14,
        color: Colors.light.base['90'],
    }
});

export default ReadOnlyText;
