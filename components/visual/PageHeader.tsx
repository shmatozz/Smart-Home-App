import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Pressable,
} from 'react-native';
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface HeaderProps {
    backIcon?: boolean,
    onBackPress?: () => void,
    accountIcon?: boolean,
    onAccountPress?: () => void,
    title: string,
    firstIcon?: keyof typeof MaterialIcons.glyphMap | null,
    onFirstPress?: () => void,
    secondIcon?: keyof typeof MaterialIcons.glyphMap | null,
    onSecondPress?: () => void,
}

const Header: React.FC<HeaderProps> = ({
                                           backIcon = false,
                                           onBackPress = () => console.log("Back pressed"),
                                           accountIcon = true,
                                           onAccountPress = () => console.log("Account pressed"),
                                           title,
                                           firstIcon = null,
                                           onFirstPress = () => console.log("First pressed"),
                                           secondIcon = null,
                                           onSecondPress = () => console.log("First pressed"),
                                       }) => {
    return (
        <View style={ styles.container }>
            { backIcon && <Pressable onPress={ () => onBackPress() }>
                <MaterialIcons name={"arrow-back"} size={ 28 } color={ Colors.light.base['70'] }/>
            </Pressable> }

            { accountIcon && <Pressable onPress={ () => onAccountPress() }>
                <MaterialIcons name="account-circle" size={ 32 } color={ Colors.light.base['70'] }/>
            </Pressable> }

            <Text style={ styles.text }>{ title }</Text>

            { firstIcon && <Pressable onPress={ () => onFirstPress() }>
                <MaterialIcons name={ firstIcon } size={ 28 } color={ Colors.light.base['70'] }/>
            </Pressable> }

            { secondIcon && <Pressable onPress={ () => onSecondPress() }>
                <MaterialIcons name={ secondIcon } size={ 28 } color={ Colors.light.base['70'] }/>
            </Pressable> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        paddingHorizontal: 16,
    },
    text: {
        fontSize: 20,
        color:  Colors.light.base['90'],
        flex: 1,
        fontFamily: "Inter"
    }
});

export default Header;
