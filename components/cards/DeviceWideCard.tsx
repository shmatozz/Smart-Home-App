import React from 'react';
import {
    Text,
    View,
    StyleSheet, Image,
} from 'react-native';
import Colors from "@/constants/Colors";
import Switch from "@/components/choice/Switch";

interface DeviceWideCardProps {
    image: string | null,
    title: string,
    subtitle?: string | null,
}

const DeviceWideCard: React.FC<DeviceWideCardProps> = ({
                                                 image,
                                                 title,
                                                 subtitle
                                             }) => {
    return (
        <View style={ styles.cardContainer }>
            <Image source={ image ? image : require("../../assets/images/placeholder.png") } style={styles.image}/>
            <View style={ styles.textContainer }>
                <Text style={ styles.title }>{ title }</Text>
                <Text style={ styles.subtitle }>{ subtitle }</Text>
            </View>
            <Switch/>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 100,
        borderRadius: 12,
        gap: 12,
        paddingRight: 20,
    },
    image: {
        flex: 1,
        maxHeight: 100,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'flex-end',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: Colors.light.base["90"],
        fontSize: 20,
        fontFamily: "Inter"
    },
    subtitle: {
        color: Colors.light.base["70"],
        fontSize: 14,
        fontFamily: "Inter"
    }
});

export default DeviceWideCard;
