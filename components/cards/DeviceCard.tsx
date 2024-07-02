import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet, Image, StyleProp, ViewStyle, ImageSourcePropType, Pressable,
} from 'react-native';
import Colors from "@/constants/Colors";
import Switch from "@/components/choice/Switch";

interface DeviceCardProps {
    image: ImageSourcePropType | null,
    title: string,
    subtitle?: string | null,
    type: 'horizontal' | 'vertical',
    style?: StyleProp<ViewStyle> | null,
    onPress?: () => void,
}

const DeviceCard: React.FC<DeviceCardProps> = ({
                                                 image,
                                                 title,
                                                 subtitle,
                                                 type,
                                                 style = null,
                                                 onPress = () => console.log("Device Card pressed"),
                                             }) => {
    const [state, setState] = useState(false)

    const touchProps = {
        style: styles.touchContainer,
        onPress: onPress,
    };

    if (type === 'horizontal') {
        return (
            <Pressable {...touchProps}>
                <View style={ [styles.cardContainer, style] }>
                    <Image source={ image ? image : require("../../assets/images/placeholder.png") }
                           style={ [styles.image, { borderTopLeftRadius: 12, borderBottomLeftRadius: 12, }] }/>

                    <View style={ styles.textContainer }>
                        <Text style={ styles.title }>{ title }</Text>
                        { subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text> }
                    </View>

                    <Switch style={{ flex: 0 }}
                            state={ state }
                            setState={ setState }/>
                </View>
            </Pressable>
        );
    }

    return (
        <Pressable {...touchProps}>
            <View style={ [{ flexDirection: 'column', flex: 1, }, style, ] }>
                <Image source={ image ? image : require("../../assets/images/placeholder.png") }
                       style={{ width: '100%', flex: 1, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                       resizeMode='cover'/>

                <View style={ styles.infoContainer }>
                    <Switch text={ title }
                            style={{ flex: 1 }}
                            state={ state }
                            setState={ setState }/>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    touchContainer: {
        flex: 1,
    },
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
        justifyContent: 'flex-end',
    },
    infoContainer: {
        backgroundColor: Colors.light.base["5"],
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        height: 52,
        flexDirection: "row",
        padding: 8,
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

export default DeviceCard;
