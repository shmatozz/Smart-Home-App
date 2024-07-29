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

    const inputContainer = size == 'M' ? [styles.inputContainer, { height: 64 }] : styles.inputContainer;
    const inputContainerFocused = size == 'M' ? [styles.inputContainerFocused, { height: 64 }] : styles.inputContainerFocused;
    const iconSize = size == 'M' ? 24 : 16;
    const label = size == 'M' ? [BodyM.Regular, { color: Colors.light.base['40'] }] : [BodyS.Regular, { color: Colors.light.base['40'] }];
    const labelFocused = size == 'M' ? [BodyS.Regular, { color: Colors.light.blue['50'] } ] : [Caption.Regular, { color: Colors.light.blue['50'] }];
    const labelInput = size == 'M' ? [BodyS.Regular, { color: Colors.light.base['50'] } ] : [Caption.Regular, { color: Colors.light.base['50'] }];

    const touchProps = {
        style: [focused ? inputContainerFocused : inputContainer, error ? { borderColor: Colors.light.red["60"] } : { } ],
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
                        <Text style={[
                            label, text.length > 0 && labelInput, focused && labelFocused,
                            error ? { color: Colors.light.red["60"] } :
                               (focused ? { color: Colors.light.blue["50"] } : { color: Colors.light.base["40"] })
                        ]}>
                            { placeholder }
                        </Text>

                        {
                            (focused || text.length > 0) &&
                            <DefaultTextInput
                                autoFocus={ focused }
                                style={{ fontSize: size == 'M' ? 16 : 14, color: Colors.light.base['90']}}
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
});

export default TextInput;
