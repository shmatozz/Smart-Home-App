import {Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='rooms' options={{ headerShown: false }}/>
            <Stack.Screen name='[room]' options={{ headerShown: false }} />
            <Stack.Screen name='climate' options={{ headerShown: false }} />
        </Stack>
    )
}

export default StackLayout;
