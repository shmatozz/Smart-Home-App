import React from 'react';
import {
    Text,
    View,
    StyleSheet, Pressable,
} from 'react-native';
import Colors from "@/constants/Colors";
import {Caption, Headers} from "@/constants/Fonts";

interface InfoCardProps {
    title: string,
    info: string,
    onPress?: () => void,
    children: React.ReactNode,
}

const InfoCard: React.FC<InfoCardProps> = ({
                                                title,
                                                info,
                                                onPress = () => console.log("Info card pressed"),
                                                children,
                                           }) => {
    const touchProps = {
        style: styles.touchContainer,
        onPress: onPress,
    };

    return (
        <Pressable {...touchProps}>
            <View style={ styles.container }>
                { children }

                <Text style={[ Caption.Regular, styles.title ]}>{ title }</Text>

                <Text style={ Headers.H5 }>{ info }</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    touchContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingHorizontal: 10,
        paddingVertical: 8,
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
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default InfoCard;
