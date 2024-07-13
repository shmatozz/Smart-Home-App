import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect, useState} from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import {getItem, setItem} from "@/utils/storage/AsyncStorage";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export let logged: any;
export let firstLaunch: any;

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
        'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
        ...FontAwesome.font,
    });

    async function getInfo() {
        logged = await getItem("logged");
        firstLaunch = await getItem("firstLaunch");
    }

    const [varsGet, setVarsGet] = useState(false);
    getInfo().then(r => {
        if (logged == undefined) {
            setItem('logged', false).then(r => {
                logged = false;
            });
        }

        if (firstLaunch == undefined) {
            setItem('firstLaunch', true).then(r => {
                firstLaunch = true;
            });
        }

        console.log(logged, firstLaunch);
        setVarsGet(true);
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded && varsGet) {
            SplashScreen.hideAsync();
        }
    }, [loaded, varsGet]);

    if (!loaded || !varsGet) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        //                                         no DarkTheme yet
        <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false, navigationBarColor: "#FFFFFF", statusBarStyle: 'dark', }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false, navigationBarColor: "#FFFFFF", statusBarStyle: 'dark'}} />
                <Stack.Screen name="(onboarding)" options={{ headerShown: false, statusBarStyle: 'light' }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false, statusBarStyle: 'light' }} />
            </Stack>
        </ThemeProvider>
    );
}
