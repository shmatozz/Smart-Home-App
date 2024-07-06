import {Stack} from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen name='index' options={{
                headerShown: false,
                navigationBarHidden: true,
                statusBarStyle: 'light',
                statusBarTranslucent: true,
                navigationBarColor: 'black'
            }}/>
        </Stack>
    )
}

export default StackLayout;
