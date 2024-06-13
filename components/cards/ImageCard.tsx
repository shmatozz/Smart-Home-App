import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image, ImageProps, ImageBackground,
} from 'react-native';
import Colors from "@/constants/Colors";
import {BlurView} from "expo-blur";

interface ImageCardProps {
    image: Image | null,
    title: string,
    subtitle?: string | null,
}

const ImageCard: React.FC<ImageCardProps> = ({
                                                 image,
                                                 title,
                                                 subtitle
                                           }) => {
    return (
        <View style={ styles.cardContainer }>
            <ImageBackground source={ image ? image : require("../../assets/images/placeholder.png") } style={styles.image}>
                <BlurView style={ styles.textContainer } intensity={ 95 } >
                    <Text style={ styles.title }>{ title }</Text>
                    { subtitle && <Text style={ styles.subtitle }>{ subtitle }</Text> }
                </BlurView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    textContainer: {
        backgroundColor: 'rgba(39, 39, 39, 0.6)',
        justifyContent: 'center',
        height: 52,
        padding: 10,
    },
    title: {
        color: Colors.light.base["0"],
        fontSize: 14,
        fontFamily: "Inter"
    },
    subtitle: {
        color: Colors.light.base["20"],
        fontSize: 12,
        fontFamily: "Inter"
    }
});

export default ImageCard;
