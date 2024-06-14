import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface InfoCardProps {
    icon: keyof typeof MaterialIcons.glyphMap,
    title: string,
    info: string,
}

const InfoCard: React.FC<InfoCardProps> = ({
                                                icon,
                                                title,
                                                info
                                           }) => {
    return (
        <View style={ styles.container }>
            <MaterialIcons name={ icon } size={ 32 } color={ Colors.light.blue['50'] }/>
            <Text style={ styles.title }>{ title }</Text>
            <Text style={ styles.info }>{ info }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingHorizontal: 10,
        backgroundColor: Colors.light.base['0'],
        borderRadius: 12,
        // iOS shadow
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 16,
        // Android shadow
        elevation: 4,
    },
    title: {
        fontSize: 12,
        color:  Colors.light.base['90'],
        fontFamily: "Inter",
        textAlign: 'center'
    },
    info: {
        fontSize: 20,
        color:  Colors.light.base['90'],
        fontFamily: "Inter"
    },
});

export default InfoCard;
