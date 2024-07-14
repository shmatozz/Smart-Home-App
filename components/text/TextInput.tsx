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
import {BodyM, BodyS, Caption} from "@/constants/Fonts";


interface TextInputProps {
    placeholder?: string,
    helperText?: string | null,
    leftIcon?: boolean;
    rightIcon?: boolean;
    size?: 'S' | 'M';
    password?: boolean;
    error?: boolean;
    text: string;
    onChangeText: (text: string) => void;
    children?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
                                                 placeholder,
                                                 helperText = null,
                                                 leftIcon = false,
                                                 rightIcon = false,
                                                 size = 'S',
                                                 password = false,
                                                 error = false,
                                                 text,
                                                 onChangeText,
                                                 children,
                                             }) => {
    const [focused, setFocused] = useState(false);

    let inputContainer;
    let inputContainerFocused;
    let inputContainerError;
    let iconSize;
    let label;
    let textSize;
    let labelFocused;
    let labelInput;

    switch (size) {
        case 'S':
            inputContainer = styles.inputContainer;
            inputContainerFocused = styles.inputContainerFocused;
            inputContainerError =  styles.inputContainerError;
            iconSize = 16;
            textSize = 14;
            label = [BodyS.Regular, { color: Colors.light.base['40'] }];
            labelFocused = [Caption.Regular, { color: Colors.light.blue['50'] }];
            labelInput = [Caption.Regular, { color: Colors.light.base['50'] }];
            break;
        case 'M':
            inputContainer = [styles.inputContainer, { height: 64 }];
            inputContainerFocused = [styles.inputContainerFocused, { height: 64 }];
            inputContainerError =  [styles.inputContainerError, { height: 64 }];
            iconSize = 24;
            textSize = 16;
            label = [BodyM.Regular, { color: Colors.light.base['40'] }];
            labelFocused = [BodyS.Regular, { color: Colors.light.blue['50'] } ];
            labelInput = [BodyS.Regular, { color: Colors.light.base['50'] } ];
            break
    }


    const touchProps = {
        style: error ? inputContainerError : focused ? inputContainerFocused : inputContainer,
        onPress: () => { setFocused(true); },
    };

    return (
        <View>
            <Pressable {...touchProps}>
                <View style={ styles.container }>
                    {
                        leftIcon && children
                    }

                    <View style={{ flexDirection: 'column', flex: 1}}>
                        <Text style={[label, text.length > 0 && labelInput, focused && labelFocused]}>{ placeholder }</Text>

                        {
                            (focused || text.length > 0) &&
                            <DefaultTextInput
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
                            />
                        }
                    </View>

                    <Pressable style={{ height: '100%', justifyContent: 'center' }} onPress={() => {
                        onChangeText("");
                        setFocused(false);
                    }}>
                        { text.length > 0 && <MaterialIcons name="clear" size={ iconSize } color={ Colors.light.base["50"] } /> }
                    </Pressable>

                    {
                        rightIcon && children
                    }

                </View>
            </Pressable>

            {
                helperText &&
                <Text style={[ Caption.Regular, { color: Colors.light.base['40'], marginTop: 4 } ]}>
                    { helperText }
                </Text>
            }
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
    inputContainerError: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.light.red['60'],
        borderRadius: 5,
        backgroundColor: Colors.light.base["0"],
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
});

export default TextInput;
