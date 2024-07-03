import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    StyleProp,
    ViewStyle, Pressable,
} from 'react-native';
import Colors from "@/constants/Colors";

interface ImageCardProps {
    image: string | null,
    title: string,
    subtitle?: string | null,
    size?: string,
    style?: StyleProp<ViewStyle> | null,
    selectable?: boolean,
    selected?: boolean,
    onPress?: () => void,
}

const ImageCard: React.FC<ImageCardProps> = ({
                                                 image,
                                                 title,
                                                 subtitle,
                                                 size = 'S',
                                                 style = null,
                                                 selectable = false,
                                                 selected = false,
                                                 onPress = () => console.log("ImageCard pressed"),
                                             }) => {
    const titleContainerSize = size === 'S' ? 52 : 60;
    const fontSize = size === 'S' ? 12 : 14;

    return (
        <Pressable onPress={ onPress }>
            <View style={ [
                styles.cardContainer,
                style,
                selectable && selected ? styles.selectedCardContainer : {}
            ] }>
                <ImageBackground source={image ? { uri: image } : require("../../assets/images/placeholder.png")} style={styles.image}>
                    <View style={ [
                        styles.textContainer,
                        { height: titleContainerSize },
                        selectable && selected ? styles.selectedTextContainer : {}
                    ] }>
                        <Text style={ [styles.title, { fontSize: fontSize + 2 }] }>{ title }</Text>
                        { subtitle && <Text style={ [styles.subtitle, { fontSize: fontSize }] }>{ subtitle }</Text> }
                    </View>
                </ImageBackground>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    selectedCardContainer: {
        borderWidth: 2,
        borderColor: Colors.light.blue["50"],
        borderStyle: 'solid',
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textContainer: {
        backgroundColor: 'rgba(39, 39, 39, 0.6)',
        justifyContent: 'center',
        height: 52,
        padding: 10,
    },
    selectedTextContainer: {
        backgroundColor: 'rgba(65, 112, 197, 0.6)',
    },
    title: {
        color: Colors.light.base["0"],
        fontSize: 14,
        fontFamily: "Inter",
    },
    subtitle: {
        color: Colors.light.base["20"],
        fontSize: 12,
        fontFamily: "Inter",
    }
});

export default ImageCard;
