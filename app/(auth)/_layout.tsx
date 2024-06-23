import {Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='login' options={{
                headerShown: false,
                navigationBarHidden: true,
                statusBarStyle: 'light',
                statusBarTranslucent: true,
                navigationBarColor: 'black' }}/>
            <Stack.Screen name='registration' options={{
                headerShown: false,
                navigationBarHidden: true,
                statusBarStyle: 'light',
                statusBarTranslucent: true,
                navigationBarColor: 'black' }}/>
        </Stack>
    )
}

export default StackLayout;
