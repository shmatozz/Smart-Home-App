import React, { useState } from 'react';
import {
    View,
    TextInput as DefaultTextInput,
    Text,
    StyleSheet,
    Pressable,
} from 'react-native';
import Colors from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


interface TextInputProps {
    placeholder?: string,
    helperText?: string | null,
    leftIcon?: keyof typeof MaterialIcons.glyphMap | null;
    rightIcon?: keyof typeof MaterialIcons.glyphMap | null;
    size?: 'S' | 'M';
    password?: boolean;
    text: string;
    onChangeText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
                                                 placeholder,
                                                 helperText = null,
                                                 leftIcon = null,
                                                 rightIcon = null,
                                                 size = 'S',
                                                 password = false,
                                                 text,
                                                 onChangeText,
                                             }) => {
    const [focused, setFocused] = useState(false);

    let inputContainer;
    let inputContainerFocused;
    let iconSize;
    let label;
    let textSize;
    let labelFocused;
    let labelInput;

    switch (size) {
        case 'S':
            inputContainer = styles.inputContainer;
            inputContainerFocused = styles.inputContainerFocused;
            iconSize = 16;
            textSize = 14;
            label = styles.label;
            labelFocused = styles.labelFocused;
            labelInput = styles.labelInput;
            break;
        case 'M':
            inputContainer = [styles.inputContainer, { height: 64 }];
            inputContainerFocused = [styles.inputContainerFocused, { height: 64 }];
            iconSize = 24;
            textSize = 16;
            label = [styles.label, { fontSize: 16 }];
            labelFocused = [styles.labelFocused, { fontSize: 14 } ];
            labelInput = [styles.labelInput, { fontSize: 14 } ];
            break
    }


    const touchProps = {
        style: focused ? inputContainerFocused : inputContainer,
        onPress: () => { setFocused(true); },
    };

    return (
        <View>
            <Pressable {...touchProps}>
                <View style={ styles.container }>

                    { leftIcon && <MaterialIcons name={ leftIcon } size={ iconSize } color={ focused ? Colors.light.blue["50"] : Colors.light.base["40"] } /> }

                    <View style={{ flexDirection: 'column', flex: 1}}>
                        <Text style={[label, text.length > 0 && labelInput, focused && labelFocused]}>{ placeholder }</Text>

                        {(focused || text.length > 0) && <DefaultTextInput
                            autoFocus={ focused }
                            style={{ fontSize: textSize, color: Colors.light.base['90']}}
                            onChangeText={ onChangeText }
                            onPressIn={ () => setFocused(true) }
                            cursorColor={ Colors.light.base["40"] }
                            selectionColor={ Colors.light.blue["50"] }
                            onSubmitEditing={ () => setFocused(false) }
                            secureTextEntry={ password }
                            value={ text }
                            onEndEditing={ () => setFocused(false) }
                            autoCapitalize={'none'}
                        />}

                    </View>

                    <Pressable style={{ height: '100%', justifyContent: 'center' }} onPress={() => {
                        onChangeText("");
                        setFocused(false);
                    }}>
                        { text.length > 0 && <MaterialIcons name="clear" size={ iconSize } color={ Colors.light.base["50"] } /> }
                    </Pressable>

                    { rightIcon && <MaterialIcons name={ rightIcon } size={ iconSize } color={ focused ? Colors.light.blue["50"] : Colors.light.base["40"] } /> }

                </View>
            </Pressable>
            { helperText && <Text style={styles.helperText}>{ helperText }</Text> }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    label: {
        fontSize: 14,
        fontFamily: "Inter",
        color: Colors.light.base['40'],
    },
    labelFocused: {
        fontSize: 12,
        fontFamily: "Inter",
        color: Colors.light.blue['50'],
    },
    labelInput: {
        fontSize: 12,
        fontFamily: "Inter",
        color: Colors.light.base['50'],
    },
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: Colors.light.base["0"],
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    inputContainerFocused: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.light.blue['50'],
        borderRadius: 5,
        backgroundColor: Colors.light.base["0"],
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    helperText: {
        fontSize: 12,
        fontFamily: "Inter",
        color: Colors.light.base['40'],
        marginTop: 4,
    },
});

export default TextInput;
